class Off_Limits_Node(object):
    def __init__(self, id, data):
        self.id = id
        self.data = data

class Off_Limits(object):
    def __init__(self):
        self.db = []

    '''
    Description: Injects a csv or text file into off-limits class.
    @param: str: filename: Off-limits file to be injested.
    '''
    def add_file(self, filename: str):
        s = filename.split('.')
        assert len(s) > 1 and s[-1].lower() == 'csv' or s[-1].lower() == 'txt', 'Invalid Off-Limites file format.'
        print(filename)
        try:
            with open(filename, 'r') as f:
                for line in f.readlines()[1:]:
                    id, data = line.split(',')
                    node = Off_Limits_Node(id, data)
                    self.db.append(node)
        except Exception as e:
            print(e)
        print(self.db)
    
    '''
    Description: Adds node to off-limits list.
    @param: int: id: ID of node that should remain untouched.
    @param: int: data: tbd
    '''
    def add_node(self, id, data):
        node = Off_Limits_Node(str(id), str(data))
        self.db.append(node)
    
    '''
    Description: Export/create off-limits list to CSV.
    '''
    def export():
        pass