require File.join(File.dirname(__FILE__),"..", "config", "boot")
require 'minitest/autorun'
require "rack/test"
require "capybara"
require "capybara/dsl"

ENV['RACK_ENV'] = "test"

class MiniTest::Unit::TestCase
  include Rack::Test::Methods
end


class MiniTest::Spec
  include Rack::Test::Methods
  include Capybara::DSL
end
