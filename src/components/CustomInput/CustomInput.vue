<template>
  <section class="custom-input">
    <label class="custom-input__label" :for="name" v-text="label"></label>
    <input
      v-mask="mask"
      :aria-labelledby="label"
      :name="name"
      :value="input_value"
      @input="$_updateValue"
      type="text">
  </section>
</template>
<style lang="less">

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
