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

export default function ModalEditProduct({
  openModalEditProduct,
  setOpenModalEditProduct,
  handleOpenModalEditProduct,
  handleCloseModalEditProduct,
  // handleEditProduct,
  productId,
}) {
  const dispatch = useDispatch()
  const {
    error,
    product,
    loading,
    success: getProductSuccess,
  } = useSelector((state) => state.productDetailsReducer)
  const { error: createErorr, success } = useSelector((state) => state.newProductReducer)
  const { loading: updateLoading, isUpdated } = useSelector((state) => state.productReducer)

  const [inputDataProduct, setInputDataProduct] = useState({})
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)

  const handleChangeInput = (e) => {
    setInputDataProduct({
      ...inputDataProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleEditProduct = () => {
    dispatch(updateProduct(productId, inputDataProduct))
  }

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (isUpdated) {
      handleCloseModalEditProduct()
      setMessage('Product Update Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: UPDATE_PRODUCT_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
      dispatch(getAdminProduct())
    }
  }, [error, success, isUpdated])

  return (
    <div className="modal_create-product">
      {getProductSuccess && loading === false && (
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
                  defaultValue={product?.name}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  name="name"
                  label="Name"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={product?.imageUrl}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Image Url"
                  name="imageUrl"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  defaultValue={product?.description}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Description"
                  name="description"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={product?.buyPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Buy Price"
                  type="number"
                  name="buyPrice"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={product?.promotionPrice}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Promotion Price"
                  type="number"
                  name="promotionPrice"
                  variant="filled"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.category}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Category"
                  name="category"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.badge}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Badge"
                  name="badge"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.ratings}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Ratings"
                  type="number"
                  name="ratings"
                  variant="filled"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.color}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Color"
                  name="color"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.size}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Size"
                  name="size"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.amount}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Amount"
                  type="number"
                  name="amount"
                  variant="filled"
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.thumbnail?.img1}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Image first"
                  name="img1"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.thumbnail?.img2}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Image second"
                  name="img2"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  defaultValue={product?.thumbnail?.img3}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Image third"
                  name="img3"
                  variant="filled"
                />
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

ModalEditProduct.propTypes = {
  openModalEditProduct: PropTypes.node.isRequired,
  setOpenModalEditProduct: PropTypes.node.isRequired,
  handleOpenModalEditProduct: PropTypes.node.isRequired,
  handleCloseModalEditProduct: PropTypes.node.isRequired,
  handleEditProduct: PropTypes.node.isRequired,
  productId: PropTypes.node.isRequired,
}
