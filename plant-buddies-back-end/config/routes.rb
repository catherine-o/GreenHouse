Rails.application.routes.draw do
  resources :resources
  resources :posts
  resources :homes
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
