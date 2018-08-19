import React, { Component } from 'react';
import RegistrationForm from 'ps-react-virtuaboza/lib/RegistrationForm';

export default class ExampleRegistrationFOrm extends Component {
  onSubmit = user => {
    console.log(user);
  };

  render() {
    return <RegistrationForm onSubmit={this.onSubmit} />;
  }
}
