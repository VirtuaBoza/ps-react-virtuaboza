import React, { Component } from 'react';
import PropTypes from 'prop-types';
import round from '../../utils/round';

/** An input field for number input. */
class NumberInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value:
        typeof props.value === 'number' && !isNaN(props.value)
          ? typeof props.decimalPlaces === 'number'
            ? round(props.value, props.decimalPlaces).toFixed(
                props.decimalPlaces,
              )
            : props.value
          : '',
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
    this.props.onChange(e);
  };

  handleBlur = e => {
    const { decimalPlaces, onBlur } = this.props;
    const value =
      typeof decimalPlaces === 'number'
        ? round(e.target.value, decimalPlaces)
        : e.target.value;
    this.setState({
      value: isNaN(value)
        ? ''
        : typeof decimalPlaces === 'number'
          ? value.toFixed(decimalPlaces)
          : value,
    });
    e.target.value = isNaN(value) ? '' : value;
    onBlur(e);
  };

  render() {
    const {
      decimalPlaces,
      style,
      type,
      value,
      onChange,
      onBlur,
      ...props
    } = this.props;

    const stateValue = this.state.value;

    let calcValue;
    if (typeof value === 'number' && !isNaN(value)) {
      if (parseFloat(stateValue) === value) {
        calcValue = stateValue;
      } else if (typeof decimalPlaces === 'number') {
        calcValue = round(value, decimalPlaces).toFixed(decimalPlaces);
      } else {
        calcValue = value;
      }
    } else {
      calcValue = stateValue;
    }

    return (
      <input
        type="number"
        style={{ textAlign: 'right', ...style }}
        value={calcValue}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        {...props}
      />
    );
  }
}

NumberInput.propTypes = {
  /** The input value to render. */
  value: PropTypes.number,

  /** Change handler for value changes. Pass up the exact value without rounding. */
  onChange: PropTypes.func,

  /** Handler for when the component loses focus. This handler is passes a rounded value if decimal places are specified. */
  onBlur: PropTypes.func,

  /** The number of decimal places to round to upon first render, change in props, or input blur. */
  decimalPlaces: PropTypes.number,
};

NumberInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
};

export default NumberInput;
