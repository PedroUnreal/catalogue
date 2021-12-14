import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    list: null,
    groups: null,
    basket: [],
  }),
  mutations: {
    setProductList: (state, newList) => {
      state.list = newList;
    },
    setGroupList: (state, groups) => {
      state.groups = groups;
    },
    putIntoBasket: (state, newProduct) => {
      state.basket.push(newProduct);
    },
    changeQty: (state, { qty, id }) => {
      state.basket.forEach((item, index) =>
        item.id === id
          ? qty === 0
            ? state.basket.splice(index, 1)
            : (item.qty = qty)
          : ""
      );
    },
  },
  actions: {
    getList: (context) => {
      const list = require("../data/data.json");
      console.log(list, 'list');
      context.commit("setProductList", list);
    },
    getNames: (context) => {
      const groups = require("../data/names.json");
      console.log('grooopus');
      context.commit("setGroupList", groups);
    },
  },
  getters: {
    getTotal: (state) => {
      return state.basket.reduce((accumulator, currentValue) => {
        currentValue = currentValue.price * currentValue.qty;
        return accumulator + currentValue;
      }, 0);
    },
    getProductsByGroups: (state) => {
      const groups = [];

      if (state.list && state.groups) {
        const goods = state.list.Value.Goods;

        Object.entries(state.groups).forEach(([groupId, groupValue]) => {
          const productsInGroup = goods.reduce((accum, product) => {
            if (product.G === parseInt(groupId)) {
              const productInGroup = groupValue.B[product.T];

              accum.push({
                id: product.T,
                name: productInGroup.N,
                price: product.C,
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
