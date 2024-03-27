class Profile < ApplicationRecord
  include Geocode

  # Attributes
  # user_id         User Key
  # display_name    Display Name
  # zip_code        Zip Code
  # latitude        Latitude
  # longitude       Longitude
  # timezone        Time Zone
  # date_of_birth   Date of Birth
  # intensity       Intensity
  # skill           Skill
  # language        Language Tolerance
  # days            Availability (Days)
  # times           Availability (Times)

  # Associations
  belongs_to :user
  has_and_belongs_to_many :games
  def matches
    Match.where("matcher_id = :id OR matched_id = :id", id:)
  end

  # Callbacks
  before_save :locate

  # Validations
  validates_presence_of :display_name
  validates :intensity, :skill, :language, inclusion: 1..10, allow_nil: true

  # Constants
  COORDINATES = %w[latitude longitude].freeze

  def age
    return rand(0..99) if date_of_birth.nil?

    (Date.today - date_of_birth).to_i / 365
  end

  private

  def locate_coordinates?
    return false unless zip_code.present?

    zip_code_changed? || COORDINATES.any? { |l| send(l).nil? }
  end

  def locate_utc_offset?
    return false unless COORDINATES.all? { |l| send(l).present? }

    (changed & COORDINATES).present? || utc_offset.nil?
  end

  def locate
    assign_attributes Geocode.coordinate(zip_code) if locate_coordinates?
    assign_attributes Geocode.locate_timezone(latitude, longitude) if locate_utc_offset?
  rescue StandardError => e
    Rails.logger.error "There was an error locating the zip code (#{zip_code}) -- #{e.inspect}"
  end
end
