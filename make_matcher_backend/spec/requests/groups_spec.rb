require 'rails_helper'

RSpec.describe "Groups", type: :request do
  describe "GET /friend_requests" do
    context "authorized" do
      it "returns current user friend requests" do
        headers = authenticated_headers
        FriendRequest.create!(requestee_id: User.last.id, requestor_id: User.last.id)

        get "/api/friend_requests", headers: headers

        expect(json.dig("friend_requests", 0, "requestee_id")).to eq(User.last.id)
        expect(json.dig("friend_requests", 0, "requestor_id")).to eq(User.last.id)
        expect(json.dig("friend_requests", 0, "friend_name")).to eq(User.last.username)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/friend_requests", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "POST /friend_requests" do
    context "authorized" do
      it "create current user friend requests" do
        headers = authenticated_headers

        post "/api/friend_requests", headers: headers, params: { requestee_id: User.last.id }

        expect(json.dig("friend_request", "requestee_id")).to eq(User.last.id)
        expect(json.dig("friend_request", "requestor_id")).to eq(User.last.id)
        expect(json.dig("friend_request", "friend_name")).to eq(User.last.username)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        post "/api/friend_requests", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "DELETE /friend_requests" do
    context "authorized" do
      it "delete current user friend requests" do
        headers = authenticated_headers
        FriendRequest.create!(requestee_id: User.last.id, requestor_id: User.last.id)

        delete "/api/friend_requests/#{User.last.id}", headers: headers

        expect(User.last.friends).to be_empty
      end
    end

    context "unauthorized" do
      it "returns 401" do
        delete "/api/friend_requests/0", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end
end
