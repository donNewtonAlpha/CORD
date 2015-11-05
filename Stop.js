module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function StopNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var cmd=["docker stop " + container]; 
            console.log(cmd);
            
            var outcome=child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                  msg.payload.error=stderr;
               }else{
                  msg.payload.container="stopped";
                  msg.payload.result=stdout;
               }
               node.send(msg);
            });
        });
    }
    RED.nodes.registerType("stop",StopNode);
}
