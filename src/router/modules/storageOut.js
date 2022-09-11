import Layout from '@/layout'
/* 出库管理 */
export default
{
  path: '/manage-storage-out',
  component: Layout,
  redirect: '/manage-storage-out/list-out',
  name: 'StorageOut',
  meta: { title: '出库管理', icon: 'icon_menu_ckgl_nor-1', alwaysShow: true },
  children: [
    {
      path: 'list-out',
      name: 'ListOut',
      component: () => import('@/views/storageOut/ListOut'),
      // alwaysShow: true, // 开启后会有展开箭头
      meta: { title: '出库单', icon: 'table' },
      children: [
        {
          path: 'list-detail/:id',
          name: 'ListDetail',
          component: () => import('@/views/storageOut/ListOut/children/ListDetail'),
          hidden: true,
          meta: { title: '出库单详情', icon: 'table' }
        }
        // {
        //   path: 'list-detail/:id',
        //   name: 'ListDetailEdit',
        //   component: () => import('@/views/storageOut/ListOut/children/ListDetailEdit'),
        //   hidden: true,
        //   meta: { title: '出库单详情编辑', icon: 'table' }
        // }
      ]
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
