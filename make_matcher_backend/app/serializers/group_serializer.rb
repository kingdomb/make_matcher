class GroupSerializer < ActiveModel::Serializer
  type :group

  attributes :id, :name

  has_many :users, serializer: UserSerializer
end
