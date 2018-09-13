import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

export default class TribesIndex extends React.Component{
  state = {};

  componentDidMount() {
    axios.get('/api/users', Auth.bearerHeader())
      .then(res => {
        const users = res.data;
        const gargantuans = [];
        const allNaturals = [];
        const inbetweeners = [];
        users.forEach(user => {
          switch (user.tribe) {
            case 'Gargantuans' : gargantuans.push(user);
              break;
            case 'All Naturals' : allNaturals.push(user);
              break;
            case 'Inbetweeners' : inbetweeners.push(user);
              break;
          }
        });
        this.setState({
          tribeGroup: [
            {todayName: 'todaygargantuans', gritName: 'gritgargantuans',
              ageName: 'agegargantuans', heightName: 'heightgargantuans' ,
              weightName: 'weightgargantuans', users: gargantuans},

            {todayName: 'todayallNaturals', gritName: 'gritallNaturals',
              ageName: 'ageallNaturals', heightName: 'heightallNaturals' ,
              weightName: 'weightallNaturals', users: allNaturals},

            {todayName: 'todayinbetweeners', gritName: 'gritinbetweeners',
              ageName: 'ageinbetweeners', heightName: 'heightinbetweeners' ,
              weightName: 'weightinbetweeners', users: inbetweeners}
          ]
        },
        () => {
          this.state.tribeGroup.forEach(tribe => {
            this.tribeAverageWeight(tribe.users, tribe.weightName);
            this.tribeAverageHeight(tribe.users, tribe.heightName);
            this.tribeAverageAge(tribe.users, tribe.ageName);
            this.tribeAverageGrit(tribe.users, tribe.gritName);
            this.tribeEarnedToday(tribe.users, tribe.todayName);
          });
        });
      });
  }

  tribeAverageWeight = (users, name) => {
    const tribeWeight = [];
    users.forEach(member => {
      tribeWeight.push(member.weight);
      const reducedWeight = (tribeWeight.reduce((a, b) => {
        return (a + b);
      }, 0)/ tribeWeight.length);
      this.setState({ [name]: reducedWeight });
    });
  }

  tribeAverageHeight = (users, name) => {
    const tribeHeight = [];
    users.forEach(member => {
      tribeHeight.push(member.height);
      const reducedHeight = (tribeHeight.reduce((a, b) => {
        return (a + b);
      }, 0)/ tribeHeight.length);
      this.setState({ [name]: reducedHeight });
    });
  }

  tribeAverageAge = (users, name) => {
    const tribeAge = [];
    users.forEach(member => {
      tribeAge.push(member.age);
      const reducedAge = (tribeAge.reduce((a, b) => {
        return (a + b);
      }, 0)/ tribeAge.length);
      this.setState({ [name]: reducedAge });
    });
  }

  tribeAverageGrit = (users, name) => {
    const tribeGrit = [];
    users.forEach(member => {
      tribeGrit.push(member.averageGrit);
      const reducedGrit = (tribeGrit.reduce((a, b) => {
        return (a + b);
      }, 0)/ tribeGrit.length);
      this.setState({ [name]: reducedGrit });
    });
  }

  tribeEarnedToday = (users, name) => {
    const tribeToday = [];
    users.forEach(member => {
      tribeToday.push(member.dailyGrit[0].grit);
      const reducedToday = (tribeToday.reduce((a, b) => {
        return (a + b);
      }));
      this.setState({ [name]: reducedToday });
    });
  }

  render() {
    return(
      <section>
        <div className="columns">

          {this.state.heightgargantuans &&
            <div className="column card tribe-average-stats has-text-centered">
              <p className="title is-6 tribe-average-stats">Gargantuans</p>
              <p>Average Height: {this.state.heightgargantuans.toFixed(2)} cm</p>
              <p>Average weight: {this.state.weightgargantuans.toFixed(2)} kg</p>
              <p>Average Age: {this.state.agegargantuans.toFixed(0)}</p>
              <p>Average Grit: {this.state.gritgargantuans.toFixed(2)}</p>
              <p>Grit earned today: {this.state.todaygargantuans}</p>
            </div>
          }

          {this.state.heightallNaturals &&
            <div className="column card tribe-average-stats has-text-centered">
              <p className="title is-6 tribe-average-stats">All Naturals</p>
              <p>Average Height: {this.state.heightallNaturals.toFixed(2)} cm</p>
              <p>Average weight: {this.state.weightallNaturals.toFixed(2)} kg</p>
              <p>Average Age: {this.state.ageallNaturals.toFixed(0)}</p>
              <p>Average Grit: {this.state.gritallNaturals.toFixed(2)}</p>
              <p>Grit earned today: {this.state.todayallNaturals}</p>
            </div>
          }

          {this.state.heightinbetweeners &&
            <div className="column card tribe-average-stats has-text-centered">
              <p className="title is-6 tribe-average-stats">Inbetweeners</p>
              <p>Average Height: {this.state.heightinbetweeners.toFixed(2)} cm</p>
              <p>Average weight: {this.state.weightinbetweeners.toFixed(2)} kg</p>
              <p>Average Age: {this.state.ageinbetweeners.toFixed(0)}</p>
              <p>Average Grit: {this.state.gritinbetweeners.toFixed(2)}</p>
              <p>Grit earned today: {this.state.todayinbetweeners}</p>
            </div>
          }

        </div>
      </section>
    );
  }
}
