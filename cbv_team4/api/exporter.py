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

def save_ (dataFrame, path):
    return

@exporter.route('/export', methods=["POST", "GET"])
def export():
    #Not connected with frontend
    #project_name = request.form.get("get-project-name")
    #directory_path = request.form.get("get-directory-path")

    project_df = pd.DataFrame(list(projects.find()))
    nodes_df = pd.DataFrame(list(nodes.find()))
    packets_df = pd.DataFrame(list(packets.find()))

    #project_df.to_xml(namespaces={"doc": "http://127.0.0.1:5000/export"}, prefix="doc")
    #Snodes_df.to_json()
    packets_df.to_csv("packets.csv")



    return "IDK if it exports"

