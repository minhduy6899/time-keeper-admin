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

import './products.scss'
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

export default function Products() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { error, products, currentPage, noPage } = useSelector((state) => state.productsReducer)
  const { error: deleteError, isDeleted } = useSelector((state) => state.productReducer)
  const { error: createErorr, success } = useSelector((state) => state.newProductReducer)

  const [openModalCreateProduct, setOpenModalCreateProduct] = useState(false)
  const [openModalEditProduct, setOpenModalEditProduct] = useState(false)
  const [severity, setSeverity] = useState('success')
  const [message, setMessage] = useState('')
  const [openAlert, setOpenAlert] = useState(false)
  const [productId, setProductId] = useState('')
  const [filterName, setFilterName] = useState()

  const handleOpenModalCreateProduct = () => setOpenModalCreateProduct(true)
  const handleCloseModalCreateProduct = useCallback(() => setOpenModalCreateProduct(false), [])

  const handleOpenModalEditProduct = (id) => {
    dispatch(getProductDetails(id))
    setProductId(id)
    setOpenModalEditProduct(true)
  }
  const handleCloseModalEditProduct = () => {
    setOpenModalEditProduct(false)
    dispatch({ type: PRODUCT_DETAILS_RESET })
  }

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id))
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
      setMessage('Product Deleted Successfully')
      setSeverity('success')
      setOpenAlert(true)
      dispatch({ type: DELETE_PRODUCT_RESET })
      setTimeout(() => {
        setOpenAlert(false)
      }, 5000)
    }

    dispatch(getAdminProduct(filterName))
  }, [dispatch, alert, error, deleteError, navigate, isDeleted, success, filterName, currentPage])
  return (
    <div className="product-list">
      <Typography variant="h4" component="h2" align="center">
        PRODUCTS LIST
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}
      >
        <ModalCreateProduct
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
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Product Price</TableCell>
              <TableCell align="center">Product Image</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((products, index) => (
              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {products?._id}
                </TableCell>
                <TableCell align="center">{products?.name}</TableCell>
                <TableCell align="center">{products?.promotionPrice}</TableCell>
                <TableCell align="center">
                  <img style={{ maxWidth: '50px' }} src={products?.imageUrl} alt="product" />
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <EditIcon
                      className="icon-edit"
                      onClick={() => handleOpenModalEditProduct(products?._id)}
                    />
                    &nbsp;
                    <DeleteIcon
                      className="icon-delete"
                      onClick={() => handleDeleteProduct(products?._id)}
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
            count={noPage}
            defaultPage={1}
            onChange={changePageHandler}
          />
        </Grid>
      </Grid>

      <ModalEditProduct
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
