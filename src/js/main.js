(function() {

	var app = {
		initialize: function() {
			this.setUpListeners();
			this.setUpSlider();
			this.getBorderRadius();
			this.changeRadius();
			this.getBorderWidth();
			this.changeBorderWidth();
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
		},

		create    : $(".create"),
		maxRadius : $(".create").outerHeight() / 2,
		maxBorder : $(".create").outerHeight() / 6,
		MAXRADIUS : 20,
		MINRADIUS : 0,

		// Описываем слайдера:
		setUpSlider: function() {
			$("#brad-slider").slider({
				orientation: "horizontal",
				range: "min",
				max: this.maxRadius,
				value: this.maxRadius / 2,
				slide: this.getBorderRadius
			});

			$("#brdr-slider").slider({
				orientation: "horizontal",
				range: "min",
				max: this.maxRadius,
				value: this.maxRadius / 2,
				slide: this.getBorderWidth
			});
		},

		// Получаем значение border-radius из слайдера:
		getBorderRadius: function() {
			var y = $("#brad-slider").css("width"),
				y1 = parseFloat(y),
				x = $("#brad-slider .ui-slider-range").css("width"),
				x1 = parseFloat(x),
				z = x1/y1,
				z1 = z * app.maxRadius,
				z2 = z1.toFixed() + "px";

			app.changeRadius(z2);

			app.updateResult();
		},

		// Изменяем border-radius кнопке:
		changeRadius: function(radius) {
			this.create.css({
				"border-radius" : radius
			});
		},

		// Получаем значение border-width из слайдера:
		getBorderWidth: function() {
			var y = $("#brdr-slider").css("width"),
				y1 = parseFloat(y),
				x = $("#brdr-slider .ui-slider-range").css("width"),
				x1 = parseFloat(x),
				z = x1/y1,
				z1 = z * app.maxBorder,
				z2 = z1.toFixed() + "px";

			app.changeBorderWidth(z2);

			app.updateResult();
		},

		// Изменяем border-width кнопке:
		changeBorderWidth: function(width) {
			this.create.css({
				"border-width" : width
			});
		},

		textChange : function() {
			var text = $("#input-text").val();

			this.create.text(text);

			this.updateResult();
		},

		updateResult: function() {
			var borderRadius = this.create.css("border-radius"),
				border       = this.create.css("border"),
				htmlResult   = $("#create").html(),
				htmlCode     = $("#html-code"),
				cssCode      = $("#css-code");

			htmlCode.text(
				'<button class="button" type="submit">' + htmlResult + '</button>'
			);

			cssCode.text(
				"border: " + border + ";\n" +
				"-webkit-border-radius: " + borderRadius + ";\n" +
				"border-radius: " + borderRadius + ";"
			);
		}

	};

	// Инициализируем модуль:
	app.initialize();

}());
