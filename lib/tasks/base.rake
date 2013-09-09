desc "App console"
task :console => :environment do
  binding.pry(quiet: true)
end

