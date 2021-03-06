import { mount } from '@vue/test-utils'

import CustomInput from './CustomInput'

describe('CustomInput', () => {
  let customInput = {}
  let configuration = {
    label: 'Transaction',
    name: 'value'
  }

  beforeEach(function () {
    customInput = mount(CustomInput, {
      propsData: configuration
    })
  })

  it('renders correctly with different name prop', () => {
    let input = customInput.find('input')
    expect(input.attributes().name).toEqual('value')
  })

  it('renders correctly with different props', () => {
    let label = customInput.find('.custom-input__label')
    expect(label.text()).toEqual('Transaction')
  })

  it('renders the error', () => {
    customInput = mount(CustomInput, {
      propsData: {
        label: 'Transaction',
        name: 'value',
        hasError: true,
        errorMessage: 'Field required'
      }
    })
    let errorMessage = customInput.find('.custom-input__error-message span')
    expect(errorMessage.text()).toEqual('Field required')
  })

  it('renders correctly with different props', () => {
    const spy = jest.fn();
    customInput.vm.$on('input', spy)
    customInput.vm.$_updateValue({target: { value: 'value' }})
    process.nextTick(() => {
      expect(spy).toHaveBeenCalledWith('value')
    })
  })
})
