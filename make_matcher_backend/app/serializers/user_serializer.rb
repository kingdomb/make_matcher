class UserSerializer < ActiveModel::Serializer
  type :user

  attributes :id, :username
end
