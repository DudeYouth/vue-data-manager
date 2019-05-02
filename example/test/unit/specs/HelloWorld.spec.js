import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'
import {mount} from 'vue-test-utils'

describe('HelloWorld.vue', () => {
  let test = () => {
    return true
  }
  it('should render correct contents', () => {
    const com = mount(HelloWorld)
    console.log(com.text())
    expect(com.text())
      .toEqual('231312')
  })
})
