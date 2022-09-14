<template>
  <div class="listOut">

    <div v-show="isInRoute" class="views">
      <!-- 搜索卡片 -->
      <SearchBox
        ref="searchBox"
        :form-option="searchOption"
        :search-func="searchFunc"
        :reset-func="resetFunc"
      >
        <template #slot2="slotProps">
          <el-select v-model="slotProps.value.status" placeholder="请选择">
            <el-option
              v-for="item in statusObj"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </SearchBox>

      <!-- 表格 -->
      <TransTaskTable ref="pickTasksTable" :table-opts="tableOpts" :table-data="tableData" @update="handlePageChange" />

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
import { getTransTasksAPI } from '@/api/storageOut/transTask'
import TransTaskTable from './components/TransTaskTable.vue'
export default {
  name: 'TaskTransfer',
  components: { SearchBox, TransTaskTable },
  data() {
    return {
      searchOption: [
        {
          label: '交接编号',
          key: 'code'
        },
        {
          label: '出库单号',
          key: 'outboundCode'
        },
        {
          label: '承运商',
          key: 'carrierName'
        }
      ],
      tableOpts: [
        {
          index: 1,
          label: '交接编号',
          propName: 'code'
        },
        {
          index: 2,
          label: '出库单号',
          propName: 'outboundCode'
        },
        {
          index: 3,
          label: '创建时间',
          propName: 'createTime'
        },
        {
          index: 4,
          label: '创建人',
          propName: 'createName'
        },
        {
          index: 5,
          label: '承运商',
          propName: 'carrierName'
        },
        {
          index: 6,
          label: '运单号',
          propName: 'billCode'
        },
        {
          index: 7,
          label: '交接状态',
          propName: 'status'
        },
        {
          index: 8,
          label: '交接员',
          propName: 'handoverName'
        },
        {
          index: 9,
          label: '交接完成时间',
          propName: 'completionTime'
        },
        {
          index: 10,
          label: '交接司机',
          propName: 'driverName'
        },
        {
          index: 11,
          label: '交接司机电话',
          propName: 'driverPhone'
        }
      ],
      tableData: [
        {
          'id': '799201066565506081',
          'createTime': '2022-09-12 19:18:22',
          'createUser': '0',
          'updateTime': '2022-09-13 15:00:06',
          'updateUser': '0',
          'masterId': '798994367153967841',
          'code': 'JHRW000002',
          'waveCode': 'BC000002',
          'outboundCode': 'HP000015',
          'ownerId': '798980939605607297',
          'warehouseId': '798976929725153313',
          'areaId': '798977750407840001',
          'pickingNum': 1,
          'personName': '张文礼',
          'realNum': 1,
          'differenceNum': 0,
          'completionTime': '2022-09-12 09:00:06',
          'status': 3,
          'remark': '',
          'createName': '刘世娟',
          'updateName': '刘世娟',
          'logicDel': 1,
          'warehouseName': '1号仓库',
          'areaName': '存储区',
          'ownerName': '王姐',
          'ownerCode': 'HZ000003'
        }
      ],
      pageInfo: {
        size: 10,
        current: 1,
        total: 0
      },
      statusObj: [
        {
          value: null,
          label: '全部'
        },
        {
          value: 1,
          label: '待分配'
        },
        {
          value: 2,
          label: '拣货中'
        },
        {
          value: 3,
          label: '拣货完成'
        }
      ]
      // selections: []
    }
  },
  computed: {
    isInRoute() {
      return this.$route.name === 'TaskTransfer'
    }
  },
  mounted() {
    /* 不知道怎么回事从子路由返回时会重新触发mounted和created */
    this.getPickTaskList()
  },
  methods: {
    async getPickTaskList(extraParams) {
      /* 搜索功能有问题，只有不带其它参数时可以成功请求 */
      const res = await getTransTasksAPI({ ...this.pageInfo, ...extraParams })
      const data = res.records
      this.handleData(data)
      this.tableData = data
      this.pageInfo.current = +res.current
      this.pageInfo.size = +res.size
      this.pageInfo.total = +res.total
    },
    handleData(data) {
      const statusMap = new Map([[1, '新建'], [2, '交接中'], [3, '交接完成']])
      data.forEach((item) => {
        item.status = statusMap.get(item.status)
      })
    },

    async searchFunc(params) {
      this.getPickTaskList(params)
    },
    async resetFunc() {
      this.getPickTaskList()
    },

    /* 无论page怎么变，都通过searchBox来更新列表，因为需要囊括其中的搜索项 */
    handlePageChange() {
      this.getPickTaskList()
    }
  }
}
</script>

<style>

</style>
