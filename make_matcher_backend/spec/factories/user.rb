FactoryBot.define do
  factory :user do
    username { "test_user" }
    password { "abc123" }
    password_confirmation { "abc123" }
  end
end
