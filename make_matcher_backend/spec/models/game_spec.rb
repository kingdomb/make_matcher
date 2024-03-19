require 'rails_helper'

RSpec.describe Game, type: :model do
  before :each do
    @profile = create :profile
  end
  describe "validations" do
    it { should validate_presence_of(:title) }
  end

  describe "associations" do
    it "has and belongs to many profiles" do
      expect(@profile.games.present?).to be true
    end
  end
end
