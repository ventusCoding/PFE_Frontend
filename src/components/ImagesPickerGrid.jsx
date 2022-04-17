import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Grid,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import "./gallery-input.css";

import { buttonAddItemColor } from "../helpers/Colors";

export default function ImagesPickerGrid({ register, oldValues,setArrayToPass,arrayToPass }) {

  let defaultValues = [];
  if (oldValues) {
    defaultValues = oldValues.map((el) => `/backend/img/models/${el}`);

  }

  useEffect(() => {
    setArrayToPass( oldValues);
  },[])


  const [images, setImages] = useState(defaultValues);


  const imageCoverField = register("images", { required: false });

  function inputClickHandler() {
    let input = document.getElementById("inputGallery");
    input.click();
  }

  const handleImgeFilesChange = (event) => {
    imageCoverField.onChange(event);
    let imagesUploaded = [];
    let imagesFilter = [];
    const target = event.target;

    const values = target.files;

    for (let i = 0; i < values.length; i++) {
      let file = URL.createObjectURL(values[i]);
      imagesUploaded.push(file);
      imagesFilter.push(values[i].name);
    }

    const concatValues = [...images, ...imagesUploaded];
    const concatValues2 = [...arrayToPass, ...imagesFilter];

    setImages(concatValues);
    setArrayToPass(concatValues2)
  };

  const handleDeleteImage = (index) => {
    let imagesUploaded = [...images];
    let imagesFilter = [...arrayToPass];
    imagesUploaded.splice(index, 1);
    imagesFilter.splice(index, 1);

    setImages(imagesUploaded);

    setArrayToPass(imagesFilter)
  };

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={0}>
      <Center cursor="pointer" py={2}>
        <Box
          onClick={inputClickHandler}
          role={"group"}
          maxW={"100px"}
          height={"100px"}
          w={"full"}
          borderWidth="5px"
          borderRadius="lg"
          borderColor={buttonAddItemColor}
          boxShadow={"2xl"}
          rounded={"xl"}
          pos={"relative"}
          _hover={{
            transform: "scale(1.1)",
            transition: "all .3s ease",
          }}
        >
          <input
            {...imageCoverField}
            id="inputGallery"
            className="gallery"
            type="file"
            multiple={true}
            onChange={handleImgeFilesChange}
          />
          <Center>
            <AddIcon
              rounded={"lg"}
              src=""
              color={buttonAddItemColor}
              padding={3}
              height="50px"
              width="50px"
              objectFit={"cover"}
            />
          </Center>

          <Stack pt={2} align={"center"}>
            <Text
              color={buttonAddItemColor}
              fontSize={"12px"}
              textTransform={"uppercase"}
            >
              Select Images
            </Text>
          </Stack>
        </Box>
      </Center>
      {images.map((item, index) => (
        <Box
          key={index}
          marginTop={2.5}
          maxW={"100px"}
          height={"100px"}
          maxH={"100px"}
          w={"full"}
          bg="white"
          position="relative"
          _hover={{
            transform: "scale(1.1)",
            transition: "all .3s ease",
          }}
        >
          <Image src={item} borderRadius="xl" />
          <Center>
            <IconButton
              position="absolute"
              top="1"
              right="1"
              colorScheme="red"
              borderRadius="full"
              size="xs"
              icon={<SmallCloseIcon onClick={() => handleDeleteImage(index)} />}
            />
          </Center>
        </Box>
      ))}
    </Grid>
  );
}
