require 'rails_helper'

RSpec.describe FriendRequest, type: :model do
  describe "relations" do
    it { should belong_to(:requestor) }
    it { should belong_to(:requestee) }
  end
end
