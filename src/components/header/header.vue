<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <slot name="goback"></slot>
    <van-icon name="contact" class="head_login" v-if="isLogin" />
    <slot name="title"></slot>
    <slot name="changeCity"></slot>
  </header>
</template>

<script>
import { Icon } from 'vant'
export default {
  data() {
    return {}
  },
  methods: {},
  created() {},
  props: {
    isLogin: Boolean
  },
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

header{
  height: 50px;
}

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 50px);
}

.head_login {
  position: absolute;
  right: 10px;
  top: 14px;
  font-size: 20px;
  color: #fff;
}
</style>
