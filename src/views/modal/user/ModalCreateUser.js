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
import { getAllUsers, register } from 'src/actions/userAction'

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
export default function ModalCreateUser({
  openModalCreateProduct,
  setOpenModalCreateProduct,
  handleOpenModalCreateProduct,
  handleCloseModalCreateProduct,
  getProducts,
}) {
  const dispatch = useDispatch()
  const { error, products } = useSelector((state) => state.productsReducer)
  const {
    error: createErorr,
    isAuthenticated,
    user,
    loading,
  } = useSelector((state) => state.userReducer)

  const [inputDataUser, setInputDataUser] = useState({})
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)

  const handleChangeInput = (e) => {
    setInputDataUser({
      ...inputDataUser,
      [e.target.name]: e.target.value,
    })
  }

  const handleCreateUser = () => {
    dispatch(register(inputDataUser))
  }

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (isAuthenticated) {
      handleCloseModalCreateProduct()
      setMessage('User Create Successfully')
      setSeverity('success')
      setOpenAlert(true)
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
      dispatch(getAllUsers())
    }
  }, [dispatch, alert, error, isAuthenticated])

  return (
    <div className="modal_create-product">
      <Button variant="contained" onClick={handleOpenModalCreateProduct}>
        {' '}
        <AddCircleOutlineOutlinedIcon />
        &nbsp; Add User
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

          <Typography
            id="modal-modal-title"
            variant="p"
            component="h6"
            align="center"
            sx={{ paddingBottom: '20px', color: 'red' }}
          >
            {createErorr}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                name="username"
                label="Username"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="Password"
                name="password"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="FullName"
                name="fullName"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="Phone"
                name="phone"
                variant="filled"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="Address"
                name="address"
                variant="filled"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                autoComplete
                onChange={handleChangeInput}
                fullWidth
                id="outlined-basic"
                label="Role"
                name="role"
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
              <Button variant="contained" onClick={handleCreateUser} color="success" spacing={2}>
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

ModalCreateUser.propTypes = {
  openModalCreateProduct: PropTypes.node.isRequired,
  setOpenModalCreateProduct: PropTypes.node.isRequired,
  handleOpenModalCreateProduct: PropTypes.node.isRequired,
  handleCloseModalCreateProduct: PropTypes.node.isRequired,
}
