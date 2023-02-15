<template>
  <ul class="product-container">
    <li class="product-list" :key="product.id" v-for="product in products">
      <img class="product-img" :src="product.image" :alt="product.title" />
      <div class="product-info">
        <h4 class="product-title">Title: {{ product.title }}</h4>
        <p class="product-price">Price: ${{ product.price }}</p>
      </div>
      <div class="product-btn">
        <button class="add-cart" @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </li>
  </ul>
</template>

<script scoped>
  export default {
    data() {
      return {
        products: []
      };
    },
    created() {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((result) => {
          this.products = result;
        });
    },
    methods: {
      addToCart(product) {
        const selectedItem = {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        };
        this.$store.commit('addToCart', selectedItem);
      }
    }
  };
</script>

<style scoped>
  .product-container {
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin: 80px auto;
    gap: 40px;
  }

  .product-list {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: center;
    width: 300px;
    cursor: default;
  }

  .product-img {
    width: 250px;
    height: 250px;
  }

  .product-title {
    margin: 10px 0;
    width: 250px;
    font-family: 'Lato', sans-serif;
  }

  .product-price {
    font-family: 'Karla', sans-serif;
    margin-bottom: 5px;
  }

  .add-cart {
    display: inline-block;
    background-color: #f0a04b;
    padding: 5px;
    width: 250px;
    color: black;
    text-align: center;
    cursor: pointer;
  }
</style>
