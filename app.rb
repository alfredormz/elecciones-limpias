require 'json'

module EleccionesLimpias
  class App < Sinatra::Base

    set sessions: true
    set :haml, { :format => :html5}

    get "/" do
      haml :index
    end

    get "/auth/:provider/callback" do
      content_type :json
      MultiJson.encode request.env
    end

    post '/upload' do
      {done: "ok"}.to_json
    end

    use OmniAuth::Builder do
      provider :facebook, "619229738100231", "300775d1ead230400279fcc4da9613aa"
    end
  end
end
