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
                    <el-button size="small" type="primary" icon="el-icon-upload" @click="handleColDef">定制</el-button>
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
                             :gridReady="onGridReady"
                >
                </ag-grid-vue>
            </div>
        </el-card>
        <el-dialog title="定制数据列" :visible.sync="dialogColDefVisible">
            <el-checkbox-group v-model="columnSelected">
                <el-checkbox v-for="(col,index) in availableColDefs" :label="col.headerName" :key="index">{{col.headerName}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
                <el-button @click="colDefineCancel">取 消</el-button>
                <el-button type="primary" @click="colDefineConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: "ButieTongji",
        data() {
            return {
                query: {
                    datePeriod: [],
                    startPeriod: '',
                    endPeriod: ''
                },
                gridOptions: {},
                dialogColDefVisible: false,
                columnSelected: [],
                columnDefs: [],
                baseColumnDefs: [
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
                        headerName: '银行帐号',
                        field: "bankAccount",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '银行信息',
                        field: "bankName",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '补贴合计',
                        field: "butieheji",
                        width: 150,
                        editable: false
                    }
                ],
                availableColDefs: [
                    {
                        headerName: '应付电费',
                        field: "yingfuDianfei",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '中央补贴',
                        field: "zhongyangBuzhuZijinYingxiao",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '省补贴',
                        field: "shengBuzhuZijinYingxiao",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '市补贴',
                        field: "shiBuzhuZijinYingxiao",
                        width: 150,
                        editable: false
                    },
                    {
                        headerName: '县补贴',
                        field: "xianBuzhuZijinYingxiao",
                        width: 150,
                        editable: false
                    },
                ],
                rowData: [],
                sourceData: [],
                formLabelWidth: "120px",
                danWeiOptions: [],
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        methods: {
            handleExcelExport() {
                if(this.rowData.length<=0){
                    this.$message.error("无有数据!!");
                    return;
                }
                this.Utils.jsonToExcel(this.query.danwei + '发电客户补贴统计表.xlsx', '补贴统计表', this.rowData, this.columnDefs,this.query.startPeriod+'至'+this.query.endPeriod+'发电客户补贴统计表', this.query.startPeriod+'至'+this.query.endPeriod+'合计补贴金额');
            },
            handleColDef() {
                this.dialogColDefVisible = true;
            },
            colDefineConfirm() {
                this.dialogColDefVisible = false;
                let cols = [];
                for (let i = 0; i < this.columnSelected.length; i++) {
                    let colText = this.columnSelected[i];
                    this.availableColDefs.forEach(function (col) {
                        if (col.headerName === colText) {
                            cols.push(col);
                        }
                    })
                }
                if (cols.length <= 0) {
                    cols = this.availableColDefs;
                }
                this.columnDefs = this.baseColumnDefs.concat(cols);
                this.calculateRowData();
            },
            colDefineCancel() {
                this.dialogColDefVisible = false;
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
                this.$http.post("/customerdata/ButieTongjiByBackendAccount", JSON.stringify(this.query)).then(res => {
                    res = res.body;
                    this.sourceData = res;
                    this.calculateRowData();
                });
            },
            calculateRowData() {
                let availableCols = [];
                this.columnDefs.forEach(function (col) {
                    if (col.field === 'yingfuDianfei') {
                        availableCols.push('yingfuDianfei');
                    } else if (col.field === 'zhongyangBuzhuZijinYingxiao') {
                        availableCols.push("zhongyangBuzhuZijinYingxiao")
                    } else if (col.field === 'shengBuzhuZijinYingxiao') {
                        availableCols.push("shengBuzhuZijinYingxiao")
                    } else if (col.field === 'shiBuzhuZijinYingxiao') {
                        availableCols.push("shiBuzhuZijinYingxiao")
                    } else if (col.field === 'xianBuzhuZijinYingxiao') {
                        availableCols.push("xianBuzhuZijinYingxiao")
                    }
                });
                let newRowData = [];

                this.sourceData.forEach(function (row) {
                    row.butieheji = 0;
                    availableCols.forEach(function (key) {
                        row.butieheji += row[key];
                    });
                    row.butieheji = parseFloat(row.butieheji).toFixed(2);
                    newRowData.push(row);
                });

                this.rowData = newRowData;
            },
            onGridReady(params) {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
            },
            getSelectedRows() {
                const selectedNodes = this.gridApi.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                return selectedData;
            }
        },
        beforeMount() {
            this.columnDefs = this.baseColumnDefs.concat(this.availableColDefs);
        }
    };
</script>
<style>
    .el-card__body {
        height: 100% !important;
        padding-top: 10px !important;
    }
</style>

