#!/bin/bash
#Step 1 - Set up virtual CAN network
#modprobe vcan
modporbe can-j1939
ip link add dev vcan0 type vcan
ip link set up vcan0
ifconfig vcan0

#sudo apt install can-utils