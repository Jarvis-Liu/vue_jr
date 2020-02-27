<template>
    <div id="app">
        <transition name="fade">
            <router-view class="routerView"></router-view>
        </transition>
    </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
    name: "app",
    created() {
        if (localStorage.eleToken) {
            //解析token
            const decoded = jwt_decode(localStorage.eleToken);
            //存储至vuex
            this.$store.dispatch(
                "setAuthenticated",
                !this.$tools.isEmpty(decoded)
            );
            this.$store.dispatch("setUser", decoded);
        }
    },
    // data() {
    //     return {
    //         transitionName: "slide-right" // 默认动态路由变化为slide-right
    //     };
    // },
    // watch: {
    //     $route() {
    //         let isBack = this.$router.isBack;
    //         console.log(isBack);

    //         if (isBack) {
    //             this.transitionName = "slide-right";
    //         } else {
    //             this.transitionName = "slide-left";
    //         }
    //         this.$router.isBack = false;
    //     }
    // }
};
</script>
<style lang="stylus">
html, body, #app {
    width: 100%;
    height: 100%;
}

.fade-enter-active, .fade-leave-avtive {
    transition: opacity 0.8s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
