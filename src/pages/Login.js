import React, {useState, useEffect, useContext} from 'react'
import {  Form, Button, Card, Row, Col } from 'react-bootstrap'
import { useNavigate, Navigate, Link, Redirect, useHistory } from 'react-router-dom'
import UserContext from '../UserContext'
import Swal from 'sweetalert2'
import '../App.css'
import background from '../media/bg1.jpg'




export default function Login(){
    // const history = useHistory()
    const {user, setUser, unsetUser} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [willRedirect, setWillRedirect] =useState(false)
    // const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const [isActive, setIsActive] = useState(false)


    function authenticate(event){
        event.preventDefault()

        // setIsLoading(true)

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => response.json())
          .then(result => {
            if(result.accessToken !== "undefined"){
                localStorage.setItem('accessToken', result.accessToken)
                // retrieveUser(result.accessToken)
                setUser({
                    accessToken: result.accessToken 
                })

                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    text: 'Welcome to Soundscribe'
                })
           
                fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${result.accessToken}`
                    }
                })
                .then(response => response.json())
                .then(result => {
                    if(result.user){
                        localStorage.setItem('regularUser', true)

                        setUser({
                            accessToken: null,
                            firstName: result.firstName,
                            regularUser: true
                        })
                        // navigate('/user')
                    }
                    
                })

            }else {
                Swal.fire({
                    title: 'Authentication Failed',
                    icon: 'error',
                    text: 'Something went wrong, please check your details'
                })
            }
            setEmail('')
            setPassword('')
         

          })
    }
    
    useEffect(() => {
		if((email !== '' && password !== '')) {
			// Enables the submit button if the form data has been verified
			setIsActive(true)
		} else {
			setIsActive(false)
		}
	}, [email, password])

    return(
       
        (user.id !== null ) ?
            <Navigate to="/user"></Navigate>
        :
          <>
            
            <Row className='loginbg' style={{backgroundImage: `url(${background}` }}>
            
                <Col className="d-flex justify-content-center mt-5 mb-3">
               
                    <Card className="cardlogin">
                        <Form onSubmit={authenticate} className='formlogin text-white'>
                        <Card.Header className="logintext" > <h1 className="soundtext">Sound<span className="scribetext">scribe</span></h1><h3>Login</h3></Card.Header>
                        <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your Email"
                                        required
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your Password"
                                        required
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                    />
                                </Form.Group>
                        </Card.Body>
                        {/* <Button className="loginbtn" variant="secondary" type="submit"  disabled>Login</Button> */}
                        <Card.Footer>

			        {	isActive ? 
			        	<Button variant="secondary" type="submit" id="submitBtn">
			        	Submit
			        	</Button>
			        	:
			        	<Button variant="secondary" type="submit" id="submitBtn" disabled>
			        	Submit
			        	</Button>
			        }


                            {/* {isActive ? 
                                <Button className="loginbtn" variant="primary" type="submit"  disabled={isLoading}>
                                    {
                                        isLoading ? 'Loading..' : 'Login'
                                    }
                                </Button>
                                :
                                <Button variant="primary" type="submit" className="loginbtn" disabled>Login</Button>
                            }   */}
                        </Card.Footer>
                        <p className="text-center mt-2">Don't have an account yet? <Link as={Link} to={{pathname: '/signup', state: { from: '/'}}}>Click here</Link> to signup.</p>
                        </Form>
                    </Card>
                </Col>
            </Row>
         </> 
         
    )
 
}