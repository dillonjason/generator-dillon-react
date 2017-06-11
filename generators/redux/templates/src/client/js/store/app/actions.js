import { ACTIONS } from './action_types'

export function dataLoaded (data) {
  return {
    type: ACTIONS.DATA_LOADED,
    data
  }
}
<% if (useSaga) {%>export function fetchInitData () {
  return {
    type: ACTIONS.FETCH_INIT_DATA
  }
}<%}%>
