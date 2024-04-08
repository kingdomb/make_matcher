/* --- STATE --- */
export interface HomePageState {
  profile: Profile | null;
  loading: boolean;
  error: ErrorType | null;
  updateSuccess: boolean | null;
  /*-- Friend Requests --*/
  friendRequests: FriendRequest[] | null;
  recentFriendRequest: FriendRequest | null;
  recentFriendRequestID: number | null;
  /*-- Friends --*/
  friends: Friend[] | null;
  recentCreateFriend: Friend | null;
  /*-- Match --*/
  matches: Match[] | null;
  /*-- Group --*/
  allGroups: Group[] | null;
  userGroups: Group[] | null;
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

export interface Group {
  id: number;
  name: string;
  users: number[];
}

export interface FetchAllGroupsPayload {
  token: string;
}

export interface FetchUserGroupsPayload {
  token: string;
}

export interface CreateGroupPayload {
  name: string;
  token: string;
}

export interface DeleteGroupPayload {
  groupId: number;
  token: string;
}

export interface AddGroupMemberPayload {
  groupId: number;
  token: string;
}

export interface RemoveGroupMemberPayload {
  groupId: number;
  token: string;
}

/*-- General --*/

export interface ErrorType {
  statusCode: string;
  errorMessage: string;
}
