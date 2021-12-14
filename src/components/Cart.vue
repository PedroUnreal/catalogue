<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="this.cart.length === 0">
      <div>Пока корзина пуста</div>
      <router-link to="/">
        <button class="button">
          Назад к каталогу 
        </button>
      </router-link>
    </div>
    <div v-else>
      <CartProduct v-for="(item, index) in cart" :key="index" :index="index" />
      <div class="sum">Сумма заказа: {{ getTotal }} руб</div>
      <div class="button-wrapper">
        <router-link to="/">
          <button class="button">
            Назад к каталогу 
          </button>
        </router-link>
        <button class="button" @click="showCart">Сделать заказ</button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartProduct from "./CartProduct.vue";

export default {
  name: "cart",
  components: { CartProduct },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["getTotal"]),
  },
  methods: {
    showCart() {
      alert(JSON.stringify(this.cart));
    },
  },
};
</script>

<style scoped>
.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button {
  margin-top: 20px;
}

.sum {
  font-size: 1.2em;
  font-weight: 700;
  text-align: right;
}
</style>
