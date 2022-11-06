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

import './users.scss'
import { DELETE_PRODUCT_RESET, PRODUCT_DETAILS_RESET } from '../../constants/productConstant'
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
  updateProduct,
  changePagePagination,
  getProductDetails,
} from '../../actions/productAction'
import { Button, Pagination, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import ModalCreateProduct from '../modal/product/ModalCreateProduct'
import ModalEditProduct from '../modal/product/ModalEditProduct'
import BasicAlerts from '../Alert/Alert'
import { Box, Grid } from '@material-ui/core'
import ModalCreateUser from '../modal/user/ModalCreateUser'
import { deleteUser, getAllUsers, getUserDetails } from 'src/actions/userAction'
import ModalEditUser from '../modal/user/ModalEditUser'
import { DELETE_USER_RESET } from 'src/constants/userConstant'

export default function Users() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, users, loading } = useSelector((state) => state.allUsersReducer)
  const {
    loading: updateLoading,
    error: deleteError,
    isUpdated,
    isDeleted,
  } = useSelector((state) => state.profileReducer)

  const [openModalCreateProduct, setOpenModalCreateProduct] = useState(false)
  const [openModalEditUser, setOpenModalEditUser] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [userId, setUserId] = useState('')
  const [filterName, setFilterName] = useState()

  const handleOpenModalCreateProduct = () => setOpenModalCreateProduct(true)
  const handleCloseModalCreateProduct = useCallback(() => setOpenModalCreateProduct(false), [])

  const handleOpenModalEditUser = (id) => {
    dispatch(getUserDetails(id))
    setUserId(id)
    setOpenModalEditUser(true)
  }
  const handleCloseModalEditUser = () => {
    setOpenModalEditUser(false)
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id))
  }

  const handleEditUser = (id) => {
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
      setMessage('Product Deleted Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: DELETE_USER_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
    }
    dispatch(getAllUsers())
  }, [dispatch, isDeleted])
  // dispatch, alert, error, deleteError, isDeleted, success, filterName
  console.log('check user: ', users)

  return (
    <div className="product-list">
      <Typography variant="h4" component="h2" align="center">
        USERS LIST
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}
      >
        <ModalCreateUser
          openModalCreateProduct={openModalCreateProduct}
          setOpenModalCreateProduct={setOpenModalCreateProduct}
          handleOpenModalCreateProduct={handleOpenModalCreateProduct}
          handleCloseModalCreateProduct={handleCloseModalCreateProduct}
        />
        <TextField
          id="standard-basic"
          label="Search by Name"
          variant="standard"
          onChange={(e) => setFilterName(e.target.value)}
        />
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product ID</TableCell>
              <TableCell align="center">Full Name</TableCell>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Role</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {user?._id}
                </TableCell>
                <TableCell align="center">{user?.fullName}</TableCell>
                <TableCell align="center">{user?.username}</TableCell>
                <TableCell align="center">{user?.address}</TableCell>
                <TableCell align="center">{user?.role}</TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <EditIcon
                      className="icon-edit"
                      onClick={() => handleOpenModalEditUser(user?._id)}
                    />
                    &nbsp;
                    <DeleteIcon
                      className="icon-delete"
                      onClick={() => handleDeleteUser(user?._id)}
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

      <ModalEditUser
        openModalEditUser={openModalEditUser}
        setOpenModalEditUser={setOpenModalEditUser}
        handleOpenModalEditUser={handleOpenModalEditUser}
        handleCloseModalEditUser={handleCloseModalEditUser}
        handleEditUser={handleEditUser}
        userId={userId}
      />

      {openAlert && (
        <BasicAlerts severity={severity} message={message} setOpenAlert={setOpenAlert} />
      )}
    </div>
  )
}
