import Vue from 'vue'
import {
  MdCore,
  MdInputContainer,
  MdButton,
  MdRadio,
  MdIcon,
  MdCheckbox,
  MdDialog,
  MdBackdrop,
  MdSelect,
  MdMenu,
  MdList,
  MdTable,
  MdToolbar,
  MdWhiteframe,
  MdCard
} from 'vue-material'

Vue.use(MdCore)
Vue.use(MdInputContainer)
Vue.use(MdButton)
Vue.use(MdRadio)
Vue.use(MdIcon)
Vue.use(MdCheckbox)
Vue.use(MdDialog)
Vue.use(MdBackdrop)
Vue.use(MdSelect)
Vue.use(MdMenu)
Vue.use(MdList)
Vue.use(MdTable)
Vue.use(MdToolbar)
Vue.use(MdWhiteframe)
Vue.use(MdCard)

Vue.material.registerTheme({
  buttons: {
    primary: {
      color: 'green',
      hue: 'A700'
    },
    accent: {
      color: 'blue-grey',
      hue: '600'
    }
  }
})
