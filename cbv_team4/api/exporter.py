from flask import Blueprint, request
from pymongo import MongoClient, TEXT
from flask_cors import CORS
import pandas as pd
import json
#import numpy as np

exporter = Blueprint('exporter', __name__)
CORS(exporter)

client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']

#Collections gatered from 'test' databases
projects = db.projects
nodes = db.nodes
packets = db.packets

#-----------------CSV------------------------------------

@exporter.route('/export/packetCSV', methods=["POST", "GET"])
def packetCSV():
    packets_df = pd.DataFrame(list(packets.find()))

    packets_df.to_csv("packets.csv")

    return "Packets to csv"

@exporter.route('/export/nodesCSV', methods=["POST", "GET"])
def nodeCSV():
    nodes_df = pd.DataFrame(list(nodes.find()))

    nodes_df.to_csv("/home/kali/Desktop/nodes.csv")

    return "Nodes to csv"

@exporter.route('/export/projectCSV', methods=["POST", "GET"])
def projectCSV():
    project_df = pd.DataFrame(list(projects.find()))

    project_df.to_csv("project.csv")

    return "project to csv"

#---------------JSON-------------------------------

@exporter.route('/export/packetJSON', methods=["POST", "GET"])
def packetJSON():
    packets_df = pd.DataFrame(list(packets.find({},{"_id": 1, 
                                    "timestamp": 1, 
                                    "type": 1, 
                                    "id": 1, 
                                    "data": 1, 
                                    "decoded_id": 1, 
                                    "decoded_name": 1,
                                    "decoded_comment": 1,
                                    "ignore": 1})))

    packets_df.to_json("packet.json", default_handler=str)
    return "Packets to JSON"

@exporter.route('/export/nodesJSON', methods=["POST", "GET"])
def nodeJSON():
    nodes_df = pd.DataFrame(list(nodes.find({},{"_id": 1, 
                                    "Node Name": 1, 
                                    "Node ID": 1, 
                                    "Node Icon": 1, 
                                    "Node Comment": 1, 
                                    "Node Annotation": 1, 
                                    })))
    nodes_df.to_json("nodes.json", default_handler=str)
    return "Nodes to JSON"

@exporter.route('/export/projectJSON', methods=["POST", "GET"])
def projectJSON():
    projects_df = pd.DataFrame(list(projects.find({}, {"_id": 1, 
                                    "Name": 1, 
                                    "Location": 1,
                                    "User Initials": 1,
                                    "Event Name": 1,
                                    "Event Date": 1,
                                    "Can ID": 1,
                                    "Vehicle ID": 1,
                                    "Baud Rate": 1})))
    projects_df.to_json("/home/kali/Desktop/projects.json", default_handler=str)
    return "project to JSON"

#-----------------XML-----------------------------

@exporter.route('/export/packetXML', methods=["POST", "GET"])
def packetXML():
    _id, timestamp, _type, id, data, decoded_id, decoded_name, decoded_comment, ignore = [],[],[],[],[],[],[],[],[]

    packet_data = list(packets.find({},{"_id": 1, 
                                    "timestamp": 1, 
                                    "type": 1, 
                                    "id": 1, 
                                    "data": 1, 
                                    "decoded_id": 1, 
                                    "decoded_name": 1,
                                    "decoded_comment": 1,
                                    "ignore": 1}))

    for item in packet_data:
        _id.append(item["_id"])
        timestamp.append(item["timestamp"])
        _type.append(item["type"])
        id.append(item["type"])
        data.append(item["data"])
        decoded_id.append(item["decoded_id"])
        decoded_name.append(item["decoded_name"])
        decoded_comment.append(item["decoded_comment"])
        ignore.append(item["ignore"])

        packet_df = pd.DataFrame({"_id": _id,
                                "timestamp": timestamp,
                                "type": _type,
                                "id": id,
                                "data": data,
                                "decoded_id": decoded_id,
                                "decoded_name": decoded_name,
                                "decoded_comment": decoded_comment,
                                "ignore": ignore
                                })
                        
        packet_df.to_xml("Packets.xml")

    return "Packets to XML"

@exporter.route('/export/nodesXML', methods=["POST", "GET"])
def nodeXML():

    _id, Node_id, Node_name, Node_icon, Node_comment, Node_annotation = [],[],[],[],[],[]

    node_data = list(nodes.find({},{"_id": 1, 
                                    "Node Name": 1, 
                                    "Node ID": 1, 
                                    "Node Icon": 1, 
                                    "Node Comment": 1, 
                                    "Node Annotation": 1, 
                                    }))

    for item in node_data:
        _id.append(item["_id"])
        Node_id.append(item["Node ID"])
        Node_name.append(item[ "Node Name"])
        Node_icon.append(item["Node Icon"])
        Node_comment.append(item["Node Comment"])
        Node_annotation.append(item["Node Annotation"])

    node_df = pd.DataFrame({"_id": _id,
                            "Node_Name": Node_name,
                            "Node_ID": Node_id,
                            "Node_Icon": Node_icon,
                            "Node_Comment": Node_comment,
                            "Node_Annotation": Node_annotation})

    node_df.to_xml("nodes.xml")

    return "Nodes to XML"

@exporter.route('/export/projectXML', methods=["POST", "GET"])
def projectXML():

    _id, Name, Location, User_Initials, Event_Name, Event_Date, Can_ID, Vehicle_ID, Baud_rate = [],[],[],[],[],[],[],[],[]

    project_data = list(projects.find({}, {"_id": 1, 
                                    "Name": 1, 
                                    "Location": 1,
                                    "User Initials": 1,
                                    "Event Name": 1,
                                    "Event Date": 1,
                                    "CAN ID": 1,
                                    "Vehicle ID": 1,
                                    "Baud Rate": 1}))

    for item in project_data:
        _id.append(item["_id"])
        Name.append(item["Name"])
        Location.append(item["Location"])
        User_Initials.append(item["User Initials"])
        Event_Date.append(item["Event Date"])
        Event_Name.append(item["Event Name"])
        Can_ID.append(item["CAN ID"])
        Vehicle_ID.append(item["Vehicle ID"])
        Baud_rate.append(item["Baud Rate"])

    project_df = pd.DataFrame({"_id": _id, 
                        "Name": Name,
                        "Location": Location,
                        "User_Initials": User_Initials,
                        "Event_Name": Event_Name,
                        "Event_Date": Event_Date,
                        "CAN_ID": Can_ID,
                        "Vehicle_ID": Vehicle_ID,
                        "Baud_Rate": Baud_rate})
                        
    project_df.to_xml("project.xml")
    

    return "project to XML"

#------------PNG-----------------------------------

#------------JPG-----------------------------------

