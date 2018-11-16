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

    var projectNavigationBar;

    // Create the external client for communication with the bimplus controls
    var externalClient = new WebClient.ExternalClient("MyClient");

    api.setAccessToken(token);

    // Create the proxy classes for explorer and portal, binding it to an exisiting iframe id
    projectNavigationBar = new WebClient.BimProjectNavigationBar ('bimplusProjectNavigationBar',api.getAccessToken(),externalClient,environment);

    // Initialize the client to listen for messages
    externalClient.initialize();

    // Add message handler for CheckAlive event
    externalClient.addMessageHandler("CheckAlive",function(msg){
        alert("Message system is working correct! (CheckAlive)");
    });

    // Add message handler for ModuleSelected event
    externalClient.addMessageHandler("ModuleSelected",function(msg){
        alert("Module selected: ModuleSelected:\nmoduleId:\n     " + msg.id);
    });

    // Add message handler for ModelToggled event
    externalClient.addMessageHandler("ModelToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Model toggled: ModelToggled:\nmodelId:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

    // Add message handler for ModelLayerToggled event
    externalClient.addMessageHandler("ModelLayerToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Model layer toggled: ModelLayerToggled:\nmodelId:\n     " + msg.modelId + "\nmodelLayerId:\n     " + msg.modelLayerId + "\nselected:\n     " + _selected);
    });

    // Add message handler for TopologyNodeToggled event
    externalClient.addMessageHandler("TopologyNodeToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Topology node toggled: TopologyNodeToggled:\ntopologyNodeId:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

     // Add message handler for ModelTransparencyToggled event
    externalClient.addMessageHandler("ModelTransparencyToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Model toggled: ModelTransparencyToggled:\nmodelId:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

     // Add message handler for ModelLayerTransparencyToggled event
    externalClient.addMessageHandler("ModelLayerTransparencyToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Model layer toggled: ModelLayerTransparencyToggled:\nmodelId:\n     " + msg.modelId + "\nmodelLayerId:\n     " + msg.modelLayerId + "\nselected:\n     " + _selected);
    });

   // Add message handler for StructureSelected event
    externalClient.addMessageHandler("StructureSelected",function(msg){
        alert("Structure selected: StructureSelected:\nstructureId:\n     " + msg.id);
    });

    // Add message handler for StructureNodeSelected event
    externalClient.addMessageHandler("StructureNodeSelected",function(msg){
        alert("Structure node selected: StructureNodeSelected:\nstructureNodeId:\n     " + msg.id);
    });

    // Add message handler for StructureNodeSelected event
    externalClient.addMessageHandler("StructureNodeToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Structure node toggled: SructureNodeToggled:\nstructureNodeId:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

    // Add message handler for FilterSelected event
    externalClient.addMessageHandler("FilterSelected",function(msg){
        alert("Filter selected: FilterSelected:\ndisciplineId:\n     " + msg.disciplineId + "\nid:\n     " + msg.id);
    });

     // Add message handler for FilterNodeSelected event
    externalClient.addMessageHandler("FilterNodeSelected",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Filter node selected: FilterNodeSelected:\ndisciplineId:\n     " + msg.disciplineId + "\nid:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

    // Add message handler for FilterNodeToggled event
    externalClient.addMessageHandler("FilterNodeToggled",function(msg){
        let _selected=msg.selected?"true":"false";
        alert("Filter node selected: FilterNodeToggled:\ndisciplineId:\n     " + msg.disciplineId + "\nid:\n     " + msg.id + "\nselected:\n     " + _selected);
    });

    // Load object properties
    projectNavigationBar.load(currentTeam,currentProject);	

    $("#checkAlive").click(function(){
        // Send CheckElive message to object properties iframe
        projectNavigationBar.sendMessage('CheckAlive');
    });

    $("#moduleSelected").click(function(){
        moduleId = $("#moduleSelectedCombo")[0].options[$("#moduleSelectedCombo")[0].selectedIndex].value;
        projectNavigationBar.sendMessage('ModuleSelected', {id: moduleId});
    });

    $("#modelToggled").click(function(){
        let modelId = $("#modelToggledId").val();
        let selectValue = $("#modelToggledSelect")[0].options[$("#modelToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('ModelToggled', {id: modelId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('ModelToggled', {id: modelId});
        }
    });

    $("#modelLayerToggled").click(function(){
        let _modelId = $("#modelToggledId1").val();
        let _modelLayerId = $("#modelLayerToggledId").val();
        let selectValue = $("#modelLayerToggledSelect")[0].options[$("#modelLayerToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('ModelLayerToggled', {modelId: _modelId, modelLayerId: _modelLayerId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('ModelLayerToggled', {modelId: _modelId, modelLayerId: _modelLayerId});
        }
    });
    
    $("#topologyNodeToggled").click(function(){
        let topologyNodeId = $("#topologyNodeToggledId").val();
        let selectValue = $("#topologyNodeToggledSelect")[0].options[$("#topologyNodeToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('TopologyNodeToggled', {id: topologyNodeId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('TopologyNodeToggled', {id: topologyNodeId});
        }
    });

    $("#modelTransparencyToggled").click(function(){
        let modelId = $("#modelTransparencyToggledId").val();
        let selectValue = $("#modelTransparencyToggledSelect")[0].options[$("#modelTransparencyToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('ModelTransparencyToggled', {id: modelId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('ModelTransparencyToggled', {id: modelId});
        }
    });

    $("#modelLayerTransparencyToggled").click(function(){
        let _modelId = $("#modelTransparencyToggledId1").val();
        let _modelLayerId = $("#modelLayerTransparencyToggledId").val();
        let selectValue = $("#modelLayerTransparencyToggledSelect")[0].options[$("#modelLayerTransparencyToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('ModelLayerTransparencyToggled', {modelId: _modelId, modelLayerId: _modelLayerId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('ModelLayerTransparencyToggled', {modelId: _modelId, modelLayerId: _modelLayerId});
        }
    });
 
    $("#structureSelected").click(function(){
        let structureSelectedId = $("#structureSelectedId").val();
        projectNavigationBar.sendMessage('StructureSelected', {id: structureSelectedId});
    });

    $("#structureNodeSelected").click(function(){
        let structureNodeSelectedId = $("#structureNodeSelectedId").val();
        projectNavigationBar.sendMessage('StructureNodeSelected', {id: structureNodeSelectedId});
    });

    $("#structureNodeToggled").click(function(){
        let structureNodeId = $("#structureNodeToggledId").val();
        let selectValue = $("#structureNodeToggledSelect")[0].options[$("#structureNodeToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('StructureNodeToggled', {id: structureNodeId, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('StructureNodeToggled', {id: structureNodeId});
        }
    });

    $("#filterSelected").click(function(){
        let disciplineUUID = $("#disciplineId")[0].options[$("#disciplineId")[0].selectedIndex].value;
        let filterSelectedUUID = $("#filterSelectedId").val();
        projectNavigationBar.sendMessage('FiletrSelected', {id: filterSelectedUUID, disciplineId: disciplineUUID});
    });

    $("#filterSelectedON").click(function(){
        let disciplineUUID = $("#disciplineIdON")[0].options[$("#disciplineIdON")[0].selectedIndex].value;
        let filterSelectedUUID = $("#filterSelectedIdON").val();
        projectNavigationBar.sendMessage('FiletrSelected', {id: filterSelectedUUID, disciplineId: disciplineUUID});
    });
    $("#filterNodeSelected").click(function(){
        let disciplineUUID = $("#disciplineNodeId")[0].options[$("#disciplineNodeId")[0].selectedIndex].value;
        let filterNodeSelectedUUID = $("#filterNodeSelectedId").val();
        let selectValue = $("#filterNodeSelectedSelect")[0].options[$("#filterNodeSelectedSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('FilterNodeSelected', {id: filterNodeSelectedUUID, disciplineId: disciplineUUID, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('FilterNodeSelected', {id: filterNodeSelectedUUID, disciplineId: disciplineUUID});
        }
    });
    $("#filterNodeSelectedON").click(function(){
        let disciplineUUID = $("#disciplineNodeIdON")[0].options[$("#disciplineNodeIdON")[0].selectedIndex].value;
        let filterNodeSelectedUUID = $("#filterNodeSelectedIdON").val();
        let selectValue = $("#filterNodeSelectedSelectON")[0].options[$("#filterNodeSelectedSelectON")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('FilterNodeSelected', {id: filterNodeSelectedUUID, disciplineId: disciplineUUID, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('FilterNodeSelected', {id: filterNodeSelectedUUID, disciplineId: disciplineUUID});
        }
    });

    $("#filterNodeToggled").click(function(){
        let disciplineUUID = $("#disciplineToggleNodeId")[0].options[$("#disciplineToggleNodeId")[0].selectedIndex].value;
        let filterNodeToggledUUID = $("#filterNodeToggledId").val();
        let selectValue = $("#filterNodeToggledSelect")[0].options[$("#filterNodeToggledSelect")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('FilterNodeToggled', {id: filterNodeToggledUUID, disciplineId: disciplineUUID, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('FilterNodeToggled', {id: filterNodeToggledUUID, disciplineId: disciplineUUID});
        }
    });
    $("#filterNodeToggledON").click(function(){
        let disciplineUUID = $("#disciplineToggleNodeIdON")[0].options[$("#disciplineToggleNodeIdON")[0].selectedIndex].value;
        let filterNodeToggledUUID = $("#filterNodeToggledIdON").val();
        let selectValue = $("#filterNodeToggledSelectON")[0].options[$("#filterNodeToggledSelectON")[0].selectedIndex].value;
        if(selectValue !== ""){
            projectNavigationBar.sendMessage('FilterNodeToggled', {id: filterNodeToggledUUID, disciplineId: disciplineUUID, selected: selectValue==="true"?true:false});
        }
        else{
            projectNavigationBar.sendMessage('FilterNodeToggled', {id: filterNodeToggledUUID, disciplineId: disciplineUUID});
        }
    });


})
