<template>
    <div id="menu-order" class="main-content">
        <div class="row">
            <div class="col-md-12">

                <div class="row">
                    <div class="col-md-2 pr-0" v-for="o in menus" :key="o.id">
                        <div class="card card-menu" v-on:click="addItem(o)">
                            <div class="card-body p-0" style="min-height: 110px;">
                                <img v-bind:src="o.gambar" class="img-fluid"/>
                            </div>
                            <div class="card-footer p-2 bg-white" style="border-top:0;">
                                {{ o.nama }}<br/>
                                <b>{{ o.harga_jual }}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */

    import axios from 'axios'
    import store from './../store/index'

    export default {
        data() {
            return {
                menus: []
            }
        },
        mounted() {
            this.load()
        },
        methods: {
            load() {
                axios.get('http://localhost:3000/api/v1/menu').then(res => {
                    this.menus = res.data
                }).catch((err) => {
                    console.log(err);
                })
            },
            addItem(item) {
                store.commit('addItem', item);
            },
            increment() {
                store.commit('increment')
            },
            decrement() {
                store.commit('decrement')
            }

        },
        computed: {
            counter() {
                return store.getters.getCounter
            }
        },
        name: "MenuPos"
    }
</script>

<style scoped>
    #menu-order {
        margin-top: 100px;
    }

    #list-kategori {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    #list-kategori li:first-child {
        margin-top: 0;
    }

    #list-kategori li {
        margin: 15px 0px;
    }

    #list-kategori li a {
        font-size: 12pt;
        padding: 10px 30px;
        display: block;
    }

    #list-kategori li a.active {
        background: #3277F6;
        color: #fff;
        border-radius: 25px;
    }

    #menu-order .card {
        margin-bottom: 30px;
    }


</style>