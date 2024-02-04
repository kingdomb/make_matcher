class ApplicationController < ActionController::API

  def status
    render plain: "Online", status: 200
  end

  def invalid
    render plain: "Not found", status: 404
  end
end
