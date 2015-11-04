module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function StartNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var cmd=["docker start " + container]; 
            console.log(cmd);
            
            child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                 msg.payload.container="Error";
		 msg.payload.error=stderr;
		 node.send(msg);
		 return;
               }
               console.log(decoder.write(stdout));
               msg.payload.container="started";
               msg.payload.result=decoder.write(stdout);
               node.send(msg);
            });
        });
    }
    RED.nodes.registerType("start",StartNode);
}
