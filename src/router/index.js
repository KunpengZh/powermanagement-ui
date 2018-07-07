import Vue from "vue";
import Router from "vue-router";
import DataUpload from "@/components/DataUpload";
import HomeLayout from "@/components/HomeLayout";
import CustomerProfile from "@/components/CustomerProfile";
import CustomerData from "@/components/CustomerData";
import CustomerProfileNew from "@/components/CustomerProfileNew";
import CustomerDataNew from "@/components/CustomerDataNew"
import ReportLayout from "@/components/ReportLayout"
import ButieTongjiYuebao from "@/components/ButieTongjiYueBao"
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeLayout
        },
        {
            path: "/home",
            name: "home",
            component: HomeLayout,
            children: [
                {
                    path: "dataupload",
                    name: "dataupload",
                    component: DataUpload
                },
                {
                    path: "customerprofile",
                    name: "customerprofile",
                    component: CustomerProfile
                },
                {
                    path: "customerdata",
                    name: "customerdata",
                    component: CustomerData
                },
                {
                    path: "customerprofilenew",
                    name: "customerprofilenew",
                    component: CustomerProfileNew
                },
                {
                    path: "customerdatanew",
                    name: "customerdatanew",
                    component: CustomerDataNew
                }
            ]
        },
        {
            path: "/report",
            name: "report",
            component: ReportLayout,
            children: [
                {
                    path:"butietongjiyuebao",
                    name:"butietongjiyuebao",
                    component:ButieTongjiYuebao
                }

            ]
        }
    ]
});
