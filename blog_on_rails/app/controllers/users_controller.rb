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

    def edit # for name and email
        @user = User.find_by(id: current_user.id)
    end

    def edit_password
        @user = User.find_by(id: current_user.id)
    end


    def update # name and email
        @user = User.find_by(id: current_user.id)
        if params[:user][:current_password].blank? #editing user profile
            if @user.update user_params 
                redirect_to posts_path, notice: 'User Profile Successfully Updated'
            else
                render :edit, alert: "Try Again!"
            end
        else    # changing password
            if @user&.authenticate(params[:user][:current_password]) == false#@user.password != params[:user][:current_password]
                @user.errors.add(:current_password, "is different!")
                return render :edit_password
            
            elsif params[:user][:password] == params[:user][:current_password]
                @user.errors.add(:new_password, "can't be the same as the old password!")
                return render :edit_password
            end

            if @user.update user_params 
                redirect_to posts_path, notice: 'User Profile Successfully Updated'
            else
                render :edit_password, alert: "Try Again!"
            end
        end
    end

    private

    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
end
