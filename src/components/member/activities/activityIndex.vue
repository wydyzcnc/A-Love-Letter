<template>
  <div class="activityIndex page">
    <div class="activeItem" v-for="item in itemList">
      <router-link :to="'/activityDetail/' + item.id">
        <div class="newsImg">
          <img :src="item.newsImg" />
        </div>
        <div class='sbottom'>
          <p class="title">{{ item.title }}</p>
          <p class="time-line">
            <span class="view">
              <span class="view_icon"><img src="/static/icons/view.png"></span>
              {{ item.date }}
            </span>
          </p>
        </div>
      </router-link>
    </div>

  </div>
</template>
<script>
import { Tabbar, TabbarItem, XHeader, XButton, XImg } from 'vux'
export default {
  mounted() {
    this.$store.commit('UPDATE_PAGE_TITLE', '写给LFX的祝福语')
    this.loadLatest();
  },
  data() {
    return {
      itemList: ''
    }
  },
  methods: {
    loadLatest() {
      let self = this;
      this.baseAjax({
        url: '/static/basicData/latestActivity.json',
        showLoading: true,
        success: function (data) {
          self.itemList = data.returnObject
        }
      })
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    XButton,
    XImg
  }
}

</script>
<style>
.activityIndex .activeItem {
  margin: 10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.activityIndex .activeItem .sbottom {
  color: white;
  position: absolute;
  bottom: 0px;
  padding: 10px;
  width: 91%;
}

 .activityIndex .activeItem .title {
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.activityIndex .time-line {
  font-size: 16px;
  width: 100%;
  height: 20px;
}

.activityIndex .activeItem .view {
  float: right;
}

.activityIndex .activeItem .newsImg img {
  width: 100%;
  min-height: 180px;
}

.activityIndex .sbottom img {
  width: 16px;
  height: 12px;
  padding-right: 5px;
}


</style>


