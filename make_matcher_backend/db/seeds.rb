# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
require 'uri'
require 'net/http'
require 'json'

# Game Data provided by MobyGames

MOBY_KEY = ENV['MOBY_KEY'] || Rails.application.credentials.moby[:api_key]
MOBY_URL = "https://api.mobygames.com/v1/games/random?api_key=#{MOBY_KEY}&format=brief"
uri = URI(MOBY_URL)
res = Net::HTTP.get_response(uri)
games = JSON.parse(res.body)["games"]
games.each { |game| Game.create title: game["title"] }
