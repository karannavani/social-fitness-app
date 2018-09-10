import React from 'react';
import FormInput from '../common/FormInput';
import axios from 'axios';
import moment from 'moment';

export default class ExercisePlanNew extends React.Component {
  state = {}

  handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/exerciseplans', this.state)
      .then(res => console.log('res is', res))
      .then(() => this.props.history.push('/dashboard'))
      .catch(err => console.log('adoption error message: ', err));
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
      const unixValue = moment(value).unix();
      console.log('unix value is', unixValue);
      this.setState({[name]: value, startDate: unixValue}, () => {
        console.log('state is', this.state);
        // console.log(this.state.day1.rest);
      });

    } else if (name.includes('rest')) {
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

  // handleChecked = ({target: {name, checked}}) => {
  //   console.log('event target is', checked);
  //   console.log('event target name is', name);
  //   this.setState({[name]: checked});
  // }

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

          <button className="button is-info is-rounded is-3">Create</button>
        </form>
      </section>
    );
  }
}
