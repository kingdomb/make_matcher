class GameSerializer < ActiveModel::Serializer
  type :game

  attributes :id, :title
end
