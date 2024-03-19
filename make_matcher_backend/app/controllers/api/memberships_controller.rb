class Api::MembershipsController < Api::Controller
  before_action :authorized_user
  before_action :get_group

  def create
    membership = GroupMembership.find_or_create_by!(group_id: @group.id, user_id: current_user.id)

    render json: { membership: MembershipSerializer.new(membership) }, status: :created
  end
  
  def destroy
    GroupMembership.where(group_id: @group.id, user_id: current_user.id).destroy_all

    render json: { message: "Success" }, status: :ok
  end

  private

  def get_group
    @group = Group.find(params[:group_id])
  end
end
