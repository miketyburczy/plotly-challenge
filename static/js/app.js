function metaInfo(idIn) {
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var dataId = metadata.filter(x => x.id == idIn);
        var ResultId = dataId[0];
        htmlSel = d3.select("#sample-metadata");
        Object.entries(ResultId).forEach(([key, value]) => {
            htmlSel.append("p").text(`${key}:${value}`)
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
        metaInfo(data.names[0]);
    })
}

function optionChanged(userIn) {
    barGraph(userIn);
    var panelBody = d3.select(".panel-body");
    panelBody.html("");
    metaInfo(userIn)
}

function barGraph(idInput) {
    d3.json("samples.json").then((data) => {
        var sampleValues = data.samples;
        var dataId = sampleValues.filter(x => x.id == idInput);
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

dropDown();