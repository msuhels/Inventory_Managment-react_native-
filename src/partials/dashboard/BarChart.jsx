/* App.js */
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Barchart({data}) {
  const options = {
    title: {
      text: "Basic Column Chart in React"
    },
    data: [{
      type: "column",
      dataPoints: data
    }]
  }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>
    );



}
export default Barchart;