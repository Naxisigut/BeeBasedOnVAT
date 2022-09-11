<template>
  <div :class="{'has-logo':showLogo}" class="sideBar">
    <logo v-if="showLogo" :collapse="false" />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="midItems">
      <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <Logout />
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Logout from './Logout.vue'

export default {
  components: { SidebarItem, Logo, Logout },
  computed: {
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    }
  },
  mounted() {
    console.log('this.routes =', this.routes)
  }
}
</script>

<style scoped >
  .sideBar{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #fff;
  }
  .midItems{
    flex: 1;
  }
</style>
