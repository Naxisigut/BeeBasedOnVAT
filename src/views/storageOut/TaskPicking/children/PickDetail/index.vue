<template>
  <div class="TaskDetail">
    <div class="infoTip">合计：
      <span>计划数量：</span><span style="color:#FFB200FF; margin-right: 10px;">{{ plan }}个</span>
      <span>实拣：</span><span style="color:#FFB200FF">{{ actual }}个</span>
    </div>

    <el-table
      border
      fit
      stripe
      class="goodsTable"
      header-row-class-name="headerClass"
      :data="tasksList"
    >
      <!-- <el-scrollbar style="width: 500px; height: 300px;"> -->
      <el-table-column
        type="index"
        label="序号"
        width="68"
        align="center"
        class-name="colClass"
      />
      <el-table-column
        v-for="item in tableOpts"
        :key="item.label"
        :prop="item.propName"
        :label="item.label"
        align="center"
        width="160"
        class-name="colClass"
      />
      <!-- </el-scrollbar> -->
    </el-table>

    <!-- pagination -->
    <el-pagination
      class="centerPagnation"
      :current-page.sync="pageInfo.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="pageInfo.size"
      :page-count="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageInfo.total"
      @size-change="handlePageChange"
      @current-change="handlePageChange"
    />
    <!-- <component :is="componentId" /> -->
  </div>
</template>

<script>
// import AddOrEdit from './components/AddOrEdit.vue'
// import CheckDetail from './components/CheckDetail.vue'
import { getTaskDetailAPI } from '@/api/storageOut/pickTask'
export default {
  name: 'PickDetail',
  // components: { AddOrEdit, CheckDetail },
  data() {
    return {
      // tempFlag: this.$store.getters.masterId,
      tasksList: [],
      pageInfo: {
        size: 10,
        current: 1,
        total: 0
      },
      tableOpts: [
        {
          index: 1,
          label: '货品编码',
          propName: 'goodsCode'
        },
        {
          index: 2,
          label: '货品条码',
          propName: 'goodsBarCode'
        },
        {
          index: 3,
          label: '货品名称',
          propName: 'goodsName'
        },
        {
          index: 4,
          label: '货主类型',
          propName: 'goodsTypeName'
        },
        {
          index: 5,
          label: '库区',
          propName: 'areaName'
        },
        {
          index: 6,
          label: '库位',
          propName: 'locationName'
        },
        {
          index: 7,
          label: '拣货数量',
          propName: 'outboundNum'
        },
        {
          index: 8,
          label: '实拣数量',
          propName: 'pickingNum'
        },
        {
          index: 9,
          label: '差异数',
          propName: 'differenceNum'
        }
      ]
    }
  },
  computed: {
    // isCheck() {
    //   return !this.tempFlag && this.$route.params.id !== 'null'
    // },
    // componentId() {
    //   if (this.isCheck) return 'CheckDetail'
    //   return 'AddOrEdit'
    // }
    plan() {
      return this.tasksList.reduce((curr, item) => curr + item.outboundNum, 0)
    },
    actual() {
      return this.tasksList.reduce((curr, item) => curr + item.pickingNum, 0)
    },
    masterId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.getTasksList()
  },
  methods: {
    async getTasksList() {
      const res = await getTaskDetailAPI({
        masterId: this.masterId,
        size: this.pageInfo.size,
        current: this.pageInfo.current
      })
      this.tasksList = res.records
      this.pageInfo.total = +res.total
    },
    handlePageChange() {
      this.getTasksList()
    }
  }
  // /* 离开路由时销毁之前的出库单信息，方便下次渲染 */
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.dispatch('storageOut/init')
  //   next()
  // }
}
</script>

<style>

</style>
