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
			this.setUpSlider();
			this.getBorderRadius();
			this.getBorderWidth();
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
		},

		create    : $(".create"),
		maxRadius : $(".create").outerHeight() / 2,
		maxBorder : $(".create").outerHeight() / 4,

		// Настройки слайдера:
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
				step: 1,
				value: this.maxRadius / 2,
				slide: this.getBorderWidth
			});
		},

		// Получаем значение border-radius из слайдера:
		getBorderRadius: function() {
			var sliderWidth = parseFloat($("#brad-slider").css("width")),
				rangeWidth  = parseFloat($("#brad-slider .ui-slider-range").css("width")),
				radiusValue = (rangeWidth/sliderWidth) * app.maxRadius,
				radiusToCss = radiusValue.toFixed() + "px";

			app.create.css({
				"border-radius" : radiusToCss
			});

			app.updateResult(radiusToCss);
		},

		// Получаем значение border-width из слайдера:
		getBorderWidth: function() {
			var y = parseFloat($("#brdr-slider").css("width")),
				x = parseFloat($("#brdr-slider .ui-slider-range").css("width")),
				z = x/y,
				z1 = z * app.maxBorder,
				borderToCss = z1.toFixed() + "px";

			app.create.css({
				"border-width" : borderToCss
			});

			app.updateResult(borderToCss);
		},

		// Изменяем текст в кнопке:
		textChange : function() {
			var text = $("#input-text").val();

			this.create.text(text);
			this.updateResult();
		},

		// Изменение кнопки и результатов вывода:
		updateResult: function(radiusToCss, borderToCss) {
			var htmlResult = $("#create").html(),
				htmlCode   = $("#html-code"),
				cssCode    = $("#css-code");

			htmlCode.text(
				"<button class='button' type='submit'>" + htmlResult + "</button>"
			);

			cssCode.text(
				"background-color: #1ABC9C;\n" +
				"border-color: #17a689;\n" +
				"border-style: solid;\n" +
				"border-width: " + borderToCss + ";\n" +
				"-webkit-border-radius: " + radiusToCss + ";\n" +
				"border-radius: " + radiusToCss + ";\n" +
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
