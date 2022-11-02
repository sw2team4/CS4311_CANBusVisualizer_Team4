import itertools

class Packet(object):
    # newid = itertools.count().next
    def __init__(self,  timestamp: str, type: int, id: int, data: str, index=0, decoded=None):
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

    #Converts Packet information to acceptable response format in JSON
    def to_json(self):
        p = {
            "index" : self.index,
            "packet_timestamp" : self.timestamp,
            "packet_type" : self.type,
            "packet_id" : self.id,
            "packet_data" : self.data,
            "decoded_id": 'undefined',
            "decoded_name": 'undefined',
            "decoded_comment" : 'undefined'
        }
        if self.decoded is not None:
            p["decoded_id"] = self.decoded.frame_id
            p["decoded_name"] = self.decoded.name
            p["decoded_comment"] = self.decoded.comment
        return p

    def __str__(self):
        return f'\nTimestamp: {hex(self.timestamp)} Type: {self.type} ID: {hex(self.id)} Data: {hex(self.data)} \nDecoded: {self.decoded} \nPrevious Versions: {self.prev}'
