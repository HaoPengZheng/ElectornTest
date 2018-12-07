<template>
  <div class="info-item">
    <base-footer-info-item v-for="(info,index) in getCalculateInputTypeList" :key="index" :info="info">
    </base-footer-info-item>
  </div>
</template>
<script>
import BaseFooterInfoItem from './BaseFooterInfoItem'
import RoomManagementHelper from '@/utils/RoomManagementHelper.js'
// const ALL_INFO_COLOR = {
//   IDLE: '#99CCFF',
//   LOCK: '#FF6633',
//   DIRTY: '#990033',
//   FIT: '#CCCCFF',
//   TEAM: '#FF3399',
//   VIP: '#f8d347',
//   FREEDOM: '#6666FF',
//   HOUR: '#99CCCC',
//   RECEIVE: '#CC33FF',
//   REPAIR: '#FF3333',
//   EXPARR: '#FFCCCC',
//   EXPLEA: '#FFCCFF'
// }
export default {
  components: {
    BaseFooterInfoItem
  },
  created () {

  },
  data () {
    return {
      keys: RoomManagementHelper.getAllKeys()
    }
  },
  computed: {
    getCalculateType () {
      return this.$store.getters.getCalculateType
    },
    getCalculateInputTypeList () {
      let typeObject = RoomManagementHelper.getAllTypeObject()
      let inputTypeList = []
      this.keys.forEach(key => {
        let inputType = {}
        inputType['infoType'] = typeObject[key].key
        inputType['infoName'] = typeObject[key].label
        inputType['infoValue'] = this.getCalculateType.hasOwnProperty(key) ? this.getCalculateType[key] : typeObject[key].defaultValue
        inputType['color'] = typeObject[key].color
        inputTypeList.push(inputType)
      })
      return inputTypeList
    }
  }
}
</script>
<style lang="scss" scoped>
  .info-item{
    height: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
  }
</style>
