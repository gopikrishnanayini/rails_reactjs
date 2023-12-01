class User < ApplicationRecord
  has_many :recipes, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  VALID_USERNAME_REGEX = /\A[a-zA-Z0-9]+\z/
  validates :username, uniqueness: true, presence: true, length: {minimum: 4, maximum: 16}, format: { with: VALID_USERNAME_REGEX }

  validates :first_name, :last_name, presence: true, length: { minimum: 1, maximum: 60 }

  validates :bio, length: { maximum: 150 }
end
