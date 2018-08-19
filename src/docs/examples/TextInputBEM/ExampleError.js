import React, { Component } from 'react';
import TextInputBEM from 'reusable-components/TextInputBEM';

export default class ExampleError extends Component {
  render() {
    return (
      <TextInputBEM
        htmlId="example-error"
        label="First Name"
        name="firstname"
        onChange={() => {}}
        required
        error="First name is required."
      />
    );
  }
}
