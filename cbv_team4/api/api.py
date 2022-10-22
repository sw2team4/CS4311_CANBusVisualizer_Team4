# from urllib import request
from flask import Flask,jsonify, render_template,request
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db=client['test']
flask_test = db.flask_test # <-- This is the collection within the  'test' db

@app.route("/")
def home_page():
    #online_users = mongo.db.users.find({"online": True})
    return "Hey you! The backend server is up and running :)"

'''
THIS IS THE POST METHOD - IT USES 'insert_one' rather than 'post'
'''
@app.route("/add", methods=["POST"])
def add():

    proj_name = request.form.get("project-name")
    stored_location = request.form.get("stored-location")
    user_initials = request.form.get("user-initials")
    event_name = request.form.get("event-name")
    event_date=request.form.get("e-date")
    can_id=request.form.get("can-id")
    vehicle_id=request.form.get("vehicle-id")
    baud_rate=request.form.get("baud-rate")
    dbc_file=request.form.get("import-dbc-file")
    oll_file=request.form.get("off-list-file") #off limits list file
    
    #This is the project schema
    project = {
        "Project Name" : proj_name ,
        "Project Location" : stored_location ,
        "User Initials" : user_initials ,
        "Event Name" : event_name ,
        "Event Date" : event_date,
        "CAN ID" : can_id,
        "Vehicle ID" : vehicle_id,
        "Baud Rate" : baud_rate,
        "DBC File" : dbc_file,
        "Off Limits List File" : oll_file,
    }

    #insert project into database at "flasktest collection" within "test" db > Look at above lines 10,11,12
    post_id = flask_test.insert_one(project)

    return "Added project to DB! " #return the packet that we just uploaded

@app.route("/getall")
def get_all_packets():
    things = []
    for thing in flask_test.find():
        things.append(thing)
    return str(things)


@app.route("/get")
def get_packet(x=5):
    y = flask_test.find_one({"data": x})
    return str(y)


@app.route("/deleteall")
def delete_all_packets():
    flask_test.delete_many({})
    return "deleted all!"