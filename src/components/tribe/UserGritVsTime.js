import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
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
          label: 'grit',
          data: [],
          lineTension: 0,
          backgroundColor: [
            '#00d98b'
          ]
        }
      ]
    }
  };

  componentDidMount() {
    console.log('user grit from graph', this.props.userGritHistory);
    console.log('inside the if', this.props.userGritHistory);
    const chartData = this.state.chartData;
    chartData.datasets[0].data = this.props.userGritHistory;
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
              fontSize: 20
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
