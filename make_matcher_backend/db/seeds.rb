# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
require 'uri'
require 'net/http'
require 'json'
require 'faker'

# Game Data provided by MobyGames

MOBY_KEY = ENV['MOBY_KEY'] || Rails.application.credentials.moby[:api_key]
MOBY_URL = "https://api.mobygames.com/v1/games/random?api_key=#{MOBY_KEY}&format=brief".freeze
uri = URI(MOBY_URL)
res = Net::HTTP.get_response(uri)
games = JSON.parse(res.body)['games']
games.each { |game| Game.find_or_create_by! title: game['title'] }

zip_code_sample = [
  "10001", "20001", "30301", "60601", "85001", "02101", "30301", "75201", "94102", "20001",
  "10005", "33101", "90001", "97201", "84101", "60601", "80201", "06101", "21201", "01801",
  "29201", "57101", "37201", "46201", "70112", "04201", "04101", "31301", "55101", "39201",
  "58101", "68101", "89501", "87101", "10001", "14845", "22201", "05601", "32301", "30303",
  "83701", "62701", "46225", "50301", "67201", "40201", "70113", "10001", "18501", "02901",
  "29201", "29202", "58501", "44101", "16101", "52245", "02901", "73501", "73071", "73101",
  "10001", "15001", "19102", "15201", "15201", "18501", "15101", "63101", "63102", "39530",
  "63101", "63105", "39532", "10001", "27601", "28201", "27511", "44101", "43201", "43601",
  "44101", "10001", "45201", "45202", "74101", "37201", "78701", "73301", "78701", "79901",
  "98101", "98001", "98201", "53201", "53202", "53203", "53204", "53701", "82001"
]

20.times do
  Faker::Config.locale = 'en-US'
  name = Faker::Name.unique.name
  user = User.find_or_initialize_by(username: name.gsub(/\s+/, ''))
  puts "Created user#{user.id} #{user.username}. -- Updating password and profile."
  user.password = SecureRandom.alphanumeric(8)
  user.save
  user.profile.update!(
    display_name: name,
    zip_code: zip_code_sample.sample,
    date_of_birth: Faker::Date.birthday(min_age: 18, max_age: 65),
    intensity: rand(1..10),
    language: rand(1..10),
    days: Profile::DAYS.sample(3),
    times: Profile::TIMES.sample(2),
    games: Game.all.sample(5)
  )
  puts "Allowing Geocoding throttling to pass."
  wait = 0
  3.times do |i|
    print "#{wait} seconds.#{'.' if i.odd?}\r"
    wait += 1
    $stdout.flush
    sleep(1.second)
  end
end
