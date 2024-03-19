require 'rails_helper'

RSpec.describe "GroupMemberships", type: :request do
  describe "POST /memberships" do
    context "authorized" do
      it "create membership for group" do
        headers = authenticated_headers
        Group.create!(name: "test group")

        post "/api/groups/#{Group.last.id}/memberships", headers: headers

        expect(json.dig("membership", "user_id")).to eq(User.last.id)
        expect(json.dig("membership", "group_id")).to eq(Group.last.id)
        expect(User.last.groups.last).to eq(Group.last)
      end
    end

    context "unauthorized" do
      it "returns 401" do
        post "/api/groups/0/memberships", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end

  describe "DELETE /memberships" do
    context "authorized" do
      it "delete current user group membership" do
        headers = authenticated_headers
        Group.create!(name: "test group")
        GroupMembership.create!(user_id: User.last.id, group_id: Group.last.id)

        delete "/api/groups/#{Group.last.id}/memberships", headers: headers

        expect(User.last.groups).to be_empty
      end
    end

    context "unauthorized" do
      it "returns 401" do
        delete "/api/groups/0/memberships", headers: api_headers
        expect(json["message"]).to eq("Unauthorized")
        expect(response.status).to eq(401)
      end
    end
  end
end
