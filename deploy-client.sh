#!/bin/bash
cd client
pm2 stop baram_client
yarn build
pm2 restart baram_client
cd ..
