
<template>
  <input
  :placeholder="placeholder"
  :type="type"
  :value="modelValue"
  @input="$emit('update:modelValue',$event.target.value)"
  />
  <p>{{error}}</p>
</template>

<script>
export default {
  name:"AppFormInput",
  props:{
    modelValue:{
      type:[String, Number],
      default:''
    },
    placeholder:{
      type:String,
      default:'Input'
    },
    type:{
      type:String,
      default:''
    },
    error:{
      type:String,
      default:''
    }
  },
  emits: ['update:modelValue']
}
</script>