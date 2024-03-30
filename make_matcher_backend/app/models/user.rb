class User < ApplicationRecord
  has_secure_password

  has_one :profile, dependent: :destroy
  validates_associated :profile
  before_validation -> { build_profile(display_name: username) }, on: :create

  validates :username, presence: true, uniqueness: true

  has_many :friends, class_name: "Friend", foreign_key: :source_id
  has_many :group_memberships, foreign_key: :user_id
  has_many :groups, through: :group_memberships
  has_many :friend_requests, class_name: "FriendRequest", foreign_key: :requestee_id
  has_many :matches, through: :profile
end
