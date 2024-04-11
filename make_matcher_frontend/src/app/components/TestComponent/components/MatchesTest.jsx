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
import { testStyles } from '../testStyles';

const MatchesTest = () => {
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
    <div>
      <h4>MATCHES</h4>
      <br />
      <h4>Match Recommendations:</h4>
      <div style={testStyles.listmatches}>
        {matches && matches.length > 0 ? (
          <div>
            {matches.map(match => (
              <div key={match.id} style={{ fontSize: 12 }}>
                <button
                  style={testStyles.buttonRed}
                  onClick={() => handleRejectMatch(match.id)}
                  title="Click to Delete Recommended Match"
                >
                  ×
                </button>
                <u>{`Match ID: ${match.id}`}</u>
                <div>
                  <b>Player ID: {match.matched.user_id}</b>
                  <button
                    style={{ ...testStyles.buttonGreen, marginLeft: '10px' }}
                    onClick={() =>
                      handleSendFriendRequest(match.matched.user_id)
                    }
                    title="Click to Send Friend Request"
                  >
                    Friend Request
                  </button>
                </div>
                <div>
                  Name:
                  {match.matched.display_name}
                </div>
                <div>
                  <h5>Games in common:</h5>
                  {match.games.length === 0 && <>None</>}
                  {match.games.length !== 0 && (
                    <div>
                      {match.games.map((game, index) => (
                        <div key={index} style={{ fontSize: 11 }}>
                          <i>{game.title}</i>
                        </div>
                      ))}
                    </div>
                  )}
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
  );
};

export default MatchesTest;
