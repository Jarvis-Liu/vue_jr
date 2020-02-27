<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
                :default-active="$route.path"
                @select="handleSelect"
                class="el-menu-vertical"
                background-color="#324057"
                text-color="#fff"
                active-text-color="#409eff"
            >
                <router-link to="/home">
                    <el-menu-item index="/home">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                </router-link>
                <template v-for="item in navItems">
                    <el-submenu v-if="item.children" :key="item.path" :index="item.path">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.title}}</span>
                        </template>
                        <router-link
                            v-for="(citem,cindex) in item.children"
                            :to="citem.path"
                            :key="cindex"
                        >
                            <el-menu-item :index="citem.path">
                                <span slot="title">{{citem.title}}</span>
                            </el-menu-item>
                        </router-link>
                    </el-submenu>
                </template>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "LeftMenu",
    data() {
        return {
            navItems: [
                {
                    icon: "el-icon-data-line",
                    title: "资金管理",
                    path: "fund",
                    children: [
                        {
                            title: "资金流水",
                            path: "/fundlist"
                        }
                    ]
                },
                {
                    icon: "el-icon-s-custom",
                    title: "信息管理",
                    path: "info",
                    children: [
                        {
                            title: "个人信息",
                            path: "/infoshow"
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleSelect: function(key, keyPath) {
            console.log(key, keyPath);
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.menu_page, .el-menu-vertical {
    width: 240px;
    height: 100%;
    background-color: rgb(50, 64, 87);
    border-right 0px
}

a:active {
    text-decoration: none;
}
</style>
