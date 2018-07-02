import Vue from "vue";
import Router from "vue-router";
import DataUpload from "@/components/DataUpload";
import HomeLayout from "@/components/HomeLayout";
import CustomerProfile from "@/components/CustomerProfile"
import CustomerData from "@/components/CustomerData"
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
            }
        ]
    },
  ]
});
