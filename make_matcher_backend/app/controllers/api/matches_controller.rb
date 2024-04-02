class Api::MatchesController < Api::Controller
  before_action :authorized_user

  def index
    render json: { matches: current_user.matches.daily.map { |m| MatchSerializer.new(m) } }
  end

  def destroy
    Match.where(matcher_id: current_user.profile.id, matched_id: params[:id])
         .or(Match.where(matcher_id: params[:id], matched_id: current_user.profile.id))
         .update_all(reject: true)

    render json: { message: "Success" }, status: :ok
  end
end
