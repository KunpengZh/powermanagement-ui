<template>
    <div id="app">
        <el-container style="height: 100%;">
            <el-header height="70px" style="padding: 0;"><TopMenuComponent /></el-header>
            <el-main style="height: 100%;">
                <router-view/>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import TopMenuComponent from "@/components/TopMenuComponent";

    export default {
        name: "App",
        components: {TopMenuComponent}
    };
</script>

<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }
    .bodyContainer{
        margin-top: 75px;
        width: 100%;
        padding: 5px;;
        height: 100%;
    }
</style>
