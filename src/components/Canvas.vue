<template>
  <div ref="preview" class="preview" @dragenter="onDragEnter" @dragover="onDragOver" @drop="onDrop" @click="clickPreview">
    <component
      v-for="item in components"
      :key="item.id"
      :is="item.component || item.name"
      :ref="item.id"
      :data-id="item.id"
    ></component>
  </div>
</template>

<script>
import guid from '@/utils/guid'

export default {
  name: 'Preview',
  components: {
  },
  data() {
    return {
      // 组件树
      components: [
      ],
      // 组件列表
      compList: [],
      insertPos: {
        position: '',
        component: ''
      },
      selectedComp: {}
    }
  },
  mounted() {
    // console.log(this.$refs.div) // eslint-disable-line
    //拖动放置位置的虚线框位置计算
    document.addEventListener('drag', this.onDrag, false)

    document.addEventListener('dragend', this.onDragEnd, false)
  },
  methods: {
    onDrag(e) {
      let {
          left,
          right,
          top,
          bottom
      } = this.$refs.preview.getBoundingClientRect()
      let x = e.clientX,
          y = e.clientY

      // 鼠标在画布内就添加占位框
      if (x > left && x < right && y > top && y < bottom && !document.querySelector('#placeholder')) {
        this.setPlaceholder()
      }

      // 鼠标在预览视图中的相对坐标
      // let preview = this.$refs.preview
      // let x = e.clientX - left,
      //     y = e.clientY - top + preview.scrollTop
      
      // 遍历组件列表，确定占位框相对于组件的位置
      this.components.forEach(component => {
        this.position(component, x, y)
      })
    },
    onDragEnd() {
      this.removePlaceholder()
    },
    onDragEnter(e) {
      e.preventDefault()
      e.stopPropagation()
      return true
    },
    onDragOver(e) {
      e.preventDefault()
      e.stopPropagation()

      return true;
    },
    onDrop() {
      // TODO
      // console.log(e) // eslint-disable-line
      // 找到占位框所在的父组件
      const placeholder = document.querySelector('#placeholder')
      const parentEl = placeholder.parentNode
      const parentComp = this.compList.find(comp => comp.el === parentEl)

      // 获得被拖曳的组件
      const element = Object.assign({}, window.element)
      element.id = guid()

      if (parentComp) { // 存在父组件，非最外层
        element.parentId = parentComp.id
        parentComp.children = parentComp.children || []
        const children = parentComp.children

        // 控制组件的顺序
        const index = children.findIndex(comp => comp.id === (this.insertPos.component || {}).id)
        console.log('inner', index, this.insertPos.position)
        if (index === -1 || this.insertPos.position === 'inner') {
          children.push(element)
        } else {
          switch(this.insertPos.position) {
            case 'top':
              children.splice(index, 0, element)
              break
            case 'left':
              children.splice(index, 0, element)
              break
            case 'bottom':
              children.splice(index + 1, 0, element)
              break
            case 'right':
              children.splice(index + 1, 0, element)
              break
          }
        }

        const parentInstance = this.$refs[parentComp.id][0]
        // parentInstance.$slots.default = children.map(child =>
        //   this.$createElement(child.component || child.name, {
        //     attrs: {
        //       'data-id': child.id
        //     },
        //     ref: child.id,
        //     refInFor: true
        //   })
        // )
        // parentInstance.$mount()
        parentInstance.children = children
        parentInstance.$forceUpdate()
      } else { // 最外层
        const index = this.components.findIndex(comp => comp.id === (this.insertPos.component || {}).id)
        console.log('outer', index, this.insertPos.position)
        if (index === -1 || !this.insertPos.position) { // 画布为空或放到画布的最后面
          this.components.push(element)
        } else {
          switch(this.insertPos.position) {
            case 'top':
              this.components.splice(index, 0, element)
              break
            case 'left':
              this.components.splice(index, 0, element)
              break
            case 'bottom':
              this.components.splice(index + 1, 0, element)
              break
            case 'right':
              this.components.splice(index + 1, 0, element)
              break
          }
        }
      }
      this.compList.push(element)
      this.$nextTick(() => {
        element.el = this.$refs.preview.querySelector(`[data-id="${element.id}"]`)
      })

      // destroy
      window.element = null
      this.removePlaceholder()
      // 清空位置信息
      this.insertPos = {
        position: '',
        component: ''
      }
    },

    position(component, x, y) {
      let {
          left,
          right,
          top,
          bottom
      } = component.el.getBoundingClientRect()

      let offset = 5
          //不在当前元素位置内
      if (!(x > left && x < right && y > top && y < bottom)) {
          return
      }
      //上方
      if (y > top && y < top + offset) {
          this.setPlaceholder('top', component)
          return
      }
      //右方
      if (x < right && x > right - offset) {
          this.setPlaceholder('right', component)
          return
      }
      //下方
      if (y < bottom && y > bottom - offset) {
          this.setPlaceholder('bottom', component)
          return
      }
      //左方
      if (x > left && x < left + offset) {
          this.setPlaceholder('left', component)
          return
      }
      // 在组件内部
      this.setPlaceholder('inner', component) // 先往父组件中添加占位框
      // const children = this.components.filter(child => child.parentId === component.id)
      const children = component.children
      if (children && children.length) { // 对内部子组件进行位置判别
        children.forEach((child) => {
          this.position(child, x, y)
        })
      }
    },

    setPlaceholder(position, component) {
      // console.log(position, component)
      // 保存位置信息
      this.insertPos = {
        position,
        component
      }

      const placeholder = document.querySelector('#placeholder') || document.createElement('div')
      placeholder.id = 'placeholder'
      placeholder.classList.remove('inline')

      if (!position) {
        this.$refs.preview.appendChild(placeholder)
      } else {
        switch(position) {
          case 'top':
            component.el.parentNode.insertBefore(placeholder, component.el)
            break
          case 'bottom':
            component.el.parentNode.insertBefore(placeholder, component.el.nextSibling)
            break
          case 'left':
            placeholder.classList.add('inline')
            component.el.parentNode.insertBefore(placeholder, component.el)
            break
          case 'right':
            placeholder.classList.add('inline')
            component.el.parentNode.insertBefore(placeholder, component.el.nextSibling)
            break
          case 'inner':
            component.el.appendChild(placeholder)
            break
        }
      }
    },
    removePlaceholder() {
      const placeholder = document.querySelector('#placeholder')
      placeholder && placeholder.parentNode.removeChild(placeholder)
    },

    getComponentNode(node) {
      if (node && node.getAttribute('data-id') !== null)
        return node
      else {
        if (node.parentElement)
          return this.getComponentNode(node.parentElement)
        else
          return false
      }

    },
    clickPreview(e) {
      e.preventDefault()
      let target = e.target

      const selectedDOM = document.querySelector('#selected-dom') || document.createElement('div')
      selectedDOM.id = 'selected-dom'
      let componentHTML = this.getComponentNode(target)
      if (componentHTML) {
          //添加选中效果
          const { left, top, width, height } = componentHTML.getBoundingClientRect()
          selectedDOM.style.left = left - 2 + 'px';
          selectedDOM.style.top = top - 2 + 'px';
          selectedDOM.style.width = width + 4 + 'px';
          selectedDOM.style.height = height + 4 + 'px';
          document.body.appendChild(selectedDOM)

          this.selectedComp = this.compList.find(comp => comp.id.toString() === componentHTML.getAttribute('data-id') )

          //保存到vuex
          // let currentId = componentHTML.id
          // let component = this.components.find(component => component.info.id === currentId)
          // if (component)
          //     this.$store.commit('setState', {
          //         currentComponent: component
          //     })
      } else {
        selectedDOM.style.left = '-99999px'
      }
    }

  },
}
</script>

<style lang="scss">
.preview {
  position: relative;
  height: 500px;
  padding: 10px;
  border: 1px dashed #333;
  text-align: left;
  overflow: auto;
}
#placeholder, .placeholder {
  border: 1px dashed #333;
  height: 50px;

  &.inline {
    display: inline-flex;
    width: 100px;
    vertical-align: top;
  }
}

#selected-dom {
  box-sizing: border-box;
  position: absolute;
  border: 1px dashed #333;
}
</style>
