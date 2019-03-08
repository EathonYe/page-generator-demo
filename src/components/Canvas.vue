<template>
  <div ref="preview" class="preview" @dragenter="onDragEnter" @dragover="onDragOver" @drop="onDrop">
    <component v-for="item in list" :key="item.id" :is="item.component || item.name" :list="item.list"></component>
  </div>
</template>

<script>
export default {
  name: 'Preview',
  components: {
  },
  data() {
    return {
      list: [
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
          const placeholder = document.createElement('div')
          placeholder.id = 'placeholder'
          this.$refs.preview.appendChild(placeholder)
        }

            //鼠标在预览视图中的相对坐标
            // console.log(e.clientX,e.clientY)
        // let preview = this.$refs.preview
        // let x = e.clientX - left,
        //     y = e.clientY - top + preview.scrollTop
        // this.components.filter(component => !component.parentId).forEach(component => {
        //     let {
        //         offsetLeft,
        //         offsetTop,
        //         offsetRight,
        //         offsetBottom
        //     } = component.position

        //     let offset = 5
        //         //不在当前元素位置内
        //     if (!(x > offsetLeft && x < offsetRight && y > offsetTop && y < offsetBottom)) {
        //         return
        //     }
        //     //上方
        //     if (y > offsetTop && y < offsetTop + offset) {
        //         this.setPlaceholder('上方', component)
        //         return
        //     }
        //     //右方
        //     if (x < offsetRight && x > offsetRight - offset) {
        //         this.setPlaceholder('右方', component)
        //         return
        //     }
        //     //下方
        //     if (y < offsetBottom && y > offsetBottom - offset) {
        //         this.setPlaceholder('下方', component)
        //         return
        //     }
        //     //左方
        //     if (x > offsetLeft && x < offsetLeft + offset) {
        //         this.setPlaceholder('左方', component)
        //         return
        //     }
        // })
    }

    document.ondragend = () => {
      document.querySelector('#placeholder').parentNode.removeChild(document.querySelector('#placeholder'))
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
      // document.querySelector('#placeholder').parentNode.removeChild(document.querySelector('#placeholder'))
    }
  },
}
</script>

<style lang="scss">
.preview {
  height: 500px;
  border: 1px dashed #333;
}
#placeholder {
  border: 1px dashed #333;
  height: 50px;
}
</style>
