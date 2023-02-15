<template>
  <header>
    <nav>
      <h1><router-link to="/">Clothie</router-link></h1>
      <ul>
        <li class="nav-options" @click="toggleCart">Cart</li>
        <li class="nav-options">
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </nav>
    <Cart
      v-if="cartVisible"
      @close-cart="toggleCart"
      :cart-items="cartItems"
      :cart-visible="true"
    ></Cart>
  </header>
</template>

<script>
  import Cart from '../views/Cart.vue';

  export default {
    components: {
      Cart
    },
    data() {
      return {
        cartVisible: false,
        cartItems: []
      };
    },
    methods: {
      toggleCart() {
        this.cartVisible = !this.cartVisible;
      }
    }
  };
</script>

<style lang="scss">
  $nav-background: #698269;

  header {
    background-color: $nav-background;
    padding: 40px 20px;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
  }

  nav a {
    text-decoration: none;
    color: black;
  }

  h1,
  li {
    cursor: pointer;
  }

  h1 {
    font-family: 'Lato', sans-serif;
  }

  .nav-options {
    font-size: 20px;
    list-style: none;
    display: inline-block;
    font-family: 'Karla', sans-serif;
    margin-left: 70px;
  }

  .nav-options:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
