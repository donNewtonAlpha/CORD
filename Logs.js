var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function LogsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            cmd="docker logs " +container;
            console.log(cmd);
            child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                   console.log(stderr);
                   msg.payload.error=stderr;
                   node.send(msg);
                   return;
               }else{
                 if(noContainer.test(stdout)){
                     console.log("didn't exist");
                     msg.payload.container="None";
                  }else{
                       console.log("did exist");
                       msg.payload.logs=stdout;
                  }
                  node.send(msg);
               }
            });
        });
    }
    RED.nodes.registerType("logs",LogsNode);
}
