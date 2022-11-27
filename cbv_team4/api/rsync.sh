#!/bin/bash	

#>> NOTE: THIS PROGRAM INVOKES THE EXPECT SCRIPT  <<

#1 arg is this script is thisscript
#2rd arg = src_data
#3th arg = dest_ip
#4th arg = dest_un
#5th arg = dest_pw 
#6th arg = dest_dir 


src_data=$1 	#/home/kali/Desktop/PythonSync
dest_ip=$2  	#192.168.1.11
dest_un=$3  	#kali
dest_pw=$4		#kali
dest_dir=$5		#/home/kali/Desktop

#rsync -av /home/kali/Desktop/PythonSync kali@192.168.1.11:/home/kali/Desktop
expect rsync.exp $src_data $dest_ip $dest_un $dest_pw $dest_dir 