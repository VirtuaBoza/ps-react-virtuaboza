import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  formatDateFromISOToShort,
  formatDateFromShortToISO,
} from '../../utils/date-formatter';

class DateInput extends Component {
  constructor(props) {
    super(props);
    this.dateInput = React.createRef();
    this.browserSupportsDateInput =
      typeof this.props.test_browserSupportsDatePicker !== 'undefined'
        ? this.validateBrowserSupportsDateInput()
        : this.props.test_browserSupportsDatePicker;
  }

  componentDidMount() {
    if (this.dateInput.current && !this.browserSupportsDateInput) {
      this.dateInput.current.addEventListener('change', this.onChange);
    }
  }

  componentWillUnmount() {
    if (this.dateInput.current && !this.browserSupportsDateInput) {
      this.dateInput.current.removeEventListener('change', this.onChange);
    }
  }

  onChange = event => {
    const date = this.browserSupportsDateInput
      ? event.target.value
      : event.target.value
        ? formatDateFromShortToISO(event.target.value)
        : null;
    event.target.value = date;
    event.target.name = this.props.name;
    this.props.onChange(event);
  };

  validateBrowserSupportsDateInput() {
    var test = document.createElement('input');
    try {
      test.type = 'date';
    } catch (error) {
      return false;
    }

    return test.type === 'date';
  }

  render() {
    const {
      // These first three variables are only here to ensure
      // props with these names are not passed to the input.
      onChange,
      dateInput,
      type,
      value,
      ...props
    } = this.props;

    const dateValue = value
      ? this.browserSupportsDateInput
        ? value
        : formatDateFromISOToShort(value)
      : '';

    return (
      <input
        type="date"
        value={dateValue}
        date-format="mm/dd/yyyy"
        onChange={this.onChange}
        ref={this.dateInput}
        {...props}
      />
    );
  }
}

DateInput.propTypes = {
  /** An ISO formatted date value (YYYY-MM-DD). */
  value: function(props, propName, componentName) {
    const isoDateRegex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    if (props[propName] && !isoDateRegex.test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Expects date string in 'YYYY-MM-DD' format.`,
      );
    }
  },

  /** The change handler which will receive date input (event.target.value) in ISO format (YYYY-MM-DD). */
  onChange: PropTypes.func,

  /** A hook used for testing the component. This prop should not be used when implementing this component. */
  test_browserSupportsDatePicker: PropTypes.bool,
};

DateInput.defaultProps = {
  onChange: () => {},
};

export default DateInput;
