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

