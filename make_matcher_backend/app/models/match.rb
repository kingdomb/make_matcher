class Match < ApplicationRecord
  # Associations
  belongs_to :matcher, class_name: "Profile"
  belongs_to :matched, class_name: "Profile"

  # Callbacks
  after_initialize :calculate_score

  # Constants
  SCORE_ATTRS = %i[location utc_offset age intensity skill language days times].freeze

  # Calculate Match Score - Lower is better.
  def calculate_score
    self.score = SCORE_ATTRS.map { |attr| score_for(attr) }.sum
  end

  private

  # Integer Scores - Difference between values
  def diff(attr)
    (matcher.send(attr).to_i - matched.send(attr).to_i).abs
  end

  %i[utc_offset age intensity skill language].each do |attr|
    define_method attr do
      diff(attr)
    end
  end

  # Array Scores - Number of shared values
  %i[days times].each do |attr|
    define_method attr do
      (20 / ((matcher.send(attr).to_a & matched.send(attr).to_a).count + 1)).round
    end
  end

  # Distance between coordinates
  def location
    Geocode.distance(from: matcher, to: matched).round
  end

  # Rescue errors with high arbitrary Score
  def score_for(attribute)
    send attribute
  rescue StandardError
    999
  end
end
