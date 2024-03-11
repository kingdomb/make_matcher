class User < ApplicationRecord
  has_secure_password

  has_one :profile, dependent: :destroy
  validates_associated :profile
  before_validation -> { build_profile(display_name: username) }, on: :create

  validates :username, presence: true, uniqueness: true
end
