<template>
  <div class="groupCourses">

    <div class="classItems">
      <div class="activeItem" v-for="(item, index) in courseList" :key="index">
        <img src="/static/pic/qixibj.jpg" />
        <div class='sbottom'>
          <p class="title">{{ item.title }}</p>
          <p class="time-line"><span class='time'>{{ item.startTime }} - {{ item.endTime }}</span>
            <span class="view">{{ item.viewer }}</span>
          </p>
        </div>

        <div class="bookBtn">
          <x-button mini type="warn" action-type='button' @click.native="makeReserve(item.id, index)">查看</x-button>
        </div>
      </div>
    </div>

    <div>
      <x-dialog v-model="showSuccess" class="d-box" @click="showSuccess = false">
        <div @click="showSuccess = false">
          <div class="d-icon">
            <img src="../../../assets/images/dialog-success.png">
          </div>
          <p class="d-title">功能还在建设中哦，敬请期待~</p>
        </div>
      </x-dialog>

      <x-dialog v-model="showSorry" class="d-box">
        <div @click="showSorry = false">
          <div class="d-icon">
            <img src="../../../assets/images/dialog-sorry.png">
          </div>
          <p class="d-title">人数已满，下次记得早点预约噢！</p>
        </div>
      </x-dialog>
    </div>

  </div>
</template>

<script>
import groupCourses from "./js/groupCourses.js"
export default groupCourses
</script>

<style>
.groupCourses .vux-tab .vux-tab-item {
  line-height: 20px;
}

.groupCourses .activeItem img {
  width: 100%
}

.groupCourses .activeItem {
  margin: 10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.groupCourses .activeItem .sbottom {
  color: white;
  position: absolute;
  bottom: 10px;
  padding: 10px;
  width: 85%
}

.groupCourses .activeItem .title {
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.groupCourses .time-line {
  font-size: 14px;
  width: 100%;
  height: 20px;
}

.groupCourses .activeItem .view {
  float: right;
  font-size: 14px;
}

.groupCourses .activeItem img {
  width: 100%
}

.groupCourses .vux-tab .vux-tab-item.vux-tab-disabled {
  color: #666;
}

.groupCourses .vux-tab .vux-tab-item.vux-tab-selected {
  color: #DD5858;
  border-width: 3px !important;
  border-bottom: 3px solid #DD5858;
}

.groupCourses .bookBtn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.groupCourses .d-box .d-title {
  margin-bottom: 15px;
}

.groupCourses .d-box .weui-dialog {
  max-width: 240px;
}

.groupCourses .d-icon {
  text-align: center;
  padding: 10px;
}

.groupCourses .d-icon img {
  height: 70px;
  margin: 15px auto;
}
</style>
