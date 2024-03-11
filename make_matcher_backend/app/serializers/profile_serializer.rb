class ProfileSerializer < ActiveModel::Serializer
  type :profile

  attributes :display_name, :zip_code, :date_of_birth, :intensity, :skill, :language, :days, :times,
             # has_and_belongs_to_many
             :games

  def games = object.game_ids
end
