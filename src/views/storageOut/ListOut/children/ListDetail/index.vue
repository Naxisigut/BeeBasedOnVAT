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

    }
  },
  computed: {
    isNew() {
      return this.$route.params.id === 'null'
    },
    componentId() {
      if (this.isNew) return 'AddOrEdit'
      return 'CheckDetail'
    }
  }
}
</script>

<style>

</style>
