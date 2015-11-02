module.exports = function(RED) {
    var child_process=require("child_process");
    var StringDecoder = require('string_decoder').StringDecoder;
    var decoder = new StringDecoder('utf8');
    var Docker=require('dockerode');
    function ListContainersNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        this.on('input', function(msg) {
            var docker = new Docker();
            console.log(docker);
            var  All=msg.payload.all;
            docker.listContainers({all:All},function(err,data){
                console.log(data);
                msg.payload=data;
                node.send(msg);
            });
        });
    }

    RED.nodes.registerType("listContainers",ListContainersNode);
}
