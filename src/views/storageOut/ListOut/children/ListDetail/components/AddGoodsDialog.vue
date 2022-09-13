<template>
  <div class="addGoodsDialog">
    <el-dialog title="添加发货货品" :visible.sync="visible" :before-close="handleClose" width="1000px">
      <!-- searchBox -->
      <SearchBox ref="searchBox" :form-option="formOption" :search-func="search" :reset-func="reset" />
      <!-- noGoods shows when there is a good -->
      <NoGoods v-show="!goodsList.length" />
      <!-- content -->
      <goods-table v-show="goodsList.length" v-loading="loading" :goods-list="goodsList" :selected-list.sync="selectedGoods" />
      <el-pagination
        v-show="goodsList.length"
        class="centerPagnation"
        :current-page.sync="pageInfo.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size.sync="pageInfo.pageSize"
        :page-count="1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!-- btns -->
      <template #footer>
        <div v-show="goodsList.length" class="centerBtns" style="margin-top: -40px">
          <el-button class="grayBtn biggerBtn" @click="handleClose">取消</el-button>
          <el-button class="yellowBtn biggerBtn" @click="addGoods">确认添加</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SearchBox from '@/components/SearchBox/index.vue'
import { getStockListAPI, addStockToListAPI } from '@/api/storageOut'
import NoGoods from '@/components/NoGoods/index.vue'
import GoodsTable from './GoodsTable.vue'
import { mapGetters } from 'vuex'
export default {
  components: { SearchBox, NoGoods, GoodsTable },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    searchParams: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formOption: [
        {
          label: '货品',
          key: 'goods'
        },
        {
          label: '货主',
          key: 'owner'
        }
      ],
      goodsList: [{ warehouseName: 'yihao',
        areaName: 'def',
        locationCode: '1',
        locationName: '1',
        goodsCode: 1,
        goodsName: '1',
        goodsTypeName: '1',
        goodsUnit: '1',
        free: 123
      }],
      pageInfo: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      loading: false,
      selectedGoods: []
    }
  },
  computed: {
    reqParams() {
      return {
        size: this.pageInfo.pageSize,
        current: this.pageInfo.currentPage,
        ...this.searchParams
      }
    },
    ...mapGetters(['masterId'])
  },
  watch: {
    visible(val) {
      if (val) {
        this.search()
      }
    }
  },
  methods: {
    handleClose() {
      this.$refs.searchBox.defaultReset()
      this.$emit('update:visible', false)
    },

    /* 搜索相关 */
    async search(params = {}) {
      try {
        this.loading = true
        const res = await getStockListAPI({ ...params, ...this.reqParams })
        this.goodsList = res.records
        this.pageInfo.total = +res.total
        this.pageInfo.currentPage = +res.current
      } catch (error) {
        this.$message.error('数据更新失败, 请重新搜索')
        this.goodsList = []
      } finally {
        this.loading = false
      }
    },
    async reset() {
      this.search()
    },
    handleSizeChange() {
      this.$refs.searchBox.apply()
    },
    handleCurrentChange() {
      this.$refs.searchBox.apply()
    },

    /* 添加货物 */
    async addGoods() {
      const stockIds = this.selectedGoods.map((item) => item.id)
      await addStockToListAPI({ masterId: this.masterId, stockIds })
      this.$store.dispatch('storageOut/updateAddedGoods')
      this.handleClose()
    }
  }
}
</script>

<style lang="scss">
</style>
