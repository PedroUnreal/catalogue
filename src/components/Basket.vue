<template>
  <div class="product">
    <h1>Содержимое корзины:</h1>
    <div v-if="this.basket.length < 1">Пока корзина пуста</div>
    <div v-else>
      <BasketProduct
        v-for="(item, index) in basket"
        :key="index"
        :index="index"
      />
      <div class="summ">
        <div>Сумма заказа: {{ getTotal }}руб</div>
        <button class="button" @click="showbasket">Сделать заказ</button>
      </div>
    </div>
    <router-link to="/" class="button">Назад к каталогу </router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import BasketProduct from "./BasketProduct.vue";

export default {
  name: "Basket",
  components: { BasketProduct },
  computed: {
    ...mapState(["basket"]),
    ...mapGetters(["getTotal"]),
  },
  //props: ["index"],
  methods: {
    showbasket() {
      alert(JSON.stringify(this.basket));
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.product {
  position: relative;
}
.summ {
  position: absolute;
  bottom: 0px;
  right: 60px;
  font-size: 1.2em;
  font-weight: 700;
}
</style>
