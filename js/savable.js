
var exportArea;
var importButton;
var exportButton;
var downloadButton;

draw()


function init() {
    container = document.getElementById('mynetwork');
    exportArea = document.getElementById('json-text-area');
    exportAreaEdges = document.getElementById('json-text-area-edges');
    exportButton = document.getElementById('generate-json');
    importButton = document.getElementById('generate-net-from-json');
    downloadButton = document.getElementById('download-json');
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
	let newNetNodes = JSON.parse(exportArea.value)
	data.nodes = new vis.DataSet(newNetNodes);

	let newEdges = JSON.parse(exportAreaEdges.value)
	data.edges = new vis.DataSet(newEdges);
	draw();
}

init();  // this creates buttons
exportButton.addEventListener("click", writeDownNetwork)
importButton.addEventListener("click", generateNetwork)


// Download Network to JSON file
function downloadNetwork(e) {
	e.preventDefault();
	exportNetwork();
	// Create JSON with nodes and edges
	var data = JSON.stringify({nodes: nodesData, edges: edgesData});
	download("file.json", data);
}

downloadButton.addEventListener("click", downloadNetwork);

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Upload Network from file
function generateNetworkFromFile(e) {
	e.preventDefault();
	if (network) {network.destroy()};
	let newNetNodes = JSON.parse(exportArea.value)
	data.nodes = new vis.DataSet(newNetNodes);

	let newEdges = JSON.parse(exportAreaEdges.value)
	data.edges = new vis.DataSet(newEdges);
	draw();
}

uploadButton = document.getElementById("import-json")


uploadButton.onclick = function(e) {
	e.preventDefault();
	var files = document.getElementById('selectFile').files;
  if (files.length <= 0) {
    return false;
  }
  
  var fr = new FileReader();
  
  fr.onload = function(e) { 
    var result = JSON.parse(e.target.result);
    var formatted = JSON.stringify(result, null, 2);
  	data.nodes = result.nodes;
  	data.edges = result.edges;
  	draw();
  }
  
  fr.readAsText(files.item(0));
};