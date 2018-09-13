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
            '#ffffff00',
            '#84EE3E'
          ],
          borderColor: '#777991',
          hoverBorderColor: '#00d2ff',
          hoverBackgroundColor: '#55566c'
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
              fontSize: 20,
              fontColor: '#eaeaed',
              fontFamily: 'Montserrat'
            },
            legend: {
              display: true,
              position: 'bottom',
              fontFamily: 'Montserrat',
              color: '#eaeaed'
            },
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default TribeVsUserChart;
