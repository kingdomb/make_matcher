/* --- STATE --- */
export interface HomePageState {
  profile: Profile | null;
  loading: boolean;
  error: ErrorType | null;
  updateSuccess: boolean;
  /*-- Friend Requests --*/
  friendRequests: FriendRequest[] | null;
  recentFriendRequest: FriendRequest | null;
  /*-- Friends --*/
  friends: Friend[] | null;
  recentCreateFriend: Friend | null;
  /*-- Match --*/
  matches: Match[] | null;
  /*-- Group --*/
}

export interface Profile {
  display_name: string;
  zip_code: string;
  date_of_birth: string;
  intensity: number;
  skill: number;
  language: number;
  days: string[];
  times: string[];
  games: number[];
}

export interface ProfileUpdatePayload {
  profileData: Profile;
  token: string;
}

/*-- Friend Requests --*/

export interface FriendRequest {
  id: number;
  requestee_id: number;
  requestor_id: number;
  friend_name?: string;
}

export interface FetchFriendRequestsPayload {
  token: string;
}

export interface CreateFriendRequestPayload {
  requestee_id: number;
  token: string;
}

export interface DeleteFriendRequestPayload {
  requestId: number;
  token: string;
}

/*-- Friends --*/
export interface Friend {
  id: number;
  source_id: number;
  destination_id: number;
  friend_name?: string;
}

export interface FetchFriendsPayload {
  token: string;
}

export interface CreateFriendPayload {
  destination_id: number;
  token: string;
}

export interface DeleteFriendPayload {
  friendId: number;
  token: string;
}

/*-- Match --*/
export interface Match {
  id: number;
  matched_id: number;
  games: Game[];
  matched: {
    display_name: string;
    zip_code: string;
    date_of_birth: string;
    intensity: number;
    skill: number | null;
    language: number;
    days: string[];
    times: string[];
    games: number[];
  };
}

interface Game {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface FetchMatchesPayload {
  token: string;
}

export interface RejectMatchPayload {
  matchId: number;
  token: string;
}

/*-- Group --*/

/*-- General --*/

export interface ErrorType {
  statusCode: string;
  errorMessage: string;
}
