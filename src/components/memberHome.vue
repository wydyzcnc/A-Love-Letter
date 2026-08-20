<template>
  <div class="memberHome" style="height: 100%">
    <view-box ref="viewbox" body-padding-top="46px">
      <div class="vux-demo-header-box" slot="header">
        <x-header :left-options="{ backText: '' }" v-show="headShow">{{ pageTitle }}</x-header>
      </div>
      <div v-transfer-dom class="loading-box">
        <loading :show="loading" position="absolute"></loading>
      </div>
      <router-view></router-view>
      <tabbar v-show="footerShow">
        <tabbar-item link="/activityIndex">
          <img slot="icon" src="/static/icons/news_icon.png">
          <span slot="label">LFX</span>
        </tabbar-item>
        <tabbar-item link="/groupCourses">
          <img slot="icon" src="/static/icons/purpose_icon.png">
          <span slot="label">一二</span>
        </tabbar-item>
        <tabbar-item link="/personalCourses">
          <img slot="icon" src="/static/icons/private_icon.png">
          <span slot="label">布布</span>
        </tabbar-item>
        <tabbar-item selected link="/love-lfx">
          <img slot="icon" src="/static/icons/mine_icon.png">
          <span slot="label">首页</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>
import { Tabbar, Icon, TabbarItem, XHeader, Loading, ViewBox } from 'vux'
import { TransferDomDirective as TransferDom } from 'vux'

import { mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'headShow',
    'loading',
    'footerShow',
    'pageTitle'
  ]),

  data() {
    let data = {

    }
    return data
  },

  mounted() {

  },

  directives: {
    TransferDom
  },

  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    Loading,
    ViewBox,
    Icon
  }
}
</script>
<style>
.memberHome .vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

.memberHome .weui-tabbar__icon img {
  width: auto;
  height: 90%;
}

.memberHome .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
  color: #DD5858
}
</style>

