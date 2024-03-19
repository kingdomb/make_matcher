class Group < ApplicationRecord
  has_many :group_memberships, dependent: :destroy
  has_many :users, through: :group_memberships, foreign_key: :user_id

  validates :name, presence: true, uniqueness: true
end
