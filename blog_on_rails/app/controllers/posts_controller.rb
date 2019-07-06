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
        @post = Post.find_by_id params[:id]
    end

    def index
    end

    def destroy

    end

    def edit
        @post = Post.find_by_id params[:id]
    end

    def update
        post_params = params.require(:post).permit(:title, :body)
        @post = Post.find params[:id]
        if @post.update post_params
            redirect_to post_path
        else
            render :edit
        end
    end
end
