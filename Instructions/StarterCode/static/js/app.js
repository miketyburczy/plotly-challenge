function metaInfo(id) {
    d3.json("samples.json").then((data) => {
        var metaData = data.metaData;
        //console.log(metaData)
        var filterValue = metaData.filter(info => info.id.toString() === id)[0];
        var table = d3.select("#sample-metadata");
        table.html("");
        Object.defineProperties(filterValue).forEach((key) => {
            table.append("p").text(key[0] + ":" + key[1])
        });
    });
};
function barGraph(id) {
    d3.json("samples.json").then((data)) => {
        var dataId = dataSamples.filter(x => x.id == id);
        var sample_values = data.samples;
        var otu_labels = dataId[0].otu_labels;
        var otu_values = dataId[0].sample_values;
        var otu_ids = dataId[0].otu_ids;
        var yValues = otu_ids.slice(0, 10).map(x => "OTU" + x).reverse()

        var Trace1 = {
            type: "bar",
            x: otu_values.slice(0, 10).reverse(),
            y: yValues,
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };
        var barLayout = {
            title: Top 10 OTUs
        };
        var data = [Trace1];
        Plotly.newPlot("bar", data, barLayout);

        var bubbleGraph = {
            x: otu_ids,
            y: otu_values,
            text: otu_labels,
            mode: markers,
            marker: {
                size: otu_values,
                color: otu_ids,
                colorscale: Portland,
            },
        var bubbleLayout = {
                title: Samples
            },
        Plotly.newPlot("bubble", [bubbleGraph], bubbleLayout)
        };
    };
};

