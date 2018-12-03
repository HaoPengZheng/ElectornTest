<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <div class="nav-bar-right">
        <user-setting></user-setting>
    </div>
  </div>
</template>
<script>
import UserSetting from './UserSetting'
export default {
  name: 'nav-bar',
  components: {
    UserSetting
  }
}
</script>
<style lang="scss" scoped>
$icon-color:#797979;
.nav-bar{
  display: flex;
  justify-content: space-between;
  .nav-bar-left{
    .icon{
      color: $icon-color;
    }
  }
  .nav-bar-right{
    display: flex;
    align-items: center;
  }
}
</style>
