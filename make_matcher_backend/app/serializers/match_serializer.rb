class MatchSerializer < ActiveModel::Serializer
  type :match

  attributes :id, :matched_id

  has_one :matched, serializer: ProfileSerializer
end
