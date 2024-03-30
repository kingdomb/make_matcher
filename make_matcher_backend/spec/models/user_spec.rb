require 'rails_helper'

RSpec.describe User, type: :model do
  describe "relations" do
    it { should have_one(:profile) }
    it { should have_many(:friends) }
    it { should have_many(:groups) }
    it { should have_many(:friend_requests) }
    it { should have_many(:matches) }
  end

  describe "validations" do
    it { should validate_presence_of(:username) }
    it { should validate_uniqueness_of(:username) }
    it { should have_secure_password }
  end
end
