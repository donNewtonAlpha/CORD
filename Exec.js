var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function ExecuteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service.toLowerCase()+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var command=msg.payload.command;
            cmd="docker exec " +container +" "+command;
            console.log(cmd);
            child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                  msg.payload.error=stderr;
                  node.send(msg);
                  return;
               }else{
                  if(noContainer.test(stdout)){
                     console.log("didn't exist");
                     msg.payload.container="None";
                  }else{
                       console.log("did exist");
                       msg.payload.results=stdout;

                  }
                  node.send(msg);
               }
            });
            //console.log(strOutcome);
        });
    }
    RED.nodes.registerType("execute",ExecuteNode);
}
