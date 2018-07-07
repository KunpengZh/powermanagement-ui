<template>
    <el-row style="height: 100%;">
        <el-col :span="4" style="height: 100%;">
        <ReportLeftMenu />
        </el-col>
        <el-col :span="20" style="height: 100%;">
            <router-view></router-view>
        </el-col>
    </el-row>
</template>

<script>
    import ReportLeftMenu from "@/components/ReportLeftMenu";
    export default {
        name: "HomeLayout",
        components: {
            ReportLeftMenu,
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