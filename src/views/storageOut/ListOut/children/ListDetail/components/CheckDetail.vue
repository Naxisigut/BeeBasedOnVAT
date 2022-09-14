<template>
  <div class="checkDetail">
    <el-collapse v-model="activeNames" class="detailPanel">

      <!-- 基本信息 -->
      <el-collapse-item title="基础信息" name="1" class="cardBox card">

        <el-steps :active="currStep" class="steps">
          <el-step v-for="item in steps" :key="item.title" :title="item.title" :discription="item.desc" icon="el-icon-circle-check" />
        </el-steps>

        <div class="infoPanel">
          <div class="info"><span>出库单号</span><span> {{ detailInfo.code }}</span></div>
          <div class="info"><span>创建时间</span><span> {{ detailInfo.createTime }}</span></div>
          <div class="info"><span>计划到达时间</span><span> {{ detailInfo.planOutTime }}</span></div>
          <div class="info"><span>出库类型</span><span> {{ detailInfo.type===0?'B2B出库':'未知' }}</span></div>
          <div class="info"><span>仓库名称</span><span> {{ detailInfo.warehouseName }}</span></div>
          <div class="info"><span>库区名称</span><span> {{ detailInfo.areaName }}</span></div>
        </div>

      </el-collapse-item>

      <!-- 货主信息 -->
      <el-collapse-item title="货主信息" name="2" class="cardBox card">
        <div class="infoPanel">
          <div class="info"><span>货主信息</span><span> {{ owner.code }}</span></div>
          <div class="info"><span>货主名称</span><span> {{ owner.name }}</span></div>
          <div class="info"><span>联系人</span><span> {{ owner.personName }}</span></div>
          <div class="info"><span>联系电话</span><span> {{ owner.phone }}</span></div>
        </div>
      </el-collapse-item>

      <!-- 货品信息 -->
      <el-collapse-item title="货品信息" name="3" class="cardBox card">
        <div class="infoTip">总计：{{ goodsStatics.num }}个 总体积 {{ goodsStatics.vol }}m³</div>
        <el-table
          border
          fit
          stripe
          header-row-class-name="headerClass"
          :data="goodsTableData"
          class="detailTable"
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
            v-for="item in goodsTableOpts"
            :key="item.label"
            :prop="item.propName"
            :label="item.label"
            align="center"
            class-name="colClass"
            :width="160"
            :sortable="(item.label==='体积'||item.label==='单位') ? true : false "
          />
        <!-- </el-scrollbar> -->
        </el-table>
      </el-collapse-item>

      <!-- 运输信息 -->
      <el-collapse-item title="运输信息" name="4" class="cardBox card">
        <div class="infoPanel">
          <div class="info"><span>运单编号</span><span> {{ detailInfo.billCode }}</span></div>
          <div class="info"><span>承运商</span><span> {{ detailInfo.carrierName }}</span></div>
          <div class="info"><span>计划出库时间</span><span> {{ detailInfo.planOutTime }}</span></div>
          <div class="info"><span>司机名称</span><span> {{ detailInfo.driverName }}</span></div>
          <div class="info"><span>司机电话</span><span> {{ detailInfo.driverPhone }}</span></div>
          <div class="info"><span>收货人名称</span><span> {{ detailInfo.receiverName }}</span></div>
        </div>
      </el-collapse-item>

      <!-- 任务信息 -->
      <el-collapse-item title="任务信息" name="4" class="cardBox card">
        <div class="infoTip">拣货任务</div>
        <div class="infoPanel">
          <div class="info"><span>任务编号</span><span> {{ pickingEntity.code }}</span></div>
          <div class="info"><span>任务状态</span><span> {{ pickingEntity.status }}</span></div>
          <div class="info"><span>拣货人</span><span> {{ pickingEntity.personName }}</span></div>
          <div class="info"><span>开始时间</span><span> {{ pickingEntity.createTime }}</span></div>
          <div class="info"><span>完成时间</span><span> {{ pickingEntity.completionTime }}</span></div>
        </div>
        <div class="infoTip" style="margin-top: 40px">交接任务</div>
        <div class="infoPanel">
          <div class="info"><span>任务编号</span><span> {{ handoverEntity.billCode }}</span></div>
          <div class="info"><span>任务状态</span><span> {{ handoverEntity.status }}</span></div>
          <div class="info"><span>交接人</span><span> {{ handoverEntity.handoverName }}</span></div>
          <div class="info"><span>开始时间</span><span> {{ handoverEntity.createTime }}</span></div>
          <div class="info"><span>完成时间</span><span> {{ handoverEntity.completionTime }}</span></div>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>

<script>
import { getSingleDetailAPI, getDetailAPI } from '@/api/storageOut/listOutbound'
export default {
  data() {
    return {
      activeNames: ['1'],
      goodsTableData: [],
      detailInfo: {},
      steps: [
        { title: '新建', desc: null, status: 1 },
        { title: '拣货中', desc: null, status: 2 },
        { title: '拣货完成', desc: null, status: 4 },
        { title: '交接中', desc: null, status: 5 },
        { title: '交接完成', desc: null, status: 6 }
      ],
      goodsTableOpts: [
        {
          index: 1,
          label: '货品编号',
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
          label: '货品类型',
          propName: 'goodsTypeName'
        },
        {
          index: 5,
          label: '货主名称',
          propName: 'ownerName'
        },
        {
          index: 6,
          label: '货品数量',
          propName: 'stockTotal'
        },
        {
          index: 7,
          label: '体积',
          propName: 'goodsVolume'
        },
        {
          index: 8,
          label: '单位',
          propName: 'goodsUnit'
        },
        {
          index: 9,
          label: '可用库存',
          propName: 'stockFree'
        },
        {
          index: 10,
          label: '发货数量',
          propName: 'outboundNum'
        }
      ]
    }
  },
  computed: {
    currStep() {
      if (!this.detailInfo) return 0
      return this.steps.findIndex(item => item.status === this.detailInfo.status) + 1
    },
    owner() {
      return this.detailInfo.owner || {}
    },
    pickingEntity() {
      return this.detailInfo.pickingEntity || {}
    },
    handoverEntity() {
      return this.detailInfo.handoverEntity || {}
    },
    goodsStatics() {
      return {
        num: this.goodsTableData.reduce((curr, item) => curr + item.outboundNum, 0),
        vol: this.goodsTableData.reduce((curr, item) => curr + item.outboundNum * item.goodsVolume, 0)
      }
    }
  },
  async mounted() {
    const { records } = await getSingleDetailAPI(this.$route.params.id)
    this.goodsTableData = records
    this.detailInfo = await getDetailAPI(this.$route.params.id)
  }
}
</script>

<style lang="scss">

</style>
