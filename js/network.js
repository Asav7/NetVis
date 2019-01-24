"use strict";

(function() {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////    Configure Network    ///////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    let network;
    let nodes;
    let edges;

    // define some data for testing
    nodes = new vis.DataSet([
        {id: 1, label: 'Node 1', x: 0, y: 0, shape: "dot"},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'}
    ]);
    edges = new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
    ]);

    // Define variables necessary to create network
    let container = document.getElementById('mynetwork');
    let data = {
        nodes: nodes,
        edges: edges
    };
    let options = {
        manipulation: {
            enabled: true,
            editNode: editNode,
            addNode: addNode,
        },
        physics: {
            enabled: false
        }
    };

    // Function for drawNetworking the network
    function drawNetwork({nodes: nodesDataset, edges: edgesDataset}) {
        network = new vis.Network(container, {nodes: nodesDataset, edges: edgesDataset} , options);
    }
    drawNetwork({nodes: nodes, edges: edges});


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////    Edit Mode Functions    /////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    let nodeModal = document.getElementById("new-node-modal");
    let saveNodeModal = document.getElementById("save-node-adding-button")
    let cancelNodeModal = document.getElementById("cancel-node-adding-button")
    let modalHeader = document.querySelector("#new-node-modal h3")
    let labelIn = document.getElementById("input-label")
    let titleIn = document.getElementById("input-title")
    let groupIn = document.getElementById("input-group")
    let shapeIn = document.getElementById("input-nodeShape")

    function editNode(data, callback) {
        // Show modal with proper title
        modalHeader.innerText = "Edit node";
        nodeModal.style.display = "block";
        // Fill modal with data
        labelIn.value = data.label;
        titleIn.value = data.title ? data.title : "";
        groupIn.value = data.group;
        shapeIn.value = data.shape;
        // Add events
        saveNodeModal.onclick = saveEditedNode.bind(this, data, callback);
        cancelNodeModal.onclick = cancelNodeAction.bind(this, data, callback)
        //
        function saveEditedNode(data, callback) {
            // Set nodes data to those specified by user
            data.label = labelIn.value;
            data.title = titleIn.value; 
            data.group = groupIn.value;
            data.shape = shapeIn.value;
            // Callback (edit node) and hide modal
            callback(data);
            nodeModal.style.display = "none";
        }
    }

    // Function for adding nodes (given to network.options.manipulation.addNode)
    function addNode(data, callback) {
        // Show modal with proper title
        modalHeader.innerText = "Add node";
        nodeModal.style.display = "block";
        // Clear input fields
        labelIn.value = "";
        titleIn.value = "";
        groupIn.value = "";
        shapeIn.value = "";
        // Add events
        saveNodeModal.onclick = saveAddedNode.bind(this, data, callback);
        cancelNodeModal.onclick = cancelNodeAction.bind(this, data, callback)
        //
        function saveAddedNode(data, callback) {
            // Get user's data
            data.label = labelIn.value;
            data.title = titleIn.value; 
            data.group = groupIn.value;
            data.shape = shapeIn.value;
            // Callback (create node) and hide modal
            callback(data);
            nodeModal.style.display = "none";
        }
    }

    function cancelNodeAction(data, callback) {
        callback(null);
        nodeModal.style.display = "none";
    }


    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////    Exporting and Importing    /////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    function exportNetwork() {
        let nodesData = [];
        // TODO: Fix this iteration
        for (let index in network.body.nodeIndices) {
            let nodeID = network.body.nodeIndices[index];
            let netNode = network.body.nodes[nodeID].options
            let node = {};
            node.id = nodeID;
            node.label = netNode.label;
            node.title = netNode.title ? netNode.title : "";
            node.shape = netNode.shape;
            node.group = netNode.group;
            node.x = network.getPositions(nodeID)[nodeID].x;
            node.y = network.getPositions(nodeID)[nodeID].y;
            nodesData.push(node)
        }
        let edgesData = [];
        for (let edgeID in network.body.edges) {
            let edge = {};
            edge.from = network.body.edges[edgeID].fromId;
            edge.to = network.body.edges[edgeID].toId;
            edgesData.push(edge);
        }
        return {nodesData: nodesData, edgesData: edgesData}
    }

    let exportArea = document.getElementById('json-text-area');
    let exportAreaEdges = document.getElementById('json-text-area-edges');
    let exportButton = document.getElementById('generate-json');
    exportButton.onclick = function() {
        let {nodesData, edgesData} = exportNetwork();
        exportArea.value = JSON.stringify(nodesData, undefined, 2);
        exportAreaEdges.value = JSON.stringify(edgesData, undefined, 2);
    }

    let importButton = document.getElementById('generate-net-from-json');
    importButton.onclick = function() {
        network.destroy();
        let newNetNodes = JSON.parse(exportArea.value);
        let newEdges = JSON.parse(exportAreaEdges.value);
        drawNetwork({nodes: newNetNodes, edges: newEdges})
    }

    let downloadButton = document.getElementById('download-json');
    downloadButton.onclick = function() {
        let {nodesData, edgesData} = exportNetwork();
        // Create JSON file with nodes and edges
        let data = JSON.stringify({nodes: nodesData, edges: edgesData});
        // Create temporary <a> element with link to generated JSON file and download said file
        let element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        element.setAttribute('download', "Network.json");
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // Import Button function for importing network stored in JSON file
    let importFileButton = document.getElementById("import-json");
    importFileButton.onclick = function() {
        let files = document.getElementById('selectFile').files;
        if (files.length <= 0) {return false;}
      
        let fr = new FileReader();
        fr.onload = function(e) { 
            let result = JSON.parse(e.target.result);
            let formatted = JSON.stringify(result, null, 2);
            drawNetwork({nodes: result.nodes, edges: result.edges});
        }
        fr.readAsText(files.item(0));
    };
})();
