<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-8 max-w-sm w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Register</h2>
      <form novalidate @submit.prevent="submitRegister">
        <AppFormInput
            v-model="name"
            placeholder="Name"
            :error="nameError"
            class="mb-4"
        />
        <AppFormInput
            v-model="email"
            placeholder="Email"
            type="email"
            :error="emailError"
            class="mb-4"
        />
        <AppFormInput
            v-model="password"
            placeholder="Password"
            type="password"
            :error="passwordError"
            class="mb-4"
        />
        <AppFormInput
            v-model="confirmPassword"
            placeholder="Repeat password"
            type="password"
            :error="confirmPasswordError"
            class="mb-6"
        />
        <AppButton
            type="submit"
            class="w-full bg-blue-500 text-white hover:bg-blue-600 transition py-2 rounded-md"
        >
          Register
        </AppButton>
        <div class="mt-4 text-center">
          <router-link to="/login" class="text-blue-500 hover:underline">Already registered? Log in!</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppButton from "@/interface/components/AppButton.vue";
import AppFormInput from "@/interface/components/AppFormInput.vue";
import {validatePageByScheme} from "@/interface/pages/validation/scripts/validatePageByScheme";
import registerUserSchema from "@/interface/pages/validation/schemas/registerUserSchema";
import { submitRegister } from "@/services/authService";

export default {
  name: 'RegisterPage',
  components: {
    AppButton,
    AppFormInput
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    }
  },
  methods: {
    async submitRegister() {
      const registerDto = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      const validationResult = await validatePageByScheme(registerDto,registerUserSchema);
      if (validationResult.isValid === false) {
        Object.keys(validationResult.errors).forEach((key) => {
          const errorInput = key + 'Error';
          this[errorInput] = validationResult.errors[key];
        });
        return;
      }

      this.nameError = '';
      this.emailError = '';
      this.passwordError = '';
      this.confirmPasswordError = '';
      console.log("Making request...");
      delete registerDto.confirmPassword;
      const result = await submitRegister(registerDto);
      if(result === true){
        this.$router.push('/login');
        return;
      }
      this.$router.push('/error')
    }
  }
}
</script>

