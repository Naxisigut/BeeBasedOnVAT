<template>
  <div class="addOrEdit">
    add/edit
  </div>
</template>

<script>
import { getNextCodeAPI, getWareHouseListAPI, getOwnerListAPI } from '@/api/storageOut'
export default {
  data() {
    return {
      nextCode: '',
      wareHouseList: [],
      ownerList: []
    }
  },
  async mounted() {
    this.getNextCode()
    this.getOwnerList()
    this.getWareHouseList()
  },
  methods: {
    async getNextCode() {
      this.nextCode = await getNextCodeAPI()
    },
    async getWareHouseList() {
      this.wareHouseList = await getWareHouseListAPI()
    },
    async getOwnerList() {
      this.ownerList = await getOwnerListAPI()
    }
  }
}
</script>

<style>

</style>
