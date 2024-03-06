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
  has_and_belongs_to_many :games

  # Callbacks
  before_save :locate

  # Validations
  validates_presence_of :display_name
  validates :intensity, :skill, :language, inclusion: 1..10, allow_nil: true

  # Constants
  COORDINATES = %w[latitude longitude].freeze

  private

  def locate
    assign_attributes Geocode.coordinate(zip_code) if zip_code_changed?
    assign_attributes Geocode.locate_timezone(latitude, longitude) if (changed & COORDINATES).present?
  end
end
