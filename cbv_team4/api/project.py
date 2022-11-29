import os
import json
import ruamel.yaml

class Project(object):

    '''
    Description: Default Constructor for Project
    '''
    def __init__(self, id, name, stored_location,user_initials,event_name,event_date,can_id,vehicle_id):
        self.id = id
        self.name = name
        self.stored_location = stored_location
        self.user_initials = user_initials
        self.event_name = event_name
        self.event_date = event_date
        self.can_id = can_id
        self.vehicle_id = vehicle_id

    '''
    '''
    def to_json(self):
        p = {
            'id': str(self.id),
            'name': self.name,
            'directory': self.stored_location,
            'user_initials': self.user_initials,
            'event_name': self.event_name,
            'event_date': self.event_date,
            'can_id': self.can_id,
            'vehicle_id': self.vehicle_id
        }
        return p

    '''
    Description: Export class data to project file extension 'cbp'.
    @param: str: path: Directory the file will be stored.
    '''
    def create(self, path = ''):
        if len(path) == 0:
            #where you can want to save project file
            path = os.path.join(os.path.join(os.path.expanduser('~')), 'Desktop') 
        
        data = self.to_json()
        #TODO: CREATE DEFAULT PROJECT DIRECTORY

        file = f'{path}/{self.name}.cbp'
        with open(file, 'w') as f:
            f.write(ruamel.yaml.dump(data, Dumper=ruamel.yaml.RoundTripDumper ,indent=4))

        print(f'Project file exported to: {file}.')

    #TODO: Functinalities for event name, date, can_id, vehicle id...and maybe show IP address in corner?
    #Basically, where can we show this on the front end? What do we do with each field?
    #Refer back to  srs
    '''
    Description: Update project name
    TODO: Ask Frontend team to create a new update project page with fields to update the project
    '''
    def update_project_name(self,new_project_name):
        self.current_project.name = new_project_name
        #update also in mongodb? Maybe call a function from the project_configuration.py file

    def update_project_user_initals(self,new_user_initials):
        self.current_project.user_initials = new_user_initials

    def update_project_event_name(self, new_event_name):
        self.current_project.event_name = new_event_name

    def update_project_event_date(self,new_event_date):
        self.current_project.event_date = new_event_date

    #Can these be modified again?
    def update_project_can_id(new_can_id):
        pass
    def update_project_vehicle_id(new_vehicle_id):
        pass