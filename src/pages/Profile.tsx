import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../state/store";
import userService from "../services/userService";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.authSlice);
  const navi = useNavigate();
  const [userData, setUserData] = React.useState<any>();
  let { userId } = useParams();
  React.useEffect(() => {
    (async () => {
      if (userId) {
        try {
          const getUser = await userService.getUser(userId);

          setUserData(getUser);
        } catch (error: any) {
          alert(error.message);
        }
      }
    })();
  }, []);

  console.log(userData);
  console.log(userId);
  return (
    <div>
      burak{userId}
      {userData && (
        <div className="profile-card">
          <div className="profile-card__header">
            <img
              className="profile-card__header__image"
              src={userData.data?.profilePhoto}
              alt="Profile"
            />
            <h2 className="profile-card__header__title">
              {`${userData.data?.lastName.toLocaleUpperCase()} ${userData.data?.lastName.toLocaleUpperCase()}`}
            </h2>
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
              Let's Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
