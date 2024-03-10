import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import  getUser  from "./../redux/actions/userAction"
import getOrder from "./../redux/actions/orderAction"

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.getUser).user.userDetails;
    if (!user.authtoken) {
        navigate("/login");
    }
    const logout = ()=>{
        dispatch(getUser({}));
        dispatch(getOrder({}));
        navigate("/login");
        toast.success("Logout Successful");
    }
    return (
        <Container>
            <Row className="mt-5">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h2>Profile Information</h2>
                        </Card.Header>
                        <Card.Body>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Email Verified:</strong> {user.isEmailVerified ? 'Yes' : 'No'}</p>
                            <p><strong>Joined Date:</strong> {new Date(user.date).toLocaleDateString()}</p>
                        </Card.Body>
                        <button className="btn btn-primary mx-2" role="button" onClick={logout} >Logout</button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile
