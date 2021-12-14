<template>
  <div>
    <div class="product">
      <div class="price" :class="priceStatus">{{ product.price }} руб</div>
      <div class="name">
        {{ product.name }} (В наличии {{ product.count }} шт.)
      </div>
      <div class="botton-menu">
        <button @click="putIntoCart" type="button" class="button">
          {{ qty > 0 ? "В корзине" : "Добавить в корзину" }}
        </button>
        <Counter
          classname="productCounter"
          :qty="qty"
          :id="product.id"
          :update="updateQty"
          :max="product.count"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Counter from "./Counter.vue";

export default {
  name: "ProductCard",
  components: { Counter },
  props: ["product"],
  data() {
    return {
      qty: 0,
      priceStatus: "", // red, green or empty
    };
  },
  created() {
    const addedToCart = this.cart.find(
      (product) => product.id === this.product.id
    );

    if (addedToCart) {
      this.qty = addedToCart.qty;
    }
  },
  computed: {
    ...mapState(["cart"]),
  },
  watch: {
    product: function (newValue, oldValue) {
      if (newValue.price > oldValue.price) {
        this.priceStatus = "red";
      }

      if (newValue.price < oldValue.price) {
        this.priceStatus = "green";
      }

      if (newValue.price === oldValue.price) {
        this.priceStatus = "";
      }
    },
  },
  methods: {
    putIntoCart() {
      if (this.qty === 0) {
        this.$store.commit("putIntoCart", {
          description: this.product.name,
          price: this.product.price,
          id: this.product.id,
          qty: 1,
          count: this.product.count,
        });
        this.qty = 1;
      }
    },
    updateQty(newQty) {
      this.qty = newQty;
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 6px;
  margin-bottom: 10px;
}

.button {
  min-width: 220px;
  margin-right: 30px;
}

.botton-menu {
  display: flex;
  flex-direction: row;
  height: 50px;
}

.name, .price {
  margin-bottom: 20px;
}

.price {
  margin-top: 11px;
  font-size: 1.2em;
  font-weight: 700;
}

.red {
  color: red;
}

.green {
  color: green;
}
</style>
