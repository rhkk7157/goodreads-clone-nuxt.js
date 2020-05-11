import Vue from 'vue'
import moment from 'moment-timezone'

moment.locale('ko')

Vue.filter('YYYYMMDD', (value) => {
  if (!value) return ''

  return moment(String(value)).format('YYYY-MM-DD HH:mm:ss')
})

Vue.filter('KR_YYYYMMDD', (value) => {
  if (!value) return ''

  return moment(String(value))
    .tz('Asia/Seoul')
    .format('YYYY-MM-DD HH:mm:ss')
})
