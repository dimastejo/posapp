<template>
    <div class="rightbar">
        <div id="list-pesanan">
            <div class="header">

                <table width="100%">
                    <tr>
                        <td class="pb-2">
                            <p class="m-0">Order Number</p>
                            <h4>Auto</h4>
                        </td>
                        <td class="pb-2">
                            <p class="m-0">Order Date</p>
                            <h4>{{ new Date() | moment("DD/MM/YY") }}</h4>
                        </td>
                    </tr>
                </table>
            </div>

            <div style="height: 370px;display:block;overflow-y: auto;">
                <table width="97%" class="mt-3" id="table-order">
                    <tr v-for="menu in items" :key="menu.id">
                        <td>
                            <p class="mb-2 menu-items">
                                {{ menu.nama }}
                                <br/>
                                <small>{{ menu.jumlah }} x {{ menu.harga }}</small>
                            </p>
                        </td>
                        <td align="right">
                            <p class="menu-subtotal">
                                {{ menu.jumlah * menu.harga }}
                            </p>
                        </td>
                    </tr>
                </table>
            </div>

            <div
                    style="position: absolute; left: 0;bottom: 25px;width:100%;padding: 0px 30px;">
                <table width="100%" style="border-top: 1px solid #999;">
                    <tr>
                        <td class="pt-2">
                            <p class="p-0 m-0" style="font-size: 12pt;">
                                Sub Total
                            </p>
                        </td>
                        <td class="pt-4" align="right">
                            <p class="p-0 m-0" style="font-size: 12pt;color: #fff;font-weight: 600;" id="sub-total">
                                0
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td class="p-0">
                            <p class="p-0 m-0" style="font-size: 12pt;">
                                Diskon
                            </p>
                        </td>
                        <td align="right" class="p-0">
                            <p class="p-0 m-0" style="font-size: 12pt;color: #fff;font-weight: 600;" id="diskon">
                                {{ total }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p class="p-0 pt-2" style="font-size: 14pt;color: #fff;font-weight: 600;">
                                Grand Total
                            </p>
                        </td>
                        <td align="right">
                            <p class="p-0 pt-2" style="font-size: 14pt;color: #fff;font-weight: 600;" id="grand-total">
                                {{ total }}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <div class="row">
                                <div class="col-md-12 pl-1">
                                    <button class="btn btn-success btn-block btn-lg" @click="charge">Charge</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue'
    import store from './../store/index'

    Vue.use(require('vue-moment'));

    export default {
        data() {
            return {
                showModal: false
            }
        },
        methods: {
            charge() {
                store.commit('showModal')
            }
        },
        computed: {
            items() {
                return store.getters.getItems
            },
            total() {
                return store.getters.getTotal
            }
        },
        name: "TransactionPos"
    }
</script>

<style scoped>
    .rightbar {
        position: fixed;
        width: 350px;
        height: 100%;
        right: 0;
        background: #3F4149;
        padding: 30px;
    }

    #list-order .card {
        border: 0;
        margin-bottom: 30px;
        color: #666;
    }

    #list-pesanan {
        color: #ddd;
    }

    #list-pesanan .header {
        border-bottom: 1px solid #999;
    }

    #table-order tr {
        border-bottom: 1px solid #555;
    }

    #table-order tr p.menu-items {
        font-size: 12pt;
    }

    #table-order tr p.menu-subtotal {
        font-size: 12pt;
        font-weight: 600;
        color: #fff;
    }

    /* width */
    ::-webkit-scrollbar {
        width: 7px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 7px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
</style>