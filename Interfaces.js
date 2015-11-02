var wanLink="em4.703";
var lanLink="p2p1";
var child_process=require("child_process");
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function createInterface(container,link,mac,eth){
        var cmd="pipework "+link+" -i eth"+eth+" "+container+" udhcpc  "+mac;
        var outcome=child_process.execSync(cmd);       
        var strOutcome=decoder.write(outcome);
        console.log(cmd+":"+strOutcome);
    }
    function createInterfaceStatic(container,link,mac,eth){
        var cmd="pipework "+link+" -i eth"+eth+" "+container+" 192.168.1.254/24  "+mac;
        var outcome=child_process.execSync(cmd);       
        var strOutcome=decoder.write(outcome);
        console.log(cmd+":"+strOutcome);
    }
    function InterfacesNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var i;
            var interfaces=msg.payload.Interfaces;
            if(interfaces.indexOf("wan")>=0){
               createInterface(container,wanLink,"",interfaces.indexOf("wan")); 
               console.log("built wan interface");
            }
       
            for(i=0;i<interfaces.length;i++){
                
                switch(interfaces[i]){
                   case "lan":
                      console.log("lan interface");
                      var link=lanLink+"."+msg.payload.S_Tag+"."+msg.payload.C_Tag;
                      if(msg.payload.Service.toLowerCase()=="vsg")
                         createInterface(container,link,"76:eb:27:f6:47:f1",i);
                      else
                         createInterface(container,link,"",i);
                      break;
  
                   case "wan":
                      //if multiple interfaces wan should always go first
                      console.log("already constructed wan interface");
                      break;
  
                   case "vxlan":
                      console.log("vxlan interface");
                      break;
  
                   default:
                      var error="unknown interface type :"+interfaces[i];
                      console.log(error);
                      msg.payload.error=error;
                      break;
                 }
            }
          
            node.send(msg);
        });
    }
    RED.nodes.registerType("interfaces",InterfacesNode);
}

