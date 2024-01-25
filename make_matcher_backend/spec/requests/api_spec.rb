require "rails_helper"

RSpec.describe 'API', type: :request do
  describe "POST /api" do
    context "without a valid API Token" do
      before do
        post "/api"
      end
      it "returns status Unauthorized as JSON" do
        expect(json["status"]).to eq "Unauthorized"
      end
      it "returns status code 403 (Unauthorized)" do
        expect(response.status).to eq 403
      end
    end

    context "with a valid API Token" do
      before do
        post "/api", headers: api_headers
      end
      it "returns status Online as JSON" do
        expect(json["status"]).to eq "Online"
      end
      it "returns status code 200 (OK)" do
        expect(response.status).to eq 200
      end
    end
  end

  describe "POST /api/*path" do
    before do
      post "/api/#{SecureRandom.hex(3)}", headers: api_headers
    end
    it "returns status Invalid endpoint as JSON" do
      expect(json["status"]).to eq "Invalid endpoint"
    end
    it "returns status code 404 (Bad Request)" do
      expect(response.status).to eq 404
    end
  end
end
