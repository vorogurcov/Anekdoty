<template>
  <div>
    <form @submit.prevent="submitLogin">
      <AppFormInput v-model="email" placeholder="Email" type="email"/>
      <AppFormInput v-model="password" placeholder="Password" type="password"/>
      <AppButton type="submit">Log in</AppButton>
      <div>
<!--        TODO: Create hrefs to register and to 'forget password?'-->
        <router-link to="/register">Do not have an account? Register!</router-link>
        <p> </p>
      </div>
    </form>
  </div>

</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AppFormInput from "@/components/AppFormInput.vue";
export default {
  name:'LoginPage',
  components: {
    AppButton,
    AppFormInput
  },
  data(){
    return {
      email:'',
      password:''
    }
  },
  methods:{
    submitLogin(){
      console.log(this.email, this.password);
    }
  }
}
</script>