import React, { Component } from "react";
// import {Chart} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

const data = {
  datasets: [
    {
      label: "BSI 916",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      lineTension: 0,
      data: []
    },
    {
      label: "18k",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(0,255,0,0.3)",
      lineTension: 0,
      data: []
    }
  ]
};

const options = {
  scales: {
    xAxes: [
      {
        type: "realtime",
        realtime: {
          onRefresh: function () {
            data.datasets[0].data.push({
              x: Date.now(),
              y: Math.random() * 100
            });
            data.datasets[1].data.push({
              x: Date.now(),
              y: Math.random() * 50
            });
          },
          delay: 2000
        }
      }
    ]
  }
};

class LineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
  }

  componentDidMount() {
    const chartCanvas = this.chartRef.current.getContext("2d");
    this.chart = new Chart(chartCanvas, {
      type: "line",
      data: data,
      options: options
    });
  }

  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    return (
      <div>
        <canvas ref={this.chartRef} width="600" height="150"></canvas>
      </div>
    );
  }
}

export default LineChart;
