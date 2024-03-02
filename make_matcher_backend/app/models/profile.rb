class Profile < ApplicationRecord
  include Geocode

  # Attributes
  # user_id         User Key
  # display_name    Display Name
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

  # Callbacks
  before_save :locate

  # Validations
  validates_presence_of :display_name
  validates :intensity, :skill, :language, in: 1..10

  # Constants
  COORDINATES = %w[latitude longitude].freeze

  private

  def locate
    assign_attributes Geocode.coordinate(zip_code) if zip_code_changed?
    assign_attributes Geocode.locate_timezone(latitude, longitude) if (changed & COORDINATES).present?
  end
end
