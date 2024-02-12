require 'rails_helper'

RSpec.describe "Auths", type: :request do
  describe "POST /login" do
    context "with valid username and password" do
      let (:headers) { api_headers }
      before do
        post "/api/users", headers: headers, params: { username: "test", password: "test" }
      end

      it "returns the user token" do
        post "/api/login", headers: headers, params: { username: "test", password: "test" }
        expect(json.dig("user", "id")).to be_present
        expect(json.dig("user", "username")).to eq("test")
        expect(json["token"]).to be_present
      end
    end
  end
end
