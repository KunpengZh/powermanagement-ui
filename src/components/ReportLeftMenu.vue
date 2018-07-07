<template>
    <el-card class="box-card" style="height: 100%;">
        <div slot="header" class="clearfix">
            <span style="font-weight: 700">档案管理</span>
        </div>
        <div style="text-align: center;width: 100%">
            <ul style="list-style:none;  width: 100%;padding: 0;">
                <li v-for="(menu,index) in leftMenus" v-on:click="switchMenu(index)" v-bind:class="index==activeMenu?activeMenuClass:nonActiveMenuClass">{{menu.text}}</li>
            </ul>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'LeftFloatComponent',
        data() {
            return {
                activeMenuClass: 'list-group-item list-menu-active',
                nonActiveMenuClass: 'list-group-item',
                activeMenu: 0,
                leftMenus: [
                    {text: '补贴统计月报', value: 'butietongjiyuebao'},
                    {text: '应付补贴统计', value: 'butietongji'},
                    {text: '发电异常月报', value: 'fadianyichang'},
                ]
            }
        },
        methods: {
            switchMenu(index) {
                this.activeMenu = index;
                switch (index){
                    case 0:
                        this.$router.push("/report/butietongjiyuebao");
                        break;
                    case 1:
                        this.$router.push("/report/butietongji");
                        break;
                    case 2:
                        this.$router.push("/report/fadianyichang");
                        break;
                    case 3:
                        this.$router.push("/report/customerdatanew");
                        break;
                    case 4:
                        this.$router.push("/report/dataupload");
                        break;
                }
            }
        }
    }
</script>
<style>
    .list-group-item{
        margin-top: 25px;
        margin-bottom: 25px;
    }
    .list-menu-active{
        color: cornflowerblue;
    }
</style>

