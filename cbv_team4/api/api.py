# from urllib import request
from flask import Flask,jsonify, render_template,request, redirect
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_cors import CORS


#Other files with other routes that are needed
from packet_reciever import packet_reciever
from project_configuration import project_configuration
from dbc_file_container import dbc_file_container
from node_manager import node_manager

#Main app and the other files that contain the other routes
app = Flask(__name__)
app.register_blueprint(packet_reciever)
app.register_blueprint(project_configuration)
# app.register_blueprint(node_manager)
# app.register_blueprint(dbc_file_container)
CORS(app)


@app.route("/")
def home_page():
    #online_users = mongo.db.users.find({"online": True})
    return "Hey you! The backend server is up and running :)"
