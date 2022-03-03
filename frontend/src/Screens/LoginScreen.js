import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import FormContainer from '../Components/FormContainer'
import { login } from '../Actions/UserAction'

const LoginScreen = () => {
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const submitHandler = (e) => [
        e.preventDefault()
        // Dispatch Login
    ]
    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={{ submitHandler }}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                        value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control type='password' placeholder='Enter Password'
                        value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register</Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default LoginScreen