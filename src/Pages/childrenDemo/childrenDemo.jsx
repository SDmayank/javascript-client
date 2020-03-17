import React from 'react';

import { Math } from '../../component/Math';

export class ChildrenDemo extends React.Component {
  children = (first, second, operator, result) => {
    switch (operator) {
    case '+':
      return (`sum of ${first} and ${second} is ${result}`);
    case '-':
      return (`subtraction of ${first} and ${second} is ${result}`);
    case '/':
      return (`division of ${first} and ${second} is ${result}`);
    case '*':
      return (`product of ${first} and ${second} is ${result}`);
    default:
      return (`${operator} of ${first} and ${second} is Invalid`);
    }
  }

  render() {
    return (
      <>
        <Math first={3} second={4} operator="^">
          {' '}
          children=
          {this.children}
        </Math>
        <Math first={3} second={4} operator="+">
          children=
          {this.children}
        </Math>
        <Math first={3} second={4} operator="-">
          children=
          {this.children}
        </Math>
        <Math first={3} second={4} operator="*">
          children=
          {this.children}
        </Math>
        <Math first={3} second={4} operator="?">
          children=
          {this.children}
        </Math>
        <Math first={3} second={4} operator="/" />
        <Math first={3} second={4} operator="/">
          children=
          {this.children}
        </Math>
      </>
    );
  }
}
