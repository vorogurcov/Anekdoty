<template>
  <div>
    <form novalidate @submit.prevent="submitLogin">
      <AppFormInput v-model="email" placeholder="Email" type="email" :error="emailError"/>
      <AppFormInput v-model="password" placeholder="Password" type="password" :error="passwordError"/>
      <AppButton type="submit">Log in</AppButton>
      <div>
<!--        TODO: Create hrefs to 'forget password?'-->
        <router-link to="/register">Do not have an account? Register!</router-link>
        <p> </p>
      </div>
    </form>
  </div>

</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AppFormInput from "@/components/AppFormInput.vue";
import {validateLoginPage} from "@/pages/validation/scripts/validateLoginPage";

export default {
  name:'LoginPage',
  components: {
    AppButton,
    AppFormInput
  },
  data(){
    return {
      email:'',
      password:'',
      emailError:'',
      passwordError:''
    }
  },
  methods:{
    async submitLogin(){
      const loginDto = {
        email: this.email,
        password: this.password,
      };
      const validationResult = await validateLoginPage(loginDto);
      if(validationResult.isValid === false){
        Object.keys(validationResult.errors).forEach((key)=>{
          console.log(validationResult.errors[key])
          const errorInput = key + 'Error';
          this[errorInput] = validationResult.errors[key];
        })
        return;
      }

      this.emailError = '';
      this.passwordError = '';
      console.log("Making request...")
    }
  }
}
</script>