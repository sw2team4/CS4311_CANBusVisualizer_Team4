from flask_pymongo import PyMongo
from pymongo import MongoClient,DESCENDING
from flask import  Blueprint
from flask_cors import CORS
from packet import Packet
import can
import time
from project_configuration import can_id
from global_variables import dbc, packets, oll
#TODO: Table needs to be scrollable or followed
#TODO: Popups are not right on Kali
from node_manager import add_node
import threading
from threading import Event

#Must put this blueprint in api.py so that these routes can be called
packet_receiver = Blueprint('packet_receiver', __name__)
CORS(packet_receiver)

#db info
client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
db_packets = db.packets # <-- This is the collection within the  'test' db
can_bus = can.interface.Bus('vcan0', bustype = 'socketcan')

initialized = False
current_packet = None
running = Event()
running.clear() # at the start of the program it is running

def update_packet_collection(pid):
    global db_packets
    db_packets = db[f'packets.{pid}']

'''
Description: Returns the last received packet from CAN Bus
@return: JSON format of last received packet from CAN Bus
'''
@packet_receiver.route('/get_packet')
def get_packet():
    global current_packet

    assert current_packet is not None, 'Packet is not defined.'
    
    # last_packet = db_packets.find_one({'packet_id': current_packet['packet_id'] },sort=[( '_id', DESCENDING )])

    return current_packet


'''
Description: Add packet to database collection: packets
@return: str: Confirmation of packet added to collection
'''
def add_packet(packet):
    packet_schema = packet.to_json()
    db_packets.insert_one(packet_schema)
    return 'added packet!'

'''
Description: Delete all packets from database collection: packets
@return: str: Confirmation of packet added to collection
'''
@packet_receiver.route("/deleteall_packets")
def deleteall_project():
    db_packets.delete_many({})
    return "deleted all!"

# TODO: 
# Function used for actual traffic
# def start_traffic():
#     try:
#         msg = can_bus.recv()
#         pkt = Packet(msg.timestamp, 1, msg.arbitration_id, msg.data)
#         pkt.id = hex(pkt.id)
    
#         return str([pkt.timestamp, pkt.id, pkt.data])
#     except:
#         return 'packet not received'

'''
Description: Simulates live traffic from text file. For testing until live traffic decoding is working.
'''
def simulate_textfile_traffic():
    global running
    global current_packet
    try:
        f = open('packets.txt', 'r')
        while True:
            for line in f.readlines()[1:]:
                if not running.is_set():
                    print('Traffic Paused')
                    running.wait()
                #TODO: Fix to start first packet of the text file
                timestamp, type, id, data = line.split(';')
                # def __init__(self, timestamp, type, id, data, decoded=-1):
                packet = Packet(timestamp, int(type), int(id, 16), data.split('\n')[0])
                packet.decoded = dbc.decode(packet.id)
                packet.ignore = oll.find(packet.id)
                current_packet = packet.to_json()

                # Add packet to database
                add_packet(packet)

                # Add Node to database
                add_node(packet)

                # Add packet to session packets
                packets.add_session(packet)

                time.sleep(1)
    finally:
        f.close()

t = threading.Thread(target=simulate_textfile_traffic)

'''
Description: Starts traffic thread by setting event variable.
@return: str: Confirmation of Traffic Started
'''
@packet_receiver.route('/start_traffic')
def start_traffic():
    running.set()

    return 'Traffic Started'

'''
Description: Pauses traffic thread by clearing event variable.
@return: str: Confirmation of Traffic Paused
'''
@packet_receiver.route('/pause_traffic')
def pause_traffic():
    running.clear()

    return 'Traffic Paused'

'''
Description: Starts background thread to run traffic.
'''
def init_traffic():
    global initialized

    if not initialized:
        t.start()
        initialized = True

@packet_receiver.route('/filter')
def filter():
    id = packets.filter_session(0, 0x4f031fe) # Filter by id
    timestamp = packets.filter_session(1, '183fd3e0d7c') # Filter by timestamp

    print(f'by id: {id[0].to_json()}')
    
    print('by timestamp: ')
    for i in range(len(timestamp)):
        print(timestamp[i].to_json())

    return 'filtered'

@packet_receiver.route('/sort')
def sort():
    id_a = packets.sort_session(0)
    id_d = packets.sort_session(1)
    time_a = packets.sort_session(2)
    time_d = packets.sort_session(3)
    
    return 'sorted'

#TODO: Will need to work with a pop up (Replay Packet) or a on hover event in ()
@packet_receiver.route('/replay')
def replay():
    index = 0 # get index from table

    items = packets.session.items()
    packet = items[index][1]

    # send to can bus
    # can_bus.send(replayed_packet) # convert to can.Message (id, data, timestamp)
    
    return packet.to_json() # return and add to table

@packet_receiver.route('/edit')
def edit():
    index = 0
    # grab data, id from document

    items = packets.session.items()
    packet = items[index][1]

    edited = packet.copy()
    # update edited fields to data and id

    packet.version = 1
    packet.prev.add(edited)

    # make most recently edited packet shown in table at index ?

    # can_bus.send(replayed_packet) # convert to can.Message (id, data, timestamp)
    
    return packet.to_json()