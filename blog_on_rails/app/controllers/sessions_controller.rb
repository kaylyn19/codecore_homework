class SessionsController < ApplicationController
    def new
    end

    def create
        @user = User.find_by(email: params[:email])
        if @user &.authenticate(params[:password])
            session[:user_id] = @user.id
            redirect_to posts_path, notice: 'Logged In!'
        else
            render :new, alert: "Unable to Log In. Try again."
        end
    end

    def destroy
        session[:user_id] = nil
        redirect_to posts_path, notice: "Logged Out!"
    end
end
