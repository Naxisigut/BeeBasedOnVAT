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
      <span>确认要取消出库单{{ cancelRow.code }}吗？</span>
      <template #footer>
        <div class="rightBtns">
          <el-button class="normalBtn grayBtn" @click="showCancel = false">取 消</el-button>
          <el-button class="normalBtn yellowBtn" @click="cancel">确 定</el-button>
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
      showCancel: false,
      cancelRow: {},
      loading: false
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
      const { errors, results } = await addPickTaskAPI([id])
      if (errors.length) {
        this.$message.error(errors[0])
      }
    },
    cancelQuery(row) {
      this.cancelRow = row
      this.showCancel = true
    },
    async cancel() {
      try {
        this.loading = true
        await delOutboundAPI({ id: this.cancelRow.id })
        this.loading = false
        this.$message.success('取消成功')
      } catch (error) {
        console.log('error =', error)
      } finally {
        this.showCancel = false
        this.$emit('update')
      }
    }
  }
}
</script>

<style lang="scss">
//  ::-webkit-scrollbar {
//  width: 6px;
//  height: 8px;
//  background-color: transparent;
//  }
// ::-webkit-scrollbar-thumb {
//  background-color: #ccc;
//  border-radius: 10px;
// }
// ::-webkit-scrollbar-track{
//  border-radius: 3px;
//  background: transparent;
// }
</style>
