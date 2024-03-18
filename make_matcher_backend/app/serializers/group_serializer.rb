class GroupSerializer < ActiveModel::Serializer
  type :group

  attributes :name

  has_many :users, serializer: UserSerializer
end
