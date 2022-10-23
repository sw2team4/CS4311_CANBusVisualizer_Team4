#cantools goes in here
import cantools
#from dbc_file_container import dbc_file_container

class packet_decoder(object):
    def __init__(self, db: dbc_file_container):
        self.db = db

    def messages():
        return self.db.messages

    def decode(name: str):
        return self.db.get_message_by_name(name)

    def decode(id: int):
        return self.db.get_message_by_frame_id(id)