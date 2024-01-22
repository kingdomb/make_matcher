class ApiKey < ApplicationRecord
  # Attributes
  # key      API ID
  # secret   API Secret
  # name     Name
  # active   Active
  encrypts :key, :secret, deterministic: true
  validates :key, :secret, presence: true, uniqueness: true

  def self.validate(token)
    key, secret, time = token.split("::")
    if DateTime.now.to_i - time.to_i >= 30
      puts "Timestamp expired."
      return false
    end

    if (api_key = ApiKey.find_by(key: key, active: true)).nil?
      puts "Could not find matching API key."
      return false
    end

    puts "Found API Key #{api_key.id} -- Attemping authorization..."

    if secret != api_key.secret
      puts "Could not validate API Key #{api_key.id}"
      return false
    end

    puts "Authorized API Key #{api_key.id} at #{DateTime.now}"
    true
  end
end
