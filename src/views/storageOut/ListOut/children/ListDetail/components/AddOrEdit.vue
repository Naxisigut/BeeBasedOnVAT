<template>
  <div class="addOrEdit">
    <div class="cardBox">

      <!-- steps -->
      <el-steps :active="currStep" finish-status="success" class="steps">
        <el-step title="填写出库单基础信息" />
        <el-step title="填写承运商信息" />
        <el-step title="填写货品明细信息" />
      </el-steps>

      <!-- form -->
      <el-form
        v-show="currStep !== 2"
        ref="form"
        class="outboundForm"
        label-position="top"
        :inline="true"
        :model="form"
        :rules="rules"
      >
        <!-- step0 -->
        <div v-show="currStep === 0" class="step0">
          <!--  -->
          <el-form-item label="出库单号" prop="code">
            <el-input v-model="form.code" disabled />
          </el-form-item>
          <!--  -->
          <el-form-item label="仓库名称" prop="warehouseId">
            <el-select v-model="form.warehouseId" placeholder="请选择" no-data-text="无数据" @change="dealWareChange">
              <el-option v-for="item in wareHouseList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <!--  -->
          <el-form-item label="库区名称" prop="areaId">
            <el-select v-model="form.areaId" placeholder="请选择" no-data-text="无数据">
              <el-option v-for="item in wareAreaList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <!--  -->
          <el-form-item label="货主" prop="ownerId">
            <el-select
              v-model="form.ownerId"
              remote
              filterable
              placeholder="请输入货主名称/编码"
              :remote-method="remoteMethod"
            >
              <el-option
                v-for="item in ownerListForSearch"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <!--  -->
          <el-form-item label="出库类型" prop="type">
            <el-select v-model="form.type" filterable remote :remote-method="remoteMethod" placeholder="请选择">
              <el-option label="B2B出库" value="0" />
            </el-select>
          </el-form-item>
          <!--  -->
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入" />
          </el-form-item>
        </div>

        <!-- step1 -->
        <div v-show="currStep === 1" class="step1">
          <!--  -->
          <el-form-item label="运单单号" prop="billCode">
            <el-input v-model="form.billCode" placeholder="请输入" />
          </el-form-item>
          <!--  -->
          <el-form-item label="承运商" prop="carrierId">
            <el-select v-model="form.carrierId" placeholder="请选择" no-data-text="无数据" @change="dealWareChange">
              <el-option v-for="item in carrierList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <!--  -->
          <el-form-item label="计划出库时间" prop="planOutTime">
            <el-date-picker
              v-model="form.planOutTime"
              type="date"
              :picker-options="{disabledDate: (time)=>time.getTime() < Date.now()}"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            />
          </el-form-item>
          <!--  -->
          <el-form-item label="司机姓名" prop="driverName">
            <el-input v-model="form.driverName" placeholder="请输入" />
          </el-form-item>
          <!--  -->
          <el-form-item label="司机电话" prop="driverPhone">
            <el-input v-model="form.driverPhone" placeholder="请输入" />
          </el-form-item>
          <!--  -->
          <el-form-item label="车牌号" prop="license">
            <el-input v-model="form.license" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="收货人名称" prop="receiverName">
            <el-input v-model="form.receiverName" placeholder="请输入" />
          </el-form-item>
        </div>
      </el-form>

      <!-- step2 添加货品 -->
      <div v-show="currStep === 2">
        <!-- 操作货品按钮 -->
        <div class="addGoodsBtns leftBtns" style="margin-left: 0">
          <el-button class="greenBtn normalBtn" @click="showAddDialog = true">添加货品</el-button>
          <el-button class="grayBtn normalBtn" @click="delGoods">删除货品</el-button>
        </div>
        <!-- 无数据显示 -->
        <NoGoods v-show="!addedGoods.length" />
        <!-- 已添加货品表格 -->
        <AddedGoodsTable v-show="addedGoods.length" ref="addedGoodsTable" />
      </div>

      <!-- btns -->
      <div ref="btns" class="centerBtns">
        <el-button v-show="currStep === 0" class="grayBtn biggerBtn" @click="back">返回</el-button>
        <el-button v-show="currStep !== 0" class="grayBtn biggerBtn" @click="toPrevious">上一步</el-button>
        <el-button v-show="currStep !== 2" class="yellowBtn biggerBtn" @click="checkToNext">下一步</el-button>
        <el-button v-show="currStep === 2" class="yellowBtn biggerBtn" @click="go">提交</el-button>
      </div>

      <!-- 添加货品弹窗 -->
      <AddGoodsDialog
        :visible.sync="showAddDialog"
        :search-params="goodsParams"
      />
    </div>
  </div>
