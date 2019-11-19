import React, { useState } from 'react'
import styled from 'styled-components'
import { Dialog, DialogTitle, DialogContent, DialogActions, FormHelperText, Typography, TextField, FormControl } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import teal from '@material-ui/core/colors/teal'
import { Button } from '@material-ui/core'
import ImageIcon from '@material-ui/icons/Image'

const FileSection = styled.section`
	margin-top: 10px;
`

const DropzoneStyles = styled.div`
	width: 100%;
	height: 100px;
	outline: ${teal[500]} dashed 4px;
	outline-offset: -4px;
	margin-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 10px;
`

const AddedFile = styled.div`
	display: flex;
	align-items: center;
	height: 2em;
	background: ${teal[500]};
	padding: 4px 8px;
	color: ${teal[50]};
	overflow: hidden;
	> p {
		margin-left: 10px;
		word-wrap: none;
		text-overflow: ellipsis;
		overflow: hidden;
	}
`


function AddItemModal (props) {
  const { open, onClose } = props

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add an Item
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant='body1'>
          Fill out some details, and we'll get you up and running ASAP!
        </Typography>
        <FormControl fullWidth margin='normal'>
          <TextField label='Maximum days' select required SelectProps={{ native: true }} margin='normal' fullWidth>
            {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n}</option>)}
          </TextField>
          <FormHelperText>What's the maximum number of days you're willing to lend it out for?</FormHelperText>
          <TextField label='Item Name' required margin='normal' fullWidth />
          <FormHelperText>You gotta have an item name, at the very least!</FormHelperText>
          <TextField label='Description' placeholder='Give some more details about your item here' multiline rows='4' margin='normal' fullWidth />
          <FormHelperText>Should put a description here</FormHelperText>
          
        </FormControl>
        <FileSection>
          <Typography variant='h5'>
            Images
          </Typography>
          <Dropzone onDrop={console.log}>
            {({getRootProps, getInputProps}) => (
              <DropzoneStyles {...getRootProps()}>
                <input {...getInputProps()} />
                <Typography variant='p'>
                  Drag 'n' drop some files here, or click to select files
                </Typography>
              </DropzoneStyles>
            )}
          </Dropzone>
          <AddedFile>
            <ImageIcon />
            <Typography variant='subtitle1' component='p'>
            image.jpg
            </Typography>
          </AddedFile>
        </FileSection>
      </DialogContent>
      <DialogActions>
        <Button variant='text'>Cancel</Button>
        <Button color='primary' variant='contained'>Next</Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddItemModal
