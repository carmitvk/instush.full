import Vue from 'vue'
import Vuex from 'vuex'

import {postiStore} from './posti.store.js'
import {userStore} from './user.store.js'
import {chatStore} from './chat.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        postiStore,
        userStore,
        chatStore,
    }
})

