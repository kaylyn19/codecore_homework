Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get '/', {to: 'home#index', as: 'root'}

  get '/posts', {to: redirect('/')}
  resources :posts, except: [:index]

  resources :posts do
    resources :comments
  end
end
