<template>
    <div class="main_view register">
        <div class="container">
            <h1>在线管理平台</h1>
            <el-card class="registerForm-card">
                <el-form
                    :model="registerForm"
                    status-icon
                    :rules="rules"
                    ref="registerForm"
                    label-width="100px"
                    class="registerForm"
                >
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="registerForm.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input
                            type="password"
                            v-model="registerForm.password"
                            placeholder="请输入密码"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="password2">
                        <el-input
                            type="password"
                            v-model="registerForm.password2"
                            placeholder="请再次输入密码"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="用户身份" prop="identity">
                        <el-select v-model="registerForm.identity" placeholder="请选择身份">
                            <el-option label="管理员" value="admin"></el-option>
                            <el-option label="一般用户" value="general"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            class="sub_btn"
                            type="primary"
                            @click="submitForm('registerForm')"
                        >注册</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
export default {
    name: "register",
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value !== this.registerForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            registerForm: {
                name: "",
                email: "",
                password: "",
                password2: "",
                identity: ""
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 12,
                        message: "长度在2到12个字符之间",
                        trigger: "blur"
                    }
                ],
                email: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur"
                    },
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur"]
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
                ],
                password2: [
                    { required: true, message: "确认密码不能为空" },
                    {
                        min: 6,
                        max: 30,
                        message: "长度在6到30个字符之间",
                        trigger: "blur"
                    },
                    {
                        validator: validatePass2,
                        trigger: "blur"
                    }
                ],
                identity: [
                    { required: true, message: "请选择要注册的用户身份" }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.registerForm);
                    
                    this.$api.basic.register(this.registerForm).then(v => {
                        console.log(v);
                        
                    });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped>
.register {
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

    .registerForm-card {
        margin-top: 20px;
    }

    .sub_btn {
        width: 100px;
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