class ApplicationController < ActionController::API
  SECRET_TOKEN = "abc123" # TODO: put me in a secrets file

  before_action :authorized_user

  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

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
    if !current_user
      render json: { message: "Unauthorized" }, status: :unauthorized
    end
  end

  def invalid_record(ex)
    render json: { message: ex.record.errors.full_messages }, status: :unprocessable_entity
  end

  def not_found(ex)
    render json: { message: "Not found" }, status: :not_found
  end
end
