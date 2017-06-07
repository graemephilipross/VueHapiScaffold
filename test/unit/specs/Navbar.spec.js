import Vue from 'vue'
import Navbar from 'src/components/Navbar'

describe('Navbar.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Navbar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('p').textContent)
      .to.equal('Create / Package')
  })
})
