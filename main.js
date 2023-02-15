import { createApp } from 'vue';
import { createStore } from 'vuex';

import App from './App.vue';
import router from './router';

const store = createStore({
  state: {
    cartItems: []
  },
  mutations: {
    addToCart(state, product) {
      const cartProduct = state.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      if (!cartProduct) {
        state.cartItems.push({ ...product, quantity: 1 });
      } else {
        product.quantity++;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, product) {
      const cartProduct = state.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      if (cartProduct.quantity > 1) {
        product.quantity--;
      } else {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== product.id
        );
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveCartItems(state, cartItems) {
      state.cartItems = cartItems;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    }
  }
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
