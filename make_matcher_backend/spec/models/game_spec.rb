require 'rails_helper'

RSpec.describe Game, type: :model do
  describe "relations" do
    it { should have_and_belong_to_many(:profiles) }
  end
  describe "validations" do
    it { should validate_presence_of(:title) }
  end
end
