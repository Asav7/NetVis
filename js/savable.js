(function() {
	function exportNetwork() {
		let nodesData = [];
		// TODO: Fix this iteration
		for (index in network.body.nodeIndices) {
			nodeID = network.body.nodeIndices[index];
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
		for (edgeID in network.body.edges) {
			let edge = {};
			edge.from = network.body.edges[edgeID].fromId;
			edge.to = network.body.edges[edgeID].toId;
			edgesData.push(edge);
		}
		return {nodesData: nodesData, edgesData: edgesData}
	}

	exportArea = document.getElementById('json-text-area');
	exportAreaEdges = document.getElementById('json-text-area-edges');
	exportButton = document.getElementById('generate-json');
	exportButton.onclick = function() {
		({nodesData, edgesData} = exportNetwork());
		exportArea.value = JSON.stringify(nodesData, undefined, 2);
		exportAreaEdges.value = JSON.stringify(edgesData, undefined, 2);
	}

	importButton = document.getElementById('generate-net-from-json');
	importButton.onclick = function() {
		network.destroy();
		let newNetNodes = JSON.parse(exportArea.value)
		data.nodes = new vis.DataSet(newNetNodes);

		let newEdges = JSON.parse(exportAreaEdges.value)
		data.edges = new vis.DataSet(newEdges);
		draw();
	}

	downloadButton = document.getElementById('download-json');
	downloadButton.onclick = function() {
		({nodesData, edgesData} = exportNetwork());
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
	document.getElementById("import-json").onclick = function() {
		let files = document.getElementById('selectFile').files;
		if (files.length <= 0) {return false;}
	  
	  	let fr = new FileReader();
	  	fr.onload = function(e) { 
	    	let result = JSON.parse(e.target.result);
	    	let formatted = JSON.stringify(result, null, 2);
	  		data.nodes = result.nodes;
	  		data.edges = result.edges;
	  		draw();
	  	}
	  	fr.readAsText(files.item(0));
	};
})();