import React, { useState } from "react";
import { Image } from "@chakra-ui/react";
import "./avatar-input.css";

const AvatarInput = ({register}) => {
  const [image, setImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
  );

  const userImageField = register("photo", { required: false })

  const handleFileChange = (event) => {
    userImageField.onChange(event)
    const target = event.target;
    const value = target.files[0];
    let file = URL.createObjectURL(value);


    setImage(file);
  };



  return (
    <div className="image">
      <label className="label">
        <input {...userImageField} type="file" onChange={handleFileChange} />
        <figure className="figure">
          <img
            src={image}
            accept="image/*"
            multiple={false}
            className="avatar"
          />
          <figcaption className="figcaption">
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
};

export default AvatarInput;
