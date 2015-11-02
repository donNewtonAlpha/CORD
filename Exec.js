var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function ExecuteNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var command=msg.payload.command;
            cmd="docker exec " +container +" "+command;
            console.log(cmd);
            var outcome; 
            var strOutcome="";
            try{
               console.log(cmd);
               outcome=child_process.execSync(cmd);
               console.log(outcome);
               strOutcome=decoder.write(outcome);
               console.log(strOutcome);
            }catch(err){
               console.log(decoder.write(err.stderr));
               strOutcome=decoder.write(err.stderr);

            }
            //console.log(strOutcome);
            console.log("----------");
            
           if(noContainer.test(strOutcome)){
               console.log("didn't exist");
               msg.payload.container="None";
            }else{
                 console.log("did exist");
                 msg.payload.results=strOutcome;

            }
           
            node.send(msg);
        });
    }
    RED.nodes.registerType("execute",ExecuteNode);
}
