<template>
  <div class="noGoods">
    <div class="center">
      <img src="@/assets/img/noGoods.png" alt="">
      <div>暂无商品</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.noGoods{
  width: 100%;
  height: 384px;
  display: flex;
  border-top: 1px solid #f5efee;
  margin-top: 20px;
  color: #b5abab;
  .center{
    margin: auto;
    text-align: center;
  }
  img{
    width: 160px;
    height: 160px;
    margin-bottom: 10px;
  }

}

</style>
