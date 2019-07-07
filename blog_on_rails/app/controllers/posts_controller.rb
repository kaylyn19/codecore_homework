class PostsController < ApplicationController
    before_action :find_post_id, except: [:new, :create, :index]

    def new
        @post = Post.new
    end

    def create
        @post = Post.new post_params
        if @post.save
            redirect_to post_path(@post.id), notice: "Post Saved!"
        else
            render :new
        end
    end

    def show
        # @post = Post.find_by_id params[:id]
        @comment = Comment.new
        @comments = @post.comments.order("updated_at desc")
    end

    def index
        @post = Post.all
    end

    def destroy
        # @post = Post.find params[:id]
        @post.destroy
        redirect_to posts_path
    end

    def edit
        # @post = Post.find_by_id params[:id]
    end

    def update
        # @post = Post.find params[:id]
        if @post.update post_params
            redirect_to post_path
        else
            render :edit
        end
    end

    private

    def post_params
        params.require(:post).permit(:title, :body)
    end

    def find_post_id
        @post = Post.find params[:id]
    end
end
