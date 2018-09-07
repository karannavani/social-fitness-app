import React from 'react';
import { Pie } from 'react-chartjs-2';

class TribeVsUserChart extends React.Component{
  state = {
    chartData: {
      labels: ['Your Tribesmen', 'You'],
      datasets: [
        {
          label: 'grit',
          data: [],
          backgroundColor: [
            '#222325',
            '#00d98b'
          ]
        }
      ]
    }
  };

  componentDidMount() {
    const chartData = this.state.chartData;
    chartData.datasets[0].data.push(this.props.tribeGrit);
    chartData.datasets[0].data.push(this.props.userGrit);
    this.setState({ chartData: chartData });
  }

  render() {
    return(
      <div>
        <Pie
          data={this.state.chartData}
          width={100}
          height={250}
          options={{
            title: {
              display: true,
              text: 'Your contribution to the tribe',
              fontSize: 20
            },
            legend: {
              display: true,
              position: 'bottom'
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default TribeVsUserChart;
