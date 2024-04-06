class Api::FriendRequestsController < Api::Controller
  before_action :authorized_user

  def create
    friend_request = FriendRequest.find_or_create_by!(friend_request_params.merge(requestor_id: current_user.id))

    render json: { friend_request: FriendRequestSerializer.new(friend_request) }, status: :created
  end
  
  def index
    render json: { friend_requests: current_user.friend_requests.map {|r| FriendRequestSerializer.new(r) } }
  end

  def destroy
    FriendRequest.where(requestee_id: current_user.id, requestor_id: params[:id]).destroy_all

    render json: { message: "Success" }, status: :ok
  end

  private

  def friend_request_params
    params.permit(:requestee_id)
  end
end
