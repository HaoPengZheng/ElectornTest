<template>
  <div class="user-setting" @click="toggleSettingVisible">
    <img class="avator" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg" width="30px" height="30px"/>
    <span class="username ellipsis">郑浩鹏</span>
    <div class="more-setting">
      <svg class="icon down-arrow" aria-hidden="true">
        <use xlink:href="#icon-xiajiantou"></use>
      </svg>
      <div class="more-setting-box" v-show="settingVisible">
        <dialog-card>
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
          <div class="btn" @click="logout"> 
            退出登录
          </div>
        </dialog-card>
      </div>     
    </div>
  </div>
</template>
<script>
import DialogCard from '@/components/DialogCard/DialogCard'
export default {
  name: 'user-setting',
  components: {
    DialogCard
  },
  data () {
    return {
      settingVisible: false
    }
  },
  methods: {
    toggleSettingVisible: function () {
      this.settingVisible = !this.settingVisible
    },
    logout: function () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.user-setting{
  cursor: pointer;
  border:1px solid #F1F2F7;
  border-radius: 4px;
  -webkit-border-radius: 4px;
  padding: 0 6px;
  height: 44px;
  line-height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .avator{
    margin: 0 5px;
  }
  .username{
    height: 44px;
    padding: 0 4px;
  }
  .more-setting{
    position: relative;
    z-index: 999;
    .more-setting-box{
      position:absolute; 
      right:0px;
      top: 60px;
    }
  }
}
</style>

