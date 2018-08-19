import React, { Component } from 'react';
import TextInputCSSModules from 'ps-react-virtuaboza/lib/TextInputCSSModules';

export default class ExampleError extends Component {
  render() {
    return (
      <TextInputCSSModules
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
