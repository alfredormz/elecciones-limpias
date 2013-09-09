class Submission < Sequel::Model
  plugin :timestamps
  plugin :paperclip

  attachment :photo,
    :url => ":host:/:model:/:id:_:basename:_:style:.:format:",
    :path => "public/img/:model:/:id:_:basename:_:style:.:format:",
    :styles => {
      :small => { :geometry => "60x60#", :format => :jpg },
      :medium => { :geometry => "250x200>", :format => :jpg },
      :huge => { :geometry => "600x500>", :format => :jpg },
    },
    :processors => [
      {
        :type => :image
      }
    ]
end
