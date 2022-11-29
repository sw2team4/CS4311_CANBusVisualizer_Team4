
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask import Blueprint, request
#TODO: Possibly Refactor Node Manager or Rename Node Manager for Database Functionality only 
#TODO: Node Manager should work ONLY with Node Container
#Must put this blueprint in api.py so that these routes can be called
node_manager = Blueprint('node_manager', __name__)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db=client['test']
nodes = db.nodes # <-- This is the collection within the  'test' db

def update_node_collection(pid):
    global nodes
    nodes = db[f'nodes.{pid}']


def add_node(packet):
    # This is the node schema
    node = {
        "Node Name" : packet.decoded.name,
        "Node ID" : packet.id,
        "Node Icon" : "test" ,#jpg image or something...
        "Node Comment" : packet.decoded.comment,
        "Node Annotation" : "annotation",
        "Node Relationship" : "relationship",
    }

    # Insert project into database at "flasktest collection" within "test" db > Look at above lines 10,11,12
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
def delete_all_nodes():
    nodes.delete_many({})
    return "deleted all!"

@node_manager.route('/edit_node',methods=['POST'])
def edit_node():

    node_name = request.form.get("nodeName")
    pass