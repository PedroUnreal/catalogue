import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    list: null,
    groups: null,
    cart: [],
  }),
  mutations: {
    setProductList: (state, newList) => {
      state.list = newList;
    },
    setGroupList: (state, groups) => {
      state.groups = groups;
    },

    // Работа с корзиной
    putIntoCart: (state, newProduct) => {
      state.cart.push(newProduct);
    },
    changeQty: (state, { qty, id }) => {
      state.cart.forEach((item, index) =>
        item.id === id
          ? qty === 0
            ? state.cart.splice(index, 1)
            : (item.qty = qty)
          : ""
      );
    },
  },
  actions: {
    // Получение списка товаров
    getList: (context) => {
      const list = require("../data/data.json");
      // Явно создаем новый объект, так как по содержанию он не отличается от старого
      // и вызова getProductsByGroups не происходит
      context.commit("setProductList", { ...list });
    },
    // Получение списка категорий
    getNames: (context) => {
      const groups = require("../data/names.json");
      context.commit("setGroupList", groups);
    },
  },
  getters: {
    // Подсчет суммы всех товаров
    getTotal: (state) => {
      return state.cart
        .reduce((accumulator, currentValue) => {
          currentValue = currentValue.price * currentValue.qty;
          return accumulator + currentValue;
        }, 0)
        .toFixed(2);
    },
    // Получение структуры для UI каталога - сгруппированных по категориям товаров
    getProductsByGroups: (state) => {
      const groups = [];

      if (state.list && state.groups) {
        const goods = state.list.Value.Goods;
        const rate = getRandomRate();

        Object.entries(state.groups).forEach(([groupId, groupValue]) => {
          const productsInGroup = goods.reduce((accum, product) => {
            if (product.G === parseInt(groupId)) {
              const productInGroup = groupValue.B[product.T];

              accum.push({
                id: product.T,
                name: productInGroup.N,
                price: parseFloat((rate * product.C).toFixed(2)),
                count: product.P,
              });
            }
            return accum;
          }, []);

          if (productsInGroup.length > 0) {
            groups.push({
              id: groupId,
              name: groupValue.G,
              products: productsInGroup,
            });
          }
        });
      }

      return groups;
    },
  },
});

// Получение рандомного курса доллара от 20 до 80 руб/usd
function getRandomRate() {
  return Math.random() * (80 - 20) + 20;
}
