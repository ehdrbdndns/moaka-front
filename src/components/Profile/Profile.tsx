import React from 'react';
import { ProfileProps } from './type';

function Profile(data: ProfileProps) {
  return (
    <>
      <figure className={'profile ' + data.size}>
        <img src={data.src} alt="Profile" />
        {data.notification && (
          <figure className="profile__alert">
            <img src="/img/svg/profile-alert.svg" alt="Alert" />
          </figure>
        )}
      </figure>
    </>
  );
}

Profile.defaultProps = {
  size: 's',
  src: '/img/test/user-test.png',
  notification: false,
};

export default Profile;
