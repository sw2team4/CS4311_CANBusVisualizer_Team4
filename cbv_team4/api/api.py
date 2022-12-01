from flask import Flask
from flask_session import Session
from flask_cors import CORS

# Other python files which contain other routes that are needed
from packet_receiver import packet_receiver
from project_configuration import project_configuration
from node_manager import node_manager
from syncronizer import syncronizer
from exporter import exporter
from project_manager import project_manager
from off_limits_list_manager import off_limits_list_manager

# Main app and the other files that contain the other routes
app = Flask(__name__)
app.register_blueprint(packet_receiver)
app.register_blueprint(project_configuration)
app.register_blueprint(syncronizer)
app.register_blueprint(exporter)
app.register_blueprint(node_manager)
app.register_blueprint(project_manager)
app.register_blueprint(off_limits_list_manager)
CORS(app)
Session(app)
#TODO: make sure backend is killed with scripts
'''
Description: At localhost:5000/ 
@return: str: default response of backend server.
'''
@app.route("/")
def home_page():
    return "Hey you! The backend server is up and running :)"
