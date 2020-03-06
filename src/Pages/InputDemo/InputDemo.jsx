import React, { Component } from 'react';
import TextField from '../../component/textfield/TextField';
import SelectField from '../../component/SelectField/SelectField';
import RadioGroup from '../../component/RadioGroup/RadioGroup';

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

    this.state = {
      name: '',
      sport: '',
      cricket: '',
      football: '',
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

  render() {
    console.log(this.state);
    const { sport } = this.state;
    return (
      <>
        <p><b>Name</b></p>
        <TextField
          onChange={this.onChangeTextField}
        />

        <p><b>Select Field</b></p>
        <SelectField defaultOption="select" options={selectOptions} onChange={this.onChangeSelectOptions} />

        {

          sport && (sport === 'cricket' || sport === 'football') && (
            <>
              <p><b>What you do ?</b></p>
              <RadioGroup options={this.getRadioOptions()} onChange={this.onChangeRadioOption} />
            </>
          )
        }

      </>
    );
  }
}

export default InputDemo;
