from flask import Blueprint, request
from pymongo import MongoClient, TEXT
from flask_cors import CORS
import pandas as pd
import numpy as np

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

    nodes_df.to_csv("nodes.csv")

    return "Nodes to csv"

@exporter.route('/export/projectCSV', methods=["POST", "GET"])
def projectCSV():
    project_df = pd.DataFrame(list(projects.find()))

    project_df.to_csv("project.csv")

    return "project to csv"

#---------------JSON-------------------------------

@exporter.route('/export/packetJSON', methods=["POST", "GET"])
def packetJSON():
    return "Packets to JSON"

@exporter.route('/export/nodesJSON', methods=["POST", "GET"])
def nodeJSON():
    return "Nodes to JSON"

@exporter.route('/export/projectJSON', methods=["POST", "GET"])
def projectJSON():
    return "project to JSON"

#-----------------XML-----------------------------

@exporter.route('/export/packetXML', methods=["POST", "GET"])
def packetXML():
    return "Packets to XML"

@exporter.route('/export/nodesXML', methods=["POST", "GET"])
def nodeXML():
    return "Nodes to XML"

@exporter.route('/export/projectXML', methods=["POST", "GET"])
def projectXML():
    return "project to XML"

