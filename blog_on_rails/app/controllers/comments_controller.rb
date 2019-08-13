class CommentsController < ApplicationController
    before_action :authenticate!
    def create
        comment_params = params.require(:comment).permit(:body)
        @comment = Comment.new comment_params
        @post = Post.find params[:post_id]
        @comment.post = @post
        @comment.user = current_user
        if can? :crud, @comment
            if @comment.save
                redirect_to post_path(@post), notice: "New Comment!"
            else
                @comments = @post.comments.order(created_at: :desc)
                render 'posts/show', alert: "error!"
            end
        else
            flash[:alert] = 'Not Authorized'
            redirect_to root_path
        end
    end

    def destroy
        comment = Comment.find params[:id]
        if can? :crud, comment
            comment.destroy
            redirect_to post_path(comment.post_id)
        else
            flash[:alert] = 'Not Authorized'
            redirect_to root_path
        end
    end
end
