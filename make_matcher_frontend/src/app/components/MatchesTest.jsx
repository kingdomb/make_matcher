import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHomePageSlice } from 'app/pages/HomePage/slice';
import {
  selectError,
  selectMatches,
  selectLoading,
} from 'app/pages/HomePage/slice/selectors';
import { selectAcessToken } from 'app/pages/AuthPage/slice/selectors';
import { testStyles } from './TestComponent/testStyles';

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
    dispatch(
      actions.rejectMatchRequest({
        matchId,
        token,
      }),
    );
  };

  return (
    <div>
      <h4>MATCHES Test Component</h4>
      <br />
      <h4>Matches List:</h4>
      <div style={testStyles.listmatches}>
        {matches && matches.length > 0 ? (
          <ul>
            {matches.map(match => (
              <div key={match.id} style={{ fontSize: 12 }}>
                <button
                  style={testStyles.buttonRed}
                  onClick={() => handleRejectMatch(match.id)}
                >
                  X
                </button>
                <u>
                  {`Match ID: ${match.id}, Name: ${match.matched.display_name}`}
                </u>

                <div>
                  <h5>Games in common:</h5>
                  {match.games.length === 0 && <>None</>}
                  {match.games.length !== 0 && (
                    <div>
                      {match.games.map(game => (
                        <div key={game.id} style={{ fontSize: 11 }}>
                          * {game.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No matches found.</p>
        )}
      </div>
    </div>
  );
};

export default MatchesTest;
