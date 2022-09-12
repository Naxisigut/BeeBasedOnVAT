<template>
  <div class="goodsTable">
    <div class="infoTip">当前已选 <span style="color:#FFB200FF">{{ selectedGoods.length }}个</span> 商品</div>
    <el-table
      border
      fit
      stripe
      header-row-class-name="headerClass"
      :data="goodsList"
      class="goodsTable"
      @selection-change="handleSelChange"
    >
      <!-- <el-scrollbar style="width: 500px; height: 300px;"> -->
      <el-table-column
        align="center"
        type="selection"
        width="64"
        :selectable="(row)=>addedGoods.every((item) => item.stockId !== row.id)"
      />
      <el-table-column
        type="index"
        label="序号"
        width="68"
        align="center"
        class-name="colClass"
      />
      <el-table-column
        v-for="item in goodsTableOpts"
        :key="item.label"
        :prop="item.propName"
        :label="item.label"
        align="center"
        class-name="colClass"
        width="120"
      />
      <!-- </el-scrollbar> -->
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    goodsList: {
      type: Array,
      default: () => []
    },
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      goodsTableOpts: [
        {
          index: 1,
          label: '仓库名称',
          propName: 'warehouseName'
        },
        {
          index: 2,
          label: '库区名称',
          propName: 'areaName'
        },
        {
          index: 3,
          label: '库位编码',
          propName: 'locationCode'
        },
        {
          index: 4,
          label: '库位名称',
          propName: 'locationName'
        },
        {
          index: 5,
          label: '货品编码',
          propName: 'goodsCode'
        },
        {
          index: 6,
          label: '货品名称',
          propName: 'goodsName'
        },
        {
          index: 7,
          label: '货品类型',
          propName: 'goodsTypeName'
        },
        {
          index: 8,
          label: '货品单位',
          propName: 'goodsUnit'
        },
        {
          index: 9,
          label: '可用库存',
          propName: 'free'
        }
      ],
      selectedGoods: []
    }
  },
  computed: {
    ...mapGetters(['addedGoods'])
  },
  methods: {
    handleSelChange(selection) {
      this.$emit('update:selectedList', selection)
    }
  }
}
</script>

<style>

</style>
