class Api::ProfilesController < Api::Controller
  before_action :authorized_user, :find_profile

  def edit
    render_profile
  end

  def update
    @profile.update(profile_params)
    render_profile
  end

  private

  def profile_params
    params.require(:profile)
          .permit(:display_name, :zip_code, :date_of_birth, :intensity, :skill, :language,
                  days: [], times: [], game_ids: [])
  end

  def find_profile
    @profile = current_user.profile
  end

  def render_profile
    render json: {
      profile: ProfileSerializer.new(@profile),
      games: ActiveModel::Serializer::CollectionSerializer.new(Game.all, each_serializer: GameSerializer)
    }, status: :ok
  end
end
