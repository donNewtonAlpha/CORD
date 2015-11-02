module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function CreateNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var cmd;
            if(msg.payload.Service.toLowerCase()=="vsg"){
                cmd="docker run --net=none --privileged=true -d vsg";
            }else{
               cmd="docker run -d --net=none " + msg.payload.Service.toLowerCase(); 
            }
            console.log(cmd);
            
            var outcome=child_process.execSync(cmd);
            var strOutcome=decoder.write(outcome);
            //need to rename container
            cmd="docker rename " + strOutcome.trim() + " "+container;
            console.log(cmd);
            outcome=child_process.execSync(cmd);
           
            console.log(decoder.write(outcome));
            msg.payload.result=decoder.write(outcome);
            msg.payload.container="created";
            node.send(msg);
        });
    }
    RED.nodes.registerType("create",CreateNode);
}
