require 'rails_helper'

RSpec.describe ApiKey, type: :model do
  before :each do
    @api_key = create :api_key
  end

  describe "presence validations" do
    it "is invalid without a key attribute" do
      @api_key.key = nil
      expect(@api_key.valid?).to be false
    end

    it "is invalid without a secret attribute" do
      @api_key.secret = nil
      expect(@api_key.valid?).to be false
    end

    it "is it valid with a key and secret" do
      expect(@api_key.key).not_to be nil
      expect(@api_key.secret).not_to be nil
      expect(@api_key.valid?).to be true
    end
  end

  describe "uniqueness validations" do
    before :each do
      @api_key2 = build :api_key
    end

    it "is invalid without a unique key" do
      @api_key2.key = @api_key.key
      expect(@api_key2.valid?).to be false
    end

    it "is invalid without a unique secret" do
      @api_key2.secret = @api_key.secret
      expect(@api_key2.valid?).to be false
    end
  end
end
