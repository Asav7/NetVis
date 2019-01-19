// exportArea = document.getElementById("json-text-area");


// function exportNetwork() {

//     var nodes = objectToArray(network.getPositions());

//     nodes.forEach(addConnections);

//     // pretty print node data
//     var exportValue = JSON.stringify(nodes, undefined, 2);

//     exportArea.value = exportValue;

//     resizeExportArea();
// }


// function addConnections(elem, index) {
//     // need to replace this with a tree of the network, then get child direct children of the element
//     elem.connections = network.getConnectedNodes(index);
// }



exportArea = document.getElementById("json-text-area");

generateJSONbutton = document.getElementById("generate-json");
generateJSONbutton.addEventListener("click", generateJSON);

function generateJSON(e) {
	e.preventDefault();
	exportArea.value = network.nodes;
}