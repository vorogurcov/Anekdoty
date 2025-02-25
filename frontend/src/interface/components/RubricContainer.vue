<template>
  <div>
    <p>{{rubricName}}</p>
  </div>
</template>

<script>
export default {
  name: "RubricContainer",
  props:{
    rubricName:{
      type:String,
      default:''
    }
  }
}
</script>

