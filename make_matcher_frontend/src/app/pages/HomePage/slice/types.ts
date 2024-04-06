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

  /*--  --*/
  /*--  --*/
  /*--  --*/
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

/*--  --*/

/*--  --*/

/*--  --*/

export interface ErrorType {
  statusCode: string;
  errorMessage: string;
}
