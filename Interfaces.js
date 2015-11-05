var wanLink="";
var lanLink="";
var child_process=require("child_process");
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');

    function createInterface(container,link,mac,eth){
        var cmd="pipework "+link+" -i eth"+eth+" "+container+" udhcpc  "+mac;
        child_process.exec(cmd,function(error,stdout,stderr){
              if(error!=null){
                 console.log(cmd+"  "+stderr);
              }else{
                 console.log(cmd+" "+stdout);
              }
        });       
    }
    function createInterfaceStatic(container,link,mac,eth){
        var cmd="pipework "+link+" -i eth"+eth+" "+container+" 192.168.1.254/24  "+mac;
        child_process.exec(cmd,function(error,stdout,stderr){
              if(error!=null){
                 console.log(cmd+"  "+stderr);
              }else{
                 console.log(cmd+" "+stdout);
              }
        });       
    }
    function InterfacesNode(config) {
        this.context = {global:RED.settings.functionGlobalContext || {}};
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var hostInterfaces=this.context.global.interfaces;

            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var hostInterfaces=this.context.global.interfaces;
            var interfaces=msg.payload.Interfaces;
            if(interfaces.indexOf("wan")>=0){
               createInterface(container,hostInterfaces["wan"],"",interfaces.indexOf("wan")); 
               console.log("built wan interface");
            }
       
            for(i=0;i<interfaces.length;i++){
                
                switch(interfaces[i]){
                   case "lan":
                      console.log("lan interface");
                      var link=hostInterfaces["lan"]+"."+msg.payload.S_Tag+"."+msg.payload.C_Tag;
                      if(msg.payload.Service.toLowerCase()=="vsg")
                         createInterfaceStatic(container,link,"76:eb:27:f6:47:f1",i);
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

