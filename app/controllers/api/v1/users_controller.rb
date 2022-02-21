class Api::V1::UsersController < ApplicationController

  def new
    user=User.new
  end

  def create
    user = User.create!(user_params)
    if user
      session[:user_id] = user.id
      render json: user
    else
      render json: user.errors
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email, :password_digest)
  end 

  def user
    @user ||=User.find(params[:id])
  end
end