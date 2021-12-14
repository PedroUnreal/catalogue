<template>
  <div>
    <div v-if="this.cart.length > 0" class="order">
      <router-link to="/cart" class="button">
        Перейти к оформлению
        <div class="counter-dot">{{ cart.length }}</div>
      </router-link>
    </div>
    <div>
      <h1>Каталог товаров по категориям</h1>
      <div v-for="group in getProductsByGroups" :key="group.id">
        <h2>{{ group.name }}</h2>
        <ProductCard
          v-for="product in group.products"
          :product="product"
          :key="product.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ProductCard from "./ProductCard.vue";
export default {
  name: "Catalogue",
  components: {
    ProductCard,
  },
  data() {
    return {
      activeBtn: "",
      interval: null, // интервал запроса за списком товаров
    };
  },
  computed: {
    ...mapState(["cart"]),
    ...mapGetters(["getProductsByGroups"]),
  },
  mounted() {
    // Первичные запросы за списком категорий и товаров
    this.$store.dispatch("getNames");
    this.$store.dispatch("getList");

    // Обновление списка товаров каждые 15 секунд 
    this.interval = setInterval(() => {
      this.$store.dispatch("getList");
    }, 15000);
  },
  unmounted() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
.order {
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 150px;
  z-index: 2;
  border: 3px solid rgb(233, 48, 79);
  padding-left: 20px;
}

.order .button {
  position: relative;
}

.counter-dot {
  position: absolute;
  left: 200px;
  top: -30px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  background: rgb(209, 33, 121);
  margin: 1em;
  border-radius: 50%;
  text-align: center;
  font-weight: 700;
  font-size: 1.2em;
}
</style>
