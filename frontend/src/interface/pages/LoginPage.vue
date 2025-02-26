<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white border border-gray-300 rounded-lg shadow-lg p-8 max-w-sm w-full">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
      <form novalidate @submit.prevent="submitLogin">
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
            class="mb-6"
        />
        <AppButton
            type="submit"
            class="w-full bg-blue-500 text-white hover:bg-blue-600 transition py-2 rounded-md"
        >
          Log in
        </AppButton>
        <div class="mt-4 text-center">
          <router-link to="/register" class="text-blue-500 hover:underline">Do not have an account? Register!</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppButton from "@/interface/components/AppButton.vue";
import AppFormInput from "@/interface/components/AppFormInput.vue";
import { validateLoginPage } from "@/interface/pages/validation/scripts/validateLoginPage";
import { submitLogin } from "@/services/authService";

export default {
  name: 'LoginPage',
  components: {
    AppButton,
    AppFormInput
  },
  data() {
    return {
      email: '',
      password: '',
      emailError: '',
      passwordError: '',
      accessToken: ''
    }
  },
  methods: {
    async submitLogin() {
      const loginDto = {
        email: this.email,
        password: this.password,
      };
      const validationResult = await validateLoginPage(loginDto);
      if (validationResult.isValid === false) {
        Object.keys(validationResult.errors).forEach((key) => {
          const errorInput = key + 'Error';
          this[errorInput] = validationResult.errors[key];
        });
        return;
      }

      this.emailError = '';
      this.passwordError = '';
      await this.handleLogin(loginDto);
    },
    async handleLogin(loginDto) {
      try {
        this.accessToken = await submitLogin(loginDto).then((data) => data.accessToken);
        localStorage.setItem('accessToken', this.accessToken);
        this.$router.push('/main')
      } catch (error) {
        console.error('Login failed:', error);
        this.$router.push('/404')
      }
    }
  }
}
</script>


