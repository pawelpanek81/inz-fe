import Vue from 'vue'
import Vuex from 'vuex'
import globalState from './state'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: globalState,
    modules: {
    }
})