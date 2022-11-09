import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  CHANGE_PAGE_PAGINATION,
} from '../constants/orderConstant'

import axios from 'axios'

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('@token'),
      },
    }
    const { data } = await axios.post(
      'https://timekeeper-back-end.herokuapp.com/orders',
      order,
      config,
    )

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error,
    })
  }
}

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST })

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('@token'),
      },
    }

    const { data } = await axios.get('https://timekeeper-back-end.herokuapp.com/orders/me', config)

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error,
    })
  }
}

export function changePagePagination(value) {
  return {
    type: CHANGE_PAGE_PAGINATION,
    payload: value,
  }
}

// Get All Orders (admin)
export const getAllOrders = (maxPrice) => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/orders?maxPrice=${maxPrice}`)

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders })
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response,
    })
  }
}

// Update Order
export const updateOrder = (id, order) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ORDER_REQUEST })
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.put(`http://localhost:5000/orders/${id}`, order, config)

    dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response,
    })
  }
}

// Delete Order
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST })

    const { data } = await axios.delete(`http://localhost:5000/orders/${id}`)

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.message })
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST })

    const { data } = await axios.get(`http://localhost:5000/order/${id}`)

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    })
  }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
