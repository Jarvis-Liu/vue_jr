<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class="logo_container">
                <img src="../assets/img/logo.png" class="logo" alt />
                <span class="title">在线管理系统</span>
            </el-col>
            <el-col :span="6" class="user">
                <div class="userinfo">
                    <img :src="user.avator" class="avator" alt />
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatorname">{{user.name}}</p>
                    </div>
                    <span class="username">
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                                <el-dropdown-item command="logout">退出</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>
<script>
export default {
    name: "head-nav",
    data() {
        return {
            // user: {
            //     avator: "//www.gravatar.com/avatar/ca03ae8fc7818f968dd583db57aa0c00?s=200&r=pg&d=mm"
            // }
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        },
        
    },
    methods: {
        setDialogInfo(command) {
            switch(command) {
                case "info":
                    this.showInfoList();
                    break;
                case "logout": 
                    this.logout();
                    break;
            }
        },
        showInfoList() {
            this.$router.push("/infoshow");
            
        },
        logout() {
            console.log("退出");
            //清除token
            localStorage.removeItem("eleToken");
            this.$store.dispatch("clearCurrentState");
            this.$router.push("/login")
            
        }
    }
};
</script>
<style lang="stylus" scoped>
.head-nav {
    width: 100%;
    padding 0 20px
    height: 60px;
    min-width: 600px;
    background: #324057;
    color: #ffffff;
    border-bottom: 1px solid #1f2d3d;
    box-sizing border-box

    .el-row {
        height: 100%;
    }
}

.logo_container {
    height: 100%;
    display: flex;
    align-items: center;
}

.title {
    font-weight: bolder;
    letter-spacing: 2px;
}

.logo {
    width: 50px;
}

.userinfo {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    .avator {
        border-radius: 50%;
    width: 40px;
    }
    .welcome {
        margin 0 6px
    }
}

.user {
    float: right;
    height 60px
}

.name {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
}

.comename {
    font-size: 12px;
}

.avatorname {
    color: #409eff;
    font-weight: bolder;
}

.username {
    cursor: pointer;
    margin-right: 5px;
}

.el-dropdown {
    color: #fff;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>