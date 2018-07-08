<template>
    <el-card class="box-card" style="height: 100%;">
        <div slot="header" class="clearfix">
            <span style="font-weight: 700">档案管理</span>
        </div>
        <div style="text-align: left;width: 100%">
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
                    {text: '按银行帐号统计', value: 'butietongji'},
                    {text: '按客户编号统计', value: 'yingfubutietongjiyuebao'},
                    {text: '发电异常月报', value: 'fadianyichang'},
                    {text: '按银行信息统计报表', value: 'sumbybank'},
                    {text: '按消纳方式统计报表', value: 'sumbyxiaonafangshi'},
                ]
            }
        },
        methods: {
            switchMenu(index) {
                this.activeMenu = index;
                switch (index){
                    case 0:
                        this.$router.push("/report/butietongji");
                        break;
                    case 1:
                        this.$router.push("/report/yingfubutietongjiyuebao");
                        break;
                    case 2:
                        this.$router.push("/report/fadianyichang");
                        break;
                    case 3:
                        this.$router.push("/report/sumbybank");
                        break;
                    case 4:
                        this.$router.push("/report/sumbyxiaonafangshi");
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

