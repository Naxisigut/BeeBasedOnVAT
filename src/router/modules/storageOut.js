import Layout from '@/layout'
/* 出库管理 */
export default
{
  path: '/manage-storage-out',
  component: Layout,
  redirect: '/manage-storage-out/list-out',
  name: 'StorageOut',
  meta: { title: '出库管理', icon: 'icon_menu_ckgl_nor-1' },
  children: [
    {
      path: 'list-out',
      name: 'ListOut',
      component: () => import('@/views/storageOut/ListOut'),
      meta: { title: '出库单', icon: 'table' }
    },
    {
      path: 'task-picking',
      name: 'TaskPicking',
      component: () => import('@/views/storageOut/TaskPicking'),
      meta: { title: '拣货任务', icon: 'table' }
    },
    {
      path: 'manage-task-transfer',
      name: 'TaskTransfer',
      component: () => import('@/views/storageOut/TaskTransfer'),
      meta: { title: '交接任务', icon: 'table' }
    }
  ]
}
