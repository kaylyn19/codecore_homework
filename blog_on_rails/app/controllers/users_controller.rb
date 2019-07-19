class UsersController < ApplicationController
    def new
        @user = User.new
    end

    def create
        @user = User.new user_params
        if @user.save
            session[:user_id] = @user.id
            redirect_to root_path, notice: "Welcome!"
        else
            render :new, alert: "Unable to sign up. Try again."
        end
    end

    def edit
        @user = User.find_by(id: current_user.id)
    end

    def update
        @user = User.find_by(id: current_user.id)
        if @user.update params.require(:user).permit(:name, :email)
            redirect_to posts_path, notice: 'User Profile Successfully Updated'
        else
            render :edit, alert: 'Try Again!'
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
