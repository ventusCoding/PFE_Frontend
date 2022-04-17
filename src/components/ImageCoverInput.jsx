import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import "./image-cover.css";

export default function ImageCoverInput({ register, oldImage }) {
  const [image, setImage] = useState(
    `/backend/img/models/${oldImage}`
  );

  const userImageField = register("imageCover", { required: false });

  const handleFileChange = (event) => {
    userImageField.onChange(event);
    const target = event.target;
    const value = target.files[0];
    let file = URL.createObjectURL(value);

    setImage(file);
  };

  return (
    <div className="imagea">
      <label className="labela">
        <input {...userImageField} type="file" onChange={handleFileChange} />
        <figure className="figurea">
          <img
            src={image}
            accept="image/*"
            multiple={false}
            className="avatara"
          />
          <figcaption className="figcaptiona">
            <Image
              src={`${import.meta.env.VITE_APPDOMAIN}/add_image.png`}
              mx="auto"
              p="2"
            />
          </figcaption>
        </figure>
      </label>
    </div>
  );
}
