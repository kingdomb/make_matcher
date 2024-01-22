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
    return false unless DateTime.now.to_i - time <= 30
    return unless api_key = ApiKey.find_by(key: key)
    return false unless secret == api_key.secret
  end
end
