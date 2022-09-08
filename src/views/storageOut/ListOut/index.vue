<template>
  <div class="listOut">
    <SearchBox :form-option="searchOption" :search-a-p-i="searchAPI" />
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox/index.vue'
import { getPageOutList } from '@/api/storageOut'
export default {
  name: 'ListOut',
  components: { SearchBox },
  data() {
    return {
      searchOption: [{
        label: '出库单号',
        key: 'code'
      },
      {
        label: '运单编号',
        key: 'billCode'
      },
      {
        label: '货主名称',
        key: 'ownerName'
      }
      ],
      searchAPI: this.search
    }
  },
  mounted() {
    this.initSearch()
  },
  methods: {
    async initSearch() {
      const res = await getPageOutList()
      console.log('res =', res)
    },
    async search() {
      // wait
    }

  }
}
</script>

<style>

</style>
