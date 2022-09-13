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
      <PickTaskTable ref="pickTasksTable" :table-opts="tableOpts" :table-data="tableData" @update="handlePageChange">
        <template #topActs>
          <div ref="pickBtn">
            <el-button class="greenBtn" @click="multiPick">拣货完成</el-button>
          </div>
        </template>
      </PickTaskTable>

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
import { getPickTasksAPI } from '@/api/storageOut/pickTask'
import PickTaskTable from './components/PickTaskTable.vue'
export default {
  name: 'PickTask',
  components: { SearchBox, PickTaskTable },
  data() {
    return {
      searchOption: [
        {
          label: '拣货编号',
          key: 'code'
        },
        {
          label: '货主名称',
          key: 'ownerName'
        },
        {
          label: '拣货状态',
          key: 'status'
        }
      ],
      tableOpts: [
        {
          index: 1,
          label: '拣货单号',
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
          label: '货主名称',
          propName: 'ownerName'
        },
        {
          index: 5,
          label: '仓库名称',
          propName: 'warehouseName'
        },
        {
          index: 6,
          label: '库区名称',
          propName: 'areaName'
        },
        {
          index: 7,
          label: '拣货数量',
          propName: 'pickingNum'
        },
        {
          index: 8,
          label: '拣货状态',
          propName: 'status'
        },
        {
          index: 9,
          label: '负责人',
          propName: 'personName'
        },
        {
          index: 10,
          label: '实拣数量',
          propName: 'realNum'
        },
        {
          index: 11,
          label: '完成时间',
          propName: 'completionTime'
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
      return this.$route.name === 'TaskPicking'
    }
  },
  mounted() {
    /* 不知道怎么回事从子路由返回时会重新触发mounted和created */
    this.getPickTaskList()
  },
  methods: {
    async getPickTaskList(extraParams) {
      /* 搜索功能有问题，只有不带其它参数时可以成功请求 */
      const res = await getPickTasksAPI({ ...this.pageInfo, ...extraParams, id: '' })
      const data = res.records
      this.handleData(data)
      this.tableData = data
      this.pageInfo.current = +res.current
      this.pageInfo.size = +res.size
      this.pageInfo.total = +res.total
    },
    handleData(data) {
      const statusMap = new Map([[1, '待分配'], [2, '拣货中'], [3, '拣货完成']])
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
    },

    /* 点击拣货完成，批量完成拣货 */
    async multiPick() {
      this.$refs.pickBtn.children.forEach((item) => item.blur()) // 修复点击后样式改变的bug

      this.$refs.pickTasksTable.multiComplete()
    }

  }
}
</script>

<style>

</style>
