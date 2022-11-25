#!/bin/bash



echo ">>>>>>>>>>>>>>>>>> Downloading React Dependencies Now <<<<<<<<<<<<<<<<<<<<<<<<"

#sudo apt-get install mongodb
echo " "
sudo apt install nodejs
echo " "
sudo apt install npm
echo " "
#sudo npm install express cors mongoose dotenv
echo " "
sudo npm install -g nodemon
echo " "
sudo npm install react-scripts
echo " "
sudo npm install react-router-dom
echo " "
#sudo npm install axios
echo " "
sudo npm install react-datepicker
echo " "
#npm install socketcan
echo " "
sudo npm install reactflow
echo " "
sudo npm install react-bootstrap bootstrap
echo " "
npm i use-react-screenshot --legacy-peer-deps
echo " "
sudo npm install --save react html2canvas
echo " "

echo ">>>>>>>>>>>>>>>>>> Downloading Flask Dependencies Now <<<<<<<<<<<<<<<<<<<<<<<<"

echo " "
sudo apt-get install python3
echo " "
pip install -U flask-cors
echo " "
pip install Flask
echo " "
pip install flask python-dotenv
echo " "
pip install Flask-PyMongo
echo " "

echo ">>>>>>>>>>>>>>>>>> Downloading Flask Dependencies Now <<<<<<<<<<<<<<<<<<<<<<<<"
sudo apt-get install expect
echo " "

#Remove lines below if causing problems then run ./dependencies.sh again
#sudo npm audit fix --force #take out this line if can't render
#sudo npm audit fix --force #take out this line if can't render