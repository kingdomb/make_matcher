FactoryBot.define do
  factory :game do
    title { SecureRandom.alphanumeric(5) }
  end
end
