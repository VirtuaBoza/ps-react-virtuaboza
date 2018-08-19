import React, { Component } from 'react';
import TextInput from 'ps-react-virtuaboza/lib/TextInput';

export default class ExampleError extends Component {
  render() {
    return (
      <TextInput
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
