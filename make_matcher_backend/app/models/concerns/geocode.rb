module Geocode
  require 'uri'
  require 'net/http'
  require 'json'

  API_KEY = ENV['GEOCODE_KEY'] || Rails.application.credentials.geocode[:api_key]
  GEOCODE_URL = "https://geocode.maps.co/search?api_key=#{API_KEY}&country=US&postalcode=".freeze
  TIMEZONE_URL = "https://www.timeapi.io/api/TimeZone/coordinate?".freeze

  def self.coordinate(zip_code)
    uri = URI("#{GEOCODE_URL}#{zip_code}")
    res = Net::HTTP.get_response(uri)
    return 'There was an error' unless res.is_a?(Net::HTTPSuccess)

    Rails.logger.info "Converting #{zip_code} to coordinates"
    data = JSON.parse(res.body)[0]
    { latitude: data['lat'], longitude: data['lon'] }
  end

  def self.locate_timezone(lat, long)
    uri = URI("#{TIMEZONE_URL}latitude=#{lat}&longitude=#{long}")
    res = Net::HTTP.get_response(uri)
    return 'There was an error' unless res.is_a?(Net::HTTPSuccess)

    Rails.logger.info "Finding timezone for #{lat}, #{long}"
    timezone = JSON.parse(res.body)["timeZone"]
    { timezone: }
  end

  RAD_PER_DEG = Math::PI / 180
  RM = 6_371_000 # Earth radius in meters

  def self.distance(from:, to:)
    return if [from, to].include?(nil)

    begin

      lat1 = from.lat
      lon1 = from.long
      lat2 = to.lat
      lon2 = to.long
      lat1_rad = lat1 * RAD_PER_DEG
      lat2_rad = lat2 * RAD_PER_DEG
      lon1_rad = lon1 * RAD_PER_DEG
      lon2_rad = lon2 * RAD_PER_DEG

      a = Math.sin((lat2_rad - lat1_rad) / 2)**2 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin((lon2_rad - lon1_rad) / 2)**2
      c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

      RM * c * 0.00062137 # Delta in miles
    rescue
      1
    end
  end
end