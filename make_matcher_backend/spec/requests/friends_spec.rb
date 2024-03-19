require 'rails_helper'

RSpec.describe "Friends", type: :request do
  describe "GET /friends" do
    context "authorized" do
      it "returns current user friends" do
        headers = authenticated_headers
        Friend.create!(source_id: User.last.id, destination_id: User.last.id)

        get "/api/friends", headers: headers

        expect(json.dig("friends", 0, "source_id")).to eq(User.last.id)
        expect(json.dig("friends", 0, "destination_id")).to eq(User.last.id)
        expect(json.dig("friends", 0, "friend_name")).to eq(User.last.username)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/friends", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "POST /friends" do
    context "authorized" do
      it "create current user friend" do
        headers = authenticated_headers

        post "/api/friends", headers: headers, params: { destination_id: User.last.id }

        expect(json.dig("friend", "source_id")).to eq(User.last.id)
        expect(json.dig("friend", "destination_id")).to eq(User.last.id)
        expect(json.dig("friend", "friend_name")).to eq(User.last.username)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        post "/api/friends", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "DELETE /friends/:id" do
    context "authorized" do
      it "delete current user friend" do
        headers = authenticated_headers
        Friend.create!(source_id: User.last.id, destination_id: User.last.id)

        delete "/api/friends/#{User.last.id}", headers: headers

        expect(User.last.friends).to be_empty
      end
    end

    context "unauthorized" do
      it "returns 401" do
        delete "/api/friends/0", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end
end
