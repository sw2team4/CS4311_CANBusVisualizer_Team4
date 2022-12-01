# CAN Bus Visualizer
This repository contains the final implementation of the CAN Bus Visualizer System. 


## Prerequisites/Assumptions
* This is built for Kali Linux 
* VS Code is installed on Kali Linux
* You cloned this repo on Kali Linux
* You have been "whitelisted" on the MongoDB Compass Cluster (Local Database Coming soon)

## How to start application
1. Open Kali Linux
2. Open a terminal a naviate to the repository
3. Navigate to scripts folder of repo and download the dependencies
```
cd scripts
./dependencies.sh
```

4. Start the application (within the scripts folder)
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
## Link to Youtube Live Demo
https://www.youtube.com/watch?v=Fu9nltO8unE&ab_channel=UTEPCSFall2022SW2Team4

Powerpoints Located in same directory as README :) 

## Requirements In Development
SRS : [22-33, 34, 38-40,68b, 71b,76b,77a, 81-88, 89-92b, 97, 98, 105a, 105b, 108,
       120, 121, 138, 139, 162-168, 172-174, 178-182, 186-189, 193-195, 199-203, 
       206,207, 210-212, 216-220, 225, 226, 229a, 229b, 238-242, 261a, 262, 263-270, 271-282,
       285, 323, 326-328, 329, 332, 335, 339, 341, 342] 

Standard functionality for windows requirements (Before Section 3.2.3.2 State Tranistions)
SRS numbers out of order in SRS document

## Note
This README is currently a work in progress

