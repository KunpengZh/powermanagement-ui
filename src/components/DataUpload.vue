<template>
    <div style="margin-left: 20px; height: 100%">
        <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix" style="text-align: left">
                <span>档案上传</span>
            </div>
            <div style="text-align: center;width: 100%">
                <el-upload
                        class="upload-demo"
                        :action="url"
                        :multiple="false"
                        :show-file-list="false"
                        accept=".xls,.xlsx"
                        :auto-upload="true"
                        :before-upload="handleFileChange"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
                </el-upload>
            </div>
        </el-card>
    </div>
</template>

<script>


    export default {
        name: "CustomerProfileUpload",
        data() {
            return {
                alertMsg: '',
                dismissSecs: 10,
                errorAlertDown: 0,
                successAlertDown: 0,
                url: "/uploader/uploaddata",
                headers: {},
                acceptfiles: '.xls,.xlsx',
                file: null
            }
        },
        methods: {}
    };
</script>
<style>
    .card-body {
        padding: 5px;
        height: 100%;
    }
</style>

