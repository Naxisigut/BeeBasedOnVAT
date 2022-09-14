export default {
  bind(el) {
    const num = el.children[0]
    const ipt = el.children[1]
    const icon = el.children[2]
    function toggle() {
      icon.classList.toggle('el-icon-edit-outline')
      icon.classList.toggle('el-icon-check')
      /* 控制两个元素的显隐 */
      if (num.style.display !== 'none') {
        num.style.display = 'none'
        ipt.style.display = 'inline-block'
        ipt.querySelector('input').focus()
      } else {
        /* 非0判断 */
        num.style.display = 'inline'
        ipt.style.display = 'none'
      }
    }

    el.addEventListener('click', (e) => {
      if (e.target.tagName === 'I') toggle()
    })
  }
}
