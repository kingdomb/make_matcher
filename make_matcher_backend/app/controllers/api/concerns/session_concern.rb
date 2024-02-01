module Api::Concerns::SessionConcern
  SECRET_TOKEN = Rails.application.credentials.secret_token

  def encode_token(payload)
    JWT.encode(payload, SECRET_TOKEN)
  end

  def decoded_token
    header = request.headers["Authorization"]
    if header
      token = header.split(" ")[1]
      JWT.decode(token, SECRET_TOKEN)
    end
  rescue JWT::DecodeError
    nil
  end

  def current_user
    @current_user ||=
      if decoded_token
        user_id = decoded_token[0]["user_id"]
        User.find_by(id: user_id)
      end
  end

  def authorized_user
    render json: { message: "Unauthorized" }, status: :unauthorized unless current_user
  end
end
