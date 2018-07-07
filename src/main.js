// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
Date.prototype.toJSON = function () {
    let Year = this.getFullYear();
    let month = this.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = this.getDate();
    day = day < 10 ? "0" + day : day;
    return Year + "-" + month + "-" + day;
};
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";
import VueResource from "vue-resource";
import "vue2-animate/dist/vue2-animate.min.css";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-balham.css";
import "./css/oneUI.css"
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Utils from "@/components/Utils.js";

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.prototype.Utils = Utils;

var store = new Vuex.Store({
    state: {
        customerProfileColDefs: [
            {
                headerName: '客户编号',
                field: "customerId",
                width: 150,
                editable: false,
                checkboxSelection: true
            },
            {
                headerName: '客户名称',
                field: "customerName",
                width: 150,
                editable: true
            },
            {
                headerName: '客户地址',
                field: "customerAddress",
                width: 150,
                editable: true
            },
            {
                headerName: '合同容量',
                field: "contactCapacity",
                width: 150,
                editable: true
            },
            {
                headerName: '并网电压',
                field: "bingwangDianya",
                width: 150,
                editable: true
            },
            {
                headerName: '客户类别',
                field: "customerCategory",
                width: 150,
                editable: true
            },
            {
                headerName: '发电方式',
                field: "customerFadianFangshi",
                width: 150,
            },
            {
                headerName: '消纳方式',
                field: "saleCategory",
                width: 150,
                editable: true
            },
            {
                headerName: '接入方式',
                field: "customerJieruFangshi",
                width: 150,
                editable: true
            },
            {
                headerName: '市公司名称',
                field: "shiCompanyName",
                width: 150,
                editable: true
            },
            {
                headerName: '县公司名称',
                field: "xianCompanyName",
                width: 150,
                editable: true
            },
            {
                headerName: '供电单位名称',
                field: "gongdianDanweiName",
                width: 150,
                editable: true
            },
            {
                headerName: '组织名称',
                field: "orgNo",
                width: 150,
                editable: true
            },
            {
                headerName: '申请单号',
                field: "requestFormId",
                width: 150,
                editable: true
            },
            {
                headerName: '身份证号',
                field: "identifyNumber",
                width: 150,
                editable: true
            },
            {
                headerName: '银行名称',
                field: "bankName",
                width: 150,
                editable: true
            },
            {
                headerName: '银行帐号',
                field: "bankAccount",
                width: 150,
                editable: true
            },
            {
                headerName: '并网时间',
                field: "bingwangTime",
                width: 150,
                editable: true
            },
            {
                headerName: '并网方式',
                field: "bingwangFangshi",
                width: 150,
                editable: true
            },
            {
                headerName: '补助方式',
                field: "buzhuModel",
                width: 150,
                editable: true
            },
            {
                headerName: '档案税率',
                field: "danganShuilv",
                width: 150,
                editable: true
            }
        ],
        customerProfileNewColDefs: [
            {
                headerName: 'ItemNo',
                field: "indexid",
                width: 150,
                editable: false,
                checkboxSelection: true
            },
            {
                headerName: '客户编号',
                field: "customerId",
                width: 150,
                editable: true
            },
            {
                headerName: '客户名称',
                field: "customerName",
                width: 150,
                editable: true
            },
            {
                headerName: '客户地址',
                field: "customerAddress",
                width: 150,
                editable: true
            },
            {
                headerName: '合同容量',
                field: "contactCapacity",
                width: 150,
                editable: true
            },
            {
                headerName: '并网电压',
                field: "bingwangDianya",
                width: 150,
                editable: true
            },
            {
                headerName: '客户类别',
                field: "customerCategory",
                width: 150,
                editable: true
            },
            {
                headerName: '发电方式',
                field: "customerFadianFangshi",
                width: 150,
            },
            {
                headerName: '消纳方式',
                field: "saleCategory",
                width: 150,
                editable: true
            },
            {
                headerName: '接入方式',
                field: "customerJieruFangshi",
                width: 150,
                editable: true
            },
            {
                headerName: '市公司名称',
                field: "shiCompanyName",
                width: 150,
                editable: true
            },
            {
                headerName: '县公司名称',
                field: "xianCompanyName",
                width: 150,
                editable: true
            },
            {
                headerName: '供电单位名称',
                field: "gongdianDanweiName",
                width: 150,
                editable: true
            },
            {
                headerName: '组织名称',
                field: "orgNo",
                width: 150,
                editable: true
            },
            {
                headerName: '申请单号',
                field: "requestFormId",
                width: 150,
                editable: true
            },
            {
                headerName: '身份证号',
                field: "identifyNumber",
                width: 150,
                editable: true
            },
            {
                headerName: '银行名称',
                field: "bankName",
                width: 150,
                editable: true
            },
            {
                headerName: '银行帐号',
                field: "bankAccount",
                width: 150,
                editable: true
            },
            {
                headerName: '并网时间',
                field: "bingwangTime",
                width: 150,
                editable: true
            },
            {
                headerName: '并网方式',
                field: "bingwangFangshi",
                width: 150,
                editable: true
            },
            {
                headerName: '补助方式',
                field: "buzhuModel",
                width: 150,
                editable: true
            },
            {
                headerName: '档案税率',
                field: "danganShuilv",
                width: 150,
                editable: true
            }
        ],
        customerDataColDefs: [
            {headerName: 'ItemNo', field: "indexid", width: 150, editable: false, checkboxSelection: true},
            {headerName: '客户编号', field: "customerId", width: 150, editable: true},
            {headerName: '客户名称', field: "customerName", width: 150, editable: true},
            {headerName: '电费年月', field: "datePeriod", width: 150, editable: true},
            {headerName: '批次号', field: "picihao", width: 150, editable: true},
            {headerName: '单位名称', field: "danwei", width: 150, editable: true},
            {headerName: '采集时间', field: "caijiDate", width: 150, editable: true},
            {headerName: '确认时间', field: "dateConfirmed", width: 150, editable: true},
            {headerName: '集成批次', field: "jichengpici", width: 150, editable: true},
            {headerName: '单据编号', field: "danjubianhao", width: 150, editable: true},
            {headerName: '数据状态', field: "dataStatus", width: 150, editable: true},
            {headerName: '项目类型', field: "xianmuLeixing", width: 150, editable: true},
            {headerName: '消纳方式', field: "xiaonaFangshi", width: 150, editable: true},
            {headerName: '中央补助模式', field: "zhongyangBuzhuModel", width: 150, editable: true},
            {headerName: '装机容量', field: "zhuangjiRongliang", width: 150, editable: true},
            {headerName: '发票类型', field: "invoiceType", width: 150, editable: true},
            {headerName: '税率', field: "customerShuilv", width: 150, editable: true},
            {headerName: '上网电量', field: "shangwangDianliang", width: 150, editable: true},
            {headerName: '发电量', field: "faDianliang", width: 150, editable: true},
            {headerName: '上网电价', field: "shangwangDianjia", width: 150, editable: true},
            {headerName: '应付电费（营销）', field: "yingfuDianfei", width: 150, editable: true},
            {headerName: '应付电费（财务）', field: "yingfuDianfeiCaiwu", width: 150, editable: true},
            {headerName: '应付电费税额（营销）', field: "yingfuDianfeiShuiSale", width: 150, editable: true},
            {headerName: '应付电费税额（财务）', field: "yingfuDianfeiShuiCaiwu", width: 150, editable: true},
            {headerName: '中央补助标准', field: "zhongyangBuzhuBiaozhun", width: 150, editable: true},
            {headerName: '中央补助资金（营销）', field: "zhongyangBuzhuZijinYingxiao", width: 150, editable: true},
            {headerName: '中央补助资金（财务）', field: "zhongyangBuzhuZijinCaiwu", width: 150, editable: true},
            {headerName: '中央补助资金税额（营销）', field: "zhongyangBuzhuZijinTaxYingxiao", width: 150, editable: true},
            {headerName: '中央补助资金税额（财务）', field: "zhongyangBuzhuZijinTaxCaiwu", width: 150, editable: true},
            {headerName: '省级补助标准', field: "shengBuzhuBiaozhun", width: 150, editable: true},
            {headerName: '省级补助资金（营销）', field: "shengBuzhuZijinYingxiao", width: 150, editable: true},
            {headerName: '省级补助资金（财务）', field: "shengBuzhuZijinCaiwu", width: 150, editable: true},
            {headerName: '省级补助资金税额（营销）', field: "shengBuzhuZijinTaxYingxiao", width: 150, editable: true},
            {headerName: '省级补助资金税额（财务）', field: "shengBuzhuZijinTaxCaiwu", width: 150, editable: true},
            {headerName: '市级补助标准', field: "shiBuzhuBiaozhun", width: 150, editable: true},
            {headerName: '市级补助资金（营销）', field: "shiBuzhuZijinYingxiao", width: 150, editable: true},
            {headerName: '市级补助资金（财务）', field: "shiBuzhuZijinCaiwu", width: 150, editable: true},
            {headerName: '市级补助资金税额（营销）', field: "shiBuzhuZijinTaxYingxiao", width: 150, editable: true},
            {headerName: '市级补助资金税额（财务）', field: "shiBuzhuZijinTaxCaiwu", width: 150, editable: true},
            {headerName: '县级补助标准', field: "xianBuzhuBiaozhun", width: 150, editable: true},
            {headerName: '县级补助资金（营销）', field: "xianBuzhuZijinYingxiao", width: 150, editable: true},
            {headerName: '县级补助资金（财务）', field: "xianBuzhuZijinCaiwu", width: 150, editable: true},
            {headerName: '县级补助资金税额（营销）', field: "xianBuzhuZijinTaxYingxiao", width: 150, editable: true},
            {headerName: '县级补助资金税额（财务）', field: "xianBuzhuZijinTaxCaiwu", width: 150, editable: true},
            {headerName: '备注', field: "comments", width: 150, editable: true},
            {headerName: '客户状态', field: "customerStatus", width: 150, editable: true},
            {headerName: '客户类型', field: "customerCategory", width: 150, editable: true},
            {headerName: '客户总计', field: "accountSum", width: 150, editable: true},
        ]
    }
}); //reopen in 20180614

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    store,
    components: {App},
    template: "<App/>"
});
