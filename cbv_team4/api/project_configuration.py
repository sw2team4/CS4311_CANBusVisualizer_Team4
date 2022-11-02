
from flask_pymongo import PyMongo
from pymongo import MongoClient, ASCENDING, HASHED, TEXT
from flask import Flask, jsonify, render_template,request, redirect, Blueprint
from flask_cors import CORS
import uuid
from global_variables import dbc, pid
import packet_reciever


can_id = 'vcan0' #This is the CAN channel - this is updated on line 27

#Must put this blueprint in api.py so that these routes can be called
project_configuration = Blueprint('project_configuration', __name__)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db=client['test']
projects = db.projects # <-- This is the collection within the  'test' db

'''
THIS IS THE POST METHOD - IT USES 'insert_one' rather than 'post'
'''
#Add Project to Database and redirects page to can bus visualizer
@project_configuration.route("/add_project", methods=["POST"])
def add_project():

    proj_name = request.form.get("project-name")
    stored_location = request.form.get("stored-location")
    user_initials = request.form.get("user-initials")
    event_name = request.form.get("event-name")
    event_date=request.form.get("e-date")
    can_id=request.form.get("can-id")
    vehicle_id=request.form.get("vehicle-id")
    baud_rate=request.form.get("baud-rate")
    #dbc_file=request.form.get("import-dbc-file")
    oll_file=request.form.get("off-list-file") #off limits list file

    pid = uuid.uuid1()
    #Place inserted DBC file to local directory for use later
    if request.method == 'POST':
      f = request.files['import-dbc-file']
      # f.save(f'./dbc_files/{pid}.dbc') # uncomment for release
      f.save('./dbc_files/dbc-file.dbc') # uncomment for testing

    dbc.add_file('./dbc_files/dbc-file.dbc')
    
    #This is the project schema
    project = {
        "_id": str(pid),
        "Name" : proj_name ,
        "Location" : stored_location ,
        "User Initials" : user_initials ,
        "Event Name" : event_name ,
        "Event Date" : event_date,
        "CAN ID" : can_id,
        "Vehicle ID" : vehicle_id,
        "Baud Rate" : baud_rate,
        "Off-Limits List File" : oll_file,
    }
    #ensure's uniqueness for each project information in the database
    projects.create_index([('user_id', TEXT)], unique=True)
    #insert project to database
    projects.insert_one(project)

    # Automatically start traffic upon project creation
    # packet_reciever.run_traffic()
    
    return redirect('http://localhost:3000/can-bus-visualizer')#return the projectthat we just uploaded

@project_configuration.route("/getall_projects")
def getall_projects():
    things = []
    for thing in projects.find():
        things.append(thing)
    return str(things)


@project_configuration.route("/get_project")
def get_project(x=5):
    y = projects.find_one({"data": x})
    return str(y)


@project_configuration.route("/deleteall_project")
def deleteall_project():
    projects.delete_many({})
    return "deleted all!"

