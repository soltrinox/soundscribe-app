import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import axios from 'axios'; // Import axios library
import '../App.css';
import background from '../media/bg1.jpg';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    const authenticate = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const result = response.data;
            if (result.accessToken !== "undefined") {
                localStorage.setItem('accessToken', result.accessToken);

                setUser({
                    accessToken: result.accessToken
                });

                Swal.fire({
                    title: 'Login Successful!',
                    icon: 'success',
                    text: 'Welcome to Soundscribe'
                });

                axios.get(`${process.env.REACT_APP_API_URL}/users/details`, {
                    headers: {
                        Authorization: `Bearer ${result.accessToken}`
                    }
                }).then(response => {
                    const result = response.data;
                    if (result.user) {
                        localStorage.setItem('regularUser', true);

                        setUser({
                            accessToken: null,
                            firstName: result.firstName,
                            regularUser: true
                        });
                    }
                }).catch(error => {
                    console.error("An error occurred:", error);
                });

            } else {
                Swal.fire({
                    title: 'Authentication Failed',
                    icon: 'error',
                    text: 'Something went wrong, please check your details'
                });
            }
            setEmail('');
            setPassword('');
        }).catch(error => {
            console.error("An error occurred:", error);
        });
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

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