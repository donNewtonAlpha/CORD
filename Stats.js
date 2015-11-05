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
            outcome=child_process.exec(cmd,function(error,stdout,stderr){
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
                    var stats=new Object();
                    console.log("did exist");
                    var lines = stdout.split('\n');
                    if(lines.length<2)
                       return "err";
                    for(var i=0;i<lines.length;i++){
                       lines[i]=lines[i].replace(/   */gi,"|");
                     }
                     var key_line=lines[0];
                     var val_line=lines[1];
                     var keys=key_line.split('|');
                     var vals=val_line.split('|');

                     for(var j=0;j<keys.length;j++){
                        stats[keys[j]]=vals[j];
                        console.log(keys[j]+':'+vals[j]);
                     }
                     msg.payload.stats=stats;
                  }
                  node.send(msg);
               }
            });
        });
    }
    RED.nodes.registerType("stats",StatsNode);
}
