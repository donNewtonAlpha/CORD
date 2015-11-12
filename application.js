[{"id":"f3d313fc.0c2cf","type":"mongodb2","hostname":"127.0.0.1","port":"27017","db":"containers","name":""},{"id":"e89f151f.1760e8","type":"inject","name":"","topic":"Every 5 Minutes","payload":"{}","payloadType":"string","repeat":"300","crontab":"","once":true,"x":172,"y":722,"z":"8318cd4d.7ce73","wires":[["9c9722d9.6368e"]]},{"id":"9b00b352.64ff5","type":"debug","name":"","active":true,"console":"false","complete":"payload","x":1379,"y":162,"z":"8318cd4d.7ce73","wires":[]},{"id":"c491e644.3b6e18","type":"http in","name":"","url":"/activateContainer","method":"post","swaggerDoc":"","x":189,"y":109,"z":"8318cd4d.7ce73","wires":[["db196574.24e698"]]},{"id":"46f2170b.b90de8","type":"http response","name":"","x":1327,"y":95,"z":"8318cd4d.7ce73","wires":[]},{"id":"de102568.21efd8","type":"start","name":"","x":895,"y":118,"z":"8318cd4d.7ce73","wires":[["3583367e.ca7cca","7b12a9d2.84ed58","1169e174.ee961f"]]},{"id":"de64e4a8.219b18","type":"create","name":"","x":898,"y":163,"z":"8318cd4d.7ce73","wires":[["3583367e.ca7cca","7b12a9d2.84ed58","32cfd03e.cd303"]]},{"id":"240f5e01.dbf0a2","type":"inspect","name":"","x":602,"y":106,"z":"8318cd4d.7ce73","wires":[["d5a19f65.2a5e6"]]},{"id":"d5a19f65.2a5e6","type":"switch","name":"","property":"payload.container","rules":[{"t":"eq","v":"Running"},{"t":"eq","v":"Stopped"},{"t":"eq","v":"None"}],"checkall":"true","outputs":3,"x":731,"y":111,"z":"8318cd4d.7ce73","wires":[["3583367e.ca7cca","9b00b352.64ff5"],["de102568.21efd8"],["de64e4a8.219b18"]]},{"id":"db196574.24e698","type":"function","name":"Validate C & S Tag","func":"var s=msg.payload.S_Tag;\nvar c=msg.payload.C_Tag;\nconsole.log(\"S:\"+s+\" C:\"+c);\nif(s>10)console.log(\"greater\");\nif((s<2)||(s>12)||(c<2)||(c>100)){\n    msg.payload.error=\"S_Tag should be between 2 and 12 and C_Tag should be between 2 and 100\";\n    console.log(msg.payload.error);\n    return [null,msg];\n}else{\n    console.log(\"activating vSG_\"+s+\"_\"+c);\n    return [msg,null];\n}","outputs":"2","noerr":0,"x":404,"y":112,"z":"8318cd4d.7ce73","wires":[["240f5e01.dbf0a2"],["c9172e9.f36e8d","fbaedd8b.04512"]]},{"id":"3583367e.ca7cca","type":"interfaces","name":"","x":1125,"y":89,"z":"8318cd4d.7ce73","wires":[["9b00b352.64ff5","46f2170b.b90de8"]]},{"id":"c9172e9.f36e8d","type":"debug","name":"","active":true,"console":"false","complete":"false","x":714,"y":207,"z":"8318cd4d.7ce73","wires":[]},{"id":"1b07504e.e4f8b","type":"info","name":"","x":271,"y":1094,"z":"8318cd4d.7ce73","wires":[["a062e9c8.5f9d18","f5292085.0ad6e"]]},{"id":"8a7710d0.7588f","type":"http in","name":"","url":"/info","method":"get","swaggerDoc":"","x":122,"y":1096,"z":"8318cd4d.7ce73","wires":[["1b07504e.e4f8b"]]},{"id":"1091129d.ef6eed","type":"listContainers","name":"","x":526,"y":1168,"z":"8318cd4d.7ce73","wires":[["a062e9c8.5f9d18","f5292085.0ad6e"]]},{"id":"ea66fbe1.159908","type":"http in","name":"","url":"/listRunningContainers","method":"get","swaggerDoc":"","x":176,"y":1150,"z":"8318cd4d.7ce73","wires":[["f698f11d.09671"]]},{"id":"a062e9c8.5f9d18","type":"http response","name":"","x":813,"y":1166,"z":"8318cd4d.7ce73","wires":[]},{"id":"f698f11d.09671","type":"function","name":"all-false","func":"msg.payload.all=false;\n\nreturn msg;","outputs":1,"noerr":0,"x":364,"y":1148,"z":"8318cd4d.7ce73","wires":[["1091129d.ef6eed"]]},{"id":"b16fb8c5.4e9048","type":"http in","name":"","url":"/listAllContainers","method":"get","swaggerDoc":"","x":157.5,"y":1195,"z":"8318cd4d.7ce73","wires":[["db8920d0.2476e"]]},{"id":"db8920d0.2476e","type":"function","name":"all-true","func":"msg.payload.all=true;\nreturn msg;","outputs":1,"noerr":0,"x":354,"y":1193,"z":"8318cd4d.7ce73","wires":[["1091129d.ef6eed"]]},{"id":"fbaedd8b.04512","type":"http response","name":"","x":719,"y":163,"z":"8318cd4d.7ce73","wires":[]},{"id":"f5292085.0ad6e","type":"debug","name":"","active":true,"console":"false","complete":"false","x":748,"y":1101,"z":"8318cd4d.7ce73","wires":[]},{"id":"d2dba386.2d246","type":"http in","name":"","url":"/deactivateContainer","method":"post","swaggerDoc":"","x":197.5,"y":151,"z":"8318cd4d.7ce73","wires":[["bf8c844e.407378","10c55f42.ef3aa1","2103c01e.defc4"]]},{"id":"bf8c844e.407378","type":"stop","name":"","x":426,"y":148,"z":"8318cd4d.7ce73","wires":[["fbaedd8b.04512","c9172e9.f36e8d"]]},{"id":"d02a803c.2fd58","type":"http in","name":"","url":"/stats","method":"post","swaggerDoc":"","x":147,"y":403,"z":"8318cd4d.7ce73","wires":[["1ae91cc4.e516e3"]]},{"id":"22bea33e.dd415c","type":"http response","name":"","x":706,"y":496,"z":"8318cd4d.7ce73","wires":[]},{"id":"1ae91cc4.e516e3","type":"stats","name":"","x":303,"y":402,"z":"8318cd4d.7ce73","wires":[["22bea33e.dd415c","e8b31506.174ce8"]]},{"id":"4fad687a.b05298","type":"ifconfig","name":"","x":305,"y":441,"z":"8318cd4d.7ce73","wires":[["22bea33e.dd415c","e8b31506.174ce8"]]},{"id":"91bd8a44.6e4278","type":"http in","name":"","url":"/ifconfig","method":"post","swaggerDoc":"","x":154,"y":442,"z":"8318cd4d.7ce73","wires":[["4fad687a.b05298"]]},{"id":"632130d3.9cded","type":"http in","name":"","url":"/logs","method":"post","swaggerDoc":"","x":142,"y":485,"z":"8318cd4d.7ce73","wires":[["c646048a.39b9f8"]]},{"id":"c646048a.39b9f8","type":"logs","name":"","x":303,"y":485,"z":"8318cd4d.7ce73","wires":[["22bea33e.dd415c","e8b31506.174ce8"]]},{"id":"71599825.8ea668","type":"http in","name":"","url":"/exec","method":"post","swaggerDoc":"","x":145,"y":523,"z":"8318cd4d.7ce73","wires":[["40ca39bc.bf35c8"]]},{"id":"40ca39bc.bf35c8","type":"execute","name":"","x":303,"y":523,"z":"8318cd4d.7ce73","wires":[["22bea33e.dd415c","e8b31506.174ce8"]]},{"id":"31fbc3ef.ce043c","type":"inspect","name":"","x":441,"y":560,"z":"8318cd4d.7ce73","wires":[["22bea33e.dd415c","e8b31506.174ce8"]]},{"id":"2daded98.d25212","type":"http in","name":"","url":"/inspect","method":"post","swaggerDoc":"","x":150,"y":561,"z":"8318cd4d.7ce73","wires":[["fc1661de.03e9a"]]},{"id":"fc1661de.03e9a","type":"function","name":"fullStatus","func":"msg.payload.fullStatus=true;\nreturn msg;","outputs":1,"noerr":0,"x":299,"y":564,"z":"8318cd4d.7ce73","wires":[["31fbc3ef.ce043c"]]},{"id":"7b12a9d2.84ed58","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Add Service","collection":"Running","operation":"insert","x":1135,"y":126,"z":"8318cd4d.7ce73","wires":[["9b00b352.64ff5"]]},{"id":"e8b31506.174ce8","type":"debug","name":"","active":true,"console":"false","complete":"false","x":718,"y":444,"z":"8318cd4d.7ce73","wires":[]},{"id":"10c55f42.ef3aa1","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Delete Service","collection":"Running","operation":"deleteOne","x":498,"y":185,"z":"8318cd4d.7ce73","wires":[["c9172e9.f36e8d"]]},{"id":"52ab3dee.ad54c4","type":"inject","name":"Every minute","topic":"","payload":"{}","payloadType":"string","repeat":"60","crontab":"","once":true,"x":156,"y":683,"z":"8318cd4d.7ce73","wires":[["d5afaa26.2a5058"]]},{"id":"4c177c5a.b3e884","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Each Running","collection":"Running","operation":"find.forEach","x":448.875,"y":684.25,"z":"8318cd4d.7ce73","wires":[["b0519810.4fae68"]]},{"id":"12a0c3d9.ed5f3c","type":"debug","name":"","active":true,"console":"false","complete":"false","x":856,"y":664,"z":"8318cd4d.7ce73","wires":[]},{"id":"d5afaa26.2a5058","type":"json","name":"","x":312,"y":684,"z":"8318cd4d.7ce73","wires":[["4c177c5a.b3e884"]]},{"id":"b0519810.4fae68","type":"inspect","name":"","x":590,"y":680,"z":"8318cd4d.7ce73","wires":[["2397be8b.dc6842"]]},{"id":"2397be8b.dc6842","type":"switch","name":"","property":"payload.container","rules":[{"t":"eq","v":"Running"},{"t":"eq","v":"Stopped"}],"checkall":"true","outputs":2,"x":715,"y":677,"z":"8318cd4d.7ce73","wires":[["12a0c3d9.ed5f3c"],["32c2ea56.cd3d16"]]},{"id":"c564acca.3a9b5","type":"debug","name":"","active":true,"console":"false","complete":"false","x":1120,"y":716,"z":"8318cd4d.7ce73","wires":[]},{"id":"32c2ea56.cd3d16","type":"start","name":"","x":840,"y":700,"z":"8318cd4d.7ce73","wires":[["11aadebe.ee5521"]]},{"id":"11aadebe.ee5521","type":"interfaces","name":"","x":969,"y":700,"z":"8318cd4d.7ce73","wires":[["c564acca.3a9b5","73bcc89b.8c4338"]]},{"id":"2103c01e.defc4","type":"function","name":"Action deactivateContainer","func":"msg.payload.action=\"deactivateContainer\";\nmsg.payload.timestamp=new Date();\nreturn msg;","outputs":1,"noerr":0,"x":1129,"y":249,"z":"8318cd4d.7ce73","wires":[["62629f4.f9d9d6"]]},{"id":"62629f4.f9d9d6","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Add Log","collection":"Log","operation":"insert","x":1402,"y":307,"z":"8318cd4d.7ce73","wires":[["9b00b352.64ff5"]]},{"id":"1169e174.ee961f","type":"function","name":"Action startContainer","func":"msg.payload.action=\"startContainer\";\nmsg.payload.timestamp=new Date();\nreturn msg;","outputs":1,"noerr":0,"x":1116,"y":169,"z":"8318cd4d.7ce73","wires":[["62629f4.f9d9d6"]]},{"id":"32cfd03e.cd303","type":"function","name":"Action createContainer","func":"msg.payload.action=\"createContainer\";\nmsg.payload.timestamp=new Date();\nreturn msg;","outputs":1,"noerr":0,"x":1116,"y":209,"z":"8318cd4d.7ce73","wires":[["62629f4.f9d9d6"]]},{"id":"73bcc89b.8c4338","type":"function","name":"Action restartedContainer","func":"msg.payload.action=\"restartedContainer\";\nmsg.payload.timestamp=new Date();\nreturn msg;","outputs":1,"noerr":0,"x":1331,"y":578,"z":"8318cd4d.7ce73","wires":[["62629f4.f9d9d6"]]},{"id":"30c2ed0b.cf3d12","type":"http in","name":"","url":"/ServiceLogs","method":"get","swaggerDoc":"","x":149,"y":1233,"z":"8318cd4d.7ce73","wires":[["1f33daac.e0cc25"]]},{"id":"1f33daac.e0cc25","type":"function","name":"","func":"var Query={$query:{},$orderby:{timestamp:-1}};\nmsg.payload=Query;\nreturn msg;","outputs":1,"noerr":0,"x":305,"y":1234.625,"z":"8318cd4d.7ce73","wires":[["6754f643.98ab08"]]},{"id":"6754f643.98ab08","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Service Log","collection":"Log","operation":"find.toArray","x":449,"y":1236.625,"z":"8318cd4d.7ce73","wires":[["66ad2cd5.9952d4"]]},{"id":"66ad2cd5.9952d4","type":"http response","name":"","x":595,"y":1241,"z":"8318cd4d.7ce73","wires":[]},{"id":"1e4138f4.e1bec7","type":"http in","name":"","url":"/addHostInterface","method":"post","swaggerDoc":"","x":170,"y":889,"z":"8318cd4d.7ce73","wires":[["7777ecd5.888814"]]},{"id":"c91a1492.36e5e8","type":"http in","name":"","url":"/deleteHostInterface","method":"post","swaggerDoc":"","x":176,"y":929,"z":"8318cd4d.7ce73","wires":[["60f56a6.f9f0a94"]]},{"id":"8d7eb003.72815","type":"http in","name":"","url":"/getHostInterfaces","method":"get","swaggerDoc":"","x":165,"y":971,"z":"8318cd4d.7ce73","wires":[["d5506faf.2aaf9"]]},{"id":"7777ecd5.888814","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Save","collection":"Interfaces","operation":"save","x":424,"y":889,"z":"8318cd4d.7ce73","wires":[["8a0a6fa8.75f59","46fb8ae8.b90474","82148197.7deb8"]]},{"id":"60f56a6.f9f0a94","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"Delete","collection":"Interfaces","operation":"deleteOne","x":423,"y":927,"z":"8318cd4d.7ce73","wires":[["8a0a6fa8.75f59","46fb8ae8.b90474","82148197.7deb8"]]},{"id":"d5506faf.2aaf9","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"GetArray","collection":"Interfaces","operation":"aggregate.toArray","x":427,"y":969,"z":"8318cd4d.7ce73","wires":[["8a0a6fa8.75f59","46fb8ae8.b90474"]]},{"id":"8a0a6fa8.75f59","type":"http response","name":"","x":736,"y":927,"z":"8318cd4d.7ce73","wires":[]},{"id":"46fb8ae8.b90474","type":"debug","name":"","active":true,"console":"false","complete":"false","x":750,"y":967,"z":"8318cd4d.7ce73","wires":[]},{"id":"47d4b824.b82b48","type":"mongodb2 in","service":"_ext_","configNode":"f3d313fc.0c2cf","name":"All Interfaces","collection":"Interfaces","operation":"aggregate.toArray","x":491,"y":731,"z":"8318cd4d.7ce73","wires":[["6a8e92bb.95716c","b6aba41b.495458"]]},{"id":"82148197.7deb8","type":"function","name":"","func":"msg.payload={};\nreturn msg;","outputs":1,"noerr":0,"x":572,"y":832,"z":"8318cd4d.7ce73","wires":[["47d4b824.b82b48"]]},{"id":"9c9722d9.6368e","type":"json","name":"","x":318,"y":728,"z":"8318cd4d.7ce73","wires":[["47d4b824.b82b48"]]},{"id":"b6aba41b.495458","type":"debug","name":"","active":true,"console":"false","complete":"false","x":942,"y":744,"z":"8318cd4d.7ce73","wires":[]},{"id":"6a8e92bb.95716c","type":"function","name":"Global Context Interfaces","func":"var Interfaces={};\nfor(var i=0;i<msg.payload.length;i++){\n    Interfaces[msg.payload[i].Bridge]=msg.payload[i].Interface;\n}\ncontext.global.interfaces=Interfaces;\nreturn msg;","outputs":1,"noerr":0,"x":731,"y":772,"z":"8318cd4d.7ce73","wires":[["b6aba41b.495458"]]},{"id":"90a8a33a.6f576","type":"catch","name":"","x":120,"y":1347,"z":"8318cd4d.7ce73","wires":[["e97cbef1.16834"]]},{"id":"41e8f02e.be171","type":"http response","name":"","x":452,"y":1346,"z":"8318cd4d.7ce73","wires":[]},{"id":"e97cbef1.16834","type":"function","name":"SetErrorCode","func":"msg.statusCode=500;\nmsg.payload=msg.error;\nreturn msg;","outputs":1,"noerr":0,"x":276,"y":1347,"z":"8318cd4d.7ce73","wires":[["41e8f02e.be171"]]},{"id":"aa708190.558f8","type":"comment","name":"Manage Container","info":"Create,Start,Stop Containers","x":174,"y":70,"z":"8318cd4d.7ce73","wires":[]},{"id":"1727a657.e8d85a","type":"comment","name":"Access Container","info":"","x":166,"y":364,"z":"8318cd4d.7ce73","wires":[]},{"id":"cba672c5.34599","type":"comment","name":"Self Heal","info":"Ensure Containers that should be \nrunning are running\nEnsure latest interface assignments are\nin global context","x":120,"y":644,"z":"8318cd4d.7ce73","wires":[]},{"id":"ebb240a2.144dc","type":"comment","name":"Manage Interfaces","info":"add, delete and display interfaces","x":153,"y":850,"z":"8318cd4d.7ce73","wires":[]},{"id":"2a82e330.d57d1c","type":"comment","name":"Access Docker","info":"","x":140,"y":1054,"z":"8318cd4d.7ce73","wires":[]},{"id":"10b45325.ef4bad","type":"comment","name":"Handle Errors","info":"Catch any exceptions and handle them \notherwise node-red will crash on error","x":137,"y":1305,"z":"8318cd4d.7ce73","wires":[]},{"id":"b36b119a.4c94f","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":133,"y":1498,"z":"8318cd4d.7ce73","wires":[["9ada0411.6525f8"]]},{"id":"9ada0411.6525f8","type":"info","name":"","x":330,"y":1499,"z":"8318cd4d.7ce73","wires":[["570844e7.a8f7bc"]]},{"id":"570844e7.a8f7bc","type":"debug","name":"","active":true,"console":"false","complete":"true","x":536,"y":1499,"z":"8318cd4d.7ce73","wires":[]},{"id":"5d9d21ce.a262e","type":"rm","name":"","x":357,"y":200,"z":"8318cd4d.7ce73","wires":[["c9172e9.f36e8d","dc8ff218.23701","eb5ccf46.14a33"]]},{"id":"2b510616.d4aefa","type":"http in","name":"","url":"/removeContainer","method":"post","swaggerDoc":"","x":186,"y":196,"z":"8318cd4d.7ce73","wires":[["5d9d21ce.a262e"]]},{"id":"dc8ff218.23701","type":"http response","name":"","x":461,"y":309,"z":"8318cd4d.7ce73","wires":[]},{"id":"eb5ccf46.14a33","type":"function","name":"Action removedContainer","func":"msg.payload.action=\"removedContainer\";\nmsg.payload.timestamp=new Date();\nreturn msg;","outputs":1,"noerr":0,"x":1135,"y":291,"z":"8318cd4d.7ce73","wires":[["62629f4.f9d9d6"]]}]
