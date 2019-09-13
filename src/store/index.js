/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [],
        subTotal: 0,
        grandTotal: 0,
        modal: false
    },
    getters: {
        getItems: state => {
            var data = _(state.items)
                .groupBy('id')
                .map(function (items, id) {
                    state.subTotal += items[0].harga_jual

                    return {
                        id_menu: items[0].id,
                        nama: items[0].nama,
                        harga: items[0].harga_jual,
                        jumlah: items.length
                    };
                }).value()

            return data
        },
        getTotal: (state) => {
            return state.subTotal
        },
        getModal: (state) => {
            return state.modal
        }
    },
    mutations: {
        clearItems(state) {
            state.items = []
        },
        addItem(state, item) {
            state.items.push(item)
        },
        showModal(state) {
            state.modal = true
        },
        closeModal(state) {
            state.modal = false
        }
    }
})