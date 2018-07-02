<template>
    <div style="margin-left: 20px; height: 100%">
        <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix" style="text-align: left">
                <span>客户发电数据</span>
            </div>
            <el-button-group style="padding-bottom: 10px; width: 100%; padding-left: 10px;">
                <el-button type="primary" icon="el-icon-circle-plus" @click="handleCreatNewCustomerData">新建</el-button>
                <el-button type="primary" icon="el-icon-remove" @click="handleDelete">删除</el-button>
                <el-button type="primary" icon="el-icon-upload" @click="handleDataSave">保存</el-button>
            </el-button-group>

            <div class="agGridWarrp80">
                <ag-grid-vue style="width: 100%; height: 100%; text-align: left" class="ag-theme-balham"
                             :gridOptions="gridOptions"
                             :columnDefs="columnDefs"
                             :rowData="rowData"
                             :enableSorting="true"
                             :enableColResize="true"
                             rowSelection="multiple"
                             :cellValueChanged="cellValueChanged"
                             :gridReady="onGridReady"
                >
                </ag-grid-vue>
            </div>
        </el-card>
        <el-dialog title="新建客户档案" :visible.sync="newCreateCustomerDataVisible" width="80%">
            <el-form :model="customerDataForm" :inline="true" label-position="right" style="text-align: left;">
                <el-form-item label="客户编号" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.customerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.cusomerName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电费年月" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.datePeriod" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="批次号" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.picihao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单位名称" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.danwei" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="采集时间" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.caijiDate" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认时间" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.dateConfirmed" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="集成批次" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.jichengpici" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="单据编号" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.danjubianhao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="数据状态" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.dataStatus" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="项目类型" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianmuLeixing" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="消纳方式" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xiaonaFangshi" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助模式" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuModel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="装机容量" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhuangjiRongliang" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发票类型" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.invoiceType" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="税率" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.customerShuilv" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上网电量" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shangwangDianliang" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发电量" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.faDianliang" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="上网电价" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shangwangDianjia" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应付电费（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.yingfuDianfei" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应付电费（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.yingfuDianfeiCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应付电费税额（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.yingfuDianfeiShuiSale" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="应付电费税额（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.yingfuDianfeiShuiCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助标准" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuBiaozhun" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助资金（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuZijinYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助资金（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuZijinCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助资金税额（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuZijinTaxYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中央补助资金税额（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.zhongyangBuzhuZijinTaxCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="省级补助标准" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shengBuzhuBiaozhun" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="省级补助资金（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shengBuzhuZijinYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="省级补助资金（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shengBuzhuZijinCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="省级补助资金税额（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shengBuzhuZijinTaxYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="省级补助资金税额（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shengBuzhuZijinTaxCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市级补助标准" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shiBuzhuBiaozhun" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市级补助资金（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shiBuzhuZijinYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市级补助资金（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shiBuzhuZijinCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市级补助资金税额（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shiBuzhuZijinTaxYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市级补助资金税额（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.shiBuzhuZijinTaxCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县级补助标准" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianBuzhuBiaozhun" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县级补助资金（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianBuzhuZijinYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县级补助资金（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianBuzhuZijinCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县级补助资金税额（营销）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianBuzhuZijinTaxYingxiao" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县级补助资金税额（财务）" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.xianBuzhuZijinTaxCaiwu" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.comments" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户状态" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.customerStatus" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户类型" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.customerCategory" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户总计" :label-width="formLabelWidth">
                    <el-input v-model="customerDataForm.accountSum" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreateNewCustomerData">取 消</el-button>
                <el-button type="primary" @click="uploadNewCustomerData">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: "RightMonthCom",
        data() {
            return {
                newCreateCustomerDataVisible: false,
                gridOptions: {},
                columnDefs: this.$store.state.customerDataColDefs,
                rowData: [],
                updatedRowData: [],
                formLabelWidth: "180px",
                customerDataForm: {}
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        methods: {
            uploadNewCustomerData() {
                if (this.customerDataForm.customerId && this.customerDataForm.customerId !== '') {
                    this.$http.post("/customerdata/createCustomerData", JSON.stringify(this.customerDataForm)).then(res => {
                        res = res.body;
                        this.$message.success("Data updated!");
                        this.rowData = res;
                        this.updatedRowData = [];
                        this.customerDataForm = {};
                    })
                } else {
                    this.$message.warning("Customer Id can not be null!!!!");
                }
            },
            cancelCreateNewCustomerData() {
                this.newCreateCustomerDataVisible = false;
                this.customerDataForm = {};
            },
            handleCreatNewCustomerData() {
                this.newCreateCustomerDataVisible = true;
            },
            handleDataSave() {
                if (this.updatedRowData.length <= 0) {
                    this.$message.warning("No data changed!!!");
                    return;
                }

                let that = this;
                this.$http.post("/customerdata/updateCustomerData", JSON.stringify(this.updatedRowData)).then(res => {
                    res = res.body;
                    this.$message.success("Data updated!");
                    this.rowData = res;
                    this.updatedRowData = [];
                })
            },
            cellValueChanged(param) {
                let newRowData;
                let existAlready = false;
                for (let i = 0; i < this.updatedRowData.length; i++) {
                    if (this.updatedRowData[i].indexid === param.data.indexid) {
                        newRowData = this.updatedRowData.slice(0, i).concat(this.updatedRowData[i + 1]);
                        newRowData.push(param.data);
                        existAlready = true;
                        break;
                    }
                }
                if (existAlready) {
                    this.updatedRowData = newRowData;
                } else {
                    this.updatedRowData.push(param.data);
                }
            },
            onGridReady(params) {
                this.gridApi = params.api;
                this.columnApi = params.columnApi;
            },
            handleDelete() {
                const selectedRows = this.getSelectedRows();
                if (null == selectedRows || selectedRows.length <= 0) {
                    this.$message.warning("No Rows selected!!!");
                    return;
                }
                let that = this;
                this.$http.post("/customerdata/deleteCustomerData", JSON.stringify(selectedRows)).then(res => {
                    res = res.body;
                    this.$message.success("Data updated!");
                    this.rowData = res;
                    this.updatedRowData = [];
                })
            },
            getSelectedRows() {
                const selectedNodes = this.gridApi.getSelectedNodes();
                const selectedData = selectedNodes.map(node => node.data);
                return selectedData;

            }
        },
        beforeMount() {
            this.$http.post("/customerdata/getCustomerData", "{}").then(res => {
                res = res.body;
                this.rowData = res;
            });
        }
    };
</script>
<style>
    .el-card__body {
        height: 100% !important;
        padding-top: 10px !important;
    }
</style>

