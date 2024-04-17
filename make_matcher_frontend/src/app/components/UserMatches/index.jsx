/**
 *
 * UserMatches
 *
 */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectMatches,
  selectLoading,
} from 'app/pages/HomePage/slice/selectors';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from '../TestComponent/testStyles.ts';
import avatar from '../../../images/avatar-200x200.png';

export function UserMatches(props) {
  const dispatch = useDispatch();
  const { actions } = useHomePageSlice();
  const matches = useSelector(selectMatches);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const token = useSelector(selectAcessToken);

  useEffect(() => {
    dispatch(actions.fetchMatchesRequest({ token }));
  }, [dispatch, actions, token]);

  const handleRejectMatch = matchId => {
    const isConfirmed = window.confirm(
      `Are you sure you want to remove match ID ${matchId} from the list?`,
    );
    if (isConfirmed) {
      dispatch(
        actions.rejectMatchRequest({
          matchId,
          token,
        }),
      );
    }
  };

  const handleSendFriendRequest = playerID => {
    const isConfirmed = window.confirm(
      `Are you sure you want to send friend request to Player ${playerID}?`,
    );
    if (isConfirmed) {
      dispatch(
        actions.createFriendRequestRequest({
          requestee_id: parseInt(playerID, 10),
          token,
        }),
      );
    }
  };

  return (
    <div
      style={{
        marginRight: '2rem',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundImage:
          'linear-gradient( 50deg, hsl(51deg 100% 45%) 0%, hsl(50deg 100% 45%) 4%, hsl(49deg 100% 45%) 9%, hsl(48deg 100% 46%) 13%, hsl(47deg 100% 46%) 17%, hsl(46deg 100% 46%) 22%, hsl(45deg 100% 46%) 26%, hsl(45deg 100% 46%) 30%, hsl(43deg 100% 47%) 35%, hsl(41deg 100% 47%) 39%, hsl(38deg 100% 48%) 43%, hsl(36deg 100% 48%) 48%, hsl(33deg 100% 49%) 52%, hsl(31deg 100% 49%) 57%, hsl(28deg 100% 50%) 61%, hsl(26deg 100% 50%) 65%, hsl(24deg 100% 50%) 70%, hsl(22deg 100% 50%) 74%, hsl(20deg 100% 50%) 78%, hsl(18deg 100% 50%) 83%, hsl(15deg 100% 50%) 87%, hsl(12deg 100% 50%) 91%, hsl(8deg 100% 50%) 96%, hsl(0deg 100% 50%) 100%',
        fontFamily: 'sans-serif',
        boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
        padding: '1.5rem 1.8rem',
        height: '80%',
        width: '40%',
      }}
    >
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '29rem',
          borderRadius: '16px',
          padding: '2rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          boxShadow:
            'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
          backgroundColor: '#eef2f5',
        }}
      >
        <h1 style={{ paddingBottom: '1rem' }}>PLAYER MATCHES</h1>
        <hr />
        <br />
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'auto',
            textAlign: 'left',
          }}
        >
          {matches && matches.length > 0 ? (
            <div>
              {matches.map(match => (
                <div key={match.id} style={{ fontSize: 'calc( .3rem + 1vw)' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    Name:&nbsp;
                    {match.matched.display_name}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '45%',
                        paddingRight: '2rem',
                      }}
                    >
                      <button
                        style={{
                          fontSize: 'calc( .3rem + .8vw)',
                          height: '3rem',
                          lineHeight: '100%',
                          borderRadius: '50px',
                          padding: '1rem 2rem',
                          margin: '.5rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow:
                            '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
                          fontWeight: '400',
                          background: 'transparent',
                          '&:focus': {
                            boxShadow:
                              'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
                          },
                        }}
                        onClick={() => handleRejectMatch(match.id)}
                        title="Click to Delete Recommended Match"
                      >
                        Remove Match
                      </button>
                      <button
                        style={{
                          fontSize: 'calc( .3rem + .8vw)',
                          height: '3rem',
                          lineHeight: '100%',
                          borderRadius: '50px',
                          padding: '.2rem .5rem',
                          margin: '.5rem',
                          border: 'none',
                          cursor: 'pointer',
                          boxShadow:
                            '5px 5px 10px rgba(0, 0, 0, 0.1), -5px -5px 10px #fff',
                          fontWeight: '400',
                          background: 'transparent',
                          '&:focus': {
                            boxShadow:
                              'inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff',
                          },
                        }}
                        onClick={() =>
                          handleSendFriendRequest(match.matched.user_id)
                        }
                        title="Click to Send Friend Request"
                      >
                        Send Friend Request
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <h5>Games in common:</h5>
                      {match.games.length === 0 && <>None</>}
                      {match.games.length !== 0 && (
                        <div>
                          {match.games.map((game, index) => (
                            <div key={index} style={{ fontSize: '1.5rem' }}>
                              <i>{game.title}</i>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <img
                      style={{
                        height: '8rem',
                        padding: '1rem',
                        paddingRight: '15%',
                        transformStyle: 'preserve-3d',
                        animation: 'spin-x 4s linear infinite',
                      }}
                      src={avatar}
                      alt="user-avatar"
                      className="user-image-placeholder"
                    />
                  </div>
                  <hr
                    style={{
                      margin: '10px 0',
                      border: 'none',
                      borderBottom: '1px solid #e0e0e0',
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p>No matches found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// const Div = styled.div``;

// {/* <div className="saved-careers flex flex-col items-center md:w-6/12 mx-auto px-0 shadow-md mb-8 rounded-xl"> */}
//   {/* <SavedCareers savedCareers={studentData['Saved Careers']} fullWidth /> */}
// {/* </div>; */}
