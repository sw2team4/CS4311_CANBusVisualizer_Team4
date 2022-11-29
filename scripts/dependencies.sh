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
sudo npm install --save react-infinite-scroll-component
echo " "
# npm i use-react-screenshot --legacy-peer-deps
# echo " "
# sudo npm install --save react html2canvas
# echo " "
npm i html-to-image

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
pip install cantools
echo " "
pip install Flask-Session
echo ">>>>>>>>>>>>>>>>>> Downloading Other Dependencies Now <<<<<<<<<<<<<<<<<<<<<<<<"
sudo apt-get install expect
echo " "

#Remove lines below if causing problems then run ./dependencies.sh again
#sudo npm audit fix --force #take out this line if can't render
#sudo npm audit fix --force #take out this line if can't render