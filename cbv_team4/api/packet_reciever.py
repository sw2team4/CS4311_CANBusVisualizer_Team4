from tracemalloc import start
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask import Flask,jsonify, render_template,request, redirect, Blueprint
from flask_cors import CORS
import can
from pprint import pprint 
import time
from packet import packet
from project_configuration import can_id

#Must put this blueprint in api.py so that these routes can be called
packet_reciever = Blueprint('packet_reciever', __name__)

#db info
client = MongoClient('mongodb+srv://sw2_fall22:password*123@cluster0.mp0jclc.mongodb.net/test', 5000)
db = client['test']
packets = db.packets # <-- This is the collection within the  'test' db
can_bus = can.interface.Bus('vcan0', bustype = 'socketcan')

'''
start_traffic is using simulator
'''
@packet_reciever.route('/start_traffic')
def start_traffic():
    try:
        msg = can_bus.recv()
        pkt = packet(msg.timestamp, 1, msg.arbitration_id, msg.data)
        pkt.id = hex(pkt.id)
    
        return str([pkt.timestamp, pkt.id, pkt.data])
    except:
        return 'packet not received'


'''
simulate_traffic is using the text file - THIS IS FOR DEMO USE ONLY
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