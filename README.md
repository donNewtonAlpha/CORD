# CORD
Host management of docker containers and networking based on node-red 
npm install node-red-contrib-mongodb2
git clone https://github.com/donNewtonAlpha/CORD.git
npm install dockerode
git clone https://github.com/jpetazzo/pipework.git
cp pipework /usr/bin/.
chmod 755 /usr/bin/pipework
apt-get install mongodb

ADD lan network interfaces
for i in `seq 2 12`
> do 
> ip link add link $LAN_INTERFACE $LAN_INTERFACE.$i type vlan proto 802.1ad id $i
> ip link set $LAN_INTERFACE.$i up
> for j in `seq 2 100`
> do 
> ip link add link $LAN_INTERFACE.$i $LAN_INTERFACE.$i.$j type vlan proto 802.1q id $j
> ip link set $LAN_INTERFACE.$i.$j up
> done
> done


nohup node-red 2>&1 &
http://$NODE_RED_IP:1880

