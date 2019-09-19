import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        form: {
            name: "",
            photo: "",
            token:""
        }
    },
    mutations: {
        changeUserInfo(state, obj) {
            if (obj.name) {
                state.form.name = obj.name
            }
            if (obj.photo) {
                state.form.photo = obj.photo
            }
            if (obj.token) {
                state.form.token = obj.token
            }

        }
    }
})

export default store