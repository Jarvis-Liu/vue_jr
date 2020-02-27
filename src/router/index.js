import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
import Login from "../views/login.vue";
import Register from "../views/register.vue";
import NotFound from "../views/404.vue";

import Home from "../views/Home.vue";
import Infoshow from "../views/Infoshow.vue";
import FundList from "../views/FundList.vue";

Vue.use(VueRouter);
VueRouter.prototype.goBack = function() {
  this.isBack = true;
  window.history.go(-1);
};

const routes = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: Index,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "",
        component: Home
      },
      {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
          title: "首页"
        }
      },
      {
        path: "/infoshow",
        name: "infoshow",
        component: Infoshow,
        meta: {
          title: "个人信息"
        }
      },
      {
        path: "/fundlist",
        name: "fundlist",
        component: FundList,
        meta: {
          title: "资金流水"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      title: "注册帐号"
    }
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFound
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  console.log(`%c 路由去向--${to.path}`, "color:#99CC99;");

  if (to.meta.title) {
    if (to.path == "/index") {
      document.title = to.meta.title;
    } else {
      document.title = to.meta.title + " - 管理平台";
    }
  } else {
    document.title = "未命名页面";
  }
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }

  next();
});

export default router;
