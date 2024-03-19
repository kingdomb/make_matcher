class Api::GroupsController < Api::Controller
  before_action :authorized_user

  def create
    group = Group.find_or_create_by!(group_params)

    render json: { group: GroupSerializer.new(group) }, status: :created
  end
  
  def index
    render json: { groups: current_user.groups.map {|g| GroupSerializer.new(g) } }
  end

  def destroy
    Group.where(group_params).destroy_all

    render json: { message: "Success" }, status: :ok
  end

  def show
    group = Group.find!(params[:id])

    render json: { group: GroupSerializer.new(group) }, status: :ok
  end

  private

  def group_params
    params.permit(:name)
  end
end
