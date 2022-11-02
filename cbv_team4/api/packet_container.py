from packet import Packet

class Packet_Container(object):
    def __init__(self):
        self.session = {}
        self.saved = {}

    def __str__(self):
        return f'Session Packets: {self.session}\nSaved Packets: {self.saved}'

    def add_saved(self, packet: Packet):
        assert(packet is not None, 'Packet field must not be empty')
        self.saved[packet.id] = packet

    def add_session(self, packet: Packet):
        assert(packet is not None, 'Packet field must not be empty')
        self.session[packet.id] = packet

    def get_saved(self, id=None):
        if id is None:
            return self.saved
        return self.saved[id]

    def get_session(self, id=None):
        if id is None:
            return self.session
        return self.session[id]
