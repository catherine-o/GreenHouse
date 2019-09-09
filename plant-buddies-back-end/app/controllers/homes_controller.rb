class HomesController < ApplicationController

    def index
        homes = Home.all
        render json: HomeSerializer.new(homes).to_serialized_json
    end

    def show
        home = Home.find_by(id: params[:id])
        render json: HomeSerializer.new(home).to_serialized_json
    end
    
end
