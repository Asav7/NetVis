let network;
let nodes;
let edges;

// define some nodes for testing
nodes = new vis.DataSet([
    {id: 1, label: 'Node 1', x: 0, y: 0, shape: "dot"},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// define some edges for testing
edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5},
]);

// localize containter for network
let container = document.getElementById('mynetwork');

// provide the data in the vis format
let data = {
    nodes: nodes,
    edges: edges
};

// set options
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

const nodeModal = document.getElementById("new-node-modal");

function editNode(data, callback) {
    // Show modal with proper title
    document.querySelector("#new-node-modal h3").innerText = "Edit node";
    nodeModal.style.display = "block";
    // Fill modal with data
    document.getElementById("input-label").value = data.label;
    document.getElementById("input-title").value = data.title ? data.title : "";
    document.getElementById("input-group").value = data.group;
    document.getElementById("input-nodeShape").value = data.shape;
    // Add events
    document.getElementById("save-node-adding-button").onclick = saveEditedNode.bind(this, data, callback);
    cancelNodeModal.onclick = cancelAddNode.bind(this, data, callback)
}

function saveEditedNode(data, callback) {
    // Sed nodes data to those specified by user
    data.label = document.getElementById("input-label").value;
    data.title = document.getElementById("input-title").value; 
    data.group = document.getElementById("input-group").value;
    data.shape = document.getElementById("input-nodeShape").value;
    // Callback (edit node) and hide modal
    callback(data);
    nodeModal.style.display = "none";
}

// Function for adding nodes (given to network.options.manipulation.addNode)
function addNode(data, callback) {
    // Show modal with proper title
    document.querySelector("#new-node-modal h3").innerText = "Add node";
    nodeModal.style.display = "block";
    // Clear input fields
    document.getElementById("input-label").value = "";
    document.getElementById("input-title").value = "";
    document.getElementById("input-group").value = "";
    document.getElementById("input-nodeShape").value = "";
    // Add events
    document.getElementById("save-node-adding-button").onclick = saveAddedNode.bind(this, data, callback);
    cancelNodeModal.onclick = cancelAddNode.bind(this, data, callback)
}

// Prevent refreshing for Save and Cancel buttons in nodeModal
saveNodeModal = document.getElementById("save-node-adding-button")
cancelNodeModal = document.getElementById("cancel-node-adding-button")
saveNodeModal.addEventListener("click", (e) => {e.preventDefault()})
cancelNodeModal.addEventListener("click", (e) => {e.preventDefault()})

function saveAddedNode(data, callback) {
    // Get user's data
    data.label = document.getElementById("input-label").value;
    data.title = document.getElementById("input-title").value; 
    data.group = document.getElementById("input-group").value;
    data.shape = document.getElementById("input-nodeShape").value;
    // Callback (create node) and hide modal
    callback(data);
    nodeModal.style.display = "none";
}

function cancelAddNode(data, callback) {
    callback(null);
    nodeModal.style.display = "none";
}

// Draw network
function draw() {
    network = new vis.Network(container, data, options);
}

draw();