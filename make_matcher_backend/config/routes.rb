Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "application#status"

  namespace :api do
    post    "/",                  to: "#status"
    post    "/users",             to: "users#create"
    get     "/users/current",     to: "users#current"
    post    "/login",             to: "auth#login"

    match   "*path",              to: "#invalid",                via: %i[post get]
  end

  match "*path", to: "application#invalid", via: %i[post get]
end
