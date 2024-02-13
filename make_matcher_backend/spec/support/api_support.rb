module ApiSupport
  def json
    JSON.parse(response.body)
  end

  def api_headers
    api_key = create :api_key
    token = "#{api_key.key}::#{api_key.secret}::#{DateTime.now.to_i}"
    { 'x-api-key' => "Bearer #{token}" }
  end

  def authenticated_headers
    headers = api_headers
    post "/api/users", headers: headers, params: { username: "test_#{SecureRandom.hex(6)}", password: "test_user" }
    headers.merge("Authorization": "Bearer #{json['token']}")
  end
end
