import React, {useState, useEffect, useContext} from 'react'
import {Form, Button, Card, Image, Row, Col} from 'react-bootstrap'
import UserContext from '../UserContext'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import background from '../media/bg1.jpg'
import '../App.css'




export default function Register(){
    const { user } = useContext(UserContext)

    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [mobileNumber, setMobileNumber] = useState('')
	const [isActive, setIsActive] = useState(false)
	const navigate = useNavigate()
    let [togglePage, setTogglePage] = useState(false)
    let [isLoading, setIsLoading] = useState(false)

    


    function registerUser(event){
		event.preventDefault()
    
		fetch(`${process.env.REACT_APP_API_URL}/users/check-email`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		}).then(response => response.json())
	      .then(result => {
	      	   if(result === true){
                
		      		Swal.fire({
			  			title: "Oops!",
			  			icon: "error",
			  			text: "Email Is Already In Use! "
			  		})

			  	} else {
			  		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
			  			method: 'POST',
						headers: {
							'Content-Type': 'application/json',
			            },
			            body: JSON.stringify({
			            	firstName: firstName,
			            	lastName: lastName,
			            	mobileNumber: mobileNumber,
			            	email: email,
			            	password: password

                        })
			  		}).then(response => response.json())
			  		  .then(result => {
                        
			  		  	   if(result !== false){
                           
			  		  	   	setEmail('')
							setPassword('')
							setFirstName('')
							setLastName('')
							setMobileNumber('')
                           
							Swal.fire({
				  			title: "Success!",
				  			icon: "success",
				  			text: "Successfully Registered! You May Now Log In. "
			  		        })

							navigate('/login')

			  		  	   } else {
			  		  	   	Swal.fire({
				  			title: "Oops!",
				  			icon: "error",
				  			text: "Something Went Wrong! "
			  		        })
			  		  	   }
			  		    }) 
			    }
        })
    }

    // function registerUser(event) {
    //     event.preventDefault()
    //     setIsLoading(true)
    //     fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             firstName: firstName,
    //             lastName: lastName,
    //             email: email,
    //             password: password,
    //             mobileNumber: mobileNumber
    //         })
    //     })
    //     .then(response => {
    //         setIsLoading(false)
    //         Swal.fire({
    //             title: 'Success',
    //             icon: 'success',
    //             text: 'Successfully Registered! You may now log in.'
    //         })

    //         // clear all fields
    //         setFirstName('')
    //         setLastName('')
    //         setMobileNumber('')
    //         setEmail('')
    //         setPassword('')
            

    //         navigate('/')
    //     })
    // }

    useEffect(() => {
        if(
            (email !== '' && password !== '')
        )
        {
            setIsActive(true)
        }else {
            setIsActive(false)
        }
    }, [firstName, lastName, mobileNumber, email, password])

    return(
		(user.id !== null ) ?
				<Navigate to="/"/>
		:
		<>
            <Row className='signupbg' style={{backgroundImage: `url(${background}` }}>  
                <Col className="d-flex justify-content-center mt-5 mb-5">
                    <Card className="cardsignup">
                        <Form onSubmit={e => registerUser(e)} className='formsignup text-white'>
                            <Card.Header className="justify-content-center"><h2 className="text-center text-primary">SignUp</h2></Card.Header>
                            <Card.Body>
                                <div className={togglePage === true ? 'd-none' : ''}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your First Name"
                                            required
                                            value={firstName}
                                            onChange={(event) => {setFirstName(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your Last Name"
                                            required
                                            value={lastName}
                                            onChange={(event) => {setLastName(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Mobile Number:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your Mobile Number"
                                            required
                                            value={mobileNumber}
                                            onChange={(event) => {setMobileNumber(event.target.value)}}
                                        />
                                    </Form.Group>
                                </div>
                                <div className={togglePage === false ? 'd-none' : ''}>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your Email"
                                            required
                                            value={email}
                                            onChange={(event) => {setEmail(event.target.value)}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-2">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Enter your Password"
                                            required
                                            value={password}
                                            onChange={(event) => {setPassword(event.target.value)}}
                                        />
                                    </Form.Group>
                                    {/* <Form.Group>
                                        <Form.Label>Verify Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Verify your Password"
                                            required
                                            value={password2}
                                            onChange={(event) => {setPassword2(event.target.value)}}
                                        />
                                    </Form.Group> */}
                                </div>
                                <Form.Text className="text-primary">
                                We'll never share your data with anyone.
                                </Form.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                {
                                    (togglePage === false) ? 
                                    (
                                        <Button className="btn-secondary-custom" variant="secondary" onClick={() => {setTogglePage(true)}}>Next 🡲</Button>
                                    )
                                    :
                                    (
                                        
                                        isActive ? 
                                            <>
                                                <Button className="btn-secondary-custom" variant="secondary" onClick={() => {setTogglePage(false)}}>🡰 Back</Button>
                                                <Button className="btn-secondary-custom" variant="primary" type="submit" disabled={isLoading}>
                                                    {isLoading ? 'Loading..' : 'SignUp'}
                                                </Button>
                                            </>
                                            :
                                            <>
                                                <Button className="btn-secondary-custom" variant="secondary" onClick={() => {setTogglePage(false)}}>🡰 Back</Button>
                                                <Button className="btn-secondary-custom" variant="secondary" type="submit" disabled>SignUp</Button>     
                                            </>
                                    )
                                }
                            </Card.Footer>
                            <p className="text-center mt-2">Already have an account? <Link as={Link} to={{pathname: '/login', state: { from: '/signup'}}}>Click here</Link> to log in.</p>
                        </Form>
                    </Card>
                   
                </Col>
            </Row>
        </>
   )
}