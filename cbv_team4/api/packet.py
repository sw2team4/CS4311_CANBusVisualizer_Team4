import itertools

class Packet(object):
    # newid = itertools.count().next
    def __init__(self,  timestamp, type, id, data, index=0, decoded=-1):
        self.timestamp = timestamp
        self.type = type
        self.id = id
        self.data = data
        self.index = index
        self.decoded = decoded
        # self.version = 0
        # self.prev = []
    
    # def __init__(self, index, timestamp, type, id, data, version, decoded=-1):
    #     self.index = index
    #     self.timestamp = timestamp
    #     self.type = type
    #     self.id = id
    #     self.data = data
    #     self.decoded = decoded
    #     self.version = version
    #     self.prev = []
    
    def to_json(self):
        p = {
            "index" : self.index,
            "packet_timestamp" : self.timestamp,
            "packet_type" : self.type,
            "packet_id" : self.id,
            "packet_data" : self.data,
            "decoded": self.decoded,
        }
        return p

    def __str__(self):
        return f'\nTimestamp: {hex(self.timestamp)} Type: {self.type} ID: {hex(self.id)} Data: {hex(self.data)} \nDecoded: {self.decoded} \nPrevious Versions: {self.prev}'
