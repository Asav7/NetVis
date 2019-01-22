
let network;
let nodes;
let edges;

// define some nodes for testing
nodes = new vis.DataSet([
    {id: 1, label: 'Node 1', x: 0, y: 0, shape: "dot", group: "dog", title: "etwas"},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: "doge", label: 'Node 5'}
]);

// define some edges for testing
edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: "doge"},
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

const addNodeModal = document.getElementById("new-node-modal");


// TODO: this has very limited functionality (edits only label); save button functionality is defined elsewere
function editNode(data, callback) {
    // TODO Change
    addNodeModal.style.display = "block";

    document.getElementById("save-node-adding-button").onclick = saveEditedNode.bind(this, data, callback);
    cancelAddNodeButton.onclick = cancelAddNode.bind(this, data, callback)
}

function saveEditedNode(data, callback) {

    // get user's node shape
    const newNodeShape = document.getElementById("add-node-shape").value; 
    data.shape = newNodeShape;

    // get user's node label
    newNodeLabel = document.getElementById("input-label").value; 
    data.label = newNodeLabel;

    // get user's node group
    data.group = document.getElementById("group-input").value;

    // callback that creates node with changed data
    callback(data);
    addNodeModal.style.display = "none";

    
}




// Function for adding nodes (given to network.options.manipulation.addNode)
function addNode(data, callback) {
    console.log("inside")
    
    addNodeModal.style.display = "block";
    document.getElementById("x-pos").value = data.x;
    document.getElementById("y-pos").value = data.y;
    document.getElementById("save-node-adding-button").onclick = saveAddNode.bind(this, data, callback);
}

// TODO: this has to be bind to edit button functinality and add node functionality, because it does not restore edit node mode
// toolbox to standard state
// Cancel event for cancel button in add node popup 
cancelAddNodeButton = document.getElementById("cancel-node-adding-button")
cancelAddNodeButton.addEventListener("click", (e) => {e.preventDefault()})
function cancelAddNode(data, callback) {
    callback(null);
    addNodeModal.style.display = "none";
}


// Save event for save button in add node popup
saveAddNodeButton = document.getElementById("save-node-adding-button")
saveAddNodeButton.addEventListener("click", (e) => {e.preventDefault()})

function saveAddNode(data, callback) {

    // get user's node shape
    newNodeShape = document.getElementById("add-node-shape").value; 
    data.shape = newNodeShape;

    // get user's group
    data.group = document.getElementById("group-input").value;

    // callback that creates node with changed data
    callback(data);
    addNodeModal.style.display = "none";
}









// initialize your network!

function draw() {
    network = new vis.Network(container, data, options);
}

// draw()
