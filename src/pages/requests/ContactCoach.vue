<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Email</label>
      <input type="email" id="email" v-model.trim.lazy="email" />
    </div>
    <div class="form-control">
      <label for="msg">Messages</label>
      <textarea name="msg" id="msg" rows="5" v-model.trim.lazy="msg"></textarea>
    </div>
    <p class="errors" v-if="!isValid">
      Please fix the above errors.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      msg: '',
      isValid: true
    };
  },
  methods: {
    validateForm() {
      this.isValid = true;
      if (this.email === '' || !this.email.includes('@')) {
        this.isValid = false;
      }
      if (this.msg === '') {
        this.isValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if (!this.isValid) return;
      try {
        this.$store.dispatch('requests/addRequest', {
          coachId: this.$route.params.id,
          email: this.email,
          msg: this.msg
        });
        this.$router.replace('/coaches');
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
