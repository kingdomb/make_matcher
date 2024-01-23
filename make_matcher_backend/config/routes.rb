Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "application#status"

  namespace :api do
    post "/", to: "#status"
    post "*path", to: "#invalid"
  end

  get "*path", to: "application#status"
end
