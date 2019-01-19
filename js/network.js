var nodes = new vis.DataSet([
    {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
    {from: 1, to: 3},
    {from: 1, to: 2},
    {from: 2, to: 4},
    {from: 2, to: 5}
]);

// create a network
var container = document.getElementById('mynetwork');

// provide the data in the vis format
var data = {
    nodes: nodes,
    edges: edges
};
var options = {

    manipulation: {
        enabled: true,
        controlNodeStyle: {
            shape:'square',
            size:6,
            color: {
                background: '#ff0000',
                border: '#3c3c3c',
                highlight: {
                    background: '#07f968',
                    border: '#3c3c3c'
                }
            },
            borderWidth: 2,
            borderWidthSelected: 2
        },
        editNode: editNode,
        addNode: addNode,
    },

    physics: {
        enabled: false
    }


};

// TODO: implement editNode function
function editNode(data, callback) {
    console.log(data);
    console.log(callback)
}

// Function for adding nodes (given to network.options.manipulation.addNode)
function addNode(data, callback) {
    console.log("inside")
    addNodeModal = document.getElementById("new-node-modal");
    addNodeModal.style.display = "block";
    document.getElementById("x-pos").value = data.x;
    document.getElementById("y-pos").value = data.y;
    document.getElementById("save-node-adding-button").onclick = saveAddNode.bind(this, data, callback);
}


// Cancel event for cancel button in add node popup 
cancelAddNodeButton = document.getElementById("cancel-node-adding-button")
cancelAddNodeButton.addEventListener("click", cancelAddNode)
function cancelAddNode(e) {
    e.preventDefault()
    addNodeModal.style.display = "none";
}


// Save event for save button in add node popup
saveAddNodeButton = document.getElementById("save-node-adding-button")
saveAddNodeButton.addEventListener("click", (e) => {e.preventDefault()})

function saveAddNode(data, callback) {

    // get user's node shape
    newNodeShape = document.getElementById("add-node-shape").value; 
    data.shape = newNodeShape;

    // callback that creates node with changed data
    callback(data);
    addNodeModal.style.display = "none";
}






// initialize your network!
var network = new vis.Network(container, data, options);

