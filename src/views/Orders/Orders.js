import React, { Fragment, useCallback, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import './orders.scss'
import { DELETE_PRODUCT_RESET, PRODUCT_DETAILS_RESET } from '../../constants/productConstant'
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
} from '../../actions/productAction'
import { Button, Pagination, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import ModalCreateProduct from '../modal/product/ModalCreateProduct'
import ModalEditProduct from '../modal/product/ModalEditProduct'
import BasicAlerts from '../Alert/Alert'
import { Box, Grid } from '@material-ui/core'
import {
  changePagePagination,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
} from 'src/actions/orderAction'
import { DELETE_ORDER_RESET } from 'src/constants/orderConstant'
import ModalCreateOrder from '../modal/order/ModalCreateOrder'
import ModalEditOrder from '../modal/order/ModalEditOrder'

export default function Orders() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, orders, loading, currentPage } = useSelector((state) => state.allOrdersReducer)
  const { error: deleteError, isDeleted } = useSelector((state) => state.orderReducer)
  const {
    error: getOrderError,
    order,
    loading: getOrderLoading,
  } = useSelector((state) => state.orderDetailsReducer)
  const { error: createErorr, success } = useSelector((state) => state.newProductReducer)

  const [openModalCreateProduct, setOpenModalCreateProduct] = useState(false)
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [productId, setProductId] = useState('')
  const [filterName, setFilterName] = useState(1)

  const handleOpenModalCreateProduct = () => setOpenModalCreateProduct(true)
  const handleCloseModalCreateProduct = useCallback(() => setOpenModalCreateProduct(false), [])

  const handleOpenModalEditProduct = (id) => {
    dispatch(getOrderDetails(id))
    setProductId(id)
    setOpenModalEditProduct(true)
  }
  const handleCloseModalEditProduct = () => {
    setOpenModalEditProduct(false)
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id))
  }

  const handleEditProduct = (id) => {
    dispatch(updateProduct(id))
  }

  const changePageHandler = (event, value) => {
    dispatch(changePagePagination(value))
  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (deleteError) {
      dispatch(clearErrors())
    }

    if (isDeleted) {
      setMessage('Order Deleted Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: DELETE_ORDER_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
    }

    dispatch(getAllOrders(filterName || 0))
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, success, filterName, currentPage])

  return (
    <div className="order-list">
      <Typography variant="h4" component="h2" align="center">
        ORDERS LIST
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}
      >
        <ModalCreateOrder
          openModalCreateProduct={openModalCreateProduct}
          setOpenModalCreateProduct={setOpenModalCreateProduct}
          handleOpenModalCreateProduct={handleOpenModalCreateProduct}
          handleCloseModalCreateProduct={handleCloseModalCreateProduct}
        />
        <TextField
          id="standard-basic"
          label="Search by max Price"
          variant="standard"
          onChange={(e) => setFilterName(e.target.value)}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell align="center">Item Price ($)</TableCell>
              <TableCell align="start">User ID</TableCell>
              <TableCell align="start">Shipping Info</TableCell>
              <TableCell align="start">Total Price ($)</TableCell>
              <TableCell align="start">Order status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {(order?._id).slice(1, 9)}
                </TableCell>
                <TableCell align="center">{order?.itemsPrice}</TableCell>
                <TableCell align="start">{order?.Customer}</TableCell>
                <TableCell align="start">{`${order?.shippingInfo?.address}, ${order?.shippingInfo?.city}, ${order?.shippingInfo?.state}, ${order?.shippingInfo?.country}`}</TableCell>
                <TableCell align="start">{order?.totalPrice}</TableCell>
                <TableCell align="start">{order?.orderStatus}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <EditIcon
                      className="icon-edit"
                      onClick={() => handleOpenModalEditProduct(order?._id)}
                    />
                    &nbsp;
                    <DeleteIcon
                      className="icon-delete"
                      onClick={() => handleDeleteOrder(order?._id)}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid container justifyContent="center">
        <Grid item>
          <Pagination
            sx={{ marginTop: '30px' }}
            color="primary"
            count={2}
            defaultPage={1}
            onChange={changePageHandler}
          />
        </Grid>
      </Grid>

      <ModalEditOrder
        openModalEditProduct={openModalEditProduct}
        setOpenModalEditProduct={setOpenModalEditProduct}
        handleOpenModalEditProduct={handleOpenModalEditProduct}
        handleCloseModalEditProduct={handleCloseModalEditProduct}
        handleEditProduct={handleEditProduct}
        productId={productId}
      />

      {openAlert && (
        <BasicAlerts severity={severity} message={message} setOpenAlert={setOpenAlert} />
      )}
    </div>
  )
}
