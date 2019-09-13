<template>
    <div id="app">
        <Navbar/>

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-7">
                    <MenuPos/>
                </div>
                <div class="col-md-5">
                    <TransactionPos/>
                </div>
            </div>
        </div>

        <div v-if="showModal">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">

                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Payment</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true" @click="closeModal">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div v-if="payment">
                                        <h1 class="text-center mt-5 mb-3">
                                            {{ total }}
                                        </h1>

                                        <div class="row mb-5">
                                            <div class="col-md-3"></div>
                                            <div class="col-md-6">
                                                <button type="button" class="btn btn-block btn-success"
                                                        @click="charge">
                                                    Charge
                                                </button>
                                            </div>
                                            <div class="col-md-3"></div>
                                        </div>
                                    </div>
                                    <div v-if="paymentSuccess">
                                        <div class="success-checkmark">
                                            <div class="check-icon">
                                                <span class="icon-line line-tip"></span>
                                                <span class="icon-line line-long"></span>
                                                <div class="icon-circle"></div>
                                                <div class="icon-fix"></div>
                                            </div>
                                        </div>

                                        <div class="row mb-5">
                                            <div class="col-md-3"></div>
                                            <div class="col-md-6">
                                                <button type="button" class="btn btn-block btn-success"
                                                        @click="closeModal(); payment= true;paymentSuccess= false;">
                                                    New Order
                                                </button>
                                            </div>
                                            <div class="col-md-3"></div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */

    import Navbar from './components/Navbar.vue'
    import MenuPos from './components/MenuPos.vue'
    import TransactionPos from './components/TransactionPos.vue'
    import store from './store/index'
    import axios from 'axios'

    export default {
        name: 'app',
        components: {
            Navbar,
            MenuPos,
            TransactionPos
        },
        data() {
            return {
                payment: true,
                paymentSuccess: false
            }
        },
        methods: {
            closeModal() {
                store.commit('closeModal')
            },
            charge() {
                axios.post('http://localhost:3000/api/v1/order/save', this.items).then(res => {
                    store.commit('clearItems')

                    this.paymentSuccess = true
                    this.payment = false
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        computed: {
            items() {
                return store.getters.getItems
            },
            showModal() {
                return store.getters.getModal
            },
            total() {
                return store.getters.getTotal
            }
        },
    }
</script>

<style>
    body {
        background: #F8F8F8;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .success-checkmark {
        width: 80px;
        height: 115px;
        margin: 0 auto;
    }

    .success-checkmark .check-icon {
        width: 80px;
        height: 80px;
        position: relative;
        border-radius: 50%;
        box-sizing: content-box;
        border: 4px solid #4CAF50;
    }

    .success-checkmark .check-icon::before {
        top: 3px;
        left: -2px;
        width: 30px;
        transform-origin: 100% 50%;
        border-radius: 100px 0 0 100px;
    }

    .success-checkmark .check-icon::after {
        top: 0;
        left: 30px;
        width: 60px;
        transform-origin: 0 50%;
        border-radius: 0 100px 100px 0;
        animation: rotate-circle 4.25s ease-in;
    }

    .success-checkmark .check-icon::before, .success-checkmark .check-icon::after {
        content: '';
        height: 100px;
        position: absolute;
        background: #FFFFFF;
        transform: rotate(-45deg);
    }

    .success-checkmark .check-icon .icon-line {
        height: 5px;
        background-color: #4CAF50;
        display: block;
        border-radius: 2px;
        position: absolute;
        z-index: 10;
    }

    .success-checkmark .check-icon .icon-line.line-tip {
        top: 46px;
        left: 14px;
        width: 25px;
        transform: rotate(45deg);
        animation: icon-line-tip 0.75s;
    }

    .success-checkmark .check-icon .icon-line.line-long {
        top: 38px;
        right: 8px;
        width: 47px;
        transform: rotate(-45deg);
        animation: icon-line-long 0.75s;
    }

    .success-checkmark .check-icon .icon-circle {
        top: -4px;
        left: -4px;
        z-index: 10;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        position: absolute;
        box-sizing: content-box;
        border: 4px solid rgba(76, 175, 80, 0.5);
    }

    .success-checkmark .check-icon .icon-fix {
        top: 8px;
        width: 5px;
        left: 26px;
        z-index: 1;
        height: 85px;
        position: absolute;
        transform: rotate(-45deg);
        background-color: #FFFFFF;
    }

    @keyframes rotate-circle {
        0% {
            transform: rotate(-45deg);
        }
        5% {
            transform: rotate(-45deg);
        }
        12% {
            transform: rotate(-405deg);
        }
        100% {
            transform: rotate(-405deg);
        }
    }

    @keyframes icon-line-tip {
        0% {
            width: 0;
            left: 1px;
            top: 19px;
        }
        54% {
            width: 0;
            left: 1px;
            top: 19px;
        }
        70% {
            width: 50px;
            left: -8px;
            top: 37px;
        }
        84% {
            width: 17px;
            left: 21px;
            top: 48px;
        }
        100% {
            width: 25px;
            left: 14px;
            top: 45px;
        }
    }

    @keyframes icon-line-long {
        0% {
            width: 0;
            right: 46px;
            top: 54px;
        }
        65% {
            width: 0;
            right: 46px;
            top: 54px;
        }
        84% {
            width: 55px;
            right: 0px;
            top: 35px;
        }
        100% {
            width: 47px;
            right: 8px;
            top: 38px;
        }
    }


</style>
