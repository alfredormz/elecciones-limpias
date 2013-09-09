require "test_helper"

def app
  App
end

Capybara.app = App

describe "Home" do

  it "shows a welcome message" do
    visit "/"
    assert_equal 200, page.status_code
    page.has_content? "Hi"
  end
end
