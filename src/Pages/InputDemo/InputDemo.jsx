import * as yup from 'yup';
import React, { Component } from 'react';
import TextField from '../../component/textfield/TextField';
import SelectField from '../../component/SelectField/SelectField';
import RadioGroup from '../../component/RadioGroup/RadioGroup';
import Button from '../../component/button/button';

const selectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];

const radioOptionsCricket = [
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Wicket Keeper',
    value: 'wicket Keeper',
  },
  {
    label: 'All rounder',
    value: 'all rounder',
  },
];


const radioOptionsFootball = [
  {
    label: 'Defender',
    value: 'defender',
  },
  {
    label: 'Striker',
    value: 'striker',
  },
];

class InputDemo extends Component {
  constructor(props) {
    super(props);
    this.schema = yup.object().shape({
      name: yup.string().required('Please enter your name').min(3, 'Please enter no less than 3 characters'),
      sport: yup.string().required('Please select a sport'),
      cricket: yup.string().when('sport', {
        is: 'cricket',
        then: yup.string().required('What you do is required'),
      }),
      football: yup.string().when('sport', {
        is: 'football',
        then: yup.string().required('What you do is required'),
      }),
    });

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
      touched: {
        name: false,
        sport: false,
        cricket: false,
        football: false,
      },
    };
  }

  onChangeTextField = (event) => {
    // console.log('Inside onChangeTextField ', event.target.value);
    this.setState({ name: event.target.value });
  }

  onChangeSelectOptions = (e) => {
    let { sport, cricket, football } = this.state;
    sport = e.target.value;
    cricket = '';
    football = '';
    this.setState({ sport, cricket, football }, () => {

    });
  }

  onChangeRadioOption = (e) => {
    const { sport } = this.state;
    let { cricket, football } = this.state;
    if (sport === 'cricket') {
      cricket = e.target.value;
      football = '';
      this.setState({ cricket, football }, () => {

      });
    } else if (sport === 'football') {
      football = e.target.value;
      cricket = '';
      this.setState({ football, cricket }, () => {
      });
    }
  }

  getRadioOptions = () => {
    const { sport } = this.state;

    return sport === 'cricket' ? radioOptionsCricket : radioOptionsFootball;
  }

  getError = (field) => {
    if (this.state.touched[field] && this.hasError()) {
      try {
        this.schema.validateSyncAt(field, this.state);
      } catch (err) {
        return err.message;
      }
    }
  }

  hasError = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  render() {
    console.log(this.state);
    const { sport, name } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField
          onChange={this.onChangeTextField}
          value={name}
          error={this.getError('name')}
          onBlur={() => this.isTouched('name')}
        />

        <p><b>Select Field</b></p>
        <SelectField
          defaultOption="select"
          options={selectOptions}
          onChange={this.onChangeSelectOptions}
          value={sport}
          error={this.getError('sport')}
          onBlur={() => this.isTouched('sport')} />

        {

          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do ?</b></p>
              <RadioGroup
                options={this.getRadioOptions()}
                onChange={this.onChangeRadioOption}
                error={this.getError(sport)}

                onBlur={() => this.isTouched(sport)}
              />
            </>
          )
        }


        <>
          <div align="right">
            <Button
              value="cancel"
            />
            <Button
              value="submit"
              disabled={this.hasError()}
            />
          </div>
        </>

      </>
    );
  }
}

export default InputDemo;
