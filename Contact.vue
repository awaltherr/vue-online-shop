<template>
  <div class="contact-description">
    <div class="contact-heading">
      <h2>We are here for you to help.</h2>
      <h3>
        Do you have any questions or feedback? Please fill in the form below and
        we will reach back to you as soon as possible.
      </h3>
    </div>
  </div>
  <form class="contact-form" @submit.prevent="submitForm">
    <div class="form-control">
      <label for="first-name">First Name*</label>
      <input type="text" id="firstname" v-model="firstName" />
      <p v-if="!validFirstName && !firstName" class="error">
        Please fill in your first name
      </p>
    </div>
    <div class="form-control">
      <label for="last-name">Last Name*</label>
      <input type="text" id="lastname" v-model="lastName" />
      <p v-if="!validLastName && !lastName" class="error">
        Please fill in your last name
      </p>
    </div>
    <div class="form-control">
      <label for="email">Email*</label>
      <input type="email" id="email" v-model="email" />
      <p v-if="!validEmail && !email" class="error">Please enter your email</p>
      <p v-else-if="!validEmail">Please enter a valid email</p>
    </div>
    <div class="form-control">
      <label for="message">Message*</label>
      <textarea
        type="message"
        id="message"
        rows="8"
        cols="50"
        placeholder="Aa"
        v-model="message"
      ></textarea>
      <p v-if="!validMessage && !message" class="error">
        Please write your Message
      </p>
    </div>
    <div class="submit" @click="submitForm">Send Message</div>
    <div class="success" v-if="formIsValid">
      <h1>Thank you for your message!</h1>
    </div>
  </form>
</template>

<script scoped>
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        message: '',
        validFirstName: true,
        validLastName: true,
        validEmail: true,
        validMessage: true,
        formIsValid: false
      };
    },
    methods: {
      submitForm() {
        this.validFirstName = this.firstName.trim().length > 0;
        this.validLastName = this.lastName.trim().length > 0;
        this.validEmail =
          this.emailValidation() && this.email.trim().length > 0;
        this.validMessage = this.message.trim().length > 0;
        if (
          this.validFirstName &&
          this.validLastName &&
          this.validEmail &&
          this.validMessage
        ) {
          this.formIsValid = true;
        }
      },
      emailValidation() {
        const regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        return this.email.trim().length === 0 ? false : regex.test(this.email);
      }
    }
  };
</script>

<style>
  .contact-description {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 130px 0;
    background-color: #f0a04b;
  }

  .contact-heading {
    text-align: center;
  }

  .contact-heading h2,
  h3 {
    padding-bottom: 40px;
    font-family: 'Karla', sans-serif;
  }

  .success {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    text-align: left;
    width: 100%;
    font-family: 'Lato', sans-serif;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 100px 0;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 100%;
    max-width: 500px;
  }

  label {
    font-family: 'Lato', sans-serif;
    margin-bottom: 10px;
  }

  input,
  textarea {
    padding: 8px;
    font-size: 16px;
    resize: none;
  }

  .submit {
    background-color: #85cdfd;
    padding: 8px;
    width: 100%;
    max-width: 500px;
    text-align: center;
    font-family: 'Lato', sans-serif;
    cursor: pointer;
  }
</style>
