var wanLink="";
var lanLink="";
var child_process=require("child_process");
var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function InterfacesNode(config) {
        this.context = {global:RED.settings.functionGlobalContext || {}};
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var hostInterfaces=this.context.global.interfaces;
            var container=msg.payload.Service.toLowerCase()+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var hostInterfaces=this.context.global.interfaces;
            console.log(hostInterfaces);
            var interfaces=msg.payload.Interfaces;
            if(interfaces.indexOf("wan")>=0){ 
               if(msg.payload.Service.toLowerCase()=="vsg"){
                  var cmd="pipework "+hostInterfaces["wan"]+" -i eth"+interfaces.indexOf("wan")+" "+container+" udhcpc";
                  console.log(cmd);
                  child_process.exec(cmd,function(error,stdout,stderr){
                        if(error!=null){
                           console.log(cmd+" "+stderr);
                           msg.payload.error=stderr;
                           node.send(msg);
                        }else{
                            console.log("created wan interface");
                            var cmd="pipework "+hostInterfaces["lan"]+"."+msg.payload.S_Tag+"."+msg.payload.C_Tag+" -i eth"+interfaces.indexOf("lan")+" "+container+" udhcpc 76:eb:27:f6:47:f1";
                            console.log(cmd);
                            child_process.exec(cmd,function(error,stdout,stderr){
                                 if(error!=null){
                                    console.log(cmd+" "+stderr);
                                    msg.payload.error=stderr;
                                    node.send(msg);
                                    return;
                                 }else{
                                    console.log("created lan interface");
                                    node.send(msg);
                                 }
                             });
                        }
                  });
                }else{
                   
                   console.log(container+" has wan but not vsg should be attached to vsg");
                   node.send(msg);
                }
            }else{
                var cmd="pipework "+hostInterfaces["lan"]+" -i eth"+interfaces.indexOf("lan")+" "+container+" udhcpc";
                console.log(cmd);
                child_process.exec(cmd,function(error,stdout,stderr){
                     if(error!=null){
                        console.log(cmd+" "+stderr);
                        msg.payload.error=stderr;
                        node.send(msg);
                        return;
                     }else{
                        console.log("created lan interface");
                        node.send(msg);
                     }
                 });
            }
            for(i=0;i<interfaces.length;i++){
                switch(interfaces[i]){
                   case "lan":
                      console.log("lan interface");
                   case "wan":
                      console.log("wan interface");
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
          
        });
    }
    RED.nodes.registerType("interfaces",InterfacesNode);
}

