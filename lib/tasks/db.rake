require 'sequel'

namespace :db do
  namespace :migrate do

    desc "Perform migration up to latest migration available"
    task :up => :environment do
      Sequel.extension :migration
      Sequel::Migrator.run DB, "db/migrate" 
      puts "=> db:migrate:up completed"
    end

    desc "Perform migration down (erase all data)"
    task :down => :environment do
      Sequel.extension :migration
      Sequel::Migrator.run DB, "db/migrate", target: 0 
      puts "=> db:migrate:down completed"
    end

  end
end
