#API
###POST /activateContainer 
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
creates container or starts container if not running then creates and then attaches interface(s), naming convention vsg_5_15

###GET /info
output of docker info

###GET /listRunningContainers
output of docker ps

###GET /listAllContainers
output of docker ps —all-containers

###POST /deactivateContainer
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
stops container

###POST /stats 
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
returns docker  stats $CONTAINER

###POST /ifconfig
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
returns output of docker exec $CONTAINER ifconfig - json-ized 

```json
{
  "Service": "vSG",
  "S_Tag": 3,
  "C_Tag": 2,
  "Interfaces": [
    {
      "name": "eth0",
      "mac": "e2:3d:6f:19:bd:2d",
      "ipv4": {
        "address": "207.141.192.67",
        "Bcast": "207.141.192.95",
        "Mask": "255.255.255.224"
      },
      "ipv6": {
        "address": "fe80::e03d:6fff:fe19:bd2d/64"
      },
      "TX": {
        "packets": "251603",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "carrier": "0",
        "bytes": "56979540"
      },
      "RX": {
        "packets": "323788",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "frame": "0",
        "bytes": "39563431"
      }
    },
    {
      "name": "eth1",
      "mac": "76:eb:27:f6:47:f1",
      "ipv4": {
        "address": "192.168.1.254",
        "Bcast": "192.168.1.255",
        "Mask": "255.255.255.0"
      },
      "ipv6": {
        "address": "fe80::74eb:27ff:fef6:47f1/64"
      },
      "TX": {
        "packets": "39",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "carrier": "0",
        "bytes": "3297"
      },
      "RX": {
        "packets": "41",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "frame": "0",
        "bytes": "4563"
      }
    },
    {
      "name": "lo",
      "ipv4": {
        "address": "127.0.0.1",
        "Mask": "255.0.0.0"
      },
      "ipv6": {
        "address": "::1/128"
      },
      "TX": {
        "packets": "12",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "carrier": "0",
        "bytes": "1236"
      },
      "RX": {
        "packets": "12",
        "errors": "0",
        "dropped": "0",
        "overruns": "0",
        "frame": "0",
        "bytes": "1236"
      }
    }
  ]
}
```

###POST /logs
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
returns output of docker  logs $CONTAINER

###POST /exec 
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":15,
    "Interfaces":["lan","wan"],
    "command":"ls"
}
```
returns output of docker  exec $CONTAINER $COMMAND

###POST /inspect
```json
{
    "Service":"vsg",
    "S_Tag":5,
    "C_Tag":16,
    "Interfaces":["lan","wan"]
}
```
returns output of docker inspect $CONTAINER

All commands get inserted into a mongodb collection, there is also a collection of containers that should be running. 

There is a cron job that every 5 minutes checks to make sure every container we think should be running is in fact running, if not attempts to restart and recreates interfaces.

###GET /ServiceLogs

This returns a list of commands that have been sent to this node.


