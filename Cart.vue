<template>
  <div class="cart" v-if="cartVisible">
    <div class="summary">
      <h3>Order Summary</h3>
      <h4 v-if="cart.length > 0">Added Products:</h4>
      <h4 v-else>No Added Products:</h4>
      <h4 class="close-checkout" @click="$emit('close-cart')">X</h4>
    </div>
    <ul class="cart-list">
      <li v-for="product in cart" :key="product.id">
        <div class="product-details">
          <img
            class="product-image"
            :src="product.image"
            :alt="product.title"
          />
          <div class="item-info">
            <h4 class="item-name">{{ product.title }}</h4>
            <p class="item-price">${{ product.price }}</p>
            <div class="quantity-container">
              <button
                class="product-counter"
                @click="decrementProduct(product.id)"
              >
                -
              </button>
              <span class="quantity">{{ product.quantity }}</span>
              <button
                class="product-counter"
                @click="incrementProduct(product.id)"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="total" v-if="cart.length > 0">
      Total: ${{ totalCartCost }}
      <button>Proceed To Payment</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cartVisible: Boolean
    },
    data() {
      return {
        cartItems: []
      };
    },
    methods: {
      incrementProduct(id) {
        const product = this.cart.find(
          (productIndex) => productIndex.id === id
        );
        this.$store.commit('addToCart', product);
      },
      decrementProduct(id) {
        const product = this.cart.find(
          (productIndex) => productIndex.id === id
        );
        if (product.quantity > 0) {
          this.$store.commit('removeFromCart', product);
        }
      }
    },
    computed: {
      totalCartCost() {
        const cost = this.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        return cost.toFixed(2);
      },
      cart() {
        return this.$store.state.cartItems;
      }
    },
    created() {
      const cartItems = JSON.parse(localStorage.getItem('cartItems'));
      if (cartItems) {
        this.$store.commit('saveCartItems', cartItems);
      }
    },
    emits: ['close-cart']
  };
</script>

<style>
  .cart {
    width: 100%;
    height: 100vh;
    padding: 20px;
    display: block;
    background-color: #a9af7e;
    position: fixed;
    top: 0;
    right: 0;
    overflow-y: scroll;
  }

  .product-details {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }

  .product-details h4 {
    max-width: 130px;
    overflow: hidden;
  }

  .product-image {
    width: 150px;
    height: 150px;
    margin-right: 10px;
    border: 2px solid black;
    cursor: default;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
  }

  .item-name {
    font-family: 'Lato', sans-serif;
    cursor: default;
  }

  .item-price {
    margin-top: 10px;
    font-family: 'Karla', sans-serif;
    cursor: default;
  }

  .summary {
    padding-bottom: 20px;
    font-family: 'Karla', sans-serif;
  }

  .close-checkout:hover {
    cursor: pointer;
  }

  .close-checkout {
    position: absolute;
    top: 12px;
    right: 25px;
  }

  .cart-list {
    margin-top: 10px;
    display: block;
    justify-content: center;
    align-items: center;
    list-style: none;
  }

  .cart-list li {
    margin-bottom: 10px;
  }

  .product-counter {
    background-color: #f0a04b;
    width: 20px;
    height: 30px;
    color: black;
    text-align: center;
    cursor: pointer;
  }

  .quantity-container {
    margin-top: 15px;
  }

  .quantity {
    font-size: 20px;
    margin: 0 10px;
    font-family: 'Karla', sans-serif;
  }

  .total {
    margin-top: 20px;
    margin-bottom: 10px;
    font-weight: bold;
    font-family: 'Lato', sans-serif;
  }

  .total button {
    display: block;
    margin-top: 10px;
    padding: 5px;
    background-color: #f0a04b;
    font-family: 'Karla', sans-serif;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    .cart {
      width: 50%;
    }
  }

  @media screen and (min-width: 768px) {
    .cart {
      width: 25%;
      height: 100vh;
      padding: 10px;
    }

    .product-details {
      margin-bottom: 5px;
    }
  }

  @media screen and (min-width: 769px) {
    .cart {
      width: 40%;
    }
  }

  @media screen and (min-width: 1000px) {
    .cart {
      width: 25%;
    }
  }
</style>
