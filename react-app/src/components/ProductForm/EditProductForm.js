import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editProduct, uploadFile } from "../../store/products";
import ImageUploading from "react-images-uploading";
import { ModalContext } from "../../context/ModalContext";

import "./ProductForm.css";

const EditProductForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productId } = useParams();

  const user = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.products[productId]);
  let { handleModal, setModal } = useContext(ModalContext);

  const [title, setTitle] = useState(product?.title);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [shippingPrice, setShippingPrice] = useState(product?.shipping_price);
  const [categoryId, setCategoryId] = useState(product?.category_id);
  const [images, setImages] = useState("");

  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let images = product?.images.map((image) => {
      return { data_url: image };
    });
    setImages(images);
  }, [ product ]);

  useEffect(() => {
    const errors = [];
    if (!title) {
      errors.push("Title is required");
    }
    if (!description) {
      errors.push("Description is required");
    }
    if (!price) {
      errors.push("Price is required");
    }
    if (price && price < 0) {
      errors.push("Price must be greater than 0");
    }
    if (!shippingPrice) {
      errors.push("Shipping Price is required");
    }
    if (shippingPrice && shippingPrice < 0) {
      errors.push("Shipping Price must be greater than 0");
    }
    if (categoryId === 0) {
      errors.push("Category is required");
    }
    if (!images.length) {
      errors.push("At least one image is required");
    }
    setValidationErrors(errors);
  }, [title, description, price, shippingPrice, categoryId, images]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return;

    const data = {
      user_id: user.id,
      title,
      description,
      category_id: categoryId,
      price,
      shipping_price: shippingPrice,
      sold: false,
    };

    await dispatch(editProduct(data, product.id));

    await addImages(images, product.id);

    handleModal(
      <div className="products-card__modalbg">
        <div className="products-card__modal">
          <p>Item Modified Successfully</p>
        </div>
      </div>
    );

    setValidationErrors([]);
    setHasSubmitted(false);

    setTimeout(() => {
      history.push("/myaccount");
      setModal(false);
    }, 3000);
  };

  const addImages = async (images, product_id) => {
    for (let x = 0; x < images.length; x++) {
      let image = images[x];

      let newFile = false;
      let file;

      if (image.file) {
        newFile = true;
        file = image.file;
      } else {
        file = image.data_url;
      }

      const obj = {
        file: file,
        product_id: product_id,
        newFile: newFile,
      };

      await dispatch(uploadFile(obj));
    }
  };

  return (
    <div className="product-form__container">
      <h2>List Your Furniture</h2>
      <p>All Fields are Required</p>
      <form className="product-form" onSubmit={handleSubmit}>
        <label className="label">Title:</label>
        <input
          name="title"
          type="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <label className="label">Description:</label>
        <textarea
          className="product-form__description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label className="label">Category:</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="product-form__category"
        >
          <option value="0">Choose a Category</option>
          <option value="1">Bedroom</option>
          <option value="2">Dining Room</option>
          <option value="3">Living Room</option>
          <option value="4">Office</option>
          <option value="5">Outdoor</option>
          <option value="6">Other</option>
        </select>

        <label className="label">Price:</label>

        <input
          className="product-form__price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <label className="label">Shipping Price:</label>
        <input
          className="product-form__shippingprice"
          type="number"
          value={shippingPrice}
          onChange={(e) => setShippingPrice(e.target.value)}
        ></input>

        <div className="product-form__input" id="imageUploadSection">
          <h3 className="product-form__imagesheader">Images:</h3>
          <div className="product-form__imagecontainer">
            <ImageUploading
              multiple
              value={images}
              onChange={(imageList) => setImages(imageList)}
              maxNumber={20}
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
                <div className="product-form__uploadimage">
                  <div
                    style={
                      isDragging ? { color: "rgb(192, 53, 22)" } : undefined
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                    className="product-form__addimages"
                  >
                    Click or Drag Images Here
                  </div>
                  <div className="product-form__images">
                    {imageList.map((image, index) => (
                      <div key={index}>
                        <img src={image["data_url"]} alt="" height="230" />
                        <div className="products-card__modifybtns">
                          <div
                            className="edit-btn"
                            onClick={() => onImageUpdate(index)}
                          >
                            Change
                          </div>
                          <div
                            className="delete-btn"
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
            </ImageUploading>
          </div>

          {hasSubmitted && validationErrors.length > 0 && (
            <div className="errors__container">
              <div className="errors">
                The following errors were found:
                <ul>
                  {validationErrors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="product-form__btndiv">
            <button className="product-form__btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductForm;
