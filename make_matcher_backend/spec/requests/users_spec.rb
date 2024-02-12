require 'rails_helper'

RSpec.describe "Users", type: :request do
  describe "GET /users/current" do
    context "authorized" do
      it "returns current user" do
        get "/api/users/current", headers: authenticated_headers
        expect(json["id"]).to be_present
        expect(json["username"]).to be_present
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/users/current", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "POST /users" do
    context "with username and password" do
      it "creates user and returns token" do
        post "/api/users", headers: api_headers, params: { username: "test", password: "test" }
        expect(json.dig("user", "id")).to be_present
        expect(json.dig("user", "username")).to eq("test")
        expect(json["token"]).to be_present
      end
    end
  end
end
