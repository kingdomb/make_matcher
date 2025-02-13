/* eslint-disable @typescript-eslint/no-unused-vars */
import { FooterComponent } from 'app/components/FooterComponent/Loadable';
import { HeaderComponent } from 'app/components/HeaderComponent/Loadable';
import { UserProfileComponent } from '../../components/UserProfileComponent';
import { FriendsList } from '../../components/FriendsList';
import { UserMatches } from '../../components/UserMatches';
import { GroupsList } from '../../components/GroupsList';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>TestPage</title>
        <meta name="description" content="Make Matcher Team 1" />
      </Helmet>

      <HeaderComponent />
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'top',
          marginBottom: '20rem',
        }}
      >
        <div
          className="upper-container"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            paddingTop: '8vh',
          }}
        >
          <UserProfileComponent />
          <UserMatches />
        </div>
        <div
          className="lower-container"
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'top',
            marginTop: '2rem',
            marginLeft: '2rem',
            height: '30%',
          }}
        >
          <GroupsList />
          <div
            style={{
              width: '30%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginRight: '4rem',
            }}
          >
            <FriendsList />
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
