import React from 'react'
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { Button } from 'react-bootstrap';
import { useSetProfileData } from '../../contexts/ProfileDataContext';

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, following_id, image, owner } = profile;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div className={`my-3 d-flex align-items-center ${mobile && 'flex-column'}`}>
      <div className="d-flex align-items-center flex-grow-1">
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
          <div className={`mx-auto ${styles.WordBreak}`}>
            <strong>{owner}</strong>
          </div>
        </Link>
      </div>
      <div className={`text-right ${!mobile && 'ml-auto'}`}>
        {!mobile && currentUser && !is_owner && (
          following_id ? (
            <Button
              className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
              onClick={() => handleUnfollow(profile)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              className={`${btnStyles.Button} ${btnStyles.Black}`}
              onClick={() => handleFollow(profile)}
            >
              Follow
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Profile;