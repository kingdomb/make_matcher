class Api::Controller < ApplicationController
  before_action :validate_request!

  def status
    render json: { status: "Online" }
  end

  private

  def validate_request!
    token = request.headers["Authorization"].gsub("Bearer ", "")
    return true if ApiKey.validate(token)

    render json: { status: "Unauthorized" }
  end
end
