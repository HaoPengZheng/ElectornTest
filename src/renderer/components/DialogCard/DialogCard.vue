<template>
  <div class="dialog-card">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.dialog-card{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.176) !important;
  min-width: 120px;
  min-height: 60px;
  background: #fff;
  z-index: 999;
  border-radius: 4px;
  overflow: hidden;
  &::before{
    content:"";
    position: absolute;
    top: -10px;
    right: 10px; 
    background: url('~@/assets/arrow-up.png') no-repeat;
    width: 20px;
    height: 11px;
  }
}
</style>
