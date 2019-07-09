class HomeController < ApplicationController
    def index
        @post = Post.all.order(updated_at: :desc)
    end
end
