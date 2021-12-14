<template>
  <div v-if="qty > 0" :class="classname">
    <div class="quantity_inner">
      <button @click="decreaseQty" class="bt_minus">-</button>
      <div class="quantity">{{ qty }}</div>
      <button @click="increaseQty" class="bt_plus" :disabled="maxCountReached">
        +
      </button>
    </div>

    <div v-if="maxCountReached">
      Вы не можете добавить больше {{ max }} товара(-ов)
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Counter",
  props: ["qty", "id", "update", "max", "classname"],
  computed: {
    ...mapState(["cart"]),
    maxCountReached: function () {
      return this.qty === this.max;
    },
  },
  methods: {
    increaseQty() {
      if (this.qty === this.max) return;

      this.$store.commit("changeQty", {
        qty: this.qty + 1,
        id: this.id,
      });

      if (typeof this.update === "function") {
        this.update(this.qty + 1);
      }
    },
    decreaseQty() {
      this.$store.commit("changeQty", {
        qty: this.qty - 1,
        id: this.id,
      });
      if (typeof this.update === "function") {
        this.update(this.qty - 1);
      }
    },
  },
};
</script>

<style scoped>
.productCounter {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.cartCounter {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.quantity_inner * {
  box-sizing: border-box;
}

.quantity_inner {
  height: 40px;
  display: inline-flex;
  align-items: center;
  border-radius: 26px;
  border: 3px solid #d77206;
  margin-right: 15px;
}

.cartCounter .quantity_inner {
  margin-bottom: 20px;
  margin-right: 0;
}

.quantity_inner .bt_minus,
.quantity_inner .bt_plus,
.quantity_inner .quantity {
  border: 0;
  background: transparent;
  cursor: pointer;
  outline: 0;
  font-size: 18px;
  font-weight: bold;
  color: #d77206;
}

.quantity_inner .quantity {
  width: 50px;
  text-align: center;
  flex: 1;
}

.quantity_inner .bt_minus,
.quantity_inner .bt_plus {
  flex: 1;
  padding: 10px;
  transition: color 0.2s;
}

.quantity_inner .bt_minus:hover,
.quantity_inner .bt_plus:hover:not(:disabled) {
  color: #000;
}

button:disabled {
  opacity: 0.5;
}
</style>
