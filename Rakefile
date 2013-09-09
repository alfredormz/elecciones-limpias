require 'rake'
require 'bundler/setup'

Bundler.setup

task :environment do
  require File.join(File.dirname(__FILE__), "config", "boot")
end

Dir["lib/tasks/*.rake"].sort.each {|t| load t }

task :default => :console


