<template>
  <div class="searchBox cardBox">
    <el-form ref="form" inline :model="form" class="searchForm" label-position="top">
      <el-form-item v-for="option, index in formOption" :key="index" :label="option.label" class="formItem" size="medium">
        <el-input v-model="form[option.key]" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div ref="btns" class="btns">
      <el-button class="yellowBtn normalBtn" @click="apply">搜索</el-button>
      <el-button class="grayBtn normalBtn" @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  props: {
    formOption: {
      type: Array,
      required: true
    },
    /* 注意定义此方法时设置形参，执行时会传入data里的form */
    searchFunc: {
      type: Function,
      default: () => {
        console.log('没有设置搜索方法')
      }
    },
    resetFunc: {
      type: Function,
      default: () => {
        console.log('没有设置重置方法')
      }
    }
  },
  data() {
    return {
      form: {}
    }
  },
  mounted() {
    /* 根据formOption挂载响应式数据 */
    this.formOption.forEach((option) => {
      this.$set(this.form, option.key, '')
    })
  },
  methods: {
    /* 处理elementBtn点击后不还原的bug */
    blurBtn() {
      this.$refs.btns.children.forEach((btn) => btn.blur())
    },
    apply() {
      this.blurBtn()
      this.searchFunc(this.form)
    },
    reset() {
      this.blurBtn()
      this.defaultReset()
      this.resetFunc()
    },

    /* 可以通过ref直接调用默认重置，不进行额外操作 */
    defaultReset() {
      Object.keys(this.form).forEach((key) => { this.form[key] = '' }) // 清空
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/searchBox.scss'
</style>
