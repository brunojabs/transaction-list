<template>
  <section class="custom-input">
    <label class="custom-input__label" :for="name" v-text="label"></label>
    <input
      class="custom-input__input"
      :class="modifiers"
      v-mask="mask"
      :aria-labelledby="label"
      :name="name"
      :value="input_value"
      @input="$_updateValue"
      @blur="$_broadcastEvent($event)"
      type="text">
    <p class="custom-input__error-message">
      <span v-show="hasError">
        {{ errorMessage }}
      </span>
    </p>
  </section>
</template>
<style lang="less">
@import '../../assets/styles/main';

.custom-input {
  display: inline-flex;
  flex-direction: column;

  &__label {
    text-transform: uppercase;
    text-align: left;
    font-size: @exs-font-size;
    font-weight: bolder;
  }

  &__error-message {
    height: 20px;
    text-align: left;
    padding-top: @exs-spacer;
    color: @red;
  }

  &__input {
    display: block;
    padding: 3px 0;
    font-size: @lg-font-size;
    border: none;
    border-bottom: solid 1px @gray;
    background-color: transparent;

    &.--has-error {
      color: @red;
      border-bottom-color: @red;
    }
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
    },
    errorMessage: {
      type: String,
      default: '',
      description: 'Message for a nagative validation response'
    },
    hasError: {
      type: Boolean,
      default: false,
      description: 'Force a negative validation response'
    }
  },
  data () {
    return {
      input_value: ''
    }
  },
  computed: {
    modifiers () {
      return {
        '--has-error': this.hasError
      }
    }
  },
  methods: {
    $_updateValue ($event) {
      this.input_value = $event.target.value
      process.nextTick(() => {
        this.$emit('input', this.input_value)
      })
    },
    $_broadcastEvent ($event) {
      this.$emit($event.type, $event)
    }
  },
  mounted () {
    this.input_value = this.value
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
