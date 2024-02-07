# commands used to deploy a Rails application
namespace :fly do
  task release: 'db:migrate'
end
