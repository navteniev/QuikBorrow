import React, { useState } from "react";
import styled from 'styled-components';
import { Typography, Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, FormHelperText, InputAdornment, MenuItem } from "@material-ui/core";
import teal from '@material-ui/core/colors/teal'
import ChatIcon from '@material-ui/icons/Chat';
import { VerifiedUserTwoTone, ThumbsUpDownTwoTone, AddCircle } from "@material-ui/icons";
import Dropzone from 'react-dropzone'
import ImageIcon from '@material-ui/icons/Image'
import AddItemModal from '../AddItemModal/AddItemModal'

const Background = styled.div`
	background: #009688;
	height: 500px;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	margin-bottom: -350px;
`

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	h4 {
		margin-bottom: 20px;
	}
	p {
		margin-bottom: 20px;
	}
	margin-bottom: 210px;
`

const Section = styled.section`
	padding: 0 50px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	flex-direction: column;
	max-width: 1100px;
`

const Cards = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 40px;
`

const Card = styled.div`
	display: flex;
	text-align: left;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 20px;
	> div {
		padding-right: 20px;
	}
`

const Heading = styled(Typography)`
	color: ${teal[800]};
`

function Homepage() {
	const [ openModal, setOpenModal ] = useState(false)

	return (
		<div>
			<Background />
			<AddItemModal open={openModal} onClose={e => setOpenModal(false)} />
			<Content>
				<Typography variant='h4' component='h4' style={{color: teal[50]}}>
					Need something?
				</Typography>
				<Typography align='center' style={{color: teal[50]}} variant='body1'>
					With Quikborrow, you can do whatever you want with no reprucussions.<br/>What do you want to do?
				</Typography>
				<ButtonGroup>
					<Button size='large' variant='contained' onClick={e => setOpenModal(true)}>
						I want to lend
					</Button>
					<Button size='large' variant='contained'>
						I want to borrow
					</Button>
				</ButtonGroup>
			</Content>
			<Section>
				<Heading variant='h4' component='h4' gutterBottom>
					By the students. For the students.
				</Heading>
				<Typography variant='h6' component='p' paragraph gutterBottom>
					Too long have we been chained by our corporate overlords such as McGraw Hill and Pearson. Today, you have the chance to break free with QuikBorrow. A service so quik you can't even "c" it. *<i>pause for applause</i>*
				</Typography>
				<Cards>
					<Card>
						<div>
							<Heading variant='h5' component='h5' gutterBottom>
								Securely Chat
							</Heading>
							<Typography variant='body1' component='p'>
								The NSA is always watching our every move. On our platform however, they won't see a thing. You are free to trade your musty second-hand textbooks with those suspicious liquid stains from one student to another without any prying eyes.
							</Typography>
						</div>
						<ChatIcon style={{fontSize: 150, color: teal[500]}} />
					</Card>
					<Card>
						<div>
							<Heading variant='h5' component='h5' gutterBottom>
								Trusted Users
							</Heading>
							<Typography variant='body1' component='p'>
								Students should feel confident that the stuff they're borrowing are not bugged by corporate spies. Users will rate each other on their trustworthiness, and their ratings will be affected for everyone to see. User reports can also be made to our team that will either confirm or deny corporate spies who intends to break our service.
							</Typography>
						</div>
						<ThumbsUpDownTwoTone style={{fontSize: 150, color: teal[500]}} />
					</Card>
					<Card>
						<div>
							<Heading variant='h5' component='h5' gutterBottom>
								Students Only
							</Heading>
							<Typography variant='body1' component='p'>
								Corporate spies are the bane of our existence, and we use a wide range of state-of-the-art tech tools to keep them out. All lenders and buyers must validate their account with student emails to verify that they are attending a university. Once they're no longer a student, they can no longer lend or borrow items.
							</Typography>
						</div>
						<VerifiedUserTwoTone style={{fontSize: 150, color: teal[500]}} />
					</Card>
				</Cards>
			</Section>
		</div>
	);
}
export default Homepage;
