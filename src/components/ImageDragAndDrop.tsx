import React, { ChangeEvent, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface DragAndDropImageProps {
  setImageLink: (link: string) => void;
  imageLink: string | undefined;
}

const DragAndDropImage: React.FC<DragAndDropImageProps> = ({
  setImageLink,
  imageLink,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const validImageTypes = ["image/jpeg", "image/png"];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer?.files[0];
    if (file && validImageTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;

        setImageLink(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0] && validImageTypes.includes(files[0].type)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;

        setImageLink(result);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      sx={{
        border: "2px dashed #cccccc",
        borderRadius: "4px",
        padding: "16px",
        textAlign: "center",
        backgroundColor: dragOver ? "#f0f0f0" : "#ffffff",
        transition: "background-color 0.2s",
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: "16px" }}>
        Drag & Drop an image here or click to select
      </Typography>
      <input
        type="file"
        accept="image/jpeg,image/png"
        style={{ display: "none" }}
        id="upload-image"
        onChange={handleChange}
      />
      <label htmlFor="upload-image">
        <Box
          component="span"
          sx={{
            display: "inline-block",
            padding: "8px 16px",
            border: "1px solid #cccccc",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Click to select
        </Box>
      </label>
      {imageLink && (
        <Box sx={{ marginTop: "16px", height: "250px", position: "relative" }}>
          <Image src={imageLink} fill objectFit="contain" alt="Uploaded" />
        </Box>
      )}
    </Box>
  );
};

export default DragAndDropImage;
