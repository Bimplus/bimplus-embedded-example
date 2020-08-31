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
  var currentTeam;
  var currentProject;
  var currentObject;
  var currentToken;

  var portal;
  var explorer;

  // Create the external client for communication with the bimplus controls
  var externalClient = new WebClient.ExternalClient("MyClient");

  // Make authorization request to Bimplus, providing user name, password and application id
  api.authorize.post('demoEmail@allplan.com', 'password', '5F43560D-9B0C-4F3C-85CB-B5721D098F7B').done(function (data, status, xhr) {
    api.setAccessToken(data.access_token);
    currentToken = data.access_token;

    // Create the proxy classes for explorer and portal, binding it to an exisiting iframe id
    portal = new WebClient.BimPortal('bimplusPortal', api.getAccessToken(), externalClient, environment);
    explorer = new WebClient.BimExplorer('bimplusExplorer', api.getAccessToken(), externalClient, environment);

    explorer.onObjectSelected = (id/*, multiSelect, selected*/)=>{
      currentObject = id;
    }

    explorer.onObjectsSelected = (ids/*, multiSelect, selected*/)=>{
      alert("Objects Selected ("+ids.length+")");
    }

    explorer.onIssueSelected = (id)=>{
      alert("Selected Issue: "+id);
    }

    explorer.onPinSelected = (id)=>{
      alert("Selected Pin: "+id);
    }

    explorer.onDataLoaded = ()=>{
      alert("Finished loading");
    }

    explorer.onClickedHyperlink = (url)=>{
      alert("Clicked Hyperlink: "+url);
    }

    // Initialize the client to listen for messages
    externalClient.initialize();

    portal.onTeamChanged = (teamId)=>{
      currentTeam = teamId;
    };

    portal.onProjectSelected = (prjId)=>{
      currentProject = prjId;
      explorer.load(currentTeam, currentProject);
    }

    portal.load();

  }).fail(function (data) {
    // Authorization failed
    alert("Login to Bimplus failed!");
  });;

  $("#resetView").click(function () {
    // Send reset view message to explorer iframe
    explorer.resetView();
  });

  $("#centerObject").click(function () {
    // Send center object message to explorer iframe
    if (currentObject) {
      explorer.centerObject(currentObject,true);
    } else {
      alert("Please select object in BimExplorer!");
    }
  });

  $("#colorizeObject").click(function () {
    // Send center object message to explorer iframe
    if (currentObject) {

      // Unselect current object
      explorer.selectObjects([]);
      
      // Set object color to dark green
      explorer.colorizeObjects( [currentObject],"rgb(0,128,0)");
    } else {
      alert("Please select object in BimExplorer!");
    }
  });

  $("#objectProperties").click(function () {
    // Send center object message to explorer iframe
    if (currentObject) {
      window.open('objectProperties.html?token=' + currentToken + '&project=' + currentProject + '&team=' + currentTeam + '&object=' + currentObject, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=850');
    } else {
      alert("Please select object in BimExplorer!");
    }
  });
  $("#projectNavigationBar").click(function () {
    // Send center object message to explorer iframe
    if (currentProject) {
      window.open('projectNavigationBar.html?token=' + currentToken + '&project=' + currentProject + '&team=' + currentTeam, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=250,height=850');
    } else {
      alert("Please open project!");
    }
  });
});