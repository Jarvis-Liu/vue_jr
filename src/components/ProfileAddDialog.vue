<template>
    <div class="dialog">
        <el-dialog :title="addDialog.title" :visible.sync="addDialog.show" :close-on-click-model="false">
            <div class="form">
                <el-form
                    ref="form"
                    :model="formData"
                    :rules="form_rules"
                    label-width="120px"
                    style="margin:10px;width:auto;"
                >
                    <el-form-item label="收支类型：">
                        <el-select v-model="formData.type" placeholder="收支类型">
                            <el-option
                                v-for="(item,index) in format_type_list"
                                :key="index"
                                :label="item"
                                :value="item"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="收支描述：" prop="describe">
                        <el-input type="text" v-model="formData.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="收入：" prop="income">
                        <el-input type="text" v-model="formData.income"></el-input>
                    </el-form-item>
                    <el-form-item label="支出：" prop="expend">
                        <el-input type="text" v-model="formData.expend"></el-input>
                    </el-form-item>
                    <el-form-item label="账户现金：" prop="cash">
                        <el-input type="text" v-model="formData.cash"></el-input>
                    </el-form-item>
                    <el-form-item label="备注：" prop="remark">
                        <el-input type="textarea" v-model="formData.remark"></el-input>
                    </el-form-item>
                    <el-form-item class="text_right">
                        <el-button @click="addDialog.show=false">取消</el-button>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: "ProfileAddDialog",
    data() {
        return {
            
            format_type_list: [
                "提现",
                "提现手续费",
                "充值",
                "优惠券",
                "充值礼券",
                "转账"
            ],
            form_rules: {
                describe: [
                    {
                        required: true,
                        message: "收支描述不能为空",
                        trigger: "blur"
                    }
                ],
                income: [
                    { required: true, message: "收入不能为空", trigger: "blur" }
                ],
                expend: [
                    { required: true, message: "支出不能为空", trigger: "blur" }
                ],
                cash: [
                    {
                        required: true,
                        message: "账户信息不能为空",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    props: {
        addDialog: Object,
        formData: Object
    },
    computed: {},
    methods: {
        onSubmit(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    if (this.addDialog.type == "edit") {
                        this.$api.profile.edit(this.formData).then(() => {
                            this.$message({
                                message: "编辑成功",
                                type: "success"
                            })
                            this.addDialog.show = false;
                            this.$emit("updateTable");
                        })
                    }else {
                        this.$api.profile.add(this.formData).then(() => {
                            this.$message({
                                message: "添加成功",
                                type: "success"
                            })
                            this.addDialog.show = false;
                            this.$emit("updateTable");
                        })
                    }
                }
            });
        }
    }
};
</script>
<style lang="stylus" scoped></style>