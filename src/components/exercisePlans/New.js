import React from 'react';
import FormInput from '../common/FormInput';
import axios from 'axios';
import moment from 'moment';
import Auth from '../../lib/Auth';
import Id from '../../lib/Id';

export default class ExercisePlanNew extends React.Component {
  state = {
    validStartDate: false
  }

  componentDidMount(){
    const paginateOptions = {
      'userId': Auth.currentUserId(),
      'page': 1,
      'sort': { 'startDate': -1 },
      'limit': 1
    };
    axios.post('/api/exerciseplans/paginate', paginateOptions)
      .then(res => this.setState({usersActivePlanStartDate: res.data.docs}, ()=> {
        if (this.state.usersActivePlanStartDate.length) {
          this.setState({usersActivePlanStartDate: res.data.docs[0].startDate}, () => {
            console.log('log', this.state.usersActivePlanStartDate);
          });
        } else {
          this.setState({ autoValidate: true });
        }
        // console.log('active date is', this.state.usersActivePlanStartDate);
      }));
    // .then(res => this.setState({usersActivePlanStartDate: res.data.docs[0].startDate}, ()=> {
    //   console.log('active date is', this.state.usersActivePlanStartDate);
    // }));

  }

  handleSubmit = (event) => {
    event.preventDefault();
    const planId = Id.create();
    const newPlanData = this.state;

    newPlanData._id = planId;
    newPlanData.user = Auth.currentUserId();

    axios.post('/api/exerciseplans', newPlanData)
      .then(res => console.log('res is', res))
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.log('adoption error message: ', err));

    axios.post(`/api/users/${Auth.currentUserId()}/exerciseplan`, {exercisePlanId: planId} )
      .then(res => console.log('res is', res.data))
      .catch(err => console.log('add exerciseplan id error', err));
  }

  // }
  handleChange = ({ target: { name, value, checked } }) => {
    if(name.includes('time')) {
      value = parseInt(value);
      this.setState({[name]: value}, () => {
        console.log('state is', this.state);
        // console.log(this.state.day1.rest);
      });

    } else if (name.includes('normalStartDate')){
      this.setState({[name]: value}, () =>{
        if(this.validateStartDate() || this.state.autoValidate){
          const unixValue = moment(value).unix();
          console.log('unix value is', unixValue);
          this.setState({errors: null, startDate: unixValue, validStartDate: true});
        } else {
          //date is not valid
          this.setState({errors: { normalStartDate: 'Your start date is no valid'},[name]: value, validStartDate: false });
        }
      });
    } else if (name.includes('rest')) {
      if (checked) {
        console.log('checked');
      } else {
        console.log('not checked');
      }
      this.setState({[name]: checked}, () => {
        console.log('state is', this.state);
      });

    } else {
      this.setState({[name]: value}, () => {
        console.log('state is', this.state);
        // console.log(this.state.day1.rest);
      });
    }
  }

  validateStartDate = () => {
    // console.log('from state ', this.state.normalStartDate);
    const momStartDate = moment(this.state.normalStartDate).utc();
    // console.log('the newStartDate is:', momStartDate);
    const sevenDaysTime = moment.utc(moment.unix(this.state.usersActivePlanStartDate)).add(6, 'days');
    // console.log('the date sevenDaysTime is: ', sevenDaysTime);
    if(moment(momStartDate).isAfter(sevenDaysTime)) return true;

    return false;
  }

  // handleChecked = ({target: {name, checked}}) => {
  //   console.log('event target is', checked);
  //   console.log('event target name is', name);
  //   this.setState({[name]: checked});
  // }

  // click submit to validate start date,
  //  validate the start date on handle change
  // disable the submit button if date is not valide

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
