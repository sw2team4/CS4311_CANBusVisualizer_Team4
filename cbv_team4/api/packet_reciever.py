from concurrent.futures import thread
from crypt import methods
import json
from sqlite3 import Timestamp
from tracemalloc import start
from flask_pymongo import PyMongo
from pymongo import MongoClient,DESCENDING
from flask import Flask,jsonify, render_template, request, redirect, Blueprint
from flask_cors import CORS
from packet import Packet
from project_configuration import can_id
from pprint import pprint 
from threading import Event
import can
import time
import logging
import sys
from global_variables import dbc, packets

import threading


TOGGLE = False
TOGGLE_SIM = False


#Must put this blueprint in api.py so that these routes can be called
packet_reciever = Blueprint('packet_reciever', __name__)

CORS(packet_reciever)

#db info
client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
db_packets = db.packets # <-- This is the collection within the  'test' db
can_bus = can.interface.Bus('vcan0', bustype = 'socketcan')


current_packet = None
pause_traffic = True
first_start = True
running = Event()
running.set() #at the start of the program it is running
t = threading.Thread()

def init_traffic():
    t = threading.Thread(thread=run_traffic())
    t.start()
    t.join()
    

def run_traffic():
    global first_start, current_packet
    # if not first_start:
    #     return
    # first_start = False
    try:
        while True:
            f = open('packets.txt','r')
            for line in f.readlines()[1:]:
                # if not running.is_set():
                #     running.wait()
                timestamp, type, id, data = line.split(';')
                # def __init__(self, timestamp, type, id, data, decoded=-1):
                packet = Packet(timestamp, type, id, data.split('\n')[0])
                current_packet = packet.to_json()
                add_packet(packet)
                time.sleep(1)
    finally:
        f.close()

'''
simulate_traffic is using the text file without sending packets to simulator- THIS IS FOR DEMO USE ONLY
'''
@packet_reciever.route('/simulate_texfile_traffic', methods=['POST', 'GET'])
def simulate_textfile_traffic():
    #temporary logic issue, traffic still  keeps on going even if paused from front end...expected behavior?
    #uncomment this line below to stop traffic flowing and pushing to db
    # return None
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
                print(packets)
                time.sleep(1)
    finally:
        f.close()
            

@packet_reciever.route('/get_packet')
def get_packet():
    global current_packet

    assert(current_packet is not None, 'Packet is not defined.')
    
    # last_packet = db_packets.find_one({'packet_id': current_packet['packet_id'] },sort=[( '_id', DESCENDING )])
    
    if current_packet is None:
        return { "timestamp" : 0, "type" : 0, 'id': 0, 'data': 0 }
    return { "timestamp" : current_packet['packet_timestamp'], "type" : current_packet['packet_type'], 'id': current_packet['packet_id'], 'data': current_packet['packet_data'] }


@packet_reciever.route('/add_packet')
def add_packet(packet):
    packet_schema= packet.to_json()
    db_packets.insert_one(packet_schema)
    return 'added packet!'

@packet_reciever.route("/deleteall_packets")
def deleteall_project():
    db_packets.delete_many({})
    return "deleted all!"


@packet_reciever.route('/invoke_traffic')
def invoke_traffic():
    simulate_textfile_traffic()
    return 'traffic invoked'
    

'''
start_traffic is using simulator and recieve packets
'''
@packet_reciever.route('/start_traffic', methods=["POST"])
# Function used to testing purposes
def start_traffic():
    # pause_traffic = True
    # running.set()
    t.start()
    
    return 'Traffic Started'

@packet_reciever.route('/pause_traffic', methods=["POST"])
# Function used to testing purposes
def pause_traffic():
    # pause_traffic = False
    # print('Traffic Paused')
    # if running.is_set():
    #     running.clear()
    t.pau
    return 'Traffic Paused'




# Function used for actual traffic
# def start_traffic():
#     try:
#         msg = can_bus.recv()
#         pkt = Packet(msg.timestamp, 1, msg.arbitration_id, msg.data)
#         pkt.id = hex(pkt.id)
    
#         return str([pkt.timestamp, pkt.id, pkt.data])
#     except:
#         return 'packet not received'


# '''
# simulate_traffic with simulator to generate packets using the text file - THIS IS FOR DEMO USE ONLY
# '''
# @packet_reciever.route('/simulate_traffic')
# def simulate_traffic():
#     # can_bus = can.interface.Bus(can_id, bustype = 'socketcan')
#     with open('packets.txt') as f:
#         for line in f.readlines()[1:]:
#             s = line.split(';')
#             msg = can.Message(arbitration_id=int(s[2], 16), data=[0xD9, 0x32,0xF,0x46,0xB2,0x3A,0x47,0x2C], is_extended_id=True)
#             try:
#                 can_bus.send(msg) #sends a message to the bus....however this is a problem
#                 #AARON: I think I found out why it not receiving the packets, its in a looop at the moment, therefore, it is reading every single line
#                 # It does send the the bus and you can see it via candump however, it will take a while untill it recieves something
#                 # I added a useful command in ./traffic.sh that tracks a log to traffic. We need to find a way to simulate can packets sent similar to how cangen works.
#                 return start_traffic()
#             except:
#                 return 'packet not recieved'

    # with open('packets.txt') as f:
    #     return f.readlines()[1:][0]