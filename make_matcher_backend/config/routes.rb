Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "application#status"

  namespace :api do
    match "/", to: "#status", via: %i[get post]
  end

  get "*", to: "application#status"
end
