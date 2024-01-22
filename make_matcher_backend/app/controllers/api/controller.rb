class Api::Controller < ApplicationController 
  before_action :validate_request!

  def status
    render json: { status: "Online" }
  end

  private 

  def validate_request!
    token = request.headers["Authorization"].gsub("Bearer ", "")
    unless ApiKey.validate(token)
      render json: { status: "Unauthorized" } and return
    end 
  end
end