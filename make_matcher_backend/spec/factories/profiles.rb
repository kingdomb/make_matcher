FactoryBot.define do
  factory :profile do
    association :user, factory: :user
    display_name { 'Mr. User' }
    zip_code { '06071' }
    date_of_birth { Date.today - 25.years }
    intensity { 5 }
    skill { 5 }
    language { 5 }
    days { %w[Mon Sat] }
    times { ['Morning'] }
    after :create do |profile|
      profile.games << FactoryBot.build(:game)
    end
  end
end
