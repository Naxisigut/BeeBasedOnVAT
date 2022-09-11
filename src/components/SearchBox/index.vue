<template>
  <div class="searchBox cardBox">
    <el-form ref="form" inline :model="form" class="searchForm" label-position="top">
      <el-form-item v-for="option, index in formOption" :key="index" :label="option.label" class="formItem" size="medium">
        <el-input v-model="form[option.key]" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div ref="btns" class="btns">
      <el-button class="yellowBtn" @click="apply">搜索</el-button>
      <el-button class="grayBtn" @click="reset">重置</el-button>
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
      form: {},
      defaultForm: {}
    }
  },
  mounted() {
    /* 根据formOption挂载响应式数据 */
    this.formOption.forEach((option) => {
      this.$set(this.form, option.key, '')
    })
    this.defaultForm = { ...this.form }
  },
  methods: {
    /* 处理elementBtn点击后不还原的bug */
    blurBtn() {
      this.$refs.btns.children.forEach((btn) => btn.blur())
    },
    apply() {
      this.searchFunc()
      this.blurBtn()
    },
    reset() {
      this.blurBtn()
      this.resetFunc()
      this.form = { ...this.defaultForm }
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/searchBox.scss'
</style>
