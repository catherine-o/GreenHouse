class Post < ApplicationRecord
    validates :title, presence: true, length: {maximum: 30}
end
