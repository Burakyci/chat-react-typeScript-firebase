import React from "react";
import Upload from "../components/Upload";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../state/store";

const MyProfile: React.FC = () => {
  const { myProfile } = useSelector((state: RootState) => state.userSlice);
  const { user } = useSelector((state: RootState) => state.authSlice);
  const navi = useNavigate();
  console.log("there is my profile");

  return (
    <div>
      <div className="profile-card">
        <div className="profile-card__header">
          <img
            className="profile-card__header__image"
            src={myProfile.data?.profilePhoto}
            alt="Profile"
          />
          <h2 className="profile-card__header__title">{`${myProfile.data?.lastName.toLocaleUpperCase()} ${myProfile.data?.lastName.toLocaleUpperCase()}`}</h2>
        </div>
        <div className="profile-card__content">
          <div className="profile-card__content__item">
            <span className="profile-card__content__item__label">Email:</span>
            <span className="profile-card__content__item__value">
              {user?.email}
            </span>
          </div>
          <div className="profile-card__content__item">
            <span className="profile-card__content__item__label">Phone:</span>
            <span className="profile-card__content__item__value"></span>
          </div>
          <div className="profile-card__content__item">
            <span className="profile-card__content__item__label">Bio:</span>
            <span className="profile-card__content__item__value">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit
              voluptatem fuga voluptatum!
            </span>
          </div>
          <button
            onClick={async () => {
              await navi("/");
            }}
          >
            update profile
          </button>
        </div>
        <Upload />
      </div>
    </div>
  );
};

export default MyProfile;
