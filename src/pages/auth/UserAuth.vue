<template>
  <div>
    <base-dialog :show="isLoading" title="處理中請稍後...⏳" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="🔥異常發生~" @close="handleError">
      <p>{{ error }}</p></base-dialog
    >
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p style="color:dodgerblue" v-if="!formIsValid">
          填寫有誤，密碼請至少六位數
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') return 'Login';
      else return 'Signup';
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') return 'Signup instead';
      else return 'Login instead';
    }
  },
  methods: {
    validateForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
      }
    },
    async submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      this.isLoading = true;

      const actionPayload = {
        email: this.email,
        password: this.password
      };

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', actionPayload);
        } else {
          await this.$store.dispatch('signup', actionPayload);
        }
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches'); //因為在coachList設定命名為'redirect'，然後導向'/register'，若沒有則 $route.query={}
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || '驗證失敗，再試試吧 ! ';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
