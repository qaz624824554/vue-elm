<template>
  <header id="head_top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <van-icon name="arrow-left" class="head_goback" style="display:none" />
    <van-icon name="contact" class="head_login" />
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
  props: [],
  components: {
    [Icon.name]: Icon
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

#head_top {
  background-color: $blue;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  @include wh(100%, 50px);
}

.head_goback {
  left: 3px;
  @include wh(15px, 25px);
  line-height: 50px;
}

.head_login {
  position: absolute;
  right: 10px;
  top: 14px;
  font-size: 20px;
  color: #fff;
}
</style>
