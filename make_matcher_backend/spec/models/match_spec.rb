require 'rails_helper'

RSpec.describe Match, type: :model do
  describe "relations" do
    it { should belong_to(:matcher) }
    it { should belong_to(:matched) }
  end
end
