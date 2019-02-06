"use strict";

// (function() {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////    Configure Network    ///////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    let network;
    let nodes;
    let edges;

    // define some data for testing
    nodes = new vis.DataSet([
        {id: 1, label: 'Node 1', x: 0, y: 0, shape: "dot"},
        {id: 2, label: 'Node 2', shape: "dot"},
        {id: 3, label: 'Node 3', shape: "dot"},
        {id: 4, label: 'Node 4', shape: "dot"},
        {id: 5, label: 'Node 5', shape: "dot"}
    ]);
    edges = new vis.DataSet([
        {from: 1, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5},
    ]);

    // Define variables necessary to create network
    let container = document.getElementById('mynetwork');

    let options = {
        manipulation: {
            enabled: true,
            editNode: editNode,
            addNode: addNode,
            },
        physics: {
            enabled: false,
            barnesHut: {
                gravitationalConstant: -90000,
                springConstant: 0.1,
                springLength: 300,
                centralGravity: 0.1,
                avoidOverlap: 0.5,
                },
            stabilization: {
                },
            maxVelocity: 50,
            minVelocity: 10000,
            },
        nodes: {
            scaling: {
                min: 5,
                max: 150,
                label: {
                    enabled: true,
                    max: 120,
                    },
                },
            font: {
                color: "#888888",
                size: 20,
                face: "Arial",
                },
			borderWidth: 2,
            },
        edges: {
            width: 4,
            // inheritColor: "from",
//			style: "dash",
			selectionWidth: 6,
			smooth: {
			    enabled: true,
			    roundness: 0.5,
			    type: 'discrete',
			    }

			},
        // groups: {
        //         13: {
        //             color: {
        //                     border: "#2ae957",
        //                     background: "#a2e5b2",
        //                     highlight: {border: "#2ae957", background: "#a2e5b2"},
        //                     hover: {border: "#2ae957", background: "#2ae957"},
        //             },
        //             font: {
        //                 color: "rgba(255,255,255,1)",
        //                 size: 12,
        //                 face: "Tahoma",
        //             },
        //         },
        //         44: {
        //             borderWidth: 0.0,
        //             color: {
        //                     border: "rgba(255,255,255,1)",
        //                     background: "rgba(0,0,0,0)",
        //                    highlight: {border: "#2ae957", background: "#a2e5b2"},
        //                     hover: {border: "#2ae957", background: "#2ae957"},
        //             },
        //             font: {
        //                 color: "rgba(255,255,255,1)",
        //                 size: 12,
        //                 face: "Tahoma",
        //             },
        //         },
        //         dog: {
        //             color: {
        //                     border: "yellow",
        //                     background: "#a2e5b2",
        //                     highlight: {border: "#2ae957", background: "#a2e5b2"},
        //                     hover: {border: "#2ae957", background: "#2ae957"},
        //             },
        //             font: {
        //                 color: "rgba(0,0,0,0.9)",
        //                 size: 12,
        //                 face: "Tahoma",
        //             },
        //         },
        //         3: {color: {
        //                     border: "yellow",
        //                     background: "#a2e5b2",
        //                     highlight: {border: "#2ae957", background: "#a2e5b2"},
        //                     hover: {border: "#2ae957", background: "#2ae957"},
        //                 },
        //             font: {
        //                 color: "#999999",
        //                 size: 20,
        //                 face: "Tahoma",
        //         },
        //         }, // blue
        //         1: {color: {
        //                 border: "#FFA500",
        //                 background: "#FFFF00",
        //                 highlight: { border: "#FFA500", background: "#FFFFA3" },
        //                 hover: { border: "#FFA500", background: "#FFFFA3" }, // 1: yellow
        //                 },
        //             font: {
        //                 color: "#999999",
        //                 size: 40,
        //                 face: "Tahoma",
        //         },
        //         }, // blue
        //         2: {color: {
        //                 border: "#FA0A10",
        //                 background: "#FB7E81",
        //                 highlight: { border: "#FA0A10", background: "#FFAFB1" },
        //                 hover: { border: "#FA0A10", background: "#FFAFB1" }
        //                 },
        //             font: {
        //                 color: "#999999",
        //                 size: 20,
        //                 face: "Tahoma",
        //         },
        //         }, // blue
        //     },
            groups: {
                44: {
                    borderWidth: 0.7,
                    color: {
                        background: "rgba(0, 0, 0, 0)",
                        border: "#ccc"
                    },
                    font: {color: '#FFF'},

                },
                6: {
                    color: "#4cf",
                },
                5: {
                    color: "#d35",
                },
                7: {
                    color: "#2b6",
                },
            },
        interaction: {
            hover: true,
            tooltipDelay: 300,
            navigationButtons: false,
            hideEdgesOnDrag: true,
            },
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
    let valueIn = document.getElementById("input-nodeSize")

    function editNode(data, callback) {
        // Show modal with proper title
        modalHeader.innerText = "Edit node";
        nodeModal.style.display = "block";
        // Fill modal with data
        labelIn.value = data.label;
        titleIn.value = data.title ? data.title : "";
        groupIn.value = data.group;
        shapeIn.value = data.shape;
        valueIn.value = data.value;
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
            data.value = valueIn.value;
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
        valueIn.value = "";
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
            data.value = valueIn.value;
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
            node.value = netNode.value;
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

    let editModeButton = document.getElementById("editmode");
    editModeButton.onclick = function() {
        if (network.manipulation.editMode) {
            network.disableEditMode();
            this.classList.remove("btn-success");
            this.classList.add("btn-secondary");
        } else {
            network.enableEditMode();
            this.classList.remove("btn-secondary");
            this.classList.add("btn-success");
        }
    }

    let topMenu = document.getElementById("json-buttons");
    let hideButton = document.getElementById("hide");
    let showButton = document.getElementById("show");
    hideButton.onclick = function() {
        topMenu.style.display = "none";
        showButton.style.display = "block";
    }
    showButton.onclick = function() {
        console.log("go")
        topMenu.style.display = "block";
        showButton.style.display = "none";
    }

// })();
