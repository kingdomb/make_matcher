require 'rails_helper'

RSpec.describe Friend, type: :model do
  describe "relations" do
    it { should belong_to(:destination) }
    it { should belong_to(:source) }
  end
end
