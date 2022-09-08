<template>
  <div class="searchBox">
    <el-form ref="form" inline :model="form" class="searchForm">
      <el-form-item v-for="option, index in formOption" :key="index" :label="option.label">
        <el-input v-model="form[option.key]" placeholder="请输入" />
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button type="primary" @click="onSubmit">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListOut',
  props: {
    formOption: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {

      }
    }
  }
}
</script>

<style scoped>
.searchBox{
  display: flex;
  width: 100%;
}
</style>
