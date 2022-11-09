# TODO: When accessing packets in the table (frontend)  see to it to use ID instead of index
# TODO: Add a way to update fields from database in the case analyst makes their own DBC file

class Packet(object):
    '''
    Description: Default constructor for Packet
    @param: timestamp: str: Time corresponding to when the packet was received
    @param: type: int: Type of packet
    @param: id: int: Hex ID of raw packet from CAN Bus
    @param: data: str: CAN Data in Hex from a raw 
    @param: decoded: ?: Decoded fields corresponding to ID when matched with DBC File
    '''
    def __init__(self,  timestamp: str, type: int, id: int, data: str, decoded=None):
        self.timestamp = timestamp
        self.type = type
        self.id = id
        self.data = data
        self.decoded = decoded
        self.version = 0 # Current version of packet
        self.prev = [] # All previous verions of modified packet
    
    #Converts Packet information to acceptable response format in JSON
    '''
    Description: Returns packet schema for database in JSON format
    @return: p: str: JSON format of packet
    '''
    def to_json(self):
        p = {
            "packet_timestamp" : self.timestamp,
            "packet_type" : self.type,
            "packet_id" : hex(self.id),
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
'''
Description: Give packet as string format
@return: str: Return timestamp, type, id, and data of a packet object
'''
def __str__(self):
    return f'\nTimestamp: {hex(self.timestamp)} Type: {self.type} ID: {hex(self.id)} Data: {hex(self.data)} \nDecoded: {self.decoded} \nPrevious Versions: {self.prev}'
