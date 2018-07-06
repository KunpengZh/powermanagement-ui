<template>
    <div style="margin-left: 20px; height: 100%">
        <el-card class="box-card" style="height: 100%;">
            <div slot="header" class="clearfix" style="text-align: left">
                <span>新增发电客户档案</span>
            </div>
            <el-button-group style="padding-bottom: 10px; width: 100%; padding-left: 10px;">
                <el-button size="small" type="primary" icon="el-icon-circle-plus" @click="moveToCustomerDangan">移送正式客户档案</el-button>
                <el-button size="small" type="primary" icon="el-icon-remove" @click="handleDelete">删除</el-button>
                <el-button size="small" type="primary" icon="el-icon-upload" @click="handleDataSave">保存</el-button>
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
    </div>
</template>

<script>
    import {AgGridVue} from "ag-grid-vue";

    export default {
        name: "CustomerProfileNew",
        data() {
            return {
                gridOptions: {},
                columnDefs: this.$store.state.customerProfileNewColDefs,
                rowData: [],
                updatedRowData: [],
                formLabelWidth: "120px"
            }
        },
        components: {
            'ag-grid-vue': AgGridVue
        },
        methods: {
            moveToCustomerDangan() {
                const selectedRows = this.getSelectedRows();
                if (selectedRows.length <= 0) {
                    this.$message.warning("No data selected!!!");
                    return;
                }
                const that = this;
                let customers = [];
                selectedRows.forEach(function (customer) {
                    if (that.validateCustomerProfile(customer)) {
                        customers.push(customer);
                    } else {
                        return;
                    }
                });
                if(customers.length<=0){
                    return;
                }

                this.$http.post("/customerprofile/moveCustomerProfile", JSON.stringify(customers)).then(res => {
                    res = res.body;
                    let message = '';
                    if (res.count!==null) {
                        if (res.count > 0 && res.count === customers.length) {
                            message = "全部更新成功，总共更新了:" + res.count + "条记录";
                            this.$message.success(message);
                        } else if (res.count > 0 && res.count < customers.length) {
                            message = "部分更新成功，总共更新成功了:" + res.count + "条记录，失败了: " + customers.length - res.count + "条记录!";
                            this.$message.warning(message);
                        } else {
                            message = "全部更新失败";
                            this.$message.warning(message);
                        }
                    }
                    if (res.customerProfileNewList && res.customerProfileNewList.length > 0) {
                        this.rowData = res.customerProfileNewList;
                    }
                });
            },
            validateCustomerProfile(customer) {
                if (customer.customerId == null || customer.customerId == '') {
                    this.$message.warning("客户编号不能为空d!!!");
                    return false;
                }
                if (customer.customerName == null || customer.customerName == '') {
                    this.$message.warning("客户名称不能为空d!!!");
                    return false;
                }
                if (customer.customerAddress == null || customer.customerAddress == '') {
                    this.$message.warning("客户地址不能为空d!!!");
                    return false;
                }
                if (customer.contactCapacity == null || customer.contactCapacity == '') {
                    this.$message.warning("合同容量不能为空d!!!");
                    return false;
                }
                if (customer.bingwangDianya == null || customer.bingwangDianya == '') {
                    this.$message.warning("并网电压不能为空d!!!");
                    return false;
                }
                if (customer.requestFormId == null || customer.requestFormId == '') {
                    this.$message.warning("申请单号不能为空d!!!");
                    return false;
                }
                if (customer.identifyNumber == null || customer.identifyNumber == '') {
                    this.$message.warning("身份证号不能为空d!!!");
                    return false;
                }
                if (customer.bankName == null || customer.bankName == '') {
                    this.$message.warning("银行名称不能为空d!!!");
                    return false;
                }
                if (customer.bankAccount == null || customer.bankAccount == '') {
                    this.$message.warning("银行帐号不能为空d!!!");
                    return false;
                }
                if (customer.buzhuModel == null || customer.buzhuModel == '') {
                    this.$message.warning("补助方式不能为空d!!!");
                    return false;
                }
                return true;
            },
            handleDataSave() {
                if (this.updatedRowData.length <= 0) {
                    this.$message.warning("No data changed!!!");
                    return;
                }

                let that = this;
                this.$http.post("/customerprofile/updateCustomerProfileNew", JSON.stringify(this.updatedRowData)).then(res => {
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
                this.$http.post("/customerprofile/deleteCustomerProfileNew", JSON.stringify(selectedRows)).then(res => {
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
            this.$http.get("/customerprofile/getAllCustomerProfileNew").then(res => {
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

