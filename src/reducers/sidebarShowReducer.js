import { TOGGLE_SIDE_BAR } from '../constants/sidebarConstant'

const initialState = {
  sidebarShow: true,
}

export const changeState = (state = initialState, action) => {
  console.log('co vao day kong')
  switch (action.type) {
    case TOGGLE_SIDE_BAR:
      return { ...state, sidebarShow: action.payload }
    default:
      return state
  }
}
