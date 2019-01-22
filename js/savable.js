
var exportArea;
var importButton;
var exportButton;

draw()


function init() {
    container = document.getElementById('mynetwork');
    exportArea = document.getElementById('json-text-area');
    exportAreaEdges = document.getElementById('json-text-area-edges');
    exportButton = document.getElementById('generate-json');
    importButton = document.getElementById('generate-net-from-json');
}

function addConnections(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = network.getConnectedNodes(index);
}


function objectToArray(obj) {
    return Object.keys(obj).map(function (key) {
      obj[key].id = key;
      return obj[key];
    });
}

///////////////////////////

// create array for nodes
var nodesData;
var edgesData;


function exportNetwork() {
	nodesData = [];
	for (index in network.body.nodeIndices) {
		nodeID = network.body.nodeIndices[index];
		var netNode = network.body.nodes[nodeID].options
		var node = {};
		node.id = nodeID;
		node.label = netNode.label;
		node.title = netNode.title ? netNode.title : "";
		node.shape = netNode.shape;
		node.group = netNode.group;
		node.x = network.getPositions(nodeID)[nodeID].x;
		node.y = network.getPositions(nodeID)[nodeID].y;
		nodesData.push(node)
	}
	edgesData = [];
	for (edgeID in network.body.edges) {
		var edge = {};
		edge.from = network.body.edges[edgeID].fromId;
		edge.to = network.body.edges[edgeID].toId;
		edgesData.push(edge);
	}

}


function writeDownNetwork(e) {
	e.preventDefault;
	exportNetwork();
	exportArea.value = JSON.stringify(nodesData, undefined, 2);
	exportAreaEdges.value = JSON.stringify(edgesData, undefined, 2);
}

// Generate network from file
function generateNetwork(e) {
	e.preventDefault();
	network.destroy();
	var newNetNodes = JSON.parse(exportArea.value)
	console.log(newNetNodes)
	data.nodes = new vis.DataSet(newNetNodes);

	// TODO: take data from exportArea not from variable directly
	var newEdges = JSON.parse(exportAreaEdges.value)
	data.edges = new vis.DataSet(newEdges);
	draw();
}

init();  // this creates buttons
exportButton.addEventListener("click", writeDownNetwork)
importButton.addEventListener("click", generateNetwork)


//





