
var exportArea;
var importButton;
var exportButton;

draw()


function init() {
    container = document.getElementById('mynetwork');
    exportArea = document.getElementById('json-text-area');
    exportButton = document.getElementById('generate-json');
    importButton = document.getElementById('generate-net-from-json');
}

function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = network.getConnectedNodes(index);
}

function clearOutputArea() {
    exportArea.value = "";
}

// function exportNetwork() {
//     clearOutputArea();

//     var nodes = objectToArray(network.getPositions());

//     nodes.forEach(addConnections);

//     // pretty print node data
//     var exportValue = JSON.stringify(nodes, undefined, 2);

//     exportArea.value = exportValue;

// }




function objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
      obj[key].id = key;
      return obj[key];
    });
}

///////////////////////////

// create array for nodes
var nodesData;


function exportNetwork() {
	nodesData = [];
	for (index in network.body.nodeIndices) {
		nodeID = network.body.nodeIndices[index];
		var netNode = network.body.nodes[nodeID].options
		node = {};
		node.id = nodeID;
		node.label = netNode.label;
		node.title = netNode.title ? netNode.title : "";
		node.shape = netNode.shape;
		node.group = netNode.group;
		node.x = network.getPositions(nodeID)[nodeID].x;
		node.y = network.getPositions(nodeID)[nodeID].y;
		nodesData.push(node)
	}
}


function writeDownNetwork(e) {
	e.preventDefault;
	exportNetwork();
	exportArea.value = JSON.stringify(nodesData, undefined, 2);
}

// Generate network from file
function generateNetwork(e) {
	e.preventDefault();
	network.destroy();
	var newNetNodes = JSON.parse(exportArea.value)
	console.log(newNetNodes)
	data.nodes = new vis.DataSet(newNetNodes);
	draw();
}

init();  // this creates buttons
exportButton.addEventListener("click", writeDownNetwork)
importButton.addEventListener("click", generateNetwork)


//





