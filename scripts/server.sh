#!/bin/bash
#cd ../cbv_team4/backend
#nodemon server
npx kill-port 5000
sudo -S <<< "kali" ./can_setup.sh 
cd ../cbv_team4/api
. venv/bin/activate
flask run

#TODO: make sure flask is killed