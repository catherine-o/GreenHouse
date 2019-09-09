class HomeSerializer
    def initialize(home_object)
        @home = home_object
    end

    def to_serialized_json
        @home.to_json(:except => [:updated_at])
    end
end