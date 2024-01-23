Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "application#status"

  namespace :api do
    post "/", to: "#status"
    post "/*", to: "#invalid"
  end

  get "*", to: "application#status"
end
