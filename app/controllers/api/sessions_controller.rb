class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(session_params[:email], session_params[:password])
    if @user
      sign_in(@user)
      render "api/users/show"
    else
      render json: ["Invalid login credentials"], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      sign_out
      render json: {}
    else
      render json: ["No one signed in"], status: 404
    end
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end

end
