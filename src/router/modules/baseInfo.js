
import Layout from '@/layout'

/* 基础信息管理 */
export default {
  path: '/manage-base-info',
  component: Layout,
  redirect: '/manage-base-info/warehouse',
  name: 'BaseInfo',
  meta: { title: '基础信息管理', icon: 'icon_menu_jcgl_nor-1' },
  children: [
    {
      path: 'warehouse',
      name: 'WareHouse',
      component: () => import('@/views/baseInfo/components/WareHouse.vue'),
      meta: { title: '仓库管理', icon: 'table' }
    },
    {
      path: 'area',
      name: 'Area',
      component: () => import('@/views/baseInfo/components/AreaManage.vue'),
      meta: { title: '库区管理', icon: 'table' }
    },
    {
      path: 'location',
      name: 'Location',
      component: () => import('@/views/baseInfo/components/LocationManage.vue'),
      meta: { title: '库位管理', icon: 'table' }
    },
    {
      path: 'location-view',
      name: 'LocationView',
      component: () => import('@/views/baseInfo/components/LocationView.vue'),
      meta: { title: '库位视图', icon: 'table' }
    },
    {
      path: 'goods',
      name: 'Goods',
      component: () => import('@/views/baseInfo/components/GoodsManage.vue'),
      meta: { title: '货品管理', icon: 'table' }
    },
    {
      path: 'goods-type',
      name: 'GoodsType',
      component: () => import('@/views/baseInfo/components/GoodsType.vue'),
      meta: { title: '货物类型管理', icon: 'table' }
    }
  ]
}
