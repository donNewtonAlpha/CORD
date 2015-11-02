var noContainer=/Error: No such image or container/;
module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    function StatsNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        this.on('input', function(msg) {
            var container=msg.payload.Service+"_"+msg.payload.S_Tag+"_"+msg.payload.C_Tag;
            cmd="docker stats --no-stream " +container;
            console.log(cmd);
            var outcome; 
            var strOutcome="";
            try{
               outcome=child_process.execSync(cmd);
               strOutcome=decoder.write(outcome);
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
                 var lines = strOutcome.split('\n');
			if(lines.length<2)
			   return "err";
			for(var i=0;i<lines.length;i++){
			   lines[i]=lines[i].replace(/   */gi,"|");
			}

			var key_line=lines[0];
			var val_line=lines[1];
			var keys=key_line.split('|');
			var vals=val_line.split('|');

			var stats=new Object();
			for(var j=0;j<keys.length;j++){
			   stats[keys[j]]=vals[j];
			   console.log(keys[j]+':'+vals[j]);
	                }
			msg.payload.stats=stats;

            }
           
            node.send(msg);
        });
    }
    RED.nodes.registerType("stats",StatsNode);
}
