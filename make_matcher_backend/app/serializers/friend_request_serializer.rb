class FriendRequestSerializer < ActiveModel::Serializer
  type :friend_request

  attributes :requestor_id, :requestee_id, :friend_name

  def friend_name
    object.requestor.username
  end
end
