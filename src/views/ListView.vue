<template>
  <section class="list-view">
    <custom-input
      label="Add transaction"
      mask="money"
      name="transaction">
    </custom-input>
  </section>
</template>
<script>
import CustomInput from '@/components/CustomInput/CustomInput'

export default {
  component: {
    CustomInput
  }
}
</script>
