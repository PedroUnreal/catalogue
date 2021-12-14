<template>
  <div>
    <div class="product">
      <div class="price" :class="priceStatus">{{ calcPrice }} руб</div>
      <div class="description">{{ description }} (В наличии {{ product.count }} шт.)</div>
      <div class="botton-menu">
        <button @click="putIntoBasket" type="button" class="button">
          Добавить в корзину
        </button>
        <Counter
          classname="productCounter"
          :qty="this.qty"
          :id="this.id"
          :key="key"
          :update="this.update"
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
  props: ["index", "product"],
  data() {
    return {
      qty: 0,
      key: 0,
      localPrice: this.product.price,
      priceStatus: '', // up, down or equal
    };
  },
  created() {
    this.setCurrentQty();
  },
  updated() {
    this.setCurrentQty();
  },
  computed: {
    ...mapState(["basket"]),
    description() {
      return this.product.name;
    },
    id() {
      return this.product.id;
    },
    calcPrice() {
      return this.product.price;
      // return Math.floor((this.product.id / 27) * 2);
    },
  },
  watch: {
    product: function(newValue, oldValue) {
      console.log(newValue.price, 'newValue.price');
      console.log(oldValue.price, 'oldValue.price');

      if (newValue.price > oldValue.price) {
        this.priceStatus = 'red';
      }

      if (newValue.price < oldValue.price) {
        this.priceStatus = 'green';
      }

      if (newValue.price === oldValue.price) {
        this.priceStatus = '';
      }
    }
  },
  methods: {
    putIntoBasket() {
      this.key++;
      if (this.basket.findIndex((item) => item.id === this.id) === -1) {
        this.$store.commit("putIntoBasket", {
          description: this.description,
          price: this.calcPrice,
          id: this.id,
          qty: 1,
          count: this.product.count,
        });
        this.qty = 1;
      } 
      
      // else {
      //   this.increaseQty();
      // }
    },
    increaseQty() {
      this.qty++;
      this.$store.commit("changeQty", {
        qty: this.qty,
        id: this.id,
      });
    },
    setCurrentQty() {
      this.basket.forEach((item) =>
        item.id === this.id ? (this.qty = item.qty) : ""
      );
    },
    update() {
      this.qty = this.localQty;
    },
  },
};
</script>

<style scoped>
.product {
  display: flex;
  position: relative;
  flex-direction: column;
  padding-bottom: 5px;
  padding-left: 5px;
  border: 1px solid black;
  margin-bottom: 10px;
}

.botton-menu {
  display: flex;
  flex-direction: row;
  height: 50px;
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

.description {
  height: 70px;
  overflow: auto;
}
</style>
