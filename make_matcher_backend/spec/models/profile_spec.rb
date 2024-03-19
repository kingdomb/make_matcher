require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe "validations" do
    it { should validate_presence_of(:display_name) }
  end

  describe "relations" do
    it { should have_and_belong_to_many(:games) }
  end
end
