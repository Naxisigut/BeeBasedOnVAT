<template>
  <div v-loading="loading" class="listOutTable mainTable">
    <div class="table">
      <!-- actBox -->
      <div class="actBox">
        <slot name="topActs" />
      </div>

      <!-- table -->
      <el-table
        ref="table"
        border
        fit
        stripe
        class="goodsTable"
        header-row-class-name="headerClass"
        :data="tableData"
        @selection-change="handleSelects"
      >
        <!-- <el-scrollbar style="width: 500px; height: 300px;"> -->
        <el-table-column
          type="selection"
          width="65"
          align="center"
          class-name="colClass"
        />
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
          :sortable="[3,9].includes(item.index)"
          :filters="item.index === 7
            ? [{text: '新建', value:'新建' },
               {text: '交接中', value: '交接中'},
               {text: '交接完成', value: '交接完成'}]
            :null"
          :filter-method="item.index === 7 ? handleFilter : null"
          align="center"
          width="160"
          class-name="colClass"
        />
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="240"
        >
          <template v-slot="{row}">
            <div class="rowActs">
              <a v-if="row.status === '新建' " href="javascript:;" @click="distributeChoose(row)">分配</a>
              <a v-if="row.status === '交接中' " href="javascript:;" @click="recordHandover(row)">交接录入</a>
              <a v-if="row.status === '交接中' " href="javascript:;" @click="complete(row)">交接完成</a>
              <a v-if="row.status === '交接完成' " href="javascript:;" @click="detail(row)">查看详情</a>
            </div>
          </template>
        </el-table-column>
        <!-- </el-scrollbar> -->
      </el-table>
    </div>

    <!-- 分配弹窗 -->
    <el-dialog
      title="人员分配"
      :visible.sync="showDist"
      width="30%"
    >
      <div style="text-align: center;">
        <span style="margin-right: 10px;">负责人</span>
        <el-select v-model="handoverName" placeholder="请选择" no-data-text="无数据">
          <el-option v-for="item in handoverList" :key="item.name" :label="item.name" :value="item.name" />
        </el-select>
      </div>
      <template #footer>
        <div class="rightBtns">
          <el-button class="normalBtn grayBtn" @click="showCancel = false">取 消</el-button>
          <el-button class="normalBtn yellowBtn" @click="distribute">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 完成拣选弹窗 -->
    <el-dialog
      title="交接完成"
      :visible.sync="showHandover"
      width="30%"
      custom-class="shadowDialog"
    >
      <template>
        <div class="content">
          <div class="title">{{ handoverResponse.errors.length || handoverResponse.results.length }}个交接任务完成{{ isCompleteDone? '成功':'失败' }}</div>
          <div class="tip" :class="{isCompleteDone}">{{ isCompleteDone? '恭喜！':'交接任务完成失败的原因如下' }}</div>
          <div class="info">{{ handoverResponse.errors[0] || handoverResponse.results[0] }}</div>
        </div>
      </template>
      <template #footer>
        <div class="rightBtns">
          <el-button class="normalBtn grayBtn" @click="showHandover = false">取 消</el-button>
          <el-button class="normalBtn yellowBtn" @click="confirmGen">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { completeHandoverAPI, distributeHandoverAPI } from '@/api/storageOut/transTask'
export default {
  name: 'TransTaskTable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableOpts: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      showDist: false,
      clickedRow: {},
      showHandover: false,
      handoverResponse: { errors: [], results: [] },
      handoverName: '',
      handoverList: [{ name: '张文礼' }, { name: '王千一' }, { name: '徐文' }, { name: '赵雯谦' }]
    }
  },
  computed: {
    isCompleteDone() {
      return !!this.handoverResponse.results.length
    },
    ids() {
      return this.selections.map((item) => item.id)
    }
  },
  methods: {
    handleFilter(val, row) {
      return row.status === val
    },

    /* 查看详情 */
    detail({ masterId: id }) {
      this.$message('待完善')
      // this.$router.push({
      //   name: 'PickDetail',
      //   params: { id }
      // })
    },
    /* 打开分配弹窗 */
    async distributeChoose(row) {
      this.showDist = true
      this.clickedRow = row
    },
    /* 分配 */
    async distribute() {
      try {
        await distributeHandoverAPI({
          id: this.clickedRow.id,
          handoverName: this.handoverName
        })
        this.showDist = false
      } catch (error) {
        console.log('error =', error.message)
      } finally {
        this.$emit('update')
      }
    },

    /* 拣选录入 */
    async recordHandover({ masterId: id }) {
      this.$message('待完善')
      // this.$router.push({
      //   name: 'PickRecordIn',
      //   params: { id }
      // })
    },

    /* 点击拣货完成 */
    async complete({ id }) {
      const res = await completeHandoverAPI([id])
      this.handoverResponse = res
      this.showHandover = true
    },
    confirmGen() {
      this.showHandover = false
      this.$emit('update')
    },

    /* 复选框 */
    handleSelects(val) {
      this.selections = val
    }
  }
}
</script>

<style lang="scss" scoped >
.content{
  .title{
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    color: #332929;
    line-height: 24px;
  }
  .tip{
    color: #d9021c;
    height: 22px;
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    text-align: center;
    line-height: 22px;
    margin-top: 11px;
    margin-bottom: 6px;
    text-align: center;
    &.isCompleteDone{
      color: #ffb200 !important;
    }
  }
  .info{
    font-size: 14px;
    font-family: PingFangSC,PingFangSC-Regular;
    font-weight: 400;
    color: #b5abab;
    line-height: 22px;
    padding-right: 10px;
    text-align: left;
  }
}
</style>
