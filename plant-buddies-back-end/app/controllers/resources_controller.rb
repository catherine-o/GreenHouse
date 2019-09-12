class ResourcesController < ApplicationController

    def index
        resources = Resource.all 
        render json: ResourceSerializer.new(resources).to_serialized_json
    end

end
