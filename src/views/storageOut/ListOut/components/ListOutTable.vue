<template>
  <div v-loading="loading" class="listOutTable mainTable">
    <div class="table">
      <!-- actBox -->
      <div class="actBox">
        <slot name="topActs" />
      </div>

      <!-- table -->
      <el-table
        border
        fit
        stripe
        header-row-class-name="headerClass"
        :data="tableData"
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
          class-name="colClass"
          :width="(item.label==='出库仓库' || item.label === '出库库区')? 200 : 160"
        />
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="240"
        >
          <template v-slot="{row}">
            <div class="rowActs">
              <a v-if="row.status !== '新建' " href="javascript:;" @click="detail(row)">查看详情</a>
              <a v-if="row.status === '新建' " href="javascript:;" @click="edit(row)">修改详情</a>
              <a v-if="row.status === '新建' " href="javascript:;" @click="generate(row)">生成拣货任务</a>
              <a v-if="row.status === '新建' " href="javascript:;" @click="cancelQuery(row)">取消</a>
            </div>
          </template>
        </el-table-column>
        <!-- </el-scrollbar> -->
      </el-table>
    </div>

    <!-- 取消确认弹窗 -->
    <el-dialog
      title="取消确认"
      :visible.sync="showCancel"
      width="30%"
    >
      <span>确认要取消出库单{{ clickedRow.code }}吗？</span>
      <template #footer>
        <div class="rightBtns">
          <el-button class="normalBtn grayBtn" @click="showCancel = false">取 消</el-button>
          <el-button class="normalBtn yellowBtn" @click="cancel">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 拣货任务弹窗 -->
    <el-dialog
      title="生成拣货任务"
      :visible.sync="showPick"
      width="30%"
      custom-class="shadowDialog"
    >
      <template>
        <div class="content">
          <div class="title">{{ pickResponse.errors.length || pickResponse.results.length }}个拣货任务生成{{ isPickSuccess? '成功':'失败' }}</div>
          <div class="tip" :class="{isPickSuccess}">{{ isPickSuccess? '生成拣货任务成功，请在拣货任务中查看':'拣货任务生成失败的原因如下' }}</div>
          <div class="info">{{ pickResponse.errors[0] || pickResponse.results[0] }}</div>
        </div>
      </template>
      <template #footer>
        <div class="rightBtns">
          <!-- <el-button class="normalBtn grayBtn" @click="showCancel = false">取 消</el-button> -->
          <el-button class="normalBtn yellowBtn" @click="confirmGen">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { addPickTaskAPI, delOutboundAPI } from '@/api/storageOut'
export default {
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
      showCancel: false,
      clickedRow: {},
      showPick: false,
      pickResponse: { errors: [], results: [] }
    }
  },
  computed: {
    isPickSuccess() {
      return !!this.pickResponse.results.length
    }
  },
  methods: {
    detail({ id }) {
      this.$router.push({
        name: 'ListDetail',
        params: { id }
      })
    },
    edit(row) {
      this.$store.dispatch('storageOut/editInto', row)
      this.$router.push({
        name: 'ListDetail',
        params: { id: row.id }
      })
    },
    async generate({ id }) {
      const res = await addPickTaskAPI([id])
      this.pickResponse = res
      this.showPick = true
      // }
    },
    cancelQuery(row) {
      this.clickedRow = row
      this.showCancel = true
    },
    async cancel() {
      try {
        this.loading = true
        await delOutboundAPI({ id: this.clickedRow.id })
        this.loading = false
        this.$message.success('取消成功')
      } catch (error) {
        console.log('error =', error)
      } finally {
        this.showCancel = false
        this.$emit('update')
      }
    },
    confirmGen() {
      this.showPick = false
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
    &.isPickSuccess{
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
