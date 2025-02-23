<!--<template>-->
<!--  <div>-->
<!--    <h1>Register</h1>-->
<!--    <form @submit.prevent="submitRegister">-->
<!--      <FormInput v-model="name" placeholder="Name" />-->
<!--      <FormInput v-model="email" placeholder="Email" />-->
<!--      <FormInput v-model="password" placeholder="Password" type="password" />-->
<!--      <FormInput v-model="confirmPassword" placeholder="Confirm Password" type="password" />-->
<!--      <Button type="submit">Register</Button>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import FormInput from '../components/AppFormInput.vue';-->
<!--import Button from '../components/AppButton.vue';-->

<!--export default {-->
<!--  name: 'RegisterPage',-->
<!--  components: {-->
<!--    FormInput,-->
<!--    Button-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      name: '',-->
<!--      email: '',-->
<!--      password: '',-->
<!--      confirmPassword: ''-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    submitRegister() {-->
<!--      console.log('Registering:', this.name, this.email, this.password);-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
<template>
  <div>
    <form @submit.prevent="submitRegister">
      <AppFormInput v-model="name" placeholder="Name"/>
      <AppFormInput v-model="email" placeholder="Email" type="email"/>
      <AppFormInput v-model="password" placeholder="Password" type="password"/>
      <AppFormInput v-model="confirmPassword" placeholder="Repeat password" type="password"/>
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
    }
  },
  methods:{
    submitRegister(){
      console.log(this.name,this.email,this.password)
    }
  }
}
</script>