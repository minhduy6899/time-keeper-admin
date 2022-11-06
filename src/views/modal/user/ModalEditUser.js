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
import { UPDATE_PROFILE_RESET } from 'src/constants/userConstant'
import { getAllUsers, updateUser } from 'src/actions/userAction'

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

export default function ModalEditUser({
  openModalEditUser,
  setOpenModalEditProduct,
  handleOpenModalEditUser,
  handleCloseModalEditUser,
  // handleEditUser,
  userId,
}) {
  const dispatch = useDispatch()
  const { error, user, loading } = useSelector((state) => state.userDetailsReducer)
  const { loading: updateLoading, isUpdated } = useSelector((state) => state.profileReducer)

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

  const handleEditUser = () => {
    dispatch(updateUser(userId, inputDataUser))
  }

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    if (isUpdated) {
      handleCloseModalEditUser()
      setMessage('User Update Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: UPDATE_PROFILE_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
      dispatch(getAllUsers())
    }
  }, [error, isUpdated])

  console.log('check user detail: ', user)

  return (
    <div className="modal_create-product">
      {user && loading === false && (
        <Modal
          open={openModalEditUser}
          onClose={handleCloseModalEditUser}
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
                  defaultValue={user?.username}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  name="username"
                  label="Username"
                  variant="filled"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={user?.fullName}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  name="fullName"
                  label="FullName"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={user?.phone}
                  onChange={handleChangeInput}
                  fullWidth
                  id="outlined-basic"
                  label="Phone number"
                  name="phone"
                  variant="filled"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={user?.address}
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
                  defaultValue={user?.role}
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
                  onClick={handleCloseModalEditUser}
                  color="error"
                  spacing={2}
                  sx={{ marginRight: '5px' }}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleEditUser} color="success" spacing={2}>
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

ModalEditUser.propTypes = {
  openModalEditUser: PropTypes.node.isRequired,
  setOpenModalEditProduct: PropTypes.node.isRequired,
  handleOpenModalEditUser: PropTypes.node.isRequired,
  handleCloseModalEditUser: PropTypes.node.isRequired,
  handleEditUser: PropTypes.node.isRequired,
  userId: PropTypes.node.isRequired,
}
