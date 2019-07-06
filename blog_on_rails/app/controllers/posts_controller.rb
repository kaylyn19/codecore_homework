class PostsController < ApplicationController
    def new
        @post = Post.new
    end

    def create
        post_params = params.require(:post).permit(:title, :body)
        @post = Post.new post_params
        if @post.save
            redirect_to post_path(@post.id), notice: "Post Saved!"
        else
            render :new
        end
    end

    def show
    end

    def index
    end

    def destroy
    end

    def edit
    end
end
