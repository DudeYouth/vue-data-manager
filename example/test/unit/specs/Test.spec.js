import Test from '@/components/Test.vue'
import {mount} from 'vue-test-utils'

describe('check Test.vue', () => {
  const wrapper = mount(Test)
  const vm = wrapper.vm
  test('check list', () => {
    vm.getData()
    expect(vm.list).toEqual([1, 2, 3, 4, 5])
  })
  test('检查list是否被渲染', () => {
    expect(wrapper.text()).toContainEqual('1')
  })
})
