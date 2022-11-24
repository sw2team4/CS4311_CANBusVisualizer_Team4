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

## Note
This README is currently a work in progress
# MERGING BRANCH FOR EXPORT/IMPORT
