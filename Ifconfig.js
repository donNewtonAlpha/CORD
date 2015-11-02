var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function IfconfigNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            cmd="docker exec " +container+ " ifconfig";
            console.log(cmd);
            var outcome; 
            var strOutcome="";
            try{
               outcome=child_process.execSync(cmd);
               strOutcome=decoder.write(outcome);
            }catch(err){
               console.log(decoder.write(err.stderr));
               strOutcome=decoder.write(err.stderr);

            }
            
           if(noContainer.test(strOutcome)){
               console.log("didn't exist");
               msg.payload.container="None";
            }else{
                 console.log("did exist");
                 var ifaces=strOutcome.split(/\n\n/);
                  var Interfaces=new Array();

                  for(var i=0;i<ifaces.length;i++){
                     var iface=ifaces[i];
                     if(iface.length>1){
                        var Interface=new Object();
                        var lines=iface.split(/\n/);
                        var blank=lines[0].search(' ');
                        Interface.name=lines[0].substr(0,blank);
                        var hdwr=lines[0].search("HWaddr ");
                        if(hdwr>0){
                           var mac=lines[0].substr(hdwr+7).trim();
                           Interface.mac=mac;
                        }
                        var addrLine=lines[1].trim().replace(/inet addr/,"address");
                        var elements=addrLine.split("  ");
                        var ipv4=new Object();
                        for(var j=0;j<elements.length;j++){
                           var k_v=elements[j].split(":");
                           ipv4[k_v[0]]=k_v[1];
                        }
                        Interface.ipv4=ipv4;

                        var RX=new Object();
                        var TX=new Object();
                        for(var k=2;k<lines.length;k++){
                           var inet6=lines[k].search("inet6 addr:");
                           if(inet6>0){
                              var ipv6=new Object();
                              var scope=lines[k].search("Scope");
                              var start=inet6+12;
                              var addr=lines[k].substring(start,scope).trim();
                              ipv6.address=addr;
                              Interface.ipv6=ipv6;
                           }
                           var rxPackets=lines[k].search("RX packets:");
                           if(rxPackets>0){
                              var rxLine=lines[k].substring(rxPackets+3);
                              console.log(rxLine);
                              var stats=rxLine.split(' ');
                              for(var l=0;l<stats.length;l++){
                                 console.log(stats[l]);
                                 var k_v=stats[l].split(":");
                                 RX[k_v[0]]=k_v[1];
                              }
                           }
                           var txPackets=lines[k].search("TX packets:");
                           if(txPackets>0){
                              var txLine=lines[k].substring(txPackets+3).trim();
                              console.log(txLine);
                              var stats=txLine.split(' ');
                              for(var l=0;l<stats.length;l++){
                                 var k_v=stats[l].split(":");
                                 TX[k_v[0]]=k_v[1];
                              }
                           }
                           Interface.TX=TX;
                           Interface.RX=RX;

                           var rxBytes=lines[k].search("RX bytes");
                              if(rxBytes>0){
                                 var lastBit=lines[k].search(/ \(/);
                                 console.log("rxBytes "+rxBytes+" lastBit "+lastBit);
                                 var bytes=lines[k].substring(rxBytes+9,lastBit);
                                 RX.bytes=bytes;

                              }
                              
                              var txBytes=lines[k].search("TX bytes");

                              if(txBytes>0){
                                 console.log(lines[k]);
                                 var txLine=lines[k].substring(txBytes+9);
                                 var lastBit=txLine.search(/ \(/);
                                 var bytes=txLine.substring(0,lastBit);
                                 TX.bytes=bytes;

                              }
                           }
                        Interfaces.push(Interface);
                     }
                  }
                  msg.payload.Interfaces=Interfaces;

            }
           
            node.send(msg);
        });
    }
    RED.nodes.registerType("ifconfig",IfconfigNode);
}
