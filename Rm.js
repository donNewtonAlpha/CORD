module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function RmNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var container=msg.payload.Service.toLowerCase()+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var cmd=["docker rm " + container]; 
            console.log(cmd);
            
            var outcome=child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                  msg.payload.error=stderr;
               }else{
                  msg.payload.container="removed";
                  msg.payload.result=stdout;
               }
               node.send(msg);
            });
        });
    }
    RED.nodes.registerType("rm",RmNode);
}
