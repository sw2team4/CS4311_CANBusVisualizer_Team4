#!/bin/bash
cd ~
#Creates can traffic
# cd w_can/ICSim
# ./icsim vcan0 &
# ./controls vcan0 &
#candump -L vcan0
#candump -L -l  vcan0
cangen vcan0 -e  9083FEFE -L 8 -g 600 -v
