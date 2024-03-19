require 'rails_helper'

RSpec.describe Profile, type: :model do
  before :each do
    @profile = create :profile
  end

  describe 'creation' do
    context 'when a user is created' do
      it 'should create a profile' do
        user = create :user
        expect(user.profile.present?).to be true
      end
    end
  end

  describe 'validations' do
    it { should validate_presence_of(:display_name) }
    context 'when the intensity is between 1 and 10' do
      it 'is invalid' do
        @profile.intensity = 11
        expect(@profile.valid?).to be false
        @profile.intensity = 0
        expect(@profile.valid?).to be false
        @profile.intensity = 10
        expect(@profile.valid?).to be true
        @profile.intensity = 1
        expect(@profile.valid?).to be true
      end
    end
  end

  describe "associations" do
    it "belongs to a user" do
      expect(@profile.user.present?).to be true
    end

    it "has and belongs to many games" do
      expect(@profile.games.present?).to be true
    end
  end

  describe "geocoding" do
    context "when the zip code has changed" do
      it "should geocode its coordinates and calculate UTC offset" do
        @profile.save
        expect(@profile.latitude).to eq(0.41994404e2)
        expect(@profile.longitude).to eq(-0.72453494e2)
        expect(@profile.utc_offset).to eq(-18000)
      end
    end
  end
end
