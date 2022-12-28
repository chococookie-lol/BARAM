#!/bin/bash
cd server 
pm2 stop baram_server
yarn install
yarn build
pm2 restart baram_server
cd ..

