# CAN Bus Visualizer
This repository contains the final implementation of the CAN Bus Visualizer System. 
AARON

## Prerequisites/Assumptions
* This is built for Kali Linux 
* VS Code is installed on Kali Linux
* You cloned this repo on Kali Linux
* You have been "whitelisted" on the MongoDB Compass Cluster

## How to start application
1. Open Kali Linux
2. Open two seperate terminals in VS Code 
3. Download the dependencies
```
sudo apt-get install mongodb
sudo apt install nodejs
sudo apt install npm
sudo npm install express cors mongoose dotenv
sudo npm install -g nodemon
sudo npm install react-scripts
sudo npm install react-router-dom
sudo npm install axios
sudo npm install react-datepicker
sudo npm install react-bootstrap bootstrap
<<<<<<< HEAD
<<<<<<< HEAD
=======
sudo npm install socketcan
>>>>>>> 11a455ff37cbd14c242e5921d3d7ba5c01923a1c
=======
sudo npm install socketcan
>>>>>>> 5a59f3c721da56239e66bbad2174a99c638ddf17
```
4. One one terminal, navigate to "cbv_team4/backend" directory
5. In the other terminal, navigate to the "cbv_team4/src" directory
6. In the src directory terminal execute the below npm command
```
npm start
```
7. In the backend directory terminal execute the below nodemon command
```
nodemon server
```

## Miscellaneous Dependencies
The below commands are not needed however can be used if you are receiving dependency issues.
```
sudo npm install react-scripts --save
sudo npm install react-router-dom@6
``` 

## Errors
If you receiving errors after downloading all the above dependencies then run the below command .
```
sudo npm audit fix --force
```
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 5a59f3c721da56239e66bbad2174a99c638ddf17
If you close a terminal while servers are on then run 
```
npx kill-port 3000
npx kill-port 5000
```

If you are getting a web vitals error then run
```
npm i web-vitals --save-dev
```

If you are getting a "System limit for number of file watchers reached" then run
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
<<<<<<< HEAD
>>>>>>> 11a455ff37cbd14c242e5921d3d7ba5c01923a1c
=======
>>>>>>> 5a59f3c721da56239e66bbad2174a99c638ddf17
test