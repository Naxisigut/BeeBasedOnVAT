<template>
  <div class="listDetail">
    <component :is="componentId" />
  </div>
</template>

<script>
import AddOrEdit from './components/AddOrEdit.vue'
import CheckDetail from './components/CheckDetail.vue'

export default {
  name: 'ListDetail',
  components: { AddOrEdit, CheckDetail },
  data() {
    return {
      tempFlag: this.$store.getters.masterId
    }
  },
  computed: {
    isCheck() {
      return !this.tempFlag && this.$route.params.id !== 'null'
    },
    componentId() {
      if (this.isCheck) return 'CheckDetail'
      return 'AddOrEdit'
    }
  },
  /* 离开路由时销毁之前的出库单信息，方便下次渲染 */
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('storageOut/init')
    next()
  }
}
</script>

<style>

</style>
