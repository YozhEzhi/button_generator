(function() {
	console.log('test');
	var app = {
		initialize: function() {
			this.setUpListeners();
			this.updateResult();
		},
		setUpListeners: function() {
			$("#increase-radius").on("click", $.proxy(this.increaseRadius, this));
			$("#reduse-radius").on("click", $.proxy(this.reduseRadius, this));
			$("#border-color").on("change", $.proxy(this.brdrColorInput, this));
			$("#bg-color").on("change", $.proxy(this.bgColorInput, this));
		},

		create    : $(".create"),
		MAXRADIUS : 20,
		MINRADIUS : 0,

		increaseRadius: function() {
			var currentRadius = this.create.css("border-radius"),
				step = $("#step").val(),
				newRadius = parseInt(currentRadius) + parseInt(step);

			if(newRadius > this.MAXRADIUS) {
				newRadius = this.MAXRADIUS;
				$("#increase-radius").addClass("disabled");
			}
			if(newRadius > this.MINRADIUS){
				$("#reduse-radius").removeClass("disabled");
			}

			this.create.css({
				"border-radius" : newRadius
			});

			this.updateResult();
		},

		reduseRadius: function() {
			var currentRadius = this.create.css("border-radius"),
				step = $("#step").val(),
				newRadius = parseInt(currentRadius) - parseInt(step);

			if(newRadius < this.MINRADIUS) {
				newRadius = this.MINRADIUS;
				$("#reduse-radius").addClass("disabled");
			}

			if(newRadius < this.MAXRADIUS){
				$("#increase-radius").removeClass("disabled");
			}

			this.create.css({
				"border-radius" : newRadius
			});

			this.updateResult();
		},

		bgColorInput : function() {
			var newColor = "#" + $("#bg-color").val();

			this.create.css({
				"background-color" : newColor
			});

			this.updateResult();
		},

		brdrColorInput : function() {
			var newColor = "#" + $("#border-color").val();

			this.create.css({
				"border-color" : newColor
			});

			this.updateResult();
		},

		updateResult: function() {
			var borderRadius   = this.create.css("border-radius"),
				bgColor        = this.create.css("background-color"),
				brdrColor      = this.create.css("border-color"),
				codeResultArea = $("#code-result");

			codeResultArea.text(
				"backgtound-color: " + bgColor + ";\n" +
				"border-color: " + brdrColor + ";\n" +
				"-webkit-border-radius: " + borderRadius + ";\n" +
				"border-radius: " + borderRadius + ";"
			);
		}

	};

	app.initialize();

}());
