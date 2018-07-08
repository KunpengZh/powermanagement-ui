<template>
    <div style="margin-left: 20px; height: 100%">
        <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix" style="text-align: left">
                <span>补贴统计月报</span>
            </div>
            <div style="display: flex; justify-content: flex-start">
                <el-date-picker
                        v-model="query.datePeriod"
                        type="daterange"
                        size="small"
                        class="queryInput"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <el-button-group style="padding-bottom: 10px;  padding-left: 10px;">
                    <el-button size="small" type="primary" icon="el-icon-upload" @click="handleQueryData">查询</el-button>
                    <el-button size="small" type="primary" icon="el-icon-upload" @click="handleExcelExport">导出</el-button>
                </el-button-group>
            </div>
            <div class="agGridWarrp80">
                <ag-grid-vue style="width: 100%; height: 100%; text-align: left" class="ag-theme-balham"
                             :gridOptions="gridOptions"
                             :columnDefs="columnDefs"
                             :rowData="rowData"
                             :enableSorting="true"
                             :enableColResize="true"
                >
                </ag-grid-vue>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: "FadianYichang",
        data() {
            return {
                query: {
                    datePeriod: [],
                    startPeriod: '',
                    endPeriod: ''
                },
                gridOptions: {},
                columnDefs: [
                    {
                        headerName: '序号',
                        field: "indexid",
                        width: 150,
                        editable: false,

                    },
                    {
                        headerName: '客户编号',
                        field: "customerId",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '客户名称',
                        field: "customerName",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '客户地址',
                        field: "customerAddress",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '合同容量',
                        field: "contactCapacity",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '发电量',
                        field: "faDianliang",
                        width: 150,
                        editable: false
                    }
                ],
                rowData: [],
                sourceData: [],
                formLabelWidth: "120px",
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        methods: {
            handleExcelExport() {
                if (this.rowData.length <= 0) {
                    this.$message.error("无有数据!!");
                    return;
                }
                this.Utils.jsonToExcel(this.query.danwei + '发电异常客户计表.xlsx', '发电异常统计表', this.rowData, this.columnDefs,'发电异常统计表客户统计表');
            },
            handleQueryData() {
                if (this.query.datePeriod.length <= 0) {
                    this.$message.error("时间区间为必选项!!");
                    return;
                }
                this.query.startPeriod = this.query.datePeriod[0];
                this.query.endPeriod = this.query.datePeriod[1];
                this.loadingCustomerData();
            },
            loadingCustomerData() {
                this.$http.post("/customerdata/Fadianyichang", JSON.stringify(this.query)).then(res => {
                    res = res.body;
                    this.sourceData = res;
                    this.rowData = res;
                });
            }
        }
    };
</script>
<style>
    .el-card__body {
        height: 100% !important;
        padding-top: 10px !important;
    }
</style>

