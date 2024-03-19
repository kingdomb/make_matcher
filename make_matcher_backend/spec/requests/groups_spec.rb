require 'rails_helper'

RSpec.describe "Groups", type: :request do
  describe "GET /groups" do
    context "authorized" do
      it "returns current user groups" do
        headers = authenticated_headers
        Group.create!(name: "test group")
        GroupMembership.create!(user_id: User.all.last.id, group_id: Group.all.last.id)

        get "/api/groups", headers: headers

        expect(json.dig("groups", 0, "name")).to eq("test group")
        expect(json.dig("groups", 0, "users", 0, "id")).to eq(User.last.id)
      end

      it "returns all groups if passed :all parameter" do
        headers = authenticated_headers
        Group.create!(name: "test group 1")
        Group.create!(name: "test group 2")

        get "/api/groups", headers: headers, params: { all: true }

        expect(json.dig("groups", 0, "name")).to eq("test group 1")
        expect(json.dig("groups", 1, "name")).to eq("test group 2")
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/groups", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "POST /groups" do
    context "authorized" do
      it "create group" do
        headers = authenticated_headers

        post "/api/groups", headers: headers, params: { name: "test group" }

        expect(json.dig("group", "name")).to eq("test group")
      end
    end

    context "unauthorized" do
      it "returns 401" do
        post "/api/groups", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "DELETE /groups/:id" do
    context "authorized" do
      it "delete group" do
        headers = authenticated_headers
        Group.create!(name: "test group")

        delete "/api/groups/#{Group.last.id}", headers: headers

        expect(Group.all).to be_empty
      end
    end

    context "unauthorized" do
      it "returns 401" do
        delete "/api/groups/0", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "GET /groups/:id" do
    context "authorized" do
      it "retrieve group" do
        headers = authenticated_headers
        Group.create!(name: "test group")

        get "/api/groups/#{Group.last.id}", headers: headers

        expect(json.dig("group", "name")).to eq("test group")
      end
    end

    context "unauthorized" do
      it "returns 401" do
        get "/api/groups/0", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end
end
