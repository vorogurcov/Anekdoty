<template>
<button :type="type" @click="$emit('click')">
  <slot/>
</button>
</template>

<script>
export default {
  name:'AppButton',
  props:{
    type:{
      type:String,
      default:'button'
    }
  }
}
</script>

































