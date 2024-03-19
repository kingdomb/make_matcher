FactoryBot.define do
  factory :user do
    username { SecureRandom.alphanumeric(5) }
    password { "abc123" }
    password_confirmation { "abc123" }
  end
end
