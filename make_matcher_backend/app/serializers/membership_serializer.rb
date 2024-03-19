class MembershipSerializer < ActiveModel::Serializer
  type :group_membership

  attributes :user_id, :group_id
end
