// ЗАМЕТКИ:

// create    - кнопка;
// maxRadius - максимальный радиус скругления (половина высоты кнопки);
// maxBorder - максимальная ширина бордюра (шестая часть высоты кнопки);
// sliderWidth - длина слайдера;
// rangeWidth - длина выбраного уровня слайдера;
// radiusValue - сырое значение радиуса;
// radiusToCss - готовое значение радиуса для стилей;

;(function() {

	var app = {
		initialize: function() {
			this.setUpListeners();
			this.updateResult();
			this.setUpSlider();
			// this.getBorderRadius();
			// this.getBorderWidth();
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
		},

		create    : $(".create"),
		maxRadius : $(".create").outerHeight() / 2,
		maxBorder : $(".create").outerHeight() / 4,

		// Настройки слайдера:
		setUpSlider: function() {
			var startRadius = this.create.css("border-radius"),
				startRadius = parseInt(startRadius),
				startBorder = this.create.css("border-width"),
				startBorder = parseInt(startBorder);

			$("#brad-slider").slider({
				range: "min",
				max: this.maxRadius,
				step: 1,
				value: startRadius,
				slide: this.getBorderRadius
			});

			$("#brdr-slider").slider({
				range: "min",
				max: this.maxBorder,
				step: 1,
				value: startBorder,
				slide: this.getBorderWidth
			});
		},

		// Получаем значение border-radius из слайдера:
		getBorderRadius: function() {
			var newRadiusToCss = $("#brad-slider").slider("option", "value");

			app.create.css({
				"border-radius" : newRadiusToCss
			});

			app.updateResult();
		},

		// Получаем значение border-width из слайдера:
		getBorderWidth: function() {
			var y = parseFloat($("#brdr-slider").css("width")),
				x = parseFloat($("#brdr-slider .ui-slider-range").css("width")),
				z = x/y,
				z1 = z * app.maxBorder,
				borderToCss = z1.toFixed() + "px";

			var newBorderToCss = $("#brdr-slider").slider("option", "value");

			app.create.css({
				"border-width" : newBorderToCss
			});

			app.updateResult();
		},

		// Изменяем текст в кнопке:
		textChange : function() {
			var text = $("#input-text").val();

			this.create.text(text);
			this.updateResult();
		},

		// Изменение кнопки и результатов вывода:
		updateResult: function(newRadiusToCss) {
			var htmlResult   = this.create.html(),
				htmlCode     = $("#html-code"),
				cssCode      = $("#css-code"),
				borderRadius = this.create.css("border-radius"),
				border       = this.create.css("border-width");

			htmlCode.text(
				"<button class='button' type='submit'>" + htmlResult + "</button>"
			);

			cssCode.text(
				"background-color: #1ABC9C;\n" +
				"border: " + border + " solid #17a689;\n" +
				"-webkit-border-radius: " + borderRadius + ";\n" +
				"border-radius: " + borderRadius + ";\n" +
				"color: #FFF;\n" +
				"font-weight: bold;\n" +
				"line-height: 2.6em;\n" +
				"margin: 50px auto;\n" +
				"min-height: 40px;\n" +
				"min-width: 140px;\n" +
				"padding: 0 8px;\n" +
				"text-align: center;"
			);
		}

	};

	// Инициализируем модуль:
	app.initialize();

}());
