class Api::AuthController < Api::Controller

  def login
    user = User.find_by(username: auth_params[:username])
    if user
      if user.authenticate(auth_params[:password])
        token = encode_token(user_id: user.id)
        render json: { user: UserSerializer.new(user), token: token }, status: :accepted
      else
        render json: { message: "Invalid password" }, status: :unauthorized
      end
    else
      render json: { message: "User not found" }, status: :unauthorized
    end
  end

  private

  def auth_params
    params.permit(:username, :password)
  end
end
