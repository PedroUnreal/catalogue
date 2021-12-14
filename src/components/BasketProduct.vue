<template>
  <div>
    <div class="product">
      <div class="description">{{ description }}</div>
      <div class="price">{{ calcPrice }} руб</div>
      <div class="price">{{ calcQty }} шт</div>
      <div>
        <Counter
          class="basket"
          :qty="calcQty"
          :id="calcId"
          :max="maxCount"
          classname="basketCounter"
        />
      </div>
      <div class="price">Сумма: {{ calcQty * calcPrice }} руб</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Counter from "./Counter.vue";

export default {
  name: "ProductCard",
  components: { Counter },
  props: ["index"],
  computed: {
    ...mapState(["basket"]),
    description() {
      return this.basket[this.index].description;
    },
    calcPrice() {
      return this.basket[this.index].price;
    },
    calcQty() {
      return this.basket[this.index].qty;
    },
    calcId() {
      return this.basket[this.index].id;
    },
    maxCount() {
      return this.basket[this.index].count;
    },
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.price {
  justify-self: center;
  font-size: 1.2em;
  font-weight: 700;
}
.counter {
  margin: -10px;
}

.description {
  margin-bottom: 25px;
  min-height: 100px;
}

img {
  max-height: 100px;
}
</style>
