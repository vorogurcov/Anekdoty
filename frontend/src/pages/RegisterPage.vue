<template>
  <div>
    <form novalidate @submit.prevent="submitRegister">
      <AppFormInput v-model="name" placeholder="Name" :error="nameError"/>
      <AppFormInput v-model="email" placeholder="Email" type="email" :error="emailError"/>
      <AppFormInput v-model="password" placeholder="Password" type="password" :error="passwordError"/>
      <AppFormInput v-model="confirmPassword" placeholder="Repeat password" type="password" :error="confirmPasswordError"/>
      <AppButton type="submit">Register</AppButton>
      <div>
<!--        TODO: Create href to Rules of serv and to Log in-->
        <p></p>
        <router-link to="/login">Already registered? Log in!</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AppFormInput from "@/components/AppFormInput.vue";
import {validateRegisterPage} from "@/pages/validation/scripts/validateRegisterPage";
export default{
  name:'RegisterPage',
  components:{
    AppButton,
    AppFormInput,
  },
  data(){
    return{
      name:'',
      email:'',
      password:'',
      confirmPassword:'',
      nameError:'',
      emailError:'',
      passwordError:'',
      confirmPasswordError:'',
    }
  },
  methods:{
    async submitRegister(){
      const registerDto = {
        name:this.name,
        email: this.email,
        password: this.password,
        confirmPassword:this.confirmPassword,
      };
      const validationResult = await validateRegisterPage(registerDto);
      if(validationResult.isValid === false){
        Object.keys(validationResult.errors).forEach((key)=>{
          const errorInput = key + 'Error';
          this[errorInput] = validationResult.errors[key];
        })
        return;
      }


      console.log(this.name,this.email,this.password)

    }
  }
}
</script>