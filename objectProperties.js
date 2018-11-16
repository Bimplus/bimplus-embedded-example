define(function (require) {

    // Load websdk
    var WebSdk = require('bimplus/websdk');

    // Load Client integration
    var WebClient = require('bimplus/webclient');

    // Use environment dev,stage or prod
    var environment = "stage";

    // Initalize api wrapper
    var api = new WebSdk.Api(WebSdk.createDefaultConfig(environment));

    // Set some control variables
    var token = WebClient.getUrlParameter('token');
    var currentTeam = WebClient.getUrlParameter('team');
    var currentProject = WebClient.getUrlParameter('project');
    var currentObject = WebClient.getUrlParameter('object');

    var objectProperties;

    // Create the external client for communication with the bimplus controls
    var externalClient = new WebClient.ExternalClient("MyClient");

    api.setAccessToken(token);

    // Create the proxy classes for explorer and portal, binding it to an exisiting iframe id
    objectProperties = new WebClient.BimObjectProperties('bimplusObjectProperties',api.getAccessToken(),externalClient,environment);

    // Initialize the client to listen for messages
    externalClient.initialize();

    // Add message handler for CheckAlive event
    externalClient.addMessageHandler("CheckAlive",function(msg){
        alert("Message system is working correct! (CheckAlive)");
    });

    // Add message handler for ObjectStructureSelecte devent
    externalClient.addMessageHandler("ObjectStructureSelected",function(msg){
        alert("Object structure selected (ObjectStructureSelected): " + msg.id);
    });

    // Add message handler for CurrentObjectSelecte devent
    externalClient.addMessageHandler("CurrentObjectSelected",function(msg){
        alert("Current object selected: (CurrentObjectSelected)" + msg.id);
    });

    // Load object properties
    objectProperties.load(currentTeam,currentProject,currentObject);	

    $("#checkAlive").click(function(){
        // Send CheckElive message to object properties iframe
        objectProperties.sendMessage('CheckAlive');
    });

    $("#objectStructureSelected").click(function(){
        // Send ObjectStructureSelected message to object properties iframe
        objectProperties.sendMessage('ObjectStructureSelected', {id: $("#objectStructureSelectedId").val()});
    });

    $("#objectSelected").click(function(){
        // Send ObjectSelected message to object properties iframe 
        let objects = [];
        let _objects = $("#objectSelectedIds").val().split(';');
        for(let i = 0; i < _objects.length; i++){
            item = _objects[i].trim();
            if(item !== ""){
                objects.push(_objects[i].trim());
            }
        }
        if(objects.length === 0){
            return;
        }
        if(objects.length === 1){
            let isMultiselect = $("#multiselect").is(":checked");
            objectProperties.sendMessage('ObjectSelected', {id: objects[0], multiSelect: isMultiselect});
        }
        if(objects.length > 1){
            let isMultiselect = $("#multiselect").is(":checked");
            objectProperties.sendMessage('ObjectsSelected', {ids: objects, multiSelect: isMultiselect});
        }
    });

    $('#currentObjectSelected').click(function(){
        // Send CurrentObjectSelected message to object properties iframe
        objectProperties.sendMessage('CurrentObjectSelected', {id: $("#currentObjectSelectedId").val().trim()});
    });
})
