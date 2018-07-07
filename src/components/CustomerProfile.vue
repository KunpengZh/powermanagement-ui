<template>
    <div style="margin-left: 20px; height: 100%">
        <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix" style="text-align: left">
                <span>客户基础档案</span>
            </div>
            <div style="display: flex; justify-content: flex-start">
                <el-button-group style="padding-bottom: 10px; padding-left: 10px;">
                    <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="handleCreatNewProfile">新建</el-button>
                    <el-button size="small" type="primary" icon="el-icon-remove" @click="handleDelete">删除</el-button>
                    <el-button size="small" type="primary" icon="el-icon-upload" @click="handleDataSave">保存</el-button>
                    <el-button size="small" type="primary" icon="el-icon-upload" @click="handleExport">保存</el-button>
                </el-button-group>
                <el-input v-model="query.customerId" placeholder="客户编号" :clearable="true" size="small" class="queryInput" @input="handleFilterChange"></el-input>
                <el-input v-model="query.customerName" placeholder="客户名称" :clearable="true" size="small" class="queryInput" @input="handleFilterChange"></el-input>
                <el-input v-model="query.identifyNumber" placeholder="身份证号码" :clearable="true" size="small" class="queryInput" @input="handleFilterChange"></el-input>
            </div>
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
        <el-dialog title="新建客户档案" :visible.sync="newCreateCustomerProfileVisible" width="80%">
            <el-form :model="customerProfileForm" :inline="true" label-position="right" style="text-align: left;">
                <el-form-item label="客户编号" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.identifyNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.bankAccount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行帐号" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.bankName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户地址" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerAddress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="并网电压" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.bingwangDianya" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="并网方式" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.bingwangFangshi" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="并网时间" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.bingwangTime" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="补助方式" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.buzhuModel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="合同容量" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.contactCapacity" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户类别" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerCategory" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发电方式" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerFadianFangshi" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="接入方式" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.customerJieruFangshi" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="档案税率" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.danganShuilv" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="供电单位名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.gongdianDanweiName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="组织名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.orgNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="申请单号" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.requestFormId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="消纳方式" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.saleCategory" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="市公司名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.shiCompanyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="县公司名称" :label-width="formLabelWidth">
                    <el-input v-model="customerProfileForm.xianCompanyName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelCreateNewProfile">取 消</el-button>
                <el-button type="primary" @click="uploadNewCustomerProfile">确 定</el-button>
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
                query: {
                    customerId: '',
                    customerName: '',
                    identifyNumber: ''
                },
                newCreateCustomerProfileVisible: false,
                gridOptions: {},
                columnDefs: this.$store.state.customerProfileColDefs,
                rowData: [],
                sourceData: [],
                updatedRowData: [],
                formLabelWidth: "120px",
                customerProfileForm: {}
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        methods: {
            handleExport() {
                this.Utils.jsonToExcel("customerProfile.xlsx", "customerProfile", this.rowData);
            },
            handleFilterChange() {
                const newRowData = [];
                let that = this;
                this.sourceData.forEach(function (item) {
                    if (that.query.customerId !== "") {
                        if (!item.customerId.includes(that.query.customerId)) {
                            return false;
                        }
                    }
                    if (that.query.customerName !== "") {
                        if (!(null !== item.customerName && item.customerName.includes(that.query.customerName))) {
                            return false;
                        }
                    }

                    if (that.query.identifyNumber !== "") {
                        if (!(null !== item.identifyNumber && item.identifyNumber.includes(that.query.identifyNumber))) {
                            return false;
                        }
                    }

                    newRowData.push(item);

                });
                this.rowData = newRowData;
            },
            uploadNewCustomerProfile() {
                if (this.customerProfileForm.customerId && this.customerProfileForm.customerId !== '') {
                    this.$http.post("/customerprofile/createCustomerProfile", JSON.stringify(this.customerProfileForm)).then(res => {
                        res = res.body;
                        this.$message.success("Data updated!");
                        this.rowData = res;
                        this.updatedRowData = [];
                        this.customerProfileForm = {};
                    })
                } else {
                    this.$message.warning("Customer Id can not be null!!!!");
                }
            },
            cancelCreateNewProfile() {
                this.newCreateCustomerProfileVisible = false;
                this.customerProfileForm = {};
            },
            handleCreatNewProfile() {
                this.newCreateCustomerProfileVisible = true;
            },
            handleDataSave() {
                if (this.updatedRowData.length <= 0) {
                    this.$message.warning("No data changed!!!");
                    return;
                }

                let that = this;
                this.$http.post("/customerprofile/updateCustomerProfile", JSON.stringify(this.updatedRowData)).then(res => {
                    res = res.body;
                    this.$message.success("Data updated!");
                    this.rowData = res;
                    this.updatedRowData = [];
                })
            },
            cellValueChanged(param) {
                let existAlready = false;
                for (let i = 0; i < this.updatedRowData.length; i++) {
                    if (this.updatedRowData[i].indexid === param.data.indexid) {
                        this.updatedRowData[i] = param.data;
                        existAlready = true;
                        break;
                    }
                }
                if (!existAlready) {
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
                this.$http.post("/customerprofile/deleteCustomerProfile", JSON.stringify(selectedRows)).then(res => {
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
            this.$http.post("/customerprofile/getCustomerProfile", "{}").then(res => {
                res = res.body;
                this.rowData = res;
                this.sourceData = this.rowData;
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

