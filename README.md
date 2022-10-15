# CAN Bus Visualizer
This repository contains the final implementation of the CAN Bus Visualizer System. 


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
sudo npm install socketcan
```
4. On one terminal, cd to the scripts folder and type the following command:
```
./run.sh
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

