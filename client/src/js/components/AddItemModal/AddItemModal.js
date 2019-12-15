import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Typography, TextField, IconButton, LinearProgress } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import { green, teal } from '@material-ui/core/colors'
import { Button } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import CloseIcon from '@material-ui/icons/Close'
const LOADING_STATES = {
  WAITING: 0,
  FETCHING: 1,
  SUCCESS: 2,
  ERROR: 3
}

const FileSection = styled.section`
	margin-top: 10px;
`

const DropzoneStyles = styled.div`
	width: 100%;
	height: ${props => props.disabled ? 0 : '100px'};
	outline: ${teal[100]} dashed 3px;
	outline-offset: -4px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
  transition: all .3s;
  overflow: hidden;
  ${props => props.disabled ? '' : `
    cursor: pointer;
    &:hover, &:active {
      outline: ${teal[500]} dashed 3px;
    }
  `}
  
`

const AddedFile = styled.div`
	display: flex;
  justify-content: space-between;
	align-items: center;
	height: 2em;
	background: ${teal[500]};
	padding: 4px 8px;
	color: ${teal[50]};
	overflow: hidden;
  margin-bottom: 4px;
  > div {
    display: flex;
    align-items: center;
  }
	p {
		margin-left: 10px;
		word-wrap: none;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`

const SuccessBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export function AddItemModal (props) {
  const { open, onClose } = props
  const [ files, setFiles ] = useState([])
  const [ maxDays, setMaxDays ] = useState(1)
  const [ name, setName ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ price, setPrice ] = useState(0)
  const [ loadingState, setLoadingState ] = useState(LOADING_STATES.WAITING) // 0=waiting, 1=fetching, 2=success, 3=error
  const [ error, setError ] = useState();
  const [ createdItem, setCreatedItem ] = useState()
  const history = useHistory()
  const { isAuthenticated, user } = useSelector(state => state.auth)

  useEffect(() => {
    if (loadingState < 3) {
      return setError()
    }
  }, [ loadingState ])

  useEffect(() => {
    if (error && loadingState !== LOADING_STATES.ERROR) {
      return setLoadingState(LOADING_STATES.ERROR)
    }
  }, [ error, loadingState ])

  /**
   * @param {File[]} newFiles 
   */
  function addFiles(newFiles) {
    setFiles([ ...files, ...newFiles])
  }

  /**
   * @param {number} index
   */
  function removeFile(index) {
    files.splice(index, 1)
    setFiles([ ...files ])
  }

  /**
   * Send the request to add an item
   * @param {event} event
   */
  function sendRequest(event) {
    event.preventDefault()
    if (!isAuthenticated) {
      return setError('You are not logged in.')
    }
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      return setError('Missing JWT auth token')
    }
    const headers = {
      Authorization: token // Axios auto-prepends Bearer for some reason so no need
    }
    setLoadingState(LOADING_STATES.FETCHING)
    const body = { name, description }
    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    if(files.length > 0) {
      formData.append('productImage', files[0])
    }
    axios.post(`/api/users/${user.id}/items`, formData, headers)
      .then(res => {
        setLoadingState(LOADING_STATES.SUCCESS)
        setName('')
        setDescription('') 
        setCreatedItem(res.data)  
        setFiles([])    
      })
      .catch(err => {
        let errors = ''
        if (err.response && err.response.data && err.response.data.errors) {
          err.response.data.errors.forEach(details => {
            errors += `${details.param ? `${details.param}: ${details.msg}` : details.msg}` + '\n'
          })
          setError(errors.split('\n').map((item, i) => <span key={i}>{item}<br /></span>))
        } else {
          setError(err.message)
        }
        
      })
  }

  let feedback
  switch (loadingState) {
    case LOADING_STATES.SUCCESS:
      feedback = (
        <SuccessBox>
          <Typography data-testid='success-text' variant='body2' style={{color: green[500]}}>
            Success!
          </Typography>
          <Button
            fullWidth
            data-testid='product-page-button'
            variant='outlined'
            color='primary'
            onClick={e => history.push(`/products/${createdItem._id}`)}>
              Go to product page
            </Button>
        </SuccessBox>
      )
      break;
    case LOADING_STATES.ERROR:
      feedback = (
        <Typography variant='body2' color='error'>
          {error}
        </Typography>
      )
      break;
    case LOADING_STATES.FETCHING:
        feedback = <LinearProgress color='secondary' />
      break;
    default:
      break;
  }

  return (
    <Dialog open={open} onClose={onClose} scroll='body'>
      <DialogTitle>
        Add an Item
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant='body1'>
          Fill out some details, and we'll get you up and running ASAP!
        </Typography>
        <form id='form-add-item' onSubmit={sendRequest}>
          <TextField
            required
            fullWidth
            disabled={loadingState === LOADING_STATES.FETCHING}
            inputProps={{ 'data-testid': 'input-name' }}
            label='Item Name'
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <FormHelperText>You gotta have an item name, at the very least!</FormHelperText>
          <TextField
            select
            required
            fullWidth
            disabled={loadingState === LOADING_STATES.FETCHING}
            inputProps={{ 'data-testid': 'input-days' }}
            label='Maximum days'
            SelectProps={{ native: true }}
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={maxDays}
            onChange={e => setMaxDays(e.target.value)}
          >
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
          </TextField>
          <FormHelperText>What's the maximum number of days you're willing to lend it out for?</FormHelperText>
          <TextField
            required
            fullWidth
            disabled={loadingState === LOADING_STATES.FETCHING}
            inputProps={{ 'data-testid': 'input-price' }}
            label='Price'
            type='number'
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <FormHelperText>
            Set a price!
          </FormHelperText>
          <TextField
            multiline
            required
            fullWidth
            disabled={loadingState === LOADING_STATES.FETCHING}
            inputProps={{ 'data-testid': 'input-description' }}
            label='Description'
            rows='4'
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <FormHelperText>
            Give some more details about your item here
          </FormHelperText>
        </form>
        <FileSection>
          <Typography variant='h5'>
            {loadingState === LOADING_STATES.FETCHING ? '' : 'Images'}
          </Typography>
          
          <Dropzone onDrop={addFiles} disabled={loadingState === LOADING_STATES.FETCHING}>
            {({getRootProps, getInputProps}) => (
              <DropzoneStyles
                {...getRootProps()}
                data-testid='image-dropzone-container'
                onDrop={addFiles}
                disabled={loadingState === LOADING_STATES.FETCHING}
              >
                <input {...getInputProps()} />
                <Typography variant='subtitle1' color='textSecondary'>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </DropzoneStyles>
            )}
          </Dropzone>
        {files.map((file, i) => (
            <AddedFile key={i+file.name+file.lastModified} data-testid={`added-image-${file.name}`}>
              <div>
                <ImageIcon />
                <Typography variant='subtitle1' component='p'>
                {file.name}
                </Typography>
              </div>
              <IconButton
                aria-label='remove-image-upload'
                size='small'
                onClick={e => removeFile(i)}
                data-testid={`delete-image-${file.name}`}
              >
                <CloseIcon color='action' />
              </IconButton>
            </AddedFile>
          ))}
          {feedback}
        </FileSection>
      </DialogContent>
      <DialogActions>
        <Button
          variant='text'
          onClick={onClose}
          disabled={loadingState === LOADING_STATES.FETCHING}
          data-testid='cancel-button'
        >
          Cancel
        </Button>
        <Button
        color='primary'
        variant='contained'
        disabled={!name || !description}
        data-testid='submit-button'
        type='submit'
        form='form-add-item'
      >
        Next
      </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemModal
