# CAN Bus Visualizer
This repository contains the final implementation of the CAN Bus Visualizer System. 

## Prerequisites/Assumptions
* This is built for Kali Linux 
* VS Code is installed on Kali Linux
* You cloned this repo on Kali Linux
* You have been "whitelisted" on the MongoDB Compass Cluster

## How to start application
1. Open Kali Linux
2. Open a terminal in VS Code 
3. Download the dependencies
```
sudo apt-get install mongodb
sudo apt install nodejs
sudo apt install npm
sudo npm install express cors mongoose dotenv
sudo npm install -g nodemon
npm install react-scripts
npm install react-router-dom
npm install axios
npm install react-datepicker
```
4. Navigate to the "cbv_team4" directory
5. In the terminal execute the below npm command
```
npm start
```

## Miscellaneous Dependencies
The below commands are not needed however can be used if you are receiving dependency issues.
```
npm install react-scripts --save
npm install react-router-dom@6
``` 

## Errors
If you receiving errors after downloading all the above dependencies then run the below command .
```
npm audit fix --force
```