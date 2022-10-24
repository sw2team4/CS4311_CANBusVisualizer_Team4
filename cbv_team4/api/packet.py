class Packet(object):
    def __init__(self, timestamp, type, id, data, decoded=-1):
        self.timestamp = timestamp
        self.type = type
        self.id = id
        self.data = data
        self.decoded = decoded
        self.prev = []
    
    def to_json(self):
        p = {
            "packet_name" : self.timestamp ,
            "packet_type" : self.type ,
            "packet_id" : self.id ,
            "packet_data" : self.data,
        }
        return p

    def __str__(self):
        return f'\nTimestamp: {hex(self.timestamp)} Type: {self.type} ID: {hex(self.id)} Data: {hex(self.data)} \nDecoded: {self.decoded} \nPrevious Versions: {self.prev}'
