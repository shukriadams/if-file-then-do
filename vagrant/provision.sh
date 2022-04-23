#!/usr/bin/env bash
sudo apt-get update

sudo apt-get install git -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install nodejs -y

sudo npm install pkg@5.5.2 -g
sudo npm install jspm@0.16x -g
sudo npm install yarn -g
sudo npm install uglify-es -g
sudo npm install concat-cli -g

# force startup folder to vagrant project
echo "cd /vagrant/src" >> /home/vagrant/.bashrc
