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
          :sortable="[3,8,10,11].includes(item.index)"
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
              <a v-if="row.status === '待分配' " href="javascript:;" @click="distributeChoose(row)">分配</a>
              <a v-if="row.status === '拣货中' " href="javascript:;" @click="recordPick(row)">拣选录入</a>
              <a v-if="row.status === '拣货中' " href="javascript:;" @click="complete(row)">拣货完成</a>
              <a v-if="row.status === '拣货完成' " href="javascript:;" @click="detail(row)">查看详情</a>
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
        <el-select v-model="personName" placeholder="请选择" no-data-text="无数据">
          <el-option v-for="item in personList" :key="item.name" :label="item.name" :value="item.name" />
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
      title="拣货完成"
      :visible.sync="showPick"
      width="30%"
      custom-class="shadowDialog"
    >
      <template>
        <div class="content">
          <div class="title">{{ pickResponse.errors.length || pickResponse.results.length }}个交接任务生成{{ isCompleteDone? '成功':'失败' }}</div>
          <div class="tip" :class="{isCompleteDone}">{{ isCompleteDone? '生成交接任务成功，请在交接任务中查看':'交接任务生成失败的原因如下' }}</div>
          <div class="info">{{ pickResponse.errors[0] || pickResponse.results[0] }}</div>
        </div>
      </template>
      <template #footer>
        <div class="rightBtns">
          <el-button class="normalBtn grayBtn" @click="showPick = false">取 消</el-button>
          <el-button class="normalBtn yellowBtn" @click="confirmGen">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { completePickAPI, distributeTaskAPI } from '@/api/storageOut/pickTask'
export default {
  name: 'PickTaskTable',
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
      showPick: false,
      pickResponse: { errors: [], results: [] },
      personName: '',
      personList: [{ name: '张文礼' }, { name: '王千一' }, { name: '徐文' }, { name: '赵雯谦' }],
      selections: []
    }
  },
  computed: {
    isCompleteDone() {
      return !!this.pickResponse.results.length
    },
    ids() {
      return this.selections.map((item) => item.id)
    }
  },
  methods: {
    /* 查看详情 */
    detail({ masterId: id }) {
      this.$router.push({
        name: 'PickDetail',
        params: { id }
      })
    },
    /* 打开分配弹窗 */
    async distributeChoose(row) {
      this.showDist = true
      this.clickedRow = row
    },
    /* 分配 */
    async distribute() {
      try {
        await distributeTaskAPI({
          id: this.clickedRow.id,
          personName: this.personName
        })
        this.showDist = false
      } catch (error) {
        console.log('error =', error.message)
      } finally {
        this.$emit('update')
      }
    },

    /* 拣选录入 */
    async recordPick({ masterId: id }) {
      this.$router.push({
        name: 'PickRecordIn',
        params: { id }
      })
    },

    /* 点击拣货完成 */
    async complete({ id }) {
      const res = await completePickAPI([id])
      this.pickResponse = res
      this.showPick = true
    },
    confirmGen() {
      this.$refs.table.clearSelection()
      this.showPick = false
      this.$emit('update')
    },

    /* 复选框 */
    handleSelects(val) {
      this.selections = val
    },
    /* 批量完成 */
    async multiComplete() {
      const res = await completePickAPI(this.ids)

      this.pickResponse = res
      this.showPick = true
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
