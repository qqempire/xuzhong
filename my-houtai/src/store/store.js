

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
 
import state from './state'
 
var mutations={
	add(a){
		a.count++
	},
	jian(a){
		a.count--
    },
    login(a,b){
        a.name=b
    }
}
 


export default new Vuex.Store({
	
	state,
	mutations
	
})
