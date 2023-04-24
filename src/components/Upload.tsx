import React, { ChangeEvent, useState, useEffect } from "react";
import userService from "../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Upload: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const [imageUpload, setImageUpload] = useState<File | null>(null);

  const uploadImage = async () => {
    if (imageUpload) {
      const urlRef = await userService.uploadProfilePhoto(
        imageUpload,
        user.uid
      );
      return urlRef;
    } else {
      alert("somethings is wrong");
    }
  };
  useEffect(() => {
    (async () => {
      await userService.deletedBeforePhoto(user.uid);
    })();
  }, []);

  return (
    <div>
      <input
        style={{ color: "white" }}
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImageUpload(e.target.files ? e.target.files[0] : null)
        }
        accept="image/*"
      />
      <h2>{imageUpload?.name}</h2>
      <button onClick={() => uploadImage()}>upload image</button>
    </div>
  );
};

export default Upload;
