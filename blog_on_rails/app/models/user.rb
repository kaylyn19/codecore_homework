class User < ApplicationRecord
    has_secure_password
    has_many :posts, dependent: :nullify
    has_many :comments, dependent: :nullify
    
    validates :name, presence: true
    validates :email, presence: true, uniqueness: true, format: /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/

    # before_validation :correct_password

    # validate :different_new_password
    # def different_new_password
    #     self.errors.add(:password, "You can't use the same password") unless password != current_password
    # end






    # private

    # def correct_password
    #     user = User.find_by(email: current_user.email)
    #     unless user&.authenticate(password)
    #         self.errors.add(:current_password, 'wrong password!')
    #     end
    #     # self.errors.add(:current_password, "Current password doesn't match") unless current_user.password == :current_password
    # end
    # validate :current_password_is_correct#,
        #    if: :validate_password?, on: :update

    # def current_password_is_correct
    #     if User.find(id).authenticate(current_password) == false
    #     errors.add(:current_password, "is incorrect.")
    #     end
    # end

    # def validate_password?
    #     !password.blank?
    # end

    attr_accessor :current_password
end
