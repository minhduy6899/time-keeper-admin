import { TOGGLE_SIDE_BAR } from '../constants/sidebarConstant'

export const toggleSideBar = (value) => async (dispatch) => {
  dispatch({
    type: TOGGLE_SIDE_BAR,
    payload: value,
  })
}
