class Api::Controller < ApplicationController
  include Api::Concerns::SessionConcern
  before_action :validate_request!

  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def status
    render json: { status: "Online" }, status: :ok
  end

  def invalid
    render json: { status: "Invalid endpoint" }, status: :not_found
  end

  def invalid_record(ex)
    render json: { message: ex.record.errors.full_messages }, status: :unprocessable_entity
  end

  def not_found(ex)
    render json: { message: "Not found" }, status: :not_found
  end

  private

  def validate_request!
    token = request.headers["x-api-key"]&.gsub("Bearer ", "")
    return true if token && ApiKey.validate(token)

    render json: { status: "Unauthorized application" }, status: :unauthorized
  end

end
