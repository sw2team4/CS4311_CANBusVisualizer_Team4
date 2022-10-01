#!/bin/bash
#move to root
cd ~
#This script create directory and installs required dependencies
#Execute in root.
mkdir w_can
echo " "
cd w_can
echo " "
sudo apt install libsdl2-dev libsdl2-image-dev -y
echo " "
git clone https://github.com/zombieCraig/ICSim.git
echo " "
cd ICSim
echo " "
make

#To remove directory:
#Open terminal in root
#sudo rm -rf w_can
#Note: since folder was created using sudo we remove the directory using sudo.