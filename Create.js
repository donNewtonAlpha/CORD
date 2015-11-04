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
            
            child_process.exec(cmd,function(error,stdout,stderr){
		    var strOutcome=decoder.write(stdout);
                    console.log("error:"+error+" stdout:"+stdout+" stderr:"+stderr);
		    //need to rename container
                    if(error!=null){
		       msg.payload.container="Error";
		       msg.payload.error=stderr;
		       node.send(msg);
		       return;
                    }
		    cmd="docker rename " + strOutcome.trim() + " "+container;
		    console.log(cmd);
		    child_process.exec(cmd,function(error,stdout,stderr){
                            console.log("stdout:"+stdout);
			    console.log(decoder.write(stdout));
                            
			    msg.payload.result=container;
			    msg.payload.container="created";
			    node.send(msg);
		    });
            });
        });
    }
    RED.nodes.registerType("create",CreateNode);
}
