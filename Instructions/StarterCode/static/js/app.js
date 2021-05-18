function metaInfo(idInput) {
    d3.json("samples.json").then((data) => {
        var metaData = data.metaData;
        var dataId = metadata.filter(x => x.id == idInput);
        var ResultId = dataId[0];
        htmlEntry = d3.select("#sample-metadata");
        Object.entries(ResultId).forEach(([key, value]) => {
            htmlEntry.append("p").text(`${key}:${value}`)
        });
    });
};

function dropDown() {
    d3.json("samples.json").then((data) => {
        var names = data.names;
        names.forEach((name) => {
            d3.select("#selDataset").append("option").text(name).property("value", name);
        });
        barGraph(data.names[0]);
    })
}

function optionChanged(UserIn) {
    barGraph(userIn);
    var panelBody = d3.select(".panel-body");
    panelBody.html("");
    metaInfo(userIn)
}

function barGraph(idIn) {
    d3.json("samples.json").then((data_js) => {
        var dataId = dataSamples.filter(x => x.id == idIn);
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
            title: "Top 10 OTUs"
        };
        var data = [Trace1];
        Plotly.newPlot("bar", data, barLayout);

        var bubbleGraph = {
            x: otu_ids,
            y: otu_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: otu_values,
                color: otu_ids,
                colorscale: "Portland"
            }
        }
            var bubbleLayout = {
                title: "Samples",
                hovermode: "closest"
            }
        Plotly.newPlot("bubble", [bubbleGraph], bubbleLayout);
    });
};

