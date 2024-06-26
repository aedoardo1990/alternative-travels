import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Asset from "../../components/Asset";
import Spinner from "react-bootstrap/Spinner";
import 'react-toastify/dist/ReactToastify.css';
import { successToast, errorToast } from "../../components/Toasts";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function MarketCreateProduct() {
    useRedirect('loggedOut');

    const [marketplaceData, setMarketplaceData] = useState({
        title: '',
        price: '',
        status: '',
        condition: '',
        details: '',
        image: '',
        address: '',
        contact_number: '',
        email: '',
    });

    const { title, price, condition, status, details, image, address, contact_number, email } = marketplaceData;
    const imageInput = useRef(null);
    const history = useHistory();
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleChange = (event) => {
        setMarketplaceData({
            ...marketplaceData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setMarketplaceData({
                ...marketplaceData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setButtonDisabled(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price);
        formData.append('condition', condition);
        formData.append('status', status);
        formData.append('details', details);
        formData.append('address', address);
        formData.append('contact_number', contact_number);
        formData.append('email', email);
        formData.append('image', imageInput.current.files[0]);
        try {
            const { data } = await axiosReq.post('/marketplace/', formData);
            successToast("New item created successfully!");
            setButtonDisabled(false);
            history.push(`/marketplace/${data.id}`);
        } catch (err) {
            if (err.response.data.title) {
                // display if there are errors in title field
                errorToast(err.response.data.title[0]);
            } else if (err.response.data.image) {
                // display errors for image field
                errorToast(err.response.data.image[0]);
            } else if (err.response.data.price) {
                // display errors for price field
                errorToast(err.response.data.price[0]);
            } else if (err.response.data.condition) {
                // display errors for condition field
                errorToast(err.response.data.condition[0]);
            } else if (err.response.data.status) {
                // display errors for status field
                errorToast(err.response.data.status[0]);
            } else if (err.response.data.details) {
                // display errors for details field
                errorToast(err.response.data.details[0]);
            } else if (err.response.data.address) {
                // display errors for address field
                errorToast(err.response.data.address[0]);
            } else if (err.response.data.contact_number) {
                // display errors for contact number field
                errorToast(err.response.data.contact_number[0]);
            } else if (err.response.data.email) {
                // display errors for email field
                errorToast(err.response.data.email[0]);
            } else {
                errorToast("Oops, something went wrong!");
            }
            setButtonDisabled(false);
        }
    };

    const textFields = (
        <div className="text-center">
            {/* Create Post form  for Marketplace*/}

            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Condition</Form.Label>
                <Form.Control
                    as="select"
                    name="condition"
                    value={condition}
                    onChange={handleChange} >
                    <option>- Select an option -</option>
                    <option>New</option>
                    <option>Used like new</option>
                    <option>Used</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                    as="select"
                    name="status"
                    value={status}
                    onChange={handleChange} >
                    <option>- Select an option -</option>
                    <option>Available</option>
                    <option>Sold</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Details</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="details"
                    value={details}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    type="text"
                    name="address"
                    value={address}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Contact number</Form.Label>
                <Form.Control
                    type="number"
                    name="contact_number"
                    value={contact_number}
                    onChange={handleChange} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange} />
            </Form.Group>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="mt-4">
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label className={`${btnStyles.Button} ${btnStyles.Blue} btn`} htmlFor="image-upload">
                                            Change image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset src={Upload} message="Upload an image of the product" />
                                </Form.Label>
                            )}
                            <Form.File id="image-upload" accept="image/*" onChange={handleChangeImage} ref={imageInput} />
                        </Form.Group>
                    </Container>
                </Col>

                <Col md={5} lg={4} className="d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>
                        {textFields}
                        <div className="text-center">
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Black} mt-2`}
                            onClick={() => history.goBack()}
                        >
                            Delete
                        </Button>
                        <Button className={`${btnStyles.Button} ${btnStyles.Black} mt-2`} type="submit" disabled={buttonDisabled} >
                            {buttonDisabled ? <Spinner animation="grow" size="sm" /> : "Create"}
                        </Button>
                        </div>
                    </Container>
                </Col>
            </Row>
        </Form >
    );
}

export default MarketCreateProduct;