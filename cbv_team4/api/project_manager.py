from project import Project
#TODO: PROJECT MANAGER WILL BE ROUTES
from flask import Blueprint


#Must put this blueprint in api.py so that these routes can be called
project_manager = Blueprint('project_manager', __name__)

'''
Description: Copy project files to new directory.
@return: str: Confirmation of project duplication.
'''
project_manager.route('/duplicate_project')
def duplicate_project():
    # TODO: call duplicate project method from Project()
    return 'Project Duplicated'

'''
Description: Update current project fields.
@return: str: Confirmation of project fields updating.
'''
project_manager.route('/update_project')
def update_project():
    # TODO: call update project method from Project()
    return 'Project Updated'    

'''
Description: Move project files to archive directory.
@return: str: Conformation of moving project directory.
'''
project_manager.route('/archive_project')
def archive_project():
    # TODO: call archive project method from Project()
    return 'Project Archived'

'''
Description: Saves current state of project to project file.
@return: str: Confirmation of saving project state.
'''
project_manager.route('/save_project')
def save_project():
    # TODO: call save project method from Project()
    return 'Project Saved'

project_manager.route('/open_project')
def open_project():
    return 'Project Opened'







 

    




        



