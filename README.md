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
4. Download the dependencies
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
```
5. One one terminal, navigate to "cbv_team4/backend" directory
4. In the other terminal, navigate to the "cbv_team4/src" directory
5. In the src directory terminal execute the below npm command
```
npm start
```
6. In the backend directory terminal execute the below nodemon command

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
