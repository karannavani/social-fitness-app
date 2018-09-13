import React from 'react';
import { Line } from 'react-chartjs-2';

// get average daily grit of each tribe members
// plot a line of daily grit
// repeat for current user using actual daily grit

export default class UserGritVsTime extends React.Component{
  state = {
    chartData: {
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
      datasets: [
        {
          label: 'grit earned',
          data: [],
          lineTension: 0,
          backgroundColor: [
            '#84EE3E'
          ],
          fill: false,
          cubicInterpolationMode: 'default'
        },
        {
          label: 'grit available',
          data: [ 25, 59, 72, 96, 135, 170, 257, 280, 294, 337, 410, 437, 468, 546],
          lineTension: 0,
          backgroundColor: [
            '#00d2ff'
          ],
          fill: false
        }
      ]
    }
  };

  componentDidMount() {
    const chartData = this.state.chartData;
    chartData.datasets[0].data = this.props.userGritHistory;
    // chartData.datasets[1].data = this.props.userAvailableGrit; // this would make the grit available work dynamically if handed in on props from dataviz.js
    this.setState({ chartData });
  }

  render() {
    return(
      <div>
        {this.state.chartData.datasets[0].data &&
        <Line
          data={this.state.chartData}
          width={100}
          height={250}
          options={{
            title: {
              display: true,
              text: '14 days of Grit',
              fontSize: 20,
              fontColor: '#eaeaed'
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            maintainAspectRatio: false
          }}
        />}
      </div>
    );
  }
}
