<template>
  <div class="goodsTable">
    <div class="infoTip">合计：
      <span style="color:#FFB200FF">{{ num }}个</span> 货品
      总体积 <span style="color:#FFB200FF">{{ vol }}m<sup>3</sup></span>
    </div>
    <el-table
      border
      fit
      stripe
      header-row-class-name="headerClass"
      :data="goodsList"
      class="goodsTable"
      @selection-change="handleSelChange"
    >
      <!-- <el-scrollbar style="width: 500px; height: 300px;"> -->
      <el-table-column
        align="center"
        type="selection"
        width="64"
      />
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
        width="120"
      />

      <el-table-column
        label="发货数量"
        prop="outboundNum"
        width="160"
        align="center"
        class-name="colClass"
      >
        <template v-slot="{row}">
          <div>
            <span>{{ row.outboundNum }}</span>
            <el-input
              v-model="row.outboundNum"
              class="tableEdit"
              style="width: 60%; display: none;"
            />
            <i
              class="el-icon-edit iStyle"
              @click="editNum($event, row)"
            />
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        width="160"
        align="center"
        class-name="colClass"
      >
        <template>
          <a
            href="javasript:;"
            style="color: #FFB200FF"
            @click="$message('待完善')"
          >删除</a>
        </template>
      </el-table-column>
      <!-- </el-scrollbar> -->
    </el-table>
  </div>
</template>

<script>
import { changeNumAPI } from '@/api/storageOut'
import { mapGetters } from 'vuex'
export default {
  props: {
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
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
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  computed: {
    goodsList() {
      return this.$store.getters.addedGoods
    },
    ...mapGetters(['masterId']),
    num() {
      return this.goodsList.reduce((curr, item) => curr + (+item.outboundNum), 0)
    },
    vol() {
      const temp = this.goodsList.reduce((curr, item) => curr + item.outboundNum * item.goodsVolume, 0)
      return temp.toFixed(1)
    }
  },
  methods: {
    handleSelChange(selection) {
      this.$emit('update:selectedList', selection)
    },
    async getGoodsList() {
      const params = {
        size: this.pageInfo.pageSize,
        current: this.pageInfo.currentPage,
        masterId: this.masterId
      }
      this.$store.dispatch('storageOut/getAddedGoods', params)
    },
    async changeGoodsNum(params) {
      await changeNumAPI(params)
    },

    /* 点击操作时切换显示输入框且发送请求 */
    async editNum(e, { outboundNum, id }) {
      const num = e.target.parentNode.children[0]
      const ipt = e.target.parentNode.children[1]
      const icon = e.target
      icon.classList.toggle('el-icon-edit')
      icon.classList.toggle('el-icon-check')
      /* 控制两个元素的显隐 */
      if (num.style.display !== 'none') {
        num.style.display = 'none'
        ipt.style.display = 'inline-block'
        ipt.querySelector('input').focus()
      } else {
        /* 非0判断 */
        try {
          num.style.display = 'inline'
          ipt.style.display = 'none'
          if (+outboundNum) {
            await this.changeGoodsNum({ outboundNum, id })
          } else {
            this.$message.warning('不能修改数量为0！请直接删除')
          }
        } catch (error) {
          console.log('error =', error)
        } finally {
          await this.$store.dispatch('storageOut/updateAddedGoods')
        }
      }
    }
  }
}
</script>

<style lang="scss">
.super{
  vertical-align: text-top;
  font-size: 12px;
  color: red;
}
.iStyle{
  color:#FFB200FF;
  float: right;
  margin-top: 5px;
}
.tableEdit{
  .el-input__inner{
    height: 22px;
    line-height: 22px;
  }
}
.editingCell{
  span{
    display: none;
  }
}
.noEditingCell{
  div{
    display: none;
  }
}
</style>
