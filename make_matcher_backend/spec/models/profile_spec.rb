require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe "validations" do
    it { should validate_presence_of(:display_name) }
    %i[intensity language].each do |field|
      it { should allow_value(1..10).for(field) }
      it { should_not allow_value(11).for(field) }
      it { should_not allow_value(-1).for(field) }
    end
  end

  describe "relations" do
    it { should have_and_belong_to_many(:games) }
  end

  describe 'creation' do
    context 'when a user is created' do
      it 'should create a profile' do
        user = create :user
        expect(user.profile.present?).to be true
      end
    end
  end

  describe "geocoding" do
    context "when the zip code has changed" do
      before do
        @profile = create :profile
      end
      it "should geocode its coordinates and calculate UTC offset" do
        @profile.save
        expect(@profile.latitude).to eq(0.41994404e2)
        expect(@profile.longitude).to eq(-0.72453494e2)
        expect(@profile.utc_offset).to eq(-18000)
      end
    end
  end
end
