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
      submission = Submission.create do |submission|
        submission.photo = params[:photo][:tempfile]
      end
      {file_url: submission.photo.path(:small)}.to_json
    end

    use OmniAuth::Builder do
      provider :facebook, ENV['APP_ID'], ENV['APP_SECRET']
    end
  end
end
