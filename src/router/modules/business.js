/* 商务管理 */
import Layout from '@/layout'

export default
{
  path: '/manage-business',
  component: Layout,
  redirect: '/manage-business/goods-owner',
  name: 'Business',
  meta: { title: '商务管理', icon: 'icon_menu_sygl_nor-1' },
  children: [
    {
      path: 'goods-owner',
      name: 'goods-owner',
      component: () => import('@/views/business/components/GoodsOwner.vue'),
      meta: { title: '货主管理', icon: 'table' }
    },
    {
      path: 'task-picking',
      name: 'task-picking',
      component: () => import('@/views/business/components/TaskPicking.vue'),
      meta: { title: '承运商管理', icon: 'table' }
    }
  ]
}
