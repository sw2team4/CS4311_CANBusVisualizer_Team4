# TODO: TAKEOUT DATA WHEN CREATING OFF LIMITS LIST
from packet import Packet

class Off_Limits(object):
    def __init__(self):
        self.db = set()

    '''
    Description: Injects a csv or text file into off-limits class.
    @param: str: filename: Off-limits file to be injested.
    '''
    def add_file(self, filename: str):
        s = filename.split('.')
        assert len(s) > 1 and s[-1].lower() == 'csv' or s[-1].lower() == 'txt', 'Invalid Off-limits file format.'
        print(filename)
        try:
            #TODO: Make sure CSV File is compatible format (checks)
            with open(filename, 'r') as f:
                for id in f.readlines()[1:]:
                    self.add(id)
        except Exception as e:
            print(e)
        print(self.db)
    
    '''
    Description: Adds ID to off-limits list.
    @param: int: id: ID of node that should remain untouched.
    '''
    def add(self, id: str):
        self.db.add(id)

    '''
    Description:
    @param: str: 
    @return: str: 
    '''
    def get(self, id):
        pass

    '''
    Description:
    @param: str: 
    @return: str: 
    '''
    def get_all(self):
        pass

    '''
    Description: Adds ID to off-limits list.
    @param: int: id: ID of node that should remain untouched.
    @param: int: data: tbd
    '''
    def remove(self, id: str):
        self.db.pop(id)

    '''
    Description: Find off limit node 
    @param: bool: id: ID of node that should remain untouched.
    '''
    def find(self, id: str):
        return id in self.db
    
    '''
    Description: Export/create off-limits list to CSV.
    '''
    def export():
        pass