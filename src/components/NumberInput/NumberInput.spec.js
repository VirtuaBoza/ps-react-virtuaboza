import React from 'react';
import { shallow } from 'enzyme';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
  it('is right aligned', () => {
    // Arrange
    // Act
    const wrapper = shallow(<NumberInput />);

    // Assert
    expect(wrapper.props().style.textAlign).toBe('right');
  });

  it('handles Case 0', () => {
    // Arrange
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();

    // Act
    // Assert
    // Render null > ""
    const wrapper = shallow(
      <NumberInput
        value={null}
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
        decimalPlaces={2}
      />,
    );
    expect(wrapper.props().value).toBe('');

    // Change "0", Pass up 0, Render 0 > "0"
    const event1 = { target: { value: '0' } };
    wrapper.simulate('change', event1);
    expect(mockChangeHandler.mock.calls[0][0].target.value).toBe(
      event1.target.value,
    );
    wrapper.setProps({ value: 0 });
    expect(wrapper.props().value).toBe('0');

    // Blur "0", Pass up 0, Render 0 > "0.00"
    const event2 = { target: { value: '0' } };
    wrapper.simulate('blur', event2);
    expect(mockBlurHandler.mock.calls[0][0].target.value).toBe(
      event2.target.value,
    );
    wrapper.setProps({ value: 0 });
    expect(wrapper.props().value).toBe('0.00');
  });

  it('handles Case 1', () => {
    // Arrange
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();

    // Act
    // Assert
    // Render 0 > "0.00"
    const wrapper = shallow(
      <NumberInput
        value={0}
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
        decimalPlaces={2}
      />,
    );
    expect(wrapper.props().value).toBe('0.00');

    // Change "1", Pass up 1, Render 1 > "1"
    const event1 = { target: { value: '1' } };
    wrapper.simulate('change', event1);
    expect(mockChangeHandler.mock.calls[0][0].target.value).toBe(
      event1.target.value,
    );
    wrapper.setProps({ value: 1 });
    expect(wrapper.props().value).toBe('1');

    // Change "1.2", Pass up 1.2, Render 1.2 > "1.2"
    const event2 = { target: { value: '1.2' } };
    wrapper.simulate('change', event2);
    expect(mockChangeHandler.mock.calls[1][0].target.value).toBe(
      event2.target.value,
    );
    wrapper.setProps({ value: 1.2 });
    expect(wrapper.props().value).toBe('1.2');

    // Change "1.20", Pass up 1.2, Render 1.2 > "1.20"
    const event3 = { target: { value: '1.20' } };
    wrapper.simulate('change', event3);
    expect(mockChangeHandler.mock.calls[2][0].target.value).toBe(
      event3.target.value,
    );
    wrapper.setProps({ value: 1.2 });
    expect(wrapper.props().value).toBe('1.20');

    // Change "1.205", Pass up 1.205, Render 1.205 > "1.205"
    const event4 = { target: { value: '1.205' } };
    wrapper.simulate('change', event4);
    expect(mockChangeHandler.mock.calls[3][0].target.value).toBe(
      event4.target.value,
    );
    wrapper.setProps({ value: 1.205 });
    expect(wrapper.props().value).toBe('1.205');

    // Blur "1.205", Pass up 1.21, Render 1.21 > "1.21"
    const event5 = { target: { value: '1.205' } };
    wrapper.simulate('blur', event5);
    expect(mockBlurHandler.mock.calls[0][0].target.value).toBe(
      event5.target.value,
    );
    wrapper.setProps({ value: 1.21 });
    expect(wrapper.props().value).toBe('1.21');
  });

  it('handles Case 2', () => {
    // Arrange
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();

    // Act
    // Assert
    // Render 1.21 > "1.21"
    const wrapper = shallow(
      <NumberInput
        value={1.21}
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
        decimalPlaces={2}
      />,
    );
    expect(wrapper.props().value).toBe('1.21');

    // Change "1.2", Pass up 1.2, Render 1.2 > "1.2"
    const event1 = { target: { value: '1.2' } };
    wrapper.simulate('change', event1);
    expect(mockChangeHandler.mock.calls[0][0].target.value).toBe(
      event1.target.value,
    );
    wrapper.setProps({ value: 1.2 });
    expect(wrapper.props().value).toBe('1.2');

    // Blur "1.2", Pass up 1.2, Render 1.2 > "1.20"
    const event2 = { target: { value: '1.2' } };
    wrapper.simulate('blur', event2);
    expect(mockBlurHandler.mock.calls[0][0].target.value).toBe(
      event2.target.value,
    );
    wrapper.setProps({ value: 1.2 });
    expect(wrapper.props().value).toBe('1.20');
  });

  it('handles external update', () => {
    const wrapper = shallow(<NumberInput value={1.21} decimalPlaces={2} />);
    wrapper.setProps({ value: 1.22 });
    expect(wrapper.props().value).toBe('1.22');
  });

  it('rounds prop value appropriately', () => {
    const wrapper = shallow(<NumberInput value={1.555} decimalPlaces={2} />);
    expect(wrapper.props().value).toBe('1.56');
  });

  it('handles non rounded values appropriately', () => {
    // Arrange
    const mockChangeHandler = jest.fn();
    const mockBlurHandler = jest.fn();

    const wrapper = shallow(
      <NumberInput
        value={1.555}
        onChange={mockChangeHandler}
        onBlur={mockBlurHandler}
      />,
    );
    expect(wrapper.props().value.toString()).toBe('1.555');

    const event0 = { target: { value: '1.5550' } };
    wrapper.simulate('change', event0);
    expect(mockChangeHandler.mock.calls[0][0].target.value).toBe(
      event0.target.value,
    );
    wrapper.setProps({ value: 1.555 });
    expect(wrapper.props().value.toString()).toBe('1.5550');

    const event1 = { target: { value: '1.55507' } };
    wrapper.simulate('change', event1);
    expect(mockChangeHandler.mock.calls[1][0].target.value).toBe(
      event1.target.value,
    );
    wrapper.setProps({ value: 1.55507 });
    expect(wrapper.props().value.toString()).toBe('1.55507');

    const event2 = { target: { value: '1.55507' } };
    wrapper.simulate('blur', event2);
    expect(mockBlurHandler.mock.calls[0][0].target.value).toBe(
      event2.target.value,
    );
    wrapper.setProps({ value: 1.55507 });
    expect(wrapper.props().value.toString()).toBe('1.55507');
  });

  it('applies style prop appropriately', () => {
    const wrapper0 = shallow(<NumberInput style={{ color: 'red' }} />);
    expect(wrapper0.props().style.textAlign).toBe('right');
    expect(wrapper0.props().style.color).toBe('red');

    const wrapper1 = shallow(<NumberInput style={{ textAlign: 'center' }} />);
    expect(wrapper1.props().style.textAlign).toBe('center');
  });

  it('accepts other props', () => {
    const wrapper = shallow(<NumberInput className="mr-2" />);
    expect(wrapper.props().className).toBe('mr-2');
  });

  it('handles value as NaN', () => {
    const wrapper = shallow(<NumberInput value={NaN} />);
    expect(wrapper.props().value).toBe('');
  });

  it('rounds to integer appropriately', () => {
    const wrapper = shallow(<NumberInput value={1.5} decimalPlaces={0} />);
    expect(wrapper.props().value).toBe('2');
  });

  it('can handle changes without being passed a handler', () => {
    const wrapper = shallow(<NumberInput value={null} decimalPlaces={0} />);
    const event = { target: { value: '1' } };
    wrapper.simulate('change', event);
    expect(wrapper.props().value).toBe('1');
  });
});
