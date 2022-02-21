Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'posts/index'
      post 'posts/create'
      resources :posts
      get '/show/:id', to: 'posts#show'
      delete '/destroy:id', to: 'posts#destroy'
      post 'sessions/create'
      delete '/logout', to: 'sessions#destroy'
      resources :users
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
end
