<template>
  <section class="custom-input">
    <label class="custom-input__label" :for="name" v-text="label"></label>
    <input
      class="custom-input__input"
      v-mask="mask"
      :aria-labelledby="label"
      :name="name"
      :value="input_value"
      @input="$_updateValue"
      type="text">
  </section>
</template>
<style lang="less">
@exs-font-size: 12px;
@font-weight-bolder: 700;
@lg-font-size: 20px;

.custom-input {
  display: inline-flex;
  flex-direction: column;

  &__label {
    text-transform: uppercase;
    text-align: left;
    font-size: @exs-font-size;
    font-weight: @font-weight-bolder;
  }

  &__input {
      display: block;
      padding: 3px 0;
      font-size: @lg-font-size;
      border: none;
      border-bottom: solid 1px gray;
      background-color: transparent;
    }
}
</style>
<script>
import AwesomeMask from 'awesome-mask'

export default {
  directives: {
    mask: AwesomeMask
  },
  props: {
    helperText: {
      type: String,
      default: '',
      description: 'helper text, appear on left side of the label'
    },
    label: {
      type: String,
      default: '',
      description: 'Label of the input'
    },
    name: {
      type: String,
      default: '',
      description: 'Name of the internal input',
      required: true
    },
    value: {
      type: [String, Number],
      default: '',
      description: 'Value for the internal input'
    },
    mask: {
      type: String,
      default: '',
      description: 'Mask pattern for the input using "awesome-mask"'
    }
  },
  data () {
    return {
      input_value: ''
    }
  },
  methods: {
    $_updateValue ($event) {
      this.input_value = $event.target.value
      process.nextTick(() => {
        this.$emit('input', this.input_value)
      })
    }
  },
  watch: {
    value: {
      handler (val, oldVal) {
        this.input_value = val
        this.$emit('input', val)
      }
    }
  }
}
</script>
