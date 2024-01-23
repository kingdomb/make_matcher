class ApplicationController < ActionController::API
  rescue_from(Exception) { render html: "<i style='color:red;'>Offline</i>".html_safe, status: 503 }

  def status
    render html: "<i style='color:green;'>Online</i>".html_safe, status: 200
  end
end
