<template>
    <div style="display:flex; width: 100%;background-color: #545c64;height: 60px;">
        <div class="logoContainer"><img src="../assets/dashboard.png" alt="" width="55px" height="55px"></div>
        <el-menu
                :default-active="menuActiveIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="1">客户数据管理</el-menu-item>
            <el-menu-item index="2">报告报表管理</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "TopMenuComponent",
        data(){
            return {
                menuActiveIndex:"1",
            }
        },
        methods:{
            handleSelect(index){
                switch (index){
                    case '1':
                        this.$router.push("/home/customerprofile");
                        break;
                    case '2':
                        this.$router.push("/report/");
                        break;
                }
            }
        }
    };
</script>
<style>
    .logoContainer {
        width: 100px;
        height: 55px;
        line-height: 55px;
        margin-left: 15px;
        margin-right: 20px;
    }
.el-menu-demo{
    height: 60px;
}
</style>


