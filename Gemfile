source "https://rubygems.org"

gem "sinatra"
gem "sequel"
gem "haml"
gem "rake"
gem "omniauth-facebook"
gem "sequel_paperclip"
gem "activesupport"

group :development do
  gem "pry"
  gem "sqlite3"
end

group :production do
  gem "sequel_pg"
  gem "pg"
end

group :test do
  gem "rack-test", require: "rack/test"
  gem "capybara"
end
