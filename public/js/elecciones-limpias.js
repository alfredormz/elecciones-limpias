var eleccionesLimpias = {};

eleccionesLimpias.Wizard = Backbone.View.extend({
  el: $(".submission-wrap")
});

eleccionesLimpias.ChooseFile = eleccionesLimpias.Wizard.extend({

  initialize: function() {
    this.template = _.template($("#choose-file-template").html());
  },

  render: function(){
    this.$(".content").html(this.template({}));
    return this;
  },

  events: {
    "click #fileinput-button": "openDialog",
    "change #submission-file": "showPreview"
  },

  openDialog: function(e){
    e.preventDefault();
    this.$("#submission-file").trigger("click");
  },

  showPreview: function(e){
    this.nextStep = new eleccionesLimpias.ShowPreview({model: {file: e.target.files[0]}});
    this.nextStep.render();
  }


});

eleccionesLimpias.ShowPreview = eleccionesLimpias.Wizard.extend({

  initialize: function(){
    this.template = _.template($("#show-preview-template").html());
  },

  render: function(){
    this.$(".content").html(this.template({}));
    var loadingImage = loadImage(
      this.model.file,
      function (img) {
        this.$("#upload-preview").html(img);
      },
      { maxWidth: 200, maxHeight: 200, crop: true }
    );
    return this;
  },
  
  events: {
    "click #upload": "saveSubmission"
  },

  saveSubmission: function(e) {
    $("form").submit(); 
  }
});

var chooseFile = new eleccionesLimpias.ChooseFile();
chooseFile.render();

