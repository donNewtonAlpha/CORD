# CORD
##Host management of docker containers and networking based on node-red 

##Installation Steps
###Ubuntu
####Install Latest Docker
```bash
sudo curl -sSL https://experimental.docker.com/ | sh
```

####Install Latest Node
```bash
sudo apt-get install curl
sudo curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
```
####Install Node-red
```bash
sudo npm install -g node-red
```
####Install mongodb
```bash
sudo apt-get install mongodb
```
####Install pipework
```bash
sudo git clone https://github.com/jpetazzo/pipework.git
sudo cp pipework /usr/bin/.
sudo chmod 755 /usr/bin/pipework
```

####Install prerequisite nodes and CORD nodes
```bash
cd $NODE_RED_NODE_DIR
Most likely /usr/lib/node_modules/node-red/nodes/
sudo npm install node-red-contrib-mongodb2
sudo npm install dockerode
sudo git clone https://github.com/donNewtonAlpha/CORD.git
```
####ADD lan network interfaces
```bash
sudo bash
for i in `seq 2 12`
   do 
   ip link add link $LAN_INTERFACE $LAN_INTERFACE.$i type vlan proto 802.1ad id $i
   ip link set $LAN_INTERFACE.$i up
   for j in `seq 2 100`
      do 
      ip link add link $LAN_INTERFACE.$i $LAN_INTERFACE.$i.$j type vlan proto 802.1q id $j
      ip link set $LAN_INTERFACE.$i.$j up
   done
done
exit
```

#####ADD wan interface
```bash 
sudo bash
ip link add link $WAN_INTERFACE $WAN_INTERFACE.0 type vlan proto 802.1q id 0
ip link set $WAN_INTERFACE up
exit
```

####Start Node-red and reset flow file
```bash
sudo nohup node-red 2>&1 &

#ensure flow-file create
ls $HOME/.node-red/flows_$HOSTNAME.json
rm $HOME/.node-red/flows_$HOSTNAME.json
#sym link application.js
ln -s /usr/lib/node_modules/node-red/nodes/CORD/application.js $HOME/.node-red/flows_$HOSTNAME.json
#restart
sudo nohup node-red 2>&1 &
```


in webbrowser open http://$NODE_RED_IP:1880
and verify application is loaded

