<template>
    <div class="main_view login">
        <div class="container">
            <h1>在线管理平台</h1>
            <el-card class="loginForm-card">
                <el-form
                    :model="loginForm"
                    status-icon
                    :rules="rules"
                    ref="loginForm"
                    label-width="100px"
                    class="loginForm"
                >
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="loginForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="loginForm.password"
                            placeholder="请输入密码"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="sub_btn"
                            type="primary"
                            @click="submitForm('loginForm')"
                        >登录</el-button>
                    </el-form-item>
                </el-form>
                <div class="registerMsg">
                    还没有帐号？现在去 <router-link class="path" to="/register">注册</router-link>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
import jwt_decode from "jwt-decode";
export default {
    name: "login",
    data() {
        return {
            loginForm: {
                email: "",
                password: ""
            },
            rules: {
                email: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
                password: [
                    { required: true, message: "密码不能为空" },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在6到30个字符之间",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$api.basic.login(this.loginForm).then(res => {
                        if (res.success) {
                            this.$router.push("/");
                            localStorage.setItem("eleToken",res.token);
                            //解析token
                            const decoded = jwt_decode(res.token);
                            //存储至vuex
                            console.log(this.$tools.isEmpty(decoded));
                            
                            this.$store.dispatch("setAuthenticated",!this.$tools.isEmpty(decoded));
                            this.$store.dispatch("setUser",decoded);
                            
                        }
                    }).catch(err=> {
                        console.log(err);
                        
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    mounted() {
        console.log(this.$store.getters.user);
        
    }
};
</script>
<style lang="stylus" scoped>
.login {
    width: 100%;
    height: 100%;
    background: url('../assets/img/wel_bac.jpg') no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;

    .container {
        width: 350px;
        height: 600px;
        margin-top: 90px;
    }

    .loginForm-card {
        margin-top: 20px;
    }

    .sub_btn {
        width: 100px;
    }
    
    .registerMsg {
        font-size 12px
        text-align right
        .path {
            color #409eff
        }
    }
}

h1 {
    text-align: center;
    font-size: 32px;
    color: #fff;
    font-weight: 900;
    letter-spacing: 4px;
}
</style>