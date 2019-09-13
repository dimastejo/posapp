<template>
    <div class="header">
        <div class="brand">
            <b>Resto</b> Apps
        </div>
        <div class="top-menu">
            <a href="" class="active">MEJA</a>
            <a href="">MENU</a>
            <a href="">ORDER STATUS</a>
            <a href="">PEMBAYARAN</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Navbar"
    }
</script>

<style scoped>
    .header {
        position: fixed;
        width: 100%;
        height: 75px;
        background: #fff;
        display: inline-flex;
    }

    .header .brand, .header .brand b {
        font-size: 22pt;
        padding-left: 15px;
        line-height: 75px;
    }

    .header .top-menu {
        line-height: 75px;
        margin-left: 30px;
    }

    .header .top-menu a {
        color: #A6A7AE;
        padding: 0px 30px;
        font-weight: 600;
    }

    .header .top-menu a.active {
        font-weight: 900;
        color: #3277F6;
    }
</style>