import React, { Component } from 'react';
import TextInputBEM from 'ps-react-virtuaboza/lib/TextInputBEM';

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
