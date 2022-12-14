from packet import Packet

class Packet_Container(object):
    '''
    Description: Default contructor for Packet Container
    '''
    def __init__(self):
        self.session = {}
        self.saved = {}

    def clear(self):
        self.session = {}
        self.saved = {}

    '''
    Description: View Session Packets and Saved Packets when printing Packet_Container class when referred to as string
    @return: str: String that prints all session packets and save packets of current project.
    '''
    def __str__(self):
        return f'Session Packets: {self.session}\nSaved Packets: {self.saved}'

    '''
    Description: Adds a packet to the saved container
    @param: packet: Packet: Packet to be added
    '''
    def add_saved(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.saved[packet.id] = packet

    '''
    Description: Adds a packet to the session container
    @param: packet: Packet: Packet to be added
    '''
    def add_session(self, packet: Packet):
        assert packet is not None, 'Packet field must not be empty'
        self.session[packet.id] = packet

    '''
    Description: Returns a packet or all packets from saved container
    @param: id: int: id of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within saved container
    '''
    def get_saved(self, id=None):
        if id is None:
            return self.saved
        return self.saved[id]

    '''
    Desctiption: Returns a packet or all packets from session container
    @param: id: int of desired packet
    @return: packet or set: packet with desired id if defined, otherwise all packets within session container
    '''
    def get_session(self, id=None):
        if id is None:
            return self.session
        return self.session[id]
    
    '''
    Description: Sort session packets by ascending id, descending id, Oldest packet, or Most Recent packets
    @param: sort_type: int: option to sort session packets by type
    '''
    def sort_session(self, sort_type: int):
        cpy = []
        if sort_type == 0: # Sort By ID - Ascending
            cpy = sorted(self.session.items(), reverse=False)
        elif sort_type == 1: # Sort By ID - Descending
            cpy = sorted(self.session.items(), reverse=True)
        elif sort_type == 2: # Sort By Oldest
            cpy = sorted(self.session.items(), key=lambda item: item[1].timestamp, reverse=False)
        elif sort_type == 3: # Sort By Most Recent
            cpy = sorted(self.session.items(), key=lambda item: item[1].timestamp, reverse=True)
        return cpy
        


    #TODO Implement with bubbe sort for now.
    def sort_saved(self, sort_by: int):
        pass


    '''
    Description:
    @param:
    @param:
    '''
    def filter_saved(self, filter_type: int, filter_field):
        assert filter_type is not None and filter_field is not None, 'ID field must not be empty'

        f = []
        for key in self.saved:
            if filter_type == 0: # Node
                if self.saved[key].id == filter_field:
                    f.append(self.saved[key])
            elif filter_type == 1: # Timestamp
                if self.saved[key].timestamp == filter_field:
                    f.append(self.saved[key])
        return f

    '''
    Description:
    @param:
    @param: 
    '''
    def filter_session(self, filter_type: int, filter_field):
        assert filter_type is not None and filter_field is not None, 'ID field must not be empty'

        f = []
        for key in self.session:
            if filter_type == 0: # Node
                if self.session[key].id == filter_field:
                    f.append(self.session[key])
            elif filter_type == 1: # Timestamp
                if self.session[key].timestamp == filter_field:
                    f.append(self.session[key])
        return f

    def saved_to_json(self):
        pass

    def session_to_json(self):
        json = []
        for key in self.session:
            json.append(self.session[key].to_json())

        #[{}, {}, {}, {}]

        return {'packets': json}
