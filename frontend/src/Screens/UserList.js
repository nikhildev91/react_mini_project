import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import { listUsers, deleteUser, blockUser } from '../Actions/UserAction'

const UserList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, successDelete, userInfo])

    const blockHandler = (id) => {
        if (window.confirm('do you want to block this user')) {
            if (id === '621f4d9019897dadd555a9da') {
                alert('cannot block admin')
            } else {
                window.location.reload()
                dispatch(blockUser(id))
            }
        }
    }

    const deleteHandler = (id) => {
        if (window.confirm('Are your sure ? ')) {
            dispatch(deleteUser(id))
        }

    }
    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Admin</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>
                                        {user.isAdmin ? (<i className='fas fa-check' style={
                                            { color: 'green' }
                                        }></i>) : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}
                                    </td>
                                    <td>
                                        {user.isActive ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                            <i className='fas fa-times' style={{ color: 'red' }}></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm' >
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() =>
                                            deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => blockHandler(user._id)}
                                        >
                                            block / unblock user
                                        </Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}

        </>
    )
}

export default UserList