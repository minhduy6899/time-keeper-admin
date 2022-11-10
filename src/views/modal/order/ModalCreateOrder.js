import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useState } from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Grid, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, createProduct, getAdminProduct } from 'src/actions/productAction'
import { NEW_PRODUCT_RESET } from 'src/constants/productConstant'
import BasicAlerts from 'src/views/Alert/Alert'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAllUsers } from 'src/actions/userAction'
import { Country, State } from 'country-state-city'
import { createOrder, getAllOrders } from 'src/actions/orderAction'
import { CREATE_ORDER_RESET } from 'src/constants/orderConstant'

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
export default function ModalCreateOrder({
  openModalCreateProduct,
  setOpenModalCreateProduct,
  handleOpenModalCreateProduct,
  handleCloseModalCreateProduct,
  getProducts,
}) {
  const dispatch = useDispatch()
  const { error, products } = useSelector((state) => state.productsReducer)
  const { error: createErorr, success } = useSelector((state) => state.newOrderReducer)
  const { error: errorLoadAllUser, users, loading } = useSelector((state) => state.allUsersReducer)
  const {
    error: errorLoadAllProduct,
    products: allProducts,
    currentPage,
    noPage,
  } = useSelector((state) => state.productsReducer)

  const [inputDataProduct, setInputDataProduct] = useState({})
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [age, setAge] = React.useState('')

  const handleChangeInput = (e) => {
    setInputDataProduct({
      ...inputDataProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateOrder = () => {
    dispatch(createOrder(inputDataProduct))
    setInputDataProduct({})
  }

  const handleChange = (event) => {
    setAge(event.target.value)
  }

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (success) {
      handleCloseModalCreateProduct()
      setMessage('Order Create Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: CREATE_ORDER_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
      dispatch(getAllOrders())
    }
    dispatch(getAllUsers())
    dispatch(getAdminProduct())
  }, [dispatch, alert, error, success])

  return (
    <div className="modal_create-product">
      <Button variant="contained" onClick={handleOpenModalCreateProduct}>
        <AddCircleOutlineOutlinedIcon />
        &nbsp; Add Order
      </Button>
      <Modal
        open={openModalCreateProduct}
        onClose={handleCloseModalCreateProduct}
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
            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">User</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputDataProduct?.Customer}
                    label="Age"
                    onChange={(e) =>
                      setInputDataProduct({
                        ...inputDataProduct,
                        Customer: e.target.value,
                      })
                    }
                  >
                    {users?.map((user, index) => (
                      <MenuItem key={index} value={user?._id}>
                        {user?.fullName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Order Item</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputDataProduct?.orderItems}
                    label="Order item"
                    onChange={(e) =>
                      setInputDataProduct({
                        ...inputDataProduct,
                        orderItems: [{ product: e.target.value }],
                      })
                    }
                  >
                    {allProducts?.map((product, index) => (
                      <MenuItem key={index} value={product?._id}>
                        {product?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputDataProduct?.orderItems}
                    label="Country"
                    onChange={(e) =>
                      setInputDataProduct({
                        ...inputDataProduct,
                        shippingInfo: { country: e.target.value },
                      })
                    }
                  >
                    {Country?.getAllCountries().map((item) => (
                      <MenuItem key={item?.isoCode} value={item?.isoCode}>
                        {item?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="orderStatus"
                name="orderStatus"
                variant="filled"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="orderStatus"
                name="orderStatus"
                variant="filled"
              />
            </Grid>
            <Grid item xs={12} align="end" spacing={2}>
              <Button
                variant="contained"
                onClick={handleCloseModalCreateProduct}
                color="error"
                spacing={2}
                sx={{ marginRight: '5px' }}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleCreateOrder} color="success" spacing={2}>
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {openAlert && (
        <BasicAlerts severity={severity} message={message} setOpenAlert={setOpenAlert} />
      )}
    </div>
  )
}

ModalCreateOrder.propTypes = {
  openModalCreateProduct: PropTypes.node.isRequired,
  setOpenModalCreateProduct: PropTypes.node.isRequired,
  handleOpenModalCreateProduct: PropTypes.node.isRequired,
  handleCloseModalCreateProduct: PropTypes.node.isRequired,
}
