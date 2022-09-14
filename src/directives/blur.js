export default {
  bind(el) {
    const btns = el.querySelectorAll('button')
    el.addEventListener('click', () => {
      btns.forEach((item) => item.blur())
    })
  }
}
