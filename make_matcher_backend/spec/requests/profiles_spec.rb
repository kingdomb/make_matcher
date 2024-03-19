require 'rails_helper'

RSpec.describe "Profiles", type: :request do
  describe "GET /profile" do
    it "returns current user's profile" do
      get "/api/profile", headers: authenticated_headers
      expect(json["profile"]).to be_present
    end
  end

  describe "POST /profile" do
    it "updates current user's profile attributes" do
      new_name = SecureRandom.alphanumeric(5)
      post "/api/profile", headers: authenticated_headers, params: { profile: { display_name: new_name } }
      expect(json["profile"]["display_name"]).to eq(new_name)
    end

    it "adds associated Games" do
      games = Array.new(2) { |_i| create :game }
      post "/api/profile", headers: authenticated_headers, params: { profile: { game_ids: games.map(&:id) } }
      expect(Game.where(id: json["profile"]["games"])).to eq(games)
    end
  end
end
