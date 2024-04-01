class MatchSerializer < ActiveModel::Serializer
  type :match

  attributes :id, :matched_id, :games

  has_one :matched, serializer: ProfileSerializer
end
