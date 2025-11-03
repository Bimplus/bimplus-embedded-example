define(function (require) {
  // Load websdk
  let WebSdk = require("bimplus/websdk");

  // Load Client integration
  let WebClient = require("bimplus/webclient");

  let AllplanUserManager = require('allplanUserManager');

  // Use environment dev,stage or prod
  let environment = WebClient.getUrlParameter("env");

  // Create the UserManager
  let userManager = AllplanUserManager.createUserManager(environment);

  // Initalize api wrapper
  let api = new WebSdk.Api(WebSdk.createDefaultConfig(environment));

  // Create the external client for communication with the bimplus controls
  let externalClient = new WebClient.ExternalClient("MyClient");

  // Set some control variables
  let currentTeam;
  let currentProject;
  let currentObject;
  let currentToken;

  let initializePage = async function () {
    let user = await userManager.getUser();
    if (!user || !user.access_token) {
      window.location.href = "/index.html"
    }

    currentToken = user.access_token;
    api.setAccessToken(currentToken);

      // Create the proxy classes for explorer and portal, binding it to an exisiting iframe id
    let portal = new WebClient.BimPortal(
      "bimplusPortal",
      api.getAccessToken(),
      externalClient,
      environment
    );

    let explorer = new WebClient.BimExplorer(
      "bimplusExplorer",
      api.getAccessToken(),
      externalClient,
      environment
    );

    explorer.onObjectSelected = (id /*, multiSelect, selected*/) => {
      currentObject = id;
    };

    explorer.onObjectsSelected = (ids /*, multiSelect, selected*/) => {
      alert("Objects Selected (" + ids.length + ")");
    };

    explorer.onIssueSelected = (id) => {
      alert("Selected Issue: " + id);
    };

    explorer.onPinSelected = (id) => {
      alert("Selected Pin: " + id);
    };

    explorer.onDataLoaded = () => {
      alert("Finished loading");
    };

    explorer.onClickedHyperlink = (url) => {
      alert("Clicked Hyperlink: " + url);
    };

    // Initialize the client to listen for messages
    externalClient.initialize();

    portal.onTeamChanged = (teamId) => {
      currentTeam = teamId;
    };

    portal.onProjectSelected = (prjId) => {
      currentProject = prjId;
      explorer.load(currentTeam, currentProject);
    };

    portal.load();

    $("#resetView").click(function () {
      // Send reset view message to explorer iframe
      explorer.resetView();
    });

    $("#centerObject").click(function () {
      // Send center object message to explorer iframe
      if (currentObject) {
        explorer.centerObject(currentObject, true);
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
        explorer.colorizeObjects([currentObject], "rgb(0,128,0)");
      } else {
        alert("Please select object in BimExplorer!");
      }
    });

    $("#selectObject").click(function () {
      let str = $("#objectIdInput").val();
      if (!str) {
        alert("Please provide an object id in the input field!");
        return;
      }

      explorer.selectObjects([str]);
    });

    $("#objectProperties").click(function () {
      // Send center object message to explorer iframe
      if (currentObject) {
        window.open(
          "objectProperties.html" +
            "?project=" +
            currentProject +
            "&team=" +
            currentTeam +
            "&object=" +
            currentObject +
            "&env=" +
            environment,
          "_blank",
          "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=400,height=850"
        );
      } else {
        alert("Please select object in BimExplorer!");
      }
    });
  }

  initializePage();
});
