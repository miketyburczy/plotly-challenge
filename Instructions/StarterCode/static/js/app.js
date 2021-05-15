function barGraph(id) {
    d3.json("samples.json").then((data)) => {
        var dataId = dataSamples.filter(x => x.id == id)
        var sample_values = data.samples;
        var otu_labels = dataId [0].otu_labels;
        var otu_values = dataId[0].sample_values;
        var otu_ids = dataId[0].otu_ids;
        var yValues = otu_ids.slice(0,10).map(x => "OTU" + x).reverse()

        var Trace1 = {
            type: "bar",
            x: otu_values.slice(0, 10).reverse(), 
            y: yValues, 
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        };
        ]
    }
}