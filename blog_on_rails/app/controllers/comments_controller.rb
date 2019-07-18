class CommentsController < ApplicationController
    before_action :authenticate!
    def create
        comment_params = params.require(:comment).permit(:body)
        @comment = Comment.new comment_params
        @post = Post.find params[:post_id]
        @comment.post = @post

        if @comment.save
            redirect_to post_path(@post), notice: "New Comment!"
        else
            @comments = @post.comments.order(created_at: :desc)
            render 'posts/show', alert: "error!"
        end
    end

    def destroy
        comment = Comment.find params[:id]
        comment.destroy
        redirect_to post_path(comment.post_id)
    end
end
