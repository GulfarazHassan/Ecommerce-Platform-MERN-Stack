import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../compoenets/Message";
import Loader from "../compoenets/Loader";
import FormContainer from "../compoenets/FormContainer";
import { createProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Header from "../compoenets/Header1";

const ProductCreateScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("Appliances");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploading2, setUploading2] = useState(false);
  const [uploading3, setUploading3] = useState(false);

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.createProduct);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      history.push(`/admin/productlist`);
    }
  }, [successCreate, history]);

  const uploadFileHandler = async (e) => {
    console.log("Image upload data :: ");
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error("Error uplaoding image :: ", error);
      setUploading(false);
    }
  };

  const uploadFileHandler2 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading2(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage2(data);
      setUploading2(false);
    } catch (error) {
      console.error(error);
      setUploading2(false);
    }
  };

  const uploadFileHandler3 = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading3(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);
      setImage3(data);
      setUploading3(false);
    } catch (error) {
      console.error(error);
      setUploading3(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        image2,
        image3,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Header />
      <div style={{ margin: "3rem" }}>
        <Link to='/admin/productlist' className='btn btn-light my-3'>
          Go Back
        </Link>
        <FormContainer>
          <h1>Create Product</h1>
          {loadingCreate && <Loader />}
          {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image 2</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image2}
                onChange={(e) => setImage2(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler2}></Form.File>
              {uploading2 && <Loader />}
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image 3</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image3}
                onChange={(e) => setImage3(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler3}></Form.File>
              {uploading3 && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                onChange={(e) => setCategory(e.target.value)}>
                <option value='Appliances'>Appliances</option>
                <option value='Apps & Games'>Apps & Games</option>
                <option value='Arts, Crafts, & Sewing'>
                  Arts, Crafts, & Sewing
                </option>
                <option value='Automotive Parts & Accessories'>
                  Automotive Parts & Accessories
                </option>
                <option value='Baby'>Baby</option>
                <option value='Beauty & Personal Care'>
                  Beauty & Personal Care
                </option>
                <option value='Books'>Books</option>
                <option value='CDs & Vinyl'>CDs & Vinyl</option>
                <option value='Cell Phones & Accessories'>
                  Cell Phones & Accessories
                </option>
                <option value='Clothing, Shoes and Jewelry'>
                  Clothing, Shoes and Jewelry
                </option>
                <option value='Collectibles & Fine Art'>
                  Collectibles & Fine Art
                </option>
                <option value='Computers'>Computers</option>
                <option value='Electronics'>Electronics</option>

                <option value='Garden & Outdoor'>Garden & Outdoor</option>
                <option value='Grocery & Gourmet Food'>
                  Grocery & Gourmet Food
                </option>
                <option value='Handmade'>Handmade</option>
                <option value='Health, Household & Baby Care'>
                  Health, Household & Baby Care
                </option>
                <option value='Home & Kitchen'>Home & Kitchen</option>
                <option value='Industrial & Scientific'>
                  Industrial & Scientific
                </option>
                <option value='Kindle'>Kindle</option>
                <option value='Luggage & Travel Gear'>
                  Luggage & Travel Gear
                </option>
                <option value='Movies & TV'>Movies & TV</option>
                <option value='Musical Instruments'>Musical Instruments</option>
                <option value='Office Products'>Office Products</option>
                <option value='Pet Supplies'>Pet Supplies</option>
                <option value='Sports & Outdoors'>Sports & Outdoors</option>
                <option value='Tools & Home Improvement'>
                  Tools & Home Improvement
                </option>
                <option value='Toys & Games'>Toys & Games</option>
                <option value='Video Games'>Video Games</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit'>Create</Button>
          </Form>
        </FormContainer>
      </div>
    </>
  );
};

export default ProductCreateScreen;
