<template>
  <div class="listOutTable mainTable">
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
              <a v-if="row.status === '新建' " href="javascript:;" @click="cancel(row)">取消</a>
            </div>
          </template>
        </el-table-column>
        <!-- </el-scrollbar> -->
      </el-table>
    </div>
  </div>
</template>

<script>
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
  methods: {
    detail({ id }) {
      this.$router.push({
        name: 'ListDetail',
        params: { id }
      })
    },
    edit({ id }) {
      this.$router.push({
        name: 'ListDetail',
        params: { id }
      })
    },
    generate() {

    },
    cancel() {

    }
  }
}
</script>

<style lang="scss">
// .mainTable {
//   background-color: #fff;
//   border-radius: 12px;
//   box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);

//   /* actBox样式 */
//   .actBox {
//     padding: 20px 30px;
//   }

//   .el-table {
//     font-size: 13px;
//     color: black;
//   }

//   /* 列通用样式 */
//   .colClass {
//   }

//   /* 表头行样式 */
//   .headerClass {
//     font-size: 13px;
//     font-family: PingFangSC, PingFangSC-Medium;
//     font-weight: 500;
//     color: #887e7e;
//     th {
//       background-color: #f8f6ee;
//     }
//   }

//   /* 斑马纹 */
//   .el-table--striped {
//     background-color: #fafafa;
//   }

//   /* hover高亮 */
//   .hover-row:hover {
//     td {
//       background-color: #fdf6e2 !important;
//     }
//   }

//     /* 排序 */
//     .ascending i.sort-caret.ascending{
//     border-bottom-color:#FFB200 !important
//   }
//   .descending i.sort-caret.descending{
//     border-top-color:#FFB200 !important
//   }

//   /* 操作列样式 */
//   .rowActs{
//     display: flex;
//     justify-content: space-evenly;
//     a{
//       color: #FFB200;
//       // margin-right: 10px;
//       &:hover{
//         color: #ff8e00;
//       }
//     }
//   }
// }

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
