class Post < ApplicationRecord
    validates :title, presence: true
    validates :body, presence: true, length: {minimum: 50}
end
