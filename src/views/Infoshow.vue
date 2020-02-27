<template>
  <div class="infoshow">
      <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="8">
              <div class="user">
                  <img :src="user.avator" class="avator" alt="">
              </div>
          </el-col>
          <el-col :span="16" class="userinfo_container">
                <div class="userinfo">
                    <div class="user_item">
                        <i class="el-icon-user-solid"></i>
                        <span>{{user.name}}</span>
                    </div>
                    <div class="user_item">
                        <i class="el-icon-s-check"></i>
                        <span>{{character}}</span>
                    </div>
                </div>
          </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name: "Infoshow",
    computed:{
        user() {
            return this.$store.getters.user;
        },
        character() {
            switch(this.user.identity) {
                case "admin":
                    return "管理员";
                case "general":
                    return "一般用户";
                default:
                    return "临时访客";
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.row-bg {
    height 100%
    .el-col {
        display flex
        align-items center
    }
}

.userinfo_container {
    background #ccc
}
.user {
    
    display flex
    width 100%
    justify-content center
    align-items center
    img {
        width 100px
        border-radius 50%
        
    }
    
}
.userinfo {
    width 100%
    padding 0 20px
    color #111
    font-weight 900
}

.user_item {
    padding 10px 0
    i {
        margin-right 10px
        font-size 20px
    }
}

</style>