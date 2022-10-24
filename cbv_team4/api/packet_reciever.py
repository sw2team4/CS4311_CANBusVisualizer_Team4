from concurrent.futures import thread
from crypt import methods
import json
from tracemalloc import start
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask import Flask,jsonify, render_template,request, redirect, Blueprint
from flask_cors import CORS
from packet import Packet
from project_configuration import can_id
from pprint import pprint 
from threading import Event
import can
import time
import logging
import sys

running = Event()
running.set() #at the start of the program it is running

TOGGLE = True



#Must put this blueprint in api.py so that these routes can be called
packet_reciever = Blueprint('packet_reciever', __name__)

#db info
client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
packets = db.packets # <-- This is the collection within the  'test' db
can_bus = can.interface.Bus('vcan0', bustype = 'socketcan')



'''
simulate_traffic is using the text file without sending packets to simulator- THIS IS FOR DEMO USE ONLY
'''
@packet_reciever.route('/simulate_texfile_traffic')
def simulate_textfile_traffic():
    try:
        f = open('packets.txt','r')
        for line in f.readlines()[1:20]:
            line_array = line.split(';')
            if not running.is_set():
                running.wait()
            packet = Packet(line_array[0],line_array[1],line_array[2],line_array[3])
            print(line)
            add_packet(packet)
            time.sleep(1)
        return 'look at your terminal in vs code where flask is running'
    finally:
        f.close()


@packet_reciever.route('/add_packet', methods=['POST'])
def add_packet(packet):
    packet_schema= packet.to_json()
    packets.insert_one(packet_schema)
    return 'added packet!'

@packet_reciever.route("/deleteall_packets")
def deleteall_project():
    packets.delete_many({})
    return "deleted all!"

@packet_reciever.route('/pause_traffic')
def pause_traffic():
    
    if running.is_set():
        running.clear()

    return False

@packet_reciever.route('/resume_traffic')
def resume_traffic():
    running.set()
    return True

@packet_reciever.route('/toggle_traffic')
def toggle_traffic():
    global TOGGLE
    if(TOGGLE):
        TOGGLE = pause_traffic()
        return {'traffic_toggle': 'traffic paused'}
    else:
        TOGGLE = resume_traffic()
        return {'traffic_toggle' : 'traffic resumed'}
    

'''
start_traffic is using simulator and recieve packets
'''
@packet_reciever.route('/start_traffic', methods=["POST"])
def start_traffic():
    try:
        msg = can_bus.recv()
        pkt = Packet(msg.timestamp, 1, msg.arbitration_id, msg.data)
        pkt.id = hex(pkt.id)
    
        return str([pkt.timestamp, pkt.id, pkt.data])
    except:
        return 'packet not received'


'''
simulate_traffic with simulator to generate packets using the text file - THIS IS FOR DEMO USE ONLY
'''
@packet_reciever.route('/simulate_traffic')
def simulate_traffic():
    # can_bus = can.interface.Bus(can_id, bustype = 'socketcan')
    with open('packets.txt') as f:
        for line in f.readlines()[1:]:
            s = line.split(';')
            msg = can.Message(arbitration_id=int(s[2], 16), data=[0xD9, 0x32,0xF,0x46,0xB2,0x3A,0x47,0x2C], is_extended_id=True)
            try:
                can_bus.send(msg) #sends a message to the bus....however this is a problem
                #AARON: I think I found out why it not receiving the packets, its in a looop at the moment, therefore, it is reading every single line
                # It does send the the bus and you can see it via candump however, it will take a while untill it recieves something
                # I added a useful command in ./traffic.sh that tracks a log to traffic. We need to find a way to simulate can packets sent similar to how cangen works.
                return start_traffic()
            except:
                return 'packet not recieved'

    # with open('packets.txt') as f:
    #     return f.readlines()[1:][0]