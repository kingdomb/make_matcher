class Friend < ApplicationRecord
  belongs_to :source, class_name: "User"
  belongs_to :destination, class_name: "User"
end
