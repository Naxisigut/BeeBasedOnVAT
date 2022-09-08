import Layout from '@/layout'
/* 入库管理 */
export default {
  path: '/manage-storage-in',
  component: Layout,
  redirect: '/manage-storage-in/list-in',
  name: 'StorageIn',
  meta: { title: '入库管理', icon: 'icon_menu_rkgl_nor-1' },
  children: [
    {
      path: 'list-in',
      name: 'ListIn',
      component: () => import('@/views/storageIn/components/ListIn.vue'),
      meta: { title: '入库单', icon: 'table' }
    },
    {
      path: 'task-receive',
      name: 'TaskReceive',
      component: () => import('@/views/storageIn/components/TaskReceive.vue'),
      meta: { title: '收货任务', icon: 'table' }
    },
    {
      path: 'task-add',
      name: 'TaskAdd',
      component: () => import('@/views/storageIn/components/TaskAdd.vue'),
      meta: { title: '上架任务', icon: 'table' }
    }
  ]
}