</template>

<script>
import {
  getNextCodeAPI,
  getOwnerListAPI,
  getCarrierListAPI,
  getWareAreaListAPI,
  getWareHouseListAPI,
  getOutboundAPI } from '@/api/storageOut'
import AddGoodsDialog from './AddGoodsDialog.vue'
import NoGoods from '@/components/NoGoods/index.vue'
import AddedGoodsTable from './AddedGoodsTable.vue'
import { mapGetters } from 'vuex'
export default {
  components: { AddGoodsDialog, NoGoods, AddedGoodsTable },
  data() {
    return {
      /* 提交出库单相关 */
      nextCode: '',
      wareHouseList: [],
      ownerList: [],
      ownerListForSearch: [],
      ownerListLoading: false,
      wareAreaList: [],
      carrierList: [],
      form: {
        code: '',
        warehouseId: '',
        areaId: '',
        ownerId: '',
        type: '',
        remark: '',
        billCode: '',
        carrierId: '',
        planOutTime: '',
        driverName: '11',
        driverPhone: '13333333333',
        license: '11',
        receiverName: '11' // 收货人姓名
      },
      rules: {
        code: [{ required: true, trigger: 'blur', message: '必须' }],
        warehouseId: [{ required: true, trigger: 'blur', message: '必须' }],
        areaId: [{ required: true, trigger: 'blur', message: '必须' }],
        ownerId: [{ required: true, trigger: 'blur', message: '必须' }],
        type: [{ required: true, trigger: 'blur', message: '必须' }],
        billCode: [{ required: true, trigger: 'blur', message: '必须' }],
        carrierId: [{ required: true, trigger: 'blur', message: '必须' }],
        planOutTime: [{ required: true, trigger: 'blur', message: '必须' }],
        driverName: [{ required: true, trigger: 'blur', message: '必须' }],
        driverPhone: [{ required: true, trigger: 'blur', message: '必须' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, trigger: 'blur', message: '格式错误' }],
        license: [{ required: true, trigger: 'blur', message: '必须' }],
        receiverName: [{ required: true, trigger: 'blur', message: '必须' }]
      },

      /* 通用 */
      currStep: 0,
      showAddDialog: false
    }
  },
  computed: {
    goodsParams() {
      return {
        areaId: this.form.areaId,
        ownerId: this.form.ownerId
      }
    },
    isNew() {
      return this.$route.params.id === 'null'
    },
    ...mapGetters(['addedGoods', 'masterId'])
  },
  watch: {
    showAddDialog(val) {
      if (!val) {
        this.getAddedGoods()
      }
    }
  },
  async mounted() {
    await this.getOwnerList()
    await this.getWareHouseList()
    if (this.isNew) await this.getNextCode()
    else {
      await this.getExistBound()
      this.handleExistForm()
    }
  },
  methods: {
    /* 已存在的出库单查询简单信息 */
    async getExistBound() {
      const res = await getOutboundAPI(this.$route.params.id)
      this.form = res
    },
    /* 处理修改详情时已存在的表单 */
    handleExistForm() {
      // 处理货主
      const ownerName = this.ownerList.find((item) => item.id === this.form.ownerId).name
      this.remoteMethod(ownerName)
      // 处理库区
      this.dealWareChange(this.form.warehouseId)
    },
    /* 获取出库单号 */
    async getNextCode() {
      this.nextCode = await getNextCodeAPI()
      this.form.code = this.nextCode
    },
    /* 获取仓库列表 */
    async getWareHouseList() {
      this.wareHouseList = await getWareHouseListAPI()
    },
    /* 获取货主列表 */
    async getOwnerList() {
      this.ownerList = await getOwnerListAPI()
    },
    /* 获取库区列表 */
    async dealWareChange(warehouseId) {
      try {
        this.wareAreaList = await getWareAreaListAPI(warehouseId)
      } catch (error) {
        console.log(error)
        this.wareAreaList = []
      }
    },
    /* 获取承运商列表 */
    async getCarrierList() {
      this.carrierList = await getCarrierListAPI()
    },
    /* 提交/更新出库单 */
    async handleOutBound() {
      const finalForm = { ...this.form }
      finalForm.id = this.isNew ? 'null' : this.masterId
      finalForm.status = 1
      finalForm.ownerName = this.ownerList.find((item) => item.id === this.form.ownerId).name
      try {
        await this.$store.dispatch(
          this.isNew
            ? 'storageOut/addNewBound'
            : 'storageOut/updateExistBound',
          finalForm)
        this.$message.success(`${this.isNew ? '新增' : '修改'}出货单成功`)
      } catch (error) {
        this.currStep--
        this.$message.error(`${this.isNew ? '新增' : '修改'}出货单失败`)
      }
    },
    // /* 修改出库单 */
    // async updateOutbound() {
    //   const finalForm = { ...this.form }
    //   finalForm.id = this.masterId
    //   finalForm.status = 1
    //   finalForm.ownerName = this.ownerList.find((item) => item.id === this.form.ownerId).name
    //   try {
    //     await this.$store.dispatch('storageOut/updateExistBound', finalForm)
    //     this.$message.success('修改出货单成功')
    //   } catch (error) {
    //     this.currStep--
    //     this.$message.error('修改出货单失败')
    //   }
    // },
    /* 根据出库单编号获取已添加的货品详情 */
    async getAddedGoods() {
      await this.$store.dispatch('storageOut/getAddedGoods', { masterId: this.masterId })
    },
    /* 货主下拉框搜索 */
    remoteMethod(query) {
      if (query !== '') {
        this.ownerListForSearch = this.ownerList.filter(item => {
          return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
                        item.id.toLowerCase().indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.options = []
      }
    },

    /**
     * btns functions
     */
    /* 修复element btn 点击后样式bug */
    clearBtns() {
      this.$refs.btns.children.forEach((btn) => btn.blur())
    },
    /* 校验并回调 方法 */
    async valiAndCb(valiArr, cb = () => {}) {
      let res = true
      this.$refs.form.validateField(
        valiArr, (errMsg) => { if (errMsg) res = false })
      if (res) {
        await cb()
        this.currStep++
        // cbs.forEach((item) => item())
      } else { this.$message.error('校验失败，请检查') }
    },
    /* 点击下一页 */
    async checkToNext() {
      this.clearBtns()
      const valiArr1 = ['code', 'warehouseId', 'areaId', 'ownerId', 'type']
      const valiArr2 = ['billCode', 'carrierId', 'planOutTime', 'driverName', 'driverPhone', 'license', 'receiverName']
      if (this.currStep === 0) {
        return this.valiAndCb(valiArr1, this.getCarrierList)
      }
      if (this.currStep === 1) {
        await this.valiAndCb(valiArr2, this.handleOutBound)
        await this.$refs.addedGoodsTable.getGoodsList()
        return
      }
    },
    /* 点击上一页 */
    toPrevious() {
      this.clearBtns()
      this.currStep--
    },
    /* 点击返回上一个路由 */
    back() {
      this.clearBtns()
      this.$router.back()
    },
    /* 点击提交按钮 */
    go() {
      this.$router.push({
        name: 'ListOut'
      })
    },
    /* 点击删除商品 */
    delGoods() {}
  }
}
</script>

<style lang="scss">
.addOrEdit{
  .steps {
    margin: 56px 290px 50px;
    .is-success{
        color: #FFB200FF;
        border-color: #FFB200FF;
      }
  }
  .outboundForm{
    .step0{
      .el-form-item {
        width: 32%;
      }
    }
    .step1{
      .el-form-item {
        width: 24%;
      }
    }
    .el-form-item {
      .el-select{
        width: 100%;
      }
      .el-date-editor{
        width: 100%;
      }
      .el-form-item__label{
        line-height: 18px;
        padding-bottom: 10px;
        padding-left: 5px;
        font-size: 12px;
        font-family: PingFangSC,PingFangSC-Medium;
        font-weight: 500;
        color: #887e7e;
      }

    }

  }
}

</style>
