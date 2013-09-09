require "bundler"

Bundler.require

APP_ROOT = File.expand_path('../..', __FILE__) unless defined? APP_ROOT

APP_ENV = ENV['APP_ENV'] ||= ENV['RACK_ENV'] ||= 'development'
ENV['RACK_ENV'] = APP_ENV

$LOAD_PATH.unshift APP_ROOT
$LOAD_PATH.unshift File.join(APP_ROOT, 'lib')
$LOAD_PATH.unshift File.join(APP_ROOT, 'config')

%w{models helpers controllers}.each do |dir|
  $LOAD_PATH.unshift File.join(APP_ROOT, 'app', dir)
end

require "environment" 
require "app"
