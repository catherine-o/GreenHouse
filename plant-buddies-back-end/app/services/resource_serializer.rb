class ResourceSerializer
    def initialize(resource_object)
        @resource = resource_object
    end

    def to_serialized_json
        @resource.to_json(:except => [:created_at, :updated_at])
    end
end