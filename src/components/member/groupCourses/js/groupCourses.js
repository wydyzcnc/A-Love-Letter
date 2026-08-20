import { Tab, TabItem, XImg, dateFormat, XButton, Flexbox, FlexboxItem, InlineCalendar, Popup, XDialog } from 'vux';

export default {
  mounted() {
    this.$store.commit('UPDATE_PAGE_TITLE', '一二的声音')
    this.loadCourses();    // 加载列表
  },
  data() {
    let data = {
      showSuccess: false,
      showSorry: false,
      courseList: '',
      coursesQueryData: {
        categoryId: "ioio",
      }
    }

    return data
  },

  methods: {
    // 获取列表数据
    loadCourses() {
      let self = this;
      this.baseAjax({
        url: '/static/basicData/groupCourse.json',
        params: {
          categoryId: self.coursesQueryData.categoryId,
        },
        showLoading: true,
        success: function (data) {
          self.courseList = data.returnObject;
        }
      })
    },

    // 预定
    makeReserve(id, idx) {
      let self = this;
      this.baseAjax({
        url: '/static/basicData/makeReserve.json',
        get: "post",
        params: {
          courseId: id,
          memberId: "111"
        },
        showLoading: true,
        success: function (data) {
          if (data.isSuccess) {
            self.showSuccess = true;
            // self.showSorry=true;
          }
        }
      })
    },
  },
  components: {
    Tab, TabItem, XImg, XButton, Flexbox, FlexboxItem, InlineCalendar, Popup, XDialog
  }
}
