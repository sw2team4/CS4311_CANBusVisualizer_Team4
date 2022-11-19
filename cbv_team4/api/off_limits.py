# TODO: TAKEOUT DATA WHEN CREATING OFF LIMITS LIST
from packet import Packet

class Off_Limits_Node(object):
    def __init__(self, name, comment):
        self.name = name if name is not None else 'NA'
        self.comment = comment if comment is not None else 'NA'

class Off_Limits(object):
    def __init__(self):
        self.db = {}

    '''
    Description: Injects a csv or text file into off-limits class.
    @param: str: filename: Off-limits file to be injested.
    '''
    def add_file(self, filename: str):
        s = filename.split('.')
        assert len(s) > 1 and s[-1].lower() == 'csv' or s[-1].lower() == 'txt', 'Invalid Off-limits file format.'
        print(filename)
        try:
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
    def add(self, id: str, packet: Packet):
        self.db[id] = Off_Limits_Node(packet.decoded.name, packet.decoded.comment)

    '''
    Description: Adds ID to off-limits list.
    @param: int: id: ID of node that should remain untouched.
    @param: int: data: tbd
    '''
    def remove(self, id: str):
        self.db.pop(id)

    '''
    Description: Find off limit node 
    @param: int: id: ID of node that should remain untouched.
    '''
    def find(self, id: str):
        if not self.db[id]:
            return -1
        return self.db[id]
    
    '''
    Description: Export/create off-limits list to CSV.
    '''
    def export():
        pass