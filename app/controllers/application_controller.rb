class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    helper_method :current_user 

    def require_user 
        redirect_to '/login' unless current_user 
    end
end
