import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'

import {
  clearErrors,
  createProduct,
  getAdminProduct,
  getProductDetails,
  updateProduct,
} from 'src/actions/productAction'
import { NEW_PRODUCT_RESET, UPDATE_PRODUCT_RESET } from 'src/constants/productConstant'
import BasicAlerts from 'src/views/Alert/Alert'
import { getAllOrders, updateOrder } from 'src/actions/orderAction'
import { UPDATE_ORDER_RESET } from 'src/constants/orderConstant'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function ModalEditOrder({
  openModalEditProduct,
  setOpenModalEditProduct,
  handleOpenModalEditProduct,
  handleCloseModalEditProduct,
  // handleEditProduct,
  productId,
}) {
  const dispatch = useDispatch()
  const { error, orders, loading } = useSelector((state) => state.allOrdersReducer)
  const { error: createErorr, success } = useSelector((state) => state.newProductReducer)
  const {
    error: getOrderError,
    order,
    loading: getOrderLoading,
  } = useSelector((state) => state.orderDetailsReducer)
  const { loading: updateLoading, isUpdated } = useSelector((state) => state.orderReducer)

  const [inputDataProduct, setInputDataProduct] = useState({})
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [orderStatus, setOrderStatus] = React.useState('')

  const handleChange = (event) => {
    setOrderStatus({ orderStatus: event.target.value })
  }
  const handleChangeInput = (e) => {
    setInputDataProduct({
      ...inputDataProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditProduct = () => {
    dispatch(updateOrder(productId, orderStatus))
  }

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (isUpdated) {
      handleCloseModalEditProduct()
      setMessage('Order Update Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: UPDATE_ORDER_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
      dispatch(getAllOrders(0))
    }
  }, [error, success, isUpdated])
  return (
    <div className="modal_create-product">
      {order?.itemsPrice && loading === false && (
        <Modal
          open={openModalEditProduct}
          onClose={handleCloseModalEditProduct}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              align="center"
              sx={{ paddingBottom: '30px' }}
            >
              CREATE NEW PRODUCT
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  defaultValue={order?.Customer}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  name="name"
                  label="customer id"
                  variant="filled"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={order?.itemsPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="itemsPrice"
                  name="imageUrl"
                  variant="filled"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={order?.shippingPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="shippingPrice"
                  type="number"
                  name="buyPrice"
                  variant="filled"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={order?.taxPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="tax Price"
                  type="number"
                  name="promotionPrice"
                  variant="filled"
                  disabled
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  defaultValue={order?.totalPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="total Price"
                  name="category"
                  variant="filled"
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl variant="standard" fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={orderStatus}
                      label="orderStatus"
                      onChange={handleChange}
                    >
                      <MenuItem value={'Processing'}>Processing</MenuItem>
                      <MenuItem value={'Loading'}>Loading</MenuItem>
                      <MenuItem value={'Shipped'}>Shipped</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} align="end" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleCloseModalEditProduct}
                  color="error"
                  spacing={2}
                  sx={{ marginRight: '5px' }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleEditProduct} color="success" spacing={2}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
      {openAlert && (
        <BasicAlerts severity={severity} message={message} setOpenAlert={setOpenAlert} />
      )}
    </div>
  )
}

ModalEditOrder.propTypes = {
  openModalEditProduct: PropTypes.node.isRequired,
  setOpenModalEditProduct: PropTypes.node.isRequired,
  handleOpenModalEditProduct: PropTypes.node.isRequired,
  handleCloseModalEditProduct: PropTypes.node.isRequired,
  handleEditProduct: PropTypes.node.isRequired,
  productId: PropTypes.node.isRequired,
}
