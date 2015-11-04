var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function InspectNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            cmd="docker inspect " +container;
            console.log(cmd);
            var strOutcome="";
            child_process.exec(cmd,function(error,stdout,stderr){
               if(error!=null){
                  console.log(stderr);
                  strOutcome=stderr;
               }else{
                  console.log(stdout);
                  strOutcome=stdout;
               }
               console.log("----------");
               console.log(strOutcome);
               console.log("----------");
               
              if(noContainer.test(strOutcome)){
                  console.log("didn't exist");
                  msg.payload.container="None";
              }else{
                    console.log("did exist");
                    var jsonOutcome=JSON.parse(strOutcome);
                    var Running=jsonOutcome[0].State.Running;
                    console.log(jsonOutcome);
                    if(msg.payload.fullStatus==true){
                          msg.payload.status=jsonOutcome;
                    }
                    if(Running)
                       msg.payload.container="Running";
                    else
                       msg.payload.container="Stopped";
                    console.log(Running);
               }
              
               node.send(msg);

           });

                    });
    }
    RED.nodes.registerType("inspect",InspectNode);
}
