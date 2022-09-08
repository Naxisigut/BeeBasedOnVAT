
import Layout from '@/layout'

/* 库内管理 */

export default

{
  path: '/manage-storage',
  component: Layout,
  redirect: '/manage-storage/list',
  name: 'Storage',
  meta: { title: '库内管理', icon: 'icon_menu_kngl_nor-1' },
  children: [
    {
      path: 'list',
      name: 'List',
      component: () => import('@/views/storage/components/StorageList.vue'),
      meta: { title: '盘点单', icon: 'table' }
    },
    {
      path: 'list-task',
      name: 'ListTask',
      component: () => import('@/views/storage/components/ListTask.vue'),
      meta: { title: '盘点任务', icon: 'table' }
    },
    {
      path: 'storage-lose-profit',
      name: 'LoseProfit',
      component: () => import('@/views/storage/components/ListTask.vue'),
      meta: { title: '库存损益', icon: 'table' }
    },
    {
      path: 'latest-storage',
      name: 'LatestStorage',
      component: () => import('@/views/storage/components/LatestStorage.vue'),
      meta: { title: '实时库存', icon: 'table' }
    }

  ]
}
