Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root "application#status"

  namespace :api do
    post    "/",                  to: "#status"
    post    "/users",             to: "users#create"
    get     "/users/current",     to: "users#current"
    post    "/login",             to: "auth#login"

    resources :groups, only: [:create, :index, :destroy, :show] do
      post "/memberships", to: "memberships#create"
      delete "/memberships", to: "memberships#destroy"
    end
    resources :friends, only: [:create, :index, :destroy]
    resources :friend_requests, only: [:create, :index, :destroy]

    # Profiles
    get     "profile",            to: "profiles#edit"
    post    "profile",            to: "profiles#update"

    match   "*path",              to: "#invalid",                 via: %i[post get]
  end

  get       "up",                 to: "rails/health#show",        as: :rails_health_check
  match     "*path",              to: "application#invalid",      via: %i[post get]
end
