
from flask_pymongo import PyMongo
from pymongo import MongoClient, TEXT
from flask import request, redirect, Blueprint
import uuid
from project import Project
from packet import Packet
from global_variables import dbc, oll, project, packets
import packet_receiver
import node_manager
import exporter
import ruamel.yaml

mount = 0

can_id = 'vcan0'  # This is the CAN channel - this is updated on line 27

# Must put this blueprint in api.py so that these routes can be called
project_configuration = Blueprint('project_configuration', __name__)

client = MongoClient(
    'mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
projects = db.projects  # <-- This is the collection within the 'test' db

'''
Description: Add project to database collection: projects
@return: redirect: redirect page to can bus map and node map (Visualizer.js)
'''
# Add Project to Database and redirects page to can bus visualizer

@project_configuration.route("/add_project", methods=["POST"])
def add_project():
    proj_name = request.form.get("project-name")
    stored_location = request.form.get("stored-location")
    user_initials = request.form.get("user-initials")
    event_name = request.form.get("event-name")
    event_date = request.form.get("e-date")
    can_id = request.form.get("can-id")
    vehicle_id = request.form.get("vehicle-id")
    baud_rate = request.form.get("baud-rate")
    # dbc_file_name = request.form.get("import-dbc-file") dbc file name
    # oll_file = request.form.get("off-list-file") # Off-limits list file name

    # Define unique project id
    pid = uuid.uuid1()

    global project
    project = Project(pid, proj_name, stored_location,
                      user_initials, event_name, event_date, can_id, vehicle_id)
    
    # Creates project file
    project.create()

    fname = f'{pid}'
    # Place inserted DBC file to local directory for use later
    if request.method == 'POST':
        f = request.files['import-dbc-file']
        f.save(f'./dbc_files/{fname}.dbc')  # uncomment for release
        # f.save('./dbc_files/dbc-file.dbc') # uncomment for testing

        dbc.add_file(f'./dbc_files/{fname}.dbc')

    # Place inserted Off limits file to local directory for use later
    if request.method == 'POST':
        f = request.files['off-list-file']
        f.save(f'./off-limits-list-files/{fname}.csv')  # uncomment for release
        # f.save('./off-limits-list-files/off-limits-list-file.csv') # uncomment for testing

        oll.add_file(f'./off-limits-list-files/{fname}.csv')

    # This is the project schema
    project_schema = {
        "_id": str(pid),
        "Name": str(proj_name),
        "Location": str(stored_location),
        "User Initials": str(user_initials),
        "Event Name": str(event_name),
        "Event Date": str(event_date),
        "CAN ID": str(can_id),
        "Vehicle ID": str(vehicle_id),
        "Baud Rate": str(baud_rate),
    }

    # Ensure uniqueness for each project information in the database
    projects.create_index([('user_id', TEXT)], unique=True)

    # Insert project to database
    projects.insert_one(project_schema)

    # Automatically start traffic upon project creation
    packet_receiver.init_traffic()

    # update collections based on pid
    node_manager.update_node_collection(pid)
    packet_receiver.update_packet_collection(pid)
    exporter.update_collections(pid)

    # return the project that we just uploaded
    return redirect(f'http://localhost:3000/can-bus-visualizer?pid={pid}')

'''
Description: Retrieve all projects from Database collection: projects
@return: str: return list of all projects in string format.
'''
@project_configuration.route("/getall_projects")
def getall_projects():
    things = []
    for thing in projects.find():
        things.append(thing)
    return str(things)


'''
Description: Finds a project within the Database collection: projects
@param: x: int: Data to find project
@return: str: Return project found by x
'''


@project_configuration.route("/get_project")
def get_project(x=5):
    y = projects.find_one({"data": x})
    return str(y)


'''
Description: Deletes all project in collection: projects
@return: str: confirmed response of all projects deleted
'''
@project_configuration.route("/deleteall_project")
def deleteall_project():
    projects.delete_many({})
    return "deleted all!"


'''
Description: Returns PID of a project
@return: String: Project ID
'''
@project_configuration.route('/get_pid', methods=["GET","POST"])
def get_pid():
    #in development mode, this solves the defect of showing duplicate packets, however in production mode, this is not needed
    global mount
    global packets
    global project

    mount += 1
    if mount % 2 != 0:
        return {'packets': []}
        
    pid = project.id
    packets_collection, _ = exporter.update_collections(pid)
    curs = packets_collection.find()

    print(project.id)

    packets.clear()
    for c in curs:
        packet = Packet(c['timestamp'], c['type'], int(c['id'],16), c['data'])
        packet.decoded = dbc.decode(packet.id)
        packets.add_session(packet)

    print(packets)

    return packets.session_to_json()

'''
Description: Open Project that has been created before.
@return: None
'''
@project_configuration.route('/open_project', methods=["GET","POST"])
def open_project():
    global project
    if request.method == 'POST':
        f = request.files['import-project']
        data = ruamel.yaml.load(f, Loader=ruamel.yaml.Loader)

        pid = data['id']
        
        #TODO Load up DBC File and Off Limits List
        dbc.add_file(f'./dbc_files/{pid}.dbc')

        oll.add_file(f'./off-limits-list-files/{pid}.csv')

        #TODO Populate Table and Nodes
        project = Project(data['id'], data['name'], data['directory'], data['user_initials'], data['event_name'], data['event_date'], data['can_id'], data['vehicle_id'])
    
        # Automatically start traffic upon project creation
        packet_receiver.init_traffic()

        # update collections based on pid
        node_manager.update_node_collection(pid)
        packet_receiver.update_packet_collection(pid)
        exporter.update_collections(pid)

    return redirect(f'http://localhost:3000/can-bus-visualizer?pid={pid}')
