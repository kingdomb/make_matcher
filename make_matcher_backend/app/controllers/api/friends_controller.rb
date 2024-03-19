class Api::FriendsController < Api::Controller
  before_action :authorized_user

  def create
    friend = Friend.find_or_create_by!(friend_params.merge(source_id: current_user.id))

    render json: { friend: FriendSerializer.new(friend) }, status: :created
  end
  
  def index
    render json: { friends: current_user.friends }, each_serializer: FriendSerializer
  end

  def destroy
    Friend.where(friend_params.merge(source_id: current_user.id)).destroy_all

    render json: { message: "Success" }, status: :ok
  end

  private

  def friend_params
    params.permit(:destination_id)
  end
end
