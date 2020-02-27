<template>
  <div class="fundContainer">
    <div class="operatingBar">
      <el-form :inline="true" ref="serch_data">
        <el-form-item class="asda">
          <el-date-picker
            v-model="serachForm.beginDate"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择开始日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item class="asda">
          <el-date-picker
            v-model="serachForm.endDate"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <ProfileAddDialog :addDialog="addDialog" :formData="formData" @updateTable="getProfile"></ProfileAddDialog>
    <el-table
      class="table_container"
      v-if="tableData.length > 0"
      :data="tableData"
      border
      style="width: 100%"
      max-height="450"
    >
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column label="日期" align="center" width="240">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ toTime(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" width="150" align="center"></el-table-column>
      <el-table-column prop="describe" label="收支描述" width="150" align="center"></el-table-column>
      <el-table-column prop="income" label="收入" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: #00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expend" label="支出" width="100" align="center">
        <template slot-scope="scope">
          <span style="color: #f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" width="130" align="center">
        <template slot-scope="scope">
          <span style="color: #4bd3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="pagination">
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ProfileAddDialog from "@/components/ProfileAddDialog";

export default {
  name: "FundList",
  components: {
    ProfileAddDialog
  },
  data() {
    return {
      allTableData: [],
      tableData: [],
      addDialog: {
        show: false,
        title: "",
        type: "edit"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      },
      paginations: {
        page_index: 1, //当前页
        total: 0, //总数
        page_size: 5, //每页显示条数
        page_sizes: [5, 10, 15, 20], //可选条数
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      serachForm: {
        beginDate: this.$tools.getSomeDate(),
        endDate: this.$tools.getSomeDate()
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$api.profile.profiles().then(res => {
        this.allTableData = res;
        this.setPaginations();
      });
    },
    handleEdit(index, row) {
      this.addDialog = {
        show: true,
        title: "修改资金信息",
        type: "edit"
      };
      Object.assign(this.formData, row);
      this.formData.id = this.formData._id;
      delete this.formData._id;
      console.log(this.formData);
    },
    handleDelete(index, row) {
      this.$api.profile.delete({ id: row._id }).then(() => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.getProfile();
      });
    },
    handleAdd() {
      this.addDialog = {
        show: true,
        title: "添加资金信息",
        type: "add"
      };
      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(page_size) {
      //切换分页size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleCurrentChange(page) {
      //当前页
      let index = this.paginations.page_size * (page - 1);
      //数据总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
      }
      this.tableData = tables;
    },
    setPaginations() {
      //设置分页属性
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    toTime(time) {
      return this.$tools.utc2Beijing(time);
    },
    handleSearch() {
      this.$api.profile.profilesByDate(this.serachForm).then(res => {
        this.allTableData = res;
        this.setPaginations();
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.fundContainer {
  padding: 10px;
}

.btnRight {
  float: right;
}

.table_container {
  margin: 10px 0;
}

.pagination {
  text-align: right;
}
.el-form--inline {
    display inline-block
    &:last-of-type {
        float right
    }
}
</style>