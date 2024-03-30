require 'rails_helper'

RSpec.describe "Matches", type: :request do
  describe "GET /matches" do
    context "authorized" do
      it "returns current user matches" do
        headers = authenticated_headers
        Match.create!(matcher_id: User.last.profile.id, matched_id: User.last.profile.id)

        get "/api/matches", headers: headers

        expect(json.dig("matches", 0, "matched_id")).to eq(User.last.id)
        expect(json.dig("matches", 0, "matched", "display_name")).to eq(User.last.username)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/matches", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "DELETE /matches/:profile_id" do
    context "authorized" do
      it "delete current user match" do
        headers = authenticated_headers
        Match.create!(matcher_id: User.last.profile.id, matched_id: User.last.profile.id)

        delete "/api/matches/#{User.last.profile.id}", headers: headers

        expect(User.last.matches).to be_empty
      end
    end

    context "unauthorized" do
      it "returns 401" do
        delete "/api/matches/0", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end
end
