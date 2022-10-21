# from urllib import request
from flask import Flask,jsonify, render_template,request
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_cors import CORS


app = Flask(__name__)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db=client['test']
flask_test = db.flask_test # <-- This is the collection within the  'test' db

@app.route("/")
def home_page():
    #online_users = mongo.db.users.find({"online": True})
    return "Hello word"

'''
THIS IS THE POST METHOD - IT USES 'insert_one' rather than 'post'
'''
@app.route("/add", methods=["POST", "GET"])
def add():

    if request.method == "POST":
        proj_name = request.form.get("p-name")
        stored_location = request.form.get("s_location-file")
        user_initials = request.form.get("u-initials")
        event_name = request.form.get("e-event")

        """
        Fix event_date asap
        """
        event_date=request.form.get("e-date")

        can_id=request.form.get("c-id")
        vehicle_id=request.form.get("v-id")
        baud_rate=request.form.get("b-rate")
        dbc_file=request.form.get("dbc-file")
        oll_file=request.form.get("off-file") #off limits list file
        
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
        post_id = flask_test.insert_one(project).inserted_id
        return "Added project" + str()#""#return the packet that we just uploaded
    return render_template("./index.html")

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