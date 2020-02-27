<template>
  <div class="main_view">
    <HeadNav></HeadNav>
    <div id="main_container">
      <LeftMenu></LeftMenu>
      <router-view class="index_view"></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeadNav from "@/components/HeadNav";
import LeftMenu from "@/components/LeftMenu";

export default {
  name: "index",
  components: {
    HeadNav,
    LeftMenu
  },
  mounted() {
    this.$api.basic.test().then(res => {
      console.log(res);
    });
  }
};
</script>
<style lang="stylus" scoped>
#main_container {
  width: 100%;
  height: calc(100% - 60px);
  overflow: hidden;
  display: flex;
}

.index_view {
  flex: 1;
}
</style>
