import React from 'react';
import FormInput from '../common/FormInput';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import Validate from '../../lib/Validate';
import Id from '../../lib/Id';
import Request from '../../lib/Request';

export default class ExercisePlanNew extends React.Component {
  state = {
    validStartDate: false
  }

  componentDidMount(){
    axios.get(`/api/exerciseplans/${Auth.currentUserId()}/active`, Auth.bearerHeader())
      .then(res => this.setState({usersActivePlanStartDate: res.data}, ()=> {
        if (this.state.usersActivePlanStartDate.length) {
          this.setState({usersActivePlanStartDate: res.data[0].startDate});
        } else {
          this.setState({ autoValidate: true, usersActivePlanStartDate: false });
        }
      }));

    axios.get(`/api/exerciseplans/${Auth.currentUserId()}/future`, Auth.bearerHeader())
      .then(res => this.setState({futurePlans: res.data}))
      .catch(err => console.log('the get future plans error is ', err));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const planId = Id.create();
    const newPlanData = this.state;

    newPlanData._id = planId;
    newPlanData.user = Auth.currentUserId();

    const feedBody = {
      user: Auth.currentUserId(),
      type: 'createPlan',
      exercisePlanId: planId
    };
    Request.updateFeed(feedBody);

    axios.post('/api/exerciseplans', newPlanData, Auth.bearerHeader())
      .then(res => console.log('res is', res))
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.log('adoption error message: ', err));

    if(this.state.autoValidate) {
      axios.post(`/api/users/${Auth.currentUserId()}/exerciseplan`, {exercisePlanId: planId}, Auth.bearerHeader() )
        .then(res => console.log('res is', res.data))
        .catch(err => console.log('add exerciseplan id error', err));
    }

  }

  // }
  handleChange = ({ target: { name, value, checked } }) => {
    const day = name.split('.')[0];
    this.setState({ [`${day}.intensity`]: 'Low' });

    if(name.includes('time')) {
      value = parseInt(value);
      this.setState({[name]: value});

    } else if (name.includes('normalStartDate')){
      this.setState({[name]: value}, () =>{
        if(Validate.startDate(this.state.normalStartDate, this.state.usersActivePlanStartDate, this.state.futurePlans) || this.state.autoValidate){
          const unixValue = moment(value).unix();
          this.setState({errors: null, startDate: unixValue, validStartDate: true});
        } else {
          //date is not valid
          this.setState({errors: { normalStartDate: 'Your start date is not valid'},[name]: value, validStartDate: false });
        }
      });
    } else if (name.includes('rest')) {

      if (checked) {
        this.setState({ [`${day}.exerciseCompleted`]: true, [`${day}.intensity`]: null });
      } else {
        this.setState({ [`${day}.exerciseCompleted`]: null });
      }

      this.setState({[name]: checked}, () => {
        console.log('state is', this.state);
      });

    } else {
      this.setState({[name]: value });
    }
  }

  validateStartDate = () => {
    const momStartDate = moment(this.state.normalStartDate).utc();
    const sevenDaysTime = moment.utc(moment.unix(this.state.usersActivePlanStartDate)).add(6, 'days');
    if(moment(momStartDate).isAfter(sevenDaysTime)) return true;

    return false;
  }


  render() {
    return(
      <section className="container">
        <form onSubmit={ this.handleSubmit }>
          <div className="column is-4">
            <h3 className="title is-3">Create a program</h3>
            <FormInput
              label = 'Program name'
              name = 'name'
              type='text'
              state = {this.state}
              handleChange = {this.handleChange}
            />
          </div>

          {/* PICK START DATE */}
          <div className="column is-4">
            <FormInput
              label='Choose your preferred start date'
              name='normalStartDate'
              type='date'
              handleChange={this.handleChange}
              state={this.state}
            />
          </div>

          <div className= "columns is-multiline">

            {/* DAY 1 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 1</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day1.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>


              {!this.state['day1.rest'] &&
              <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day1.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day1.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>

              }


            </div>

            {/* DAY 2 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 2</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day2.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>

              {!this.state['day2.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day2.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day2.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }


            </div>

            {/* DAY 3 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 3</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day3.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>

              {!this.state['day3.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day3.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day3.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }

            </div>

            {/* DAY 4 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 4</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day4.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>

              {!this.state['day4.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day4.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day4.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }

            </div>

            {/* DAY 5 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 5</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day5.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>

              {!this.state['day5.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day5.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day5.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }
            </div>

            {/* DAY 6 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 6</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day6.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>

              {!this.state['day6.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day6.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day6.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }
            </div>

            {/* DAY 7 */}
            <div className="column is-4 card create-card">
              <div className="column is-12">
                <label className='label'>Day 7</label>

                <div className="control">
                  <input
                    type="checkbox"
                    name="day7.rest"
                    onChange = {this.handleChange}
                    value = {true}
                  /> Is this a rest day?
                </div>
              </div>


              {!this.state['day7.rest'] && <div>
                <div className="column is-8">
                  <FormInput
                    label='Duration (minutes)'
                    name='day7.time'
                    type='number'
                    handleChange={this.handleChange}
                    state={this.state}
                  />
                </div>

                <div className="column is-4">
                  <label className='label'>Intensity</label>
                  <select className = 'select'
                    name='day7.intensity'
                    state={ this.state }
                    onChange={ this.handleChange }>
                    <option value='Low'>Low</option>
                    <option value='Medium'>Medium</option>
                    <option value='High'>High</option>
                  </select>
                </div>
              </div>
              }

            </div>
          </div>

          <button
            className="button is-info is-rounded is-3"
            disabled={!this.state.validStartDate}
          >Create</button>
        </form>
      </section>
    );
  }
}
