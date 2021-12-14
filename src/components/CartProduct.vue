<template>
  <div>
    <div class="product">
      <div class="description">{{ description }}</div>
      <div class="price">{{ calcPrice }} руб</div>
      <div class="price">{{ calcQty }} шт</div>
      <div>
        <Counter
          class="cart"
          :qty="calcQty"
          :id="calcId"
          :max="maxCount"
          classname="cartCounter"
        />
      </div>
      <div class="price">Сумма: {{ sum }} руб</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Counter from "./Counter.vue";

export default {
  name: "CartProduct",
  components: { Counter },
  props: ["index"],
  computed: {
    ...mapState(["cart"]),
    sum() {
      // Общая стоимость всех единиц данного товара
      return (this.calcQty * this.calcPrice).toFixed(2);
    },
    description() {
      return this.cart[this.index].description;
    },
    calcPrice() {
      return this.cart[this.index].price;
    },
    calcQty() {
      return this.cart[this.index].qty;
    },
    calcId() {
      return this.cart[this.index].id;
    },
    maxCount() {
      return this.cart[this.index].count;
    },
  },
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}

.price {
  justify-self: center;
  font-size: 1.2em;
  font-weight: 700;
}

.description {
  margin-bottom: 25px;
  min-height: 100px;
}

img {
  max-height: 100px;
}
</style>
