class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
end
