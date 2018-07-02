<template>
    <el-row style="height: 100%;">
        <el-col :span="4" style="height: 100%;">
        <DanganGuanliLeftMenu />
        </el-col>
        <el-col :span="20" style="height: 100%;">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    import DanganGuanliLeftMenu from "@/components/DanganGuanliLeftMenu";
    export default {
        name: "HomeLayout",
        components: {
            DanganGuanliLeftMenu,
        },
        data() {
            return {

            };
        },
        methods: {

        }
    };
</script>
<style>

</style>