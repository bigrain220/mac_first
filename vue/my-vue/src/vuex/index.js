import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    city: '深圳',
    cityID: "1"
  },
  getters:{
    getCity(state) {  //方法名随意,主要是来承载变化的city的值
        return state.city
     },
     getCityId(){  //方法名随意,主要是用来承载变化的cityID的值
        return state.cityID
     }
  },
  mutations: {
    setCity(state, value) {
      state.city = value;
    },
    setCityID(state, value) {
      state.cityID = value;
    }
  },
  actions: {
    selectCity(context, params) {
      // context.commit('setCity', params.city);
      context.commit('setCityID', params.id);
    }
  }
});

export default store;
