<template>
  <div class="personalCourses">

    <div class="classItems">
      <div class="item-box" v-for="(item, index) in courseList" :key="index">
        <flexbox>
          <flexbox-item :span="3">
            <div class="item-icon">
              <img src="../../../assets/images/timg.png" />
            </div>
          </flexbox-item>

          <flexbox-item>
            <div class="top-name">
              <flexbox>
                <flexbox-item>
                  <div>{{ item.name }}</div>
                  <p class="item-desc">{{ item.description }}</p>
                </flexbox-item>

                <flexbox-item :span="4">
                  <!-- <router-link :to="'/memberHome/' + item.id + '/' + 'id' ">
                    <x-button mini type="warn" action-type='button'>查看</x-button>
                  </router-link> -->
                  <x-button mini type="warn" action-type='button' @click.native="makeReserve1(item.id, index)">查看</x-button>
                </flexbox-item>
              </flexbox>
            </div>

            <div class="bottom-cer">
              <span>{{ item.certification }}</span>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import personalCourses from "./js/personalCourses.js"
export default personalCourses
</script>

<style>
.personalCourses .activeItem img {
  width: 100%
}

.personalCourses .activeItem {
  margin: 10px 10px 0 10px;
  position: relative;
  height: 180px;
  overflow: hidden;
  border-radius: 5px
}

.personalCourses .item-box .item-icon {
  height: 60px;
  text-align: center;
  overflow: hidden;
}

.personalCourses .item-box .item-icon img {
  height: 100%;
  border-radius: 50%
}

.personalCourses .item-box {
  border-bottom: 1px solid #eee;
  background: #fff;
}

.personalCourses .top-name {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  margin-right: 10px;
}

.personalCourses .item-desc {
  font-size: 12px;
  line-height: 20px;
  color: #666
}

.personalCourses .bottom-cer {
  padding: 10px 0;
  font-size: 12px;
  color: #666
}

.personalCourses .bottom-cer span {
  padding: 5px;
  border-radius: 5px;
  background: #eee;
  margin: 5px;
}
</style>
