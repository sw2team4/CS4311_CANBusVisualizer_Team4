#!/bin/bash
#cd ../cbv_team4/backend
#nodemon server
sudo -S <<< "kali" ./can_setup.sh 
cd ../cbv_team4/api
. venv/bin/activate
flask run