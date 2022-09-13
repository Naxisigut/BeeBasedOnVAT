<template>
  <div class="PickRecordIn">
    <div class="infoTip">合计：
      <span>计划数量：</span><span style="color:#FFB200FF; margin-right: 10px;">{{ plan }}个</span>
      <span>实拣：</span><span style="color:#FFB200FF">{{ actual }}个</span>
    </div>

    <!-- table -->
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

      <el-table-column
        label="实拣数量"
        prop="pickingNum"
        width="160"
        align="center"
        class-name="colClass"
      >
        <template v-slot="{row}">
          <div>
            <span>{{ row.pickingNum || 0 }}</span>
            <el-input
              v-model="row.pickingNum"
              class="tableEdit"
              style="width: 60%; display: none;"
            />
            <i
              class="el-icon-edit-outline iStyle"
              @click="editNum($event, row)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="差异数"
        prop="differenceNum"
        width="160"
        align="center"
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

    <!-- btns -->
    <div class="centerBtns" style="border-top: 1px solid #f5efee; margin-top: 20px;">
      <el-button class="biggerBtn grayBtn" @click="$router.back()">取消</el-button>
      <el-button class="biggerBtn yellowBtn" @click="$router.push({name: 'TaskPicking'})">确认</el-button>
    </div>
  </div>
</template>

<script>
import { getTaskDetailAPI, changePickNumAPI } from '@/api/storageOut/pickTask'
export default {
  name: 'PickRecordIn',
  data() {
    return {
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
        }
        // {
        //   index: 8,
        //   label: '实拣数量',
        //   propName: 'pickingNum'
        // },
        // {
        //   index: 9,
        //   label: '差异数',
        //   propName: 'differenceNum'
        // }
      ]
    }
  },
  computed: {
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
      this.tasksList.forEach((item) => {
        if (item.pickingNum === null)item.pickingNum = 0
        if (item.differenceNum === null)item.differenceNum = item.outboundNum - item.pickingNum
        if (item.differenceNum < 0)item.differenceNum = -item.differenceNum
      })
      this.pageInfo.total = +res.total
    },
    handlePageChange() {
      this.getTasksList()
    },
    async changePickNum(data) {
      const res = await changePickNumAPI(data)
      console.log('res =', res)
    },

    /* 点击操作时切换显示输入框且发送请求 */
    async editNum(e, { pickingNum, id }) {
      const num = e.target.parentNode.children[0]
      const ipt = e.target.parentNode.children[1]
      const icon = e.target
      icon.classList.toggle('el-icon-edit')
      icon.classList.toggle('el-icon-check')
      /* 控制两个元素的显隐 */
      if (num.style.display !== 'none') {
        num.style.display = 'none'
        ipt.style.display = 'inline-block'
        ipt.querySelector('input').focus()
      } else {
        /* 非0判断 */
        try {
          num.style.display = 'inline'
          ipt.style.display = 'none'
          // if (+pickingNum) {
          await changePickNumAPI({ pickingNum, id })
          // } else {
          // this.$message.warning('不能修改数量为0！请直接删除')
          // }
        } catch (error) {
          console.log('error =', error)
        } finally {
          await this.getTasksList()
        }
      }
    }
  }
  // /* 离开路由时销毁之前的出库单信息，方便下次渲染 */
  // beforeRouteUpdate(to, from, next) {
  //   this.$store.dispatch('storageOut/init')
  //   next()
  // }
}
</script>

<style lang="scss" scoped>

.iStyle{
  color:#FFB200FF;
  float: right;
  margin-top: 5px;
  font-size: 20px;
}
.tableEdit{
  .el-input__inner{
    height: 22px;
    line-height: 22px;
  }
}
</style>
