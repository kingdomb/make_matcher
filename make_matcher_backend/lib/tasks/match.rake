task match: :environment do
  profiles = Profile.all
  count = profiles.count
  profiles.each_with_index do |profile, index|
    puts "Calculating matches for #{profile.display_name}. (#{index + 1}/#{count})"
    Profile.all.each do |p|
      next if profile == p

      Match.find_or_create_by!(matcher: profile, matched: p)
    end
  end
end
