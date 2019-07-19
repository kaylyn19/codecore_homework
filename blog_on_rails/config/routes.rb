Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', {to: 'home#index', as: 'root'}

  get '/posts', {to: redirect('/')}
  resources :posts, except: [:index]

  resources :posts do
    resources :comments
  end

  resources :users, only: [:new, :create, :edit, :update]
  get '/users/:id/edit_password', {to: 'users#edit_password', as: "edit_password"}

  resource :session, only: [:new, :create, :destroy]
end
