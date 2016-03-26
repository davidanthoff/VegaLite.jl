//#!/usr/bin/env node
// Render a Vega specification to SVG
vg = require('vega')


var spec = {
    "width": 400,
    "height": 400,
    "data": [
      {
        "name": "table",
        "values": [12, 23, 47, 6, 52, 19],
        "transform": [{"type": "pie", "field": "data"}]
      }
    ],
    "scales": [
      {
        "name": "r",
        "type": "sqrt",
        "domain": {"data": "table", "field": "data"},
        "range": [20, 100]
      }
    ],
    "marks": [
      {
        "type": "arc",
        "from": {"data": "table"},
        "properties": {
          "enter": {
            "x": {"field": {"group": "width"}, "mult": 0.5},
            "y": {"field": {"group": "height"}, "mult": 0.5},
            "startAngle": {"field": "layout_start"},
            "endAngle": {"field": "layout_end"},
            "innerRadius": {"value": 20},
            "outerRadius": {"scale": "r", "field": "data"},
            "stroke": {"value": "#fff"}
          },
          "update": {
            "fill": {"value": "#ccc"}
          },
          "hover": {
            "fill": {"value": "pink"}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "table"},
        "properties": {
          "enter": {
            "x": {"field": {"group": "width"}, "mult": 0.5},
            "y": {"field": {"group": "height"}, "mult": 0.5},
            "radius": {"scale": "r", "field": "data", "offset": 8},
            "theta": {"field": "layout_mid"},
            "fill": {"value": "#000"},
            "align": {"value": "center"},
            "baseline": {"value": "middle"},
            "text": {"field": "data"}
          }
        }
      }
    ]
  }

render(spec);

function render(spec) {
  vg.parse.spec(spec, function(chart) {
    var view = chart({ renderer: "svg" })
      .update();

    var svg = view.svg()
    process.stdout.write(svg);
 });
  //  var canvas = view.canvas();
    // do something with the node-canvas instance...
}
