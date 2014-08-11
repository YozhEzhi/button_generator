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
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
			// $("#submit").on("click", $.proxy(this.sendMail, this));
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
				".button {\n" +
				"\t background-color: #1ABC9C;\n" +
				"\t border: " + border + " solid #17a689;\n" +
				"\t -webkit-border-radius: " + borderRadius + ";\n" +
				"\t border-radius: " + borderRadius + ";\n" +
				"\t color: #FFF;\n" +
				"\t font-weight: bold;\n" +
				"\t line-height: 2.6em;\n" +
				"\t margin: 50px auto;\n" +
				"\t min-height: 40px;\n" +
				"\t min-width: 140px;\n" +
				"\t padding: 0 8px;\n" +
				"\t text-align: center;\n" +
				"}"
			);
		},

		// Отправка письма с результатом:
		sendMail: function () {

		},

		// Валидация поля Email
		validMail: function () {

		}

	};

	// Инициализируем модуль:
	app.initialize();

}());
