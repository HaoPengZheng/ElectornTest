<template>
  <div id="reception-assistant">
    <div class="assistant-list">
      <div
        class="assistant-item"
        :class="{active:'call'===activeName}"
        @click="jumpToCallAssistant"
        ref="item1"
      >
        <div>
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-dianhua1"></use>
          </svg>
        </div>
        <div>
          <span>来电助手</span>
        </div>
      </div>
      <div
        class="assistant-item"
        :class="{active:'wakeup'===activeName}"
        @click="jumpToWakeupAssistant"
      >
        <div>
          <svg
            class="icon"
            aria-hidden="true"
          >
            <use xlink:href="#icon-naozhong"></use>
          </svg>
        </div>
        <div>
          <span>叫醒服务</span>
        </div>
      </div>
      <div
        class="assistant-item"
        @click="jumpToCallAssistant"
      >
        <span>通讯录</span>
      </div>
      <div class="assistant-item">
        <span>记事本</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'call'
    }
  },
  created () {
  },
  mounted () {
    console.log(this.$refs.item1.clientWidth)
  },
  computed: {
  },
  methods: {
    jumpToCallAssistant () {
      this.$router.push('/reception-assistant/call')
      this.activeName = 'call'
    },
    jumpToWakeupAssistant () {
      this.$router.push('/reception-assistant/wakeup')
      this.activeName = 'wakeup'
    }
  }
}
</script>
<style <style lang="scss">
#reception-assistant {
  background: #f8f9fa;
  height: 100%;
  .assistant-list {
    display: flex;
    padding: 15px 30px;
    .assistant-item {
      padding: 10px;
      background: #fff;
      border-radius: 3px;
      width: 100%;
      min-width: 100px;
      min-height: 100px;
      margin: 0.1px 15px;
      text-align: center;
      transition: box-shadow 135ms cubic-bezier(0.4, 0, 0.2, 1),
        width 235ms cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 1px 0 rgba(60, 64, 67, 0.08),
        0 1px 3px 1px rgba(60, 64, 67, 0.16);
      cursor: pointer;
      font: 20px/36px Roboto, sans-serif;
      .icon {
        font-size: 36px;
      }
      &.active {
        color: #149aec;
        border-bottom: 4px solid #149aec;
      }
      &:hover {
        box-shadow: 0 1px 3px 1px rgba(60, 64, 67, 0.2),
          0 2px 8px 4px rgba(60, 64, 67, 0.1);
        background: #f6f6f6;
      }
    }
  }
}
</style>
