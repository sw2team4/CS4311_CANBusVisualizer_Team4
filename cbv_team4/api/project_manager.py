from project import Project
#TODO: PROJECT MANAGER WILL BE ROUTES
from flask import Blueprint, request, redirect, session
from flask_cors import CORS
import ruamel.yaml
import packet_receiver, node_manager, exporter
from global_variables import dbc, oll, project, packets

#Must put this blueprint in api.py so that these routes can be called
project_manager = Blueprint('project_manager', __name__)
CORS(project_manager)

'''
Description: Copy project files to new directory.
@return: str: Confirmation of project duplication.
'''
@project_manager.route('/duplicate_project')
def duplicate_project():
    # TODO: call duplicate project method from Project()
    return 'Project Duplicated'

'''
Description: Update current project fields.
@return: str: Confirmation of project fields updating.
'''
@project_manager.route('/update_project')
def update_project():
    # TODO: call update project method from Project()
    return 'Project Updated'    

'''
Description: Move project files to archive directory.
@return: str: Conformation of moving project directory.
'''
@project_manager.route('/archive_project')
def archive_project():
    # TODO: call archive project method from Project()
    return 'Project Archived'

'''
Description: Saves current state of project to project file.
@return: str: Confirmation of saving project state.
'''
@project_manager.route('/save_project')
def save_project():
    # TODO: call save project method from Project()
    return 'Project Saved'

'''
Description: Open Project that has been created before.
@return: None
'''
@project_manager.route('/open_project', methods=["GET","POST"])
def open_project():
    global project
    if request.method == 'POST':
        f = request.files['import-project']
        data = ruamel.yaml.load(f, Loader=ruamel.yaml.Loader)

        pid = data['id']
        
        #TODO Load up DBC File and Off Limits List
        dbc.add_file(f'./dbc_files/{pid}.dbc')

        oll.add_file(f'./off-limits-list-files/{pid}.csv')

        #TODO Populate Table and Nodes
        project = Project(data['id'], data['name'], data['directory'], data['user_initials'], data['event_name'], data['event_date'], data['can_id'], data['vehicle_id'])
    
        # Automatically start traffic upon project creation
        packet_receiver.init_traffic()

        # update collections based on pid
        node_manager.update_node_collection(pid)
        packet_receiver.update_packet_collection(pid)
        exporter.update_collections(pid)

    return redirect(f'http://localhost:3000/can-bus-visualizer?pid={pid}')



