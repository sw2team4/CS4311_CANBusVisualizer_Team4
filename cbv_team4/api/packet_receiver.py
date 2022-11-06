from sqlite3 import Timestamp
from tracemalloc import start
from flask_pymongo import PyMongo
from pymongo import MongoClient,DESCENDING
from flask import  Blueprint
from flask_cors import CORS
from packet import Packet
from project_configuration import can_id
from threading import Event
import can
import time
from global_variables import dbc, packets, pid

# TODO: Import threading
import threading

#Must put this blueprint in api.py so that these routes can be called
packet_receiver = Blueprint('packet_receiver', __name__)
CORS(packet_receiver)

#db info
client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
db_packets = db.packets # <-- This is the collection within the  'test' db
can_bus = can.interface.Bus('vcan0', bustype = 'socketcan')


current_packet = None
pause_traffic = True
first_start = True
running = Event()
running.set() # at the start of the program it is running

# TODO
# t = threading.Thread()

# def init_traffic():
#     t = threading.Thread(thread=run_traffic())
#     t.start()
#     t.join()

'''
simulate_traffic is using the text file without sending packets to simulator- THIS IS FOR DEMO USE ONLY
'''
@packet_receiver.route('/simulate_texfile_traffic', methods=['POST', 'GET'])
def simulate_textfile_traffic():
    #temporary logic issue, traffic still  keeps on going even if paused from front end...expected behavior?
    #uncomment this line below to stop traffic flowing and pushing to db
    #return None
    #TODO: Use pid from project manager class
    # print(pid)
    global current_packet
    try:
        while True:
            f = open('packets.txt','r')
            for line in f.readlines()[1:]:
                timestamp, type, id, data = line.split(';')
                if not running.is_set():
                    running.wait()
                # def __init__(self, timestamp, type, id, data, decoded=-1):
                packet = Packet(timestamp, int(type), int(id, 16), data.split('\n')[0])
                decoded = dbc.decode(packet.id)
                packet.decoded = decoded
                current_packet = packet.to_json()
                add_packet(packet)
                packets.add_session(packet)
                time.sleep(1)
    finally:
        f.close()
            

'''
Description: Returns the last received packet from CAN Bus
@return: JSON format of last received packet from CAN Bus
'''
@packet_receiver.route('/get_packet')
def get_packet():
    global current_packet

    assert(current_packet is not None, 'Packet is not defined.')
    
    # last_packet = db_packets.find_one({'packet_id': current_packet['packet_id'] },sort=[( '_id', DESCENDING )])
    
    if current_packet is None:
        return { "timestamp" : 0, "type" : 0, 'id': 0, 'data': 0 }
    return { "timestamp" : current_packet['packet_timestamp'], "type" : current_packet['packet_type'], 'id': current_packet['packet_id'], 'data': current_packet['packet_data'] }


'''
Description: Add packet to database collection: packets
@return: str: Confirmation of packet added to collection
'''
@packet_receiver.route('/add_packet')
def add_packet(packet):
    packet_schema= packet.to_json()
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

'''
Description: Starts traffic simulation from text file
@return: str: Confirmation of traffic invoked
'''
@packet_receiver.route('/invoke_traffic')
def invoke_traffic():
    simulate_textfile_traffic()
    return 'traffic invoked'
    

# TODO
# '''
# start_traffic is using simulator and receive packets
# '''
# @packet_receiver.route('/start_traffic', methods=["POST"])
# # Function used to testing purposes
# def start_traffic():
#     # pause_traffic = True
#     # running.set()
#     t.start()
    
#     return 'Traffic Started'

# TODO
# @packet_receiver.route('/pause_traffic', methods=["POST"])
# # Function used to testing purposes
# def pause_traffic():
#     # pause_traffic = False
#     # print('Traffic Paused')
#     # if running.is_set():
#     #     running.clear()
#     t.pau
#     return 'Traffic Paused'
#TODO: 
# Function used for actual traffic
# def start_traffic():
#     try:
#         msg = can_bus.recv()
#         pkt = Packet(msg.timestamp, 1, msg.arbitration_id, msg.data)
#         pkt.id = hex(pkt.id)
    
#         return str([pkt.timestamp, pkt.id, pkt.data])
#     except:
#         return 'packet not received'
