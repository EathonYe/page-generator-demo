<template>
  <div ref="preview" class="preview" @dragenter="onDragEnter" @dragover="onDragOver" @drop="onDrop">
    <!-- <div class="placeholder inline"></div> -->
    <component
      v-for="item in components"
      :key="item.id"
      :is="item.component || item.name"
      :list="item.list"
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
      components: [
      ]
    }
  },
  mounted() {
    // console.log(this.$refs.btn) // eslint-disable-line
    //拖动放置位置的虚线框位置计算
    document.ondrag = e => {
        let {
            left,
            right,
            top,
            bottom
        } = this.$refs.preview.getBoundingClientRect()

        if (e.clientX > left && e.clientX < right && e.clientY > top && e.clientY < bottom && !document.querySelector('#placeholder')) {
          this.setPlaceholder()
        }


        //鼠标在预览视图中的相对坐标
        // let preview = this.$refs.preview
        // let x = e.clientX - left,
        //     y = e.clientY - top + preview.scrollTop
        let x = e.clientX,
            y = e.clientY
        this.components.filter(component => !component.parentId).forEach(component => {
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
        })
    }

    document.ondragend = () => {
      this.removePlaceholder()
    }
  },
  methods: {
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
    onDrop(e) {
      console.log(e) // eslint-disable-line
      this.removePlaceholder()
      const element = Object.assign({}, window.element)
      element.id = guid()
      this.components.push(element)
      window.element = null
      this.$nextTick(() => {
        element.el = this.$refs.preview.querySelector(`[data-id="${element.id}"]`)
      })
    },

    setPlaceholder(position, component) {
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
        }
      }
    },
    removePlaceholder() {
      const placeholder = document.querySelector('#placeholder')
      placeholder && placeholder.parentNode.removeChild(placeholder)
    }
  },
}
</script>

<style lang="scss">
.preview {
  height: 500px;
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
</style>
