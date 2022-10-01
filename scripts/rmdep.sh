#!/bin/bash

apt-get remove mongodb
echo " "
apt remove nodejs
echo " "
echo "npm"
npm uninstall -g express cors mongoose dotenv
echo " "
npm uninstall -g nodemon
echo " "
npm uninstall -g react-scripts
echo " "
npm uninstall -g react-router-dom
echo " "
npm uninstall -g axios
echo " "
npm uninstall -g react-datepicker
echo " "
npm uninstall -g socketcan