<template>
  <div class="info-item">
    <base-footer-info-item v-for="(info,index) in getCalculateInputTypeList" :key="index" :info="info">
    </base-footer-info-item>
  </div>
</template>
<script>
import BaseFooterInfoItem from './BaseFooterInfoItem'
const ALL_INFO_LABEL = {
  IDLE: '空闲',
  LOCK: '锁/抢房',
  DIRTY: '脏房',
  FIT: '散客',
  TEAM: '团队',
  VIP: 'VIP',
  FREEDOM: '自由',
  HOUR: '钟点',
  RECEIVE: '接待',
  REPAIR: '维修',
  EXPARR: '预抵',
  EXPLEA: '预离'
}
const ALL_INFO_COLOR = {
  IDLE: '#99CCFF',
  LOCK: '#FF6633',
  DIRTY: '#990033',
  FIT: '#CCCCFF',
  TEAM: '#FF3399',
  VIP: '#c4b16f',
  FREEDOM: '#6666FF',
  HOUR: '#99CCCC',
  RECEIVE: '#CC33FF',
  REPAIR: '#FF3333',
  EXPARR: '#FFCCCC',
  EXPLEA: '#FFCCFF'
}
const DEFAULT_INFO_VALUE = ['100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100', '100']
const DEFAULT_INFO = [{
  infoName: '空闲',
  infoValue: '100'
}, {
  infoName: '锁/抢房',
  infoValue: '100'
},
{
  infoName: '脏房',
  infoValue: '100'
},
{
  infoName: '散客',
  infoValue: '100'
},
{
  infoName: '团体',
  infoValue: '100'
},
{
  infoName: 'VIP',
  infoValue: '100',
  iconName: '#icon-vip'
},
{
  infoName: '自由',
  infoValue: '100'
},
{
  infoName: '免费',
  infoValue: '100',
  iconName: '#icon-mianfei'
},
{
  infoName: '钟点',
  infoValue: '100'
},
{
  infoName: '接待',
  infoValue: '100',
  iconName: '#icon-jiedai'
},
{
  infoName: '维修',
  infoValue: '100'
},
{
  infoName: '预抵',
  infoValue: '100',
  iconName: '#icon-yudi'
},
{
  infoName: '预离',
  infoValue: '100',
  iconName: '#icon-yuli'
},
{
  infoName: '在住房',
  infoValue: '10%'
},
{
  infoName: '总房数',
  infoValue: '100'
},
{
  infoName: '占房率',
  infoValue: '100%'
}]
export default {
  components: {
    BaseFooterInfoItem
  },
  created () {

  },
  data () {
    return {
      infoList: DEFAULT_INFO,
      infoNameList: ALL_INFO_LABEL,
      infoValueList: DEFAULT_INFO_VALUE
    }
  },
  computed: {
    getCalculateInputTypeList () {
      let originObject = this.$store.getters.getOriginRoomData
      let inputTypeObject = this.calculateInputType(originObject)
      let inputTypeList = []
      for (let key in ALL_INFO_LABEL) {
        let inputType = {}
        inputType['infoType'] = key
        inputType['infoName'] = ALL_INFO_LABEL[key]
        inputType['infoValue'] = inputTypeObject.hasOwnProperty(key) ? inputTypeObject[key] : 0
        inputType['color'] = ALL_INFO_COLOR[key]
        inputTypeList.push(inputType)
      }
      return inputTypeList
    }
  },
  methods: {
    calculateInputType (originObject) {
      let calculatedObject = {}
      for (let key in originObject) {
        let type = originObject[key].input_type
        if (typeof type === 'undefined' || type === null) {
          type = 'IDLE'
        }
        if (calculatedObject.hasOwnProperty(type)) {
          calculatedObject[type]++
        } else {
          calculatedObject[type] = 1
        }
      }
      return calculatedObject
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
