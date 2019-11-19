import React, { useState } from 'react'
import styled from 'styled-components'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Typography, TextField, FormControl, IconButton } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import teal from '@material-ui/core/colors/teal'
import { Button } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'
import CloseIcon from '@material-ui/icons/Close'

const FileSection = styled.section`
	margin-top: 10px;
`

const DropzoneStyles = styled.div`
	width: 100%;
	height: 100px;
	outline: ${teal[100]} dashed 3px;
	outline-offset: -4px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
  cursor: pointer;
  transition: all .3s;
  &:hover, &:active {
    outline: ${teal[500]} dashed 3px;
  }
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


export function AddItemModal (props) {
  const { open, onClose } = props
  const [ files, setFiles ] = useState([])

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

  return (
    <Dialog open={open} onClose={onClose} scroll='body'>
      <DialogTitle>
        Add an Item
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant='body1'>
          Fill out some details, and we'll get you up and running ASAP!
        </Typography>
        <FormControl fullWidth margin='normal'>
          <TextField label='Maximum days' select required SelectProps={{ native: true }} margin='normal' fullWidth InputLabelProps={{ shrink: true }}>
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
          </TextField>
          <FormHelperText>What's the maximum number of days you're willing to lend it out for?</FormHelperText>
          <TextField label='Item Name' required margin='normal' fullWidth InputLabelProps={{ shrink: true }} />
          <FormHelperText>You gotta have an item name, at the very least!</FormHelperText>
          <TextField label='Description' multiline rows='4' margin='normal' fullWidth InputLabelProps={{ shrink: true }}/>
          <FormHelperText>Give some more details about your item here</FormHelperText>
          
        </FormControl>
        <FileSection>
          <Typography variant='h5'>
            Images
          </Typography>
          <Dropzone onDrop={addFiles}>
            {({getRootProps, getInputProps}) => (
              <DropzoneStyles {...getRootProps()}>
                <input {...getInputProps()} />
                <Typography variant='subtitle1' color='textSecondary'>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </DropzoneStyles>
            )}
          </Dropzone>
          {files.map((file, i) => (
            <AddedFile key={i+file.name+file.lastModified}>
              <div>
                <ImageIcon />
                <Typography variant='subtitle1' component='p'>
                {file.name}
                </Typography>
              </div>
              <IconButton aria-label='remove-image-upload' size='small' onClick={e => removeFile(i)}>
                <CloseIcon color='action' />
              </IconButton>
            </AddedFile>
          ))}
          
        </FileSection>
      </DialogContent>
      <DialogActions>
        <Button variant='text' onClick={onClose}>Cancel</Button>
        <Button color='primary' variant='contained'>Next</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemModal
