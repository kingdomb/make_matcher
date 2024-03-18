class FriendSerializer < ActiveModel::Serializer
  type :friend

  attributes :source_id, :destination_id, :friend_name

  def friend_name
    object.destination.username
  end
end
