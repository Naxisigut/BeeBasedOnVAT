<template>
  <div class="logout">
    <img src="@/assets/icons/img_touxiang_small.svg" alt="">
    <div>{{ name }}</div>
    <div class="divide" />
    <a href="javascript:;" @click="logout"><SvgIcon icon-class="btn_quite" /></a>
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mapGetters } from 'vuex'
export default {
  components: { SvgIcon },
  computed: {
    ...mapGetters(['name'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped >
  .divide{
    border-right: 1px solid #DFDBDB;
    color: #DFDBDB;
    width: 0;
    height: 16px;
  }
.logout{
  width: 100%;
  display: flex;
  height: 65px;
  border-top: 1px solid rgb(245, 239, 238);
  justify-content: space-evenly;
  font-size: 14px;
  align-items: center;
  padding: 0 35px;
}
img{
  border-radius: 50%;

}
a{
  font-size: 20px;
  width: auto !important ;
}
</style>
