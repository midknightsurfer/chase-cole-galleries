import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProduct, uploadFile } from "../../store/products";
import ImageUploading from "react-images-uploading";

import "./ProductForm.css";

const EditProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const { productId } = useParams();
  const product = useSelector((state) => state.products[productId]);

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price + ".00");
  const [shippingPrice, setShippingPrice] = useState(
    product?.shipping_price + ".00"
  );
  const [categoryId, setCategoryId] = useState(product?.category_id);
  const [validationErrors, setValidationErrors] = useState([]);
  // const [images, setImages] = useState("");

  // useEffect(() => {
  //   let images = product?.images.map((image) => {
  //     return { data_url: image };
  //   });
  //   setImages(images);
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationErrors.length > 0) {
      return;
    }

    // let cleanImages = images?.map((image) => image.file);

    const data = {
      user_id: user.id,
      title,
      description,
      category_id: categoryId,
      price,
      shipping_price: shippingPrice,
    };

    const productData = await dispatch(editProduct(data, product.id));

    // await addImages(cleanImages, product.id);
    history.push("/");
  };

  useEffect(() => {
    const errors = [];
    setValidationErrors(errors);
  }, [title, description]);

  // const addImages = async (images, product_id) => {
  //   for (let x = 0; x < images.length; x++) {
  //     let image = images[x];
  //     console.log(image)
  //     let newFile = false;
  //     let file;


  //     if (image?.file) {
  //       newFile = true;
  //       file = image?.file;
  //     } else {
  //       file = image?.data_url;
  //     }

  //     const obj = {
  //       file: file,
  //       product_id: product_id,
  //       newFile: newFile,
  //     };

  //     await dispatch(uploadFile(obj));
  //   }
  // };

  return (
    <div className="product__form-container">
      <h3>Edit Your Furniture:</h3>
      <form className="product__form" onSubmit={handleSubmit}>
        <div>
          <label className="label">Title:</label>
          <input
            name="title"
            type="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          ></input>

          <label className="label">Description:</label>
          <textarea
            className="product__form-description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <label className="label">Category:</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="product__form-category"
          >
            <option value="0">Choose a Category</option>
            <option value="1">Bedroom</option>
            <option value="2">Dining Room</option>
            <option value="3">Living Room</option>
            <option value="4">Office</option>
            <option value="5">Outdoor</option>
            <option value="6">Other</option>
          </select>

          <div className="product__form-prices">
            <label className="label">Price:</label>
            <input
              class="product_price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            ></input>
            <label className="label">Shipping Price:</label>
            <input
              class="shipping_price"
              type="number"
              value={shippingPrice}
              onChange={(e) => setShippingPrice(e.target.value)}
              required
            ></input>
          </div>
        </div>
        <div className="form_input_section" id="imageUploadSection">
          <div className="field_section_container">
            {/* <h3 className="imagesHeader">Images:</h3> */}
            <div className="erro_container_div">
              <ul className="erro_container">
                {validationErrors.length > 0 &&
                  validationErrors.map((error) => (
                    <li className="erro" key={error} style={{ color: "red" }}>
                      {error}
                    </li>
                  ))}
              </ul>
            </div>
            {/* <div className="imageUploadContainer">
              <ImageUploading
                multiple
                value={images}
                onChange={(imageList) => setImages(imageList)}
                maxNumber={80}
                dataURLKey="data_url"
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageRemoveAll,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
                }) => (
                  <div className="upload__image-wrapper">
                    <div
                      style={
                        isDragging ? { color: "rgb(192, 53, 22)" } : undefined
                      }
                      onClick={onImageUpload}
                      {...dragProps}
                      className="add_images_container"
                    >
                      Add or Drag Images Here
                    </div>
                    {/* <div onClick={onImageRemoveAll}>Remove all images</div> */}
                    {/* <div className="images_container">
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img src={image["data_url"]} alt="" height="230" />
                          <div className="editPhotoButtons">
                            <div
                              className="change_image"
                              onClick={() => onImageUpdate(index)}
                            >
                              Change
                            </div>
                            <div
                              className="remove_image"
                              onClick={() => onImageRemove(index)}
                            >
                              Remove
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ImageUploading>{" "}
            </div> */}
          </div>
          <div className="product__form-btndiv">
            <button className="product__form-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;