class Api::V1::SessionsController < ApplicationController
  def new
  end

  def create
      @user = User.find_by_email(params[:session][:email])
      if @user && @user.password_digest===params[:session][:password_digest]
          session[:user_id] = @user.id
          render json: { message: 'Logged in' }
      else
        render json: { message: 'Incorrect Email or Password' }
        redirect_to '/login'
      end 
  end

  def current_user 
    @current_user ||= User.find(session[:user_id]) if session[:user_id] 
    render json: @current_user
  end 

  def destroy 
      session[:user_id] = nil
      redirect_to '/'
  end
end
