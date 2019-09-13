class UsersController < ApplicationController

    def index
        users = User.all
        render json: UserSerializer.new(users).to_serialized_json
    end

    def show
        user = User.find_by(id: params[:id])
        render json: UserSerializer.new(user).to_serialized_json
    end

    def create
        user = User.new(user_params)
        if user.save        
            render json: UserSerializer.new(user).to_serialized_json
        end
    end

    private
    
    def user_params
        params.require(:user).permit(:username, :name, :password, :bio, :photo)
    end
    
end
