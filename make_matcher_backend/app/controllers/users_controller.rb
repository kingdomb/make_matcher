class UsersController < ApplicationController
  skip_before_action :authorized_user, only: [:create]

  def create
    user = User.create!(user_params)
    token = encode_token(user_id: user.id)
    render json: { user: UserSerializer.new(user), token: token }, status: :created
  end

  def current
    render json: UserSerializer.new(current_user), status: :ok
  end
  
  private

  def user_params
    params.permit(:username, :password)
  end
end
