<template>
  <div class="listOut">

    <div v-show="isInRoute" class="views">
      <!-- 搜索卡片 -->
      <SearchBox ref="searchBox" :form-option="searchOption" :search-func="searchFunc" :reset-func="resetFunc" />

      <!-- 表格 -->
      <ListOutTable :table-opts="tableOpts" :table-data="tableData" @update="handlePageChange">
        <template #topActs>
          <div ref="addBtn">
            <el-button class="greenBtn" @click="add">新增出库单</el-button>
          </div>
        </template>
      </ListOutTable>

      <!-- 分页 -->
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
    </div>

    <!-- routerView -->
    <router-view />
  </div>

</template>

<script>
import SearchBox from '@/components/SearchBox/index.vue'
import { getPageOutListAPI } from '@/api/storageOut/listOutbound'
import ListOutTable from './components/ListOutTable.vue'
export default {
  name: 'ListOut',
  components: { SearchBox, ListOutTable },
  data() {
    return {
      searchOption: [
        {
          label: '出库单号',
          key: 'code'
        },
        {
          label: '运单编号',
          key: 'billCode'
        },
        {
          label: '货主名称',
          key: 'ownerName'
        }
      ],
      tableOpts: [
        {
          index: 1,
          label: '出库单号',
          propName: 'code'
        },
        {
          index: 2,
          label: '货主运单编号',
          propName: 'billCode'
        },
        {
          index: 3,
          label: '出库类型',
          propName: 'type'
        },
        {
          index: 4,
          label: '货主名称',
          propName: 'ownerName'
        },
        {
          index: 5,
          label: '出库仓库',
          propName: 'warehouseName'
        },
        {
          index: 6,
          label: '出库库区',
          propName: 'areaName'
        },
        {
          index: 7,
          label: '计划出库时间',
          propName: 'planOutTime'
        },
        {
          index: 8,
          label: '货品数量',
          propName: 'goodsNum'
        },
        {
          index: 9,
          label: '出库单状态',
          propName: 'status'
        },
        {
          index: 10,
          label: '创建人',
          propName: 'createName'
        },
        {
          index: 11,
          label: '创建时间',
          propName: 'createTime'
        }
      ],
      tableData: [
        // {
        //   'id': '798994367153967841',
        //   'createTime': '2022-09-07 19:18:22',
        //   'createUser': '0',
        //   'updateTime': '2022-09-08 15:00:04',
        //   'updateUser': '0',
        //   'code': 'HP000015',
        //   'billCode': '66666666',
        //   'type': '0',
        //   'ownerId': '798980939605607297',
        //   'warehouseId': '798976929725153313',
        //   'areaId': '798977750407840001',
        //   'planOutTime': '2022-09-07 00:00:00',
        //   'goodsNum': 1,
        //   'waveStatus': 0,
        //   'carrierId': '0',
        //   'license': '京1234',
        //   'driverName': '胡大大',
        //   'driverPhone': '15233363321',
        //   'receiverName': '刘离',
        //   'status': 6,
        //   'remark': '',
        //   'createName': '刘世娟',
        //   'updateName': '刘世娟',
        //   'logicDel': 1,
        //   'warehouseName': '1号仓库',
        //   'areaName': '存储区',
        //   'carrierName': null,
        //   'ownerName': '王姐',
        //   'ownerCode': 'HZ000003',
        //   'timeArray': null,
        //   'owner': null,
        //   'volumeTotal': null,
        //   'goodsTotal': null,
        //   'pickingEntity': null,
        //   'handoverEntity': null,
        //   'idMoney': null,
        //   'idList': null
        // }
      ],
      pageInfo: {
        size: 10,
        current: 1,
        total: 0
      }
    }
  },
  computed: {
    isInRoute() {
      return this.$route.name === 'ListOut'
    }
  },
  mounted() {
    /* 不知道怎么回事从子路由返回时会重新触发mounted和created */
    this.getOutboundList()
  },
  methods: {
    async getOutboundList(extraParams) {
      const res = await getPageOutListAPI({ ...this.pageInfo, ...extraParams })
      const data = res.records
      this.handleData(data)
      this.tableData = data
      this.pageInfo.current = +res.current
      this.pageInfo.size = +res.size
      this.pageInfo.total = +res.total
    },
    handleData(data) {
      const outTypeMap = new Map([['0', 'B2B出库']])
      const statusMap = new Map([[1, '新建'], [2, '拣货中'], [3, '已取消'], [4, '拣货完成'], [5, '交接中'], [6, '交接完成']])
      data.forEach((item) => {
        item.type = outTypeMap.get(item.type)
        item.status = statusMap.get(item.status)
      })
    },

    async searchFunc(params) {
      this.getOutboundList(params)
    },
    async resetFunc() {
      this.getOutboundList()
    },

    /* 无论page怎么变，都通过searchBox来更新列表，因为需要囊括其中的搜索项 */
    handlePageChange() {
      this.$refs.searchBox.apply()
    },

    /* 新增出货单 */
    async add() {
      this.$refs.addBtn.children.forEach((item) => item.blur()) // 修复点击后样式改变的bug
      this.$router.push({
        name: 'ListDetail',
        params: { id: 'null' }
      })
    }

  }
}
</script>

<style>

</style>
