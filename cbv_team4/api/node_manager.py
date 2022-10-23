
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask import Flask, jsonify, render_template,request, redirect, Blueprint
from flask_cors import CORS

#Must put this blueprint in api.py so that these routes can be called
node_manager = Blueprint('node_manager', __name__)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db=client['test']
nodes = db.nodes # <-- This is the collection within the  'test' db

'''
THIS IS THE POST METHOD - IT USES 'insert_one' rather than 'post'
'''
@node_manager.route("/addnode", methods=["POST"])
def addnode():
  
    #This is the node schema
    node = {
        "Node Name" : "test",
        "Node Icon" : "test" ,
    }

    #insert project into database at "flasktest collection" within "test" db > Look at above lines 10,11,12
    post_id = nodes.insert_one(node)

    return "Added a node to the node db!"

@node_manager.route("/getall_nodes")
def getall_nodes():
    things = []
    for thing in nodes.find():
        things.append(thing)
    return str(things)


@node_manager.route("/get_node")
def get_node(x=5):
    y = nodes.find_one({"data": x})
    return str(y)


@node_manager.route("/deleteall_nodes")
def deleteall_nodes():
    nodes.delete_many({})
    return "deleted all!"