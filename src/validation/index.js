'use strict'

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import dictionary from './dictionary'

VeeValidate.Validator.updateDictionary(dictionary)
Vue.use(VeeValidate)
