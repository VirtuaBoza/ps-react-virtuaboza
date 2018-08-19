import React, { Component } from 'react';
import TextInput from 'reusable-components/TextInput';

export default class ExampleOptional extends Component {
  render() {
    return (
      <TextInput
        htmlId="example-optional"
        label="First Name"
        name="firstname"
        onChange={() => {}}
      />
    );
  }
}
