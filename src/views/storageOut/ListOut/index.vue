<template>
  <div class="listOut">
    <SearchBox :form-option="searchOption" />
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox/index.vue'
export default {
  components: { SearchBox },
  data() {
    return {
      searchOption: [{
        label: '出库单号',
        key: 'code'
      }
      ]
    }
  }
}
</script>

<style>

</style>
