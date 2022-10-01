#!/bin/bash
cd ~
#Creates can traffic
cd w_can/ICSim
./icsim vcan0 &
./controls vcan0 &
candump -L vcan0