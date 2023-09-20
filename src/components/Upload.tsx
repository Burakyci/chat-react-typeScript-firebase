import React, { ChangeEvent, useState } from "react";
import userService from "../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Upload: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadImage = async () => {
    if (imageUpload && user) {
      const urlRef = await userService.uploadProfilePhoto(
        imageUpload,
        user.uid
      );
      return urlRef;
    } else {
      alert("somethings is wrong");
    }
  };

  return (
    <div className="upload">
      <input
        className="myFileInput"
        style={{ color: "white" }}
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImageUpload(e.target.files ? e.target.files[0] : null)
        }
        accept="image/*"
      />
      <h2>{imageUpload?.name}</h2>
      <button className="uploadButton" onClick={() => uploadImage()}>
        upload image
      </button>
    </div>
  );
};

export default Upload;
