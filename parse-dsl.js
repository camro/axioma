var labelTypeStyles = {
	"object":"",
	"property": "fill: #fffdcf",
	"alias": "fill: #cfffdb"
};

function toDisplayName(str) {
	// Convert camelCase to Camel Case
	// from https://stackoverflow.com/questions/4149276/how-to-convert-camelcase-to-camel-case
	return str.replace(/([A-Z])/g, ' $1')
    // uppercase the first character
    .replace(/^./, function(str){ return str.toUpperCase(); })
}

function trinityModelStringToGraph(modelString) {
	console.log("Model to graph:\n" + modelString);
	var j = parser.parse(modelString);

	var g = new dagreD3.graphlib.Graph({multigraph: true});
	g.setGraph({});
	
	for (item of j) {
		// Create nodes from object definitions
		style = labelTypeStyles[item.type];
		if (style != undefined) {
			g.setNode(item.label, { label: toDisplayName(item.label), style: style });
		}
		// Parse edges from relations
		else if (item.type == "relation") {
			var relationDisplayName = toDisplayName(item.name);
			var edgeName = item.subject + "_" + item.name + "_" + item.other;
			g.setEdge(item.subject, item.other, {label : relationDisplayName}, edgeName);
		}
	}
	
	return g;
}