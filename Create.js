module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function CreateNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service.toLowerCase()+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            var cmd;
            var args,cmd,rm;
            if(msg.payload.CmdLine!=null){
               args=msg.payload.CmdLine.args;
               cmd=msg.payload.CmdLine.cmd;
            }
            if(msg.payload.rm==true){
               rm=" --rm ";
            }else{
               rm=" -d ";
            }

            
            if(msg.payload.Service.toLowerCase()=="vsg"){
                cmd="docker run --net=none --privileged=true -d vsg";
            }else{
               var interfaces=msg.payload.Interfaces;
               if(interfaces.indexOf("wan")>=0){
                  cmd="docker run"+rm+"--net=container:vsg_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag+" "+ msg.payload.Service.toLowerCase()+ " "+cmd+" "+args; 
               }else{
                  cmd="docker run"+rm+"--net=none"+ msg.payload.Service.toLowerCase()+ " "+cmd+" "+args; 
               }
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
		    cmd="docker rename " + strOutcome.trim()+ " "+container;
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
