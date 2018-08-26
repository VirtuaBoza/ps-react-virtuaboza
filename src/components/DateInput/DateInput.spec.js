import React from 'react';
import { shallow } from 'enzyme';
import DateInput from './DateInput';

const origError = console.error;

afterEach(() => {
  console.error = origError;
});

describe('DateInput', () => {
  it('warns about invalid input', () => {
    console.error = jest.fn(warn => {
      throw new Error(warn);
    });
    expect(() => <DateInput value="12/12/2012" />).toThrowError(
      'Failed prop type',
    );
  });

  it('renders ISO dates as Short dates', () => {
    const wrapper = shallow(
      <DateInput value="2018-08-26" test_browserSupportsDateInput={false} />,
    );

    expect(wrapper.props().value).toBe('08/26/2018');
  });

  it('handles null values', () => {
    const wrapper = shallow(<DateInput value={null} />);

    expect(wrapper.props().value).toBe('');
  });

  it('only passes up whole, valid ISO datestrings', () => {
    const mockChangeHandler = jest.fn();
    const wrapper = shallow(
      <DateInput value={null} onChange={mockChangeHandler} />,
    );

    const event = { target: { value: '1' } };
    wrapper.simulate('change', event);
    expect(mockChangeHandler).toHaveBeenCalledTimes(0);
    expect(wrapper.props().value).toBe('1');
  });
});
