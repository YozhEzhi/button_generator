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

(function() {

	var mail = {

		initialize : function () {
			this.setUpListeners();
		},

		setUpListeners: function () {
			$('form').on('submit', mail.submitForm);
			$('form').on('keydown', 'input', mail.removeError);
		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]');

			if( mail.validateForm(form) === false ) return false;

			submitBtn.attr("disabled", "disabled");

			var str = form.serialize();

			$.ajax({
				url: "src/contact_form/post.php",
				type: "POST",
				data: str
			})

			.done(function(msg) {
				if(msg === "OK"){
					var result = "<div = 'bg-success'>CSS3 button was send to your email, bro! Pease!</div>";

					form.html(result);
				} else {
					form.html(msg);
				}
			})

			.always(function() {
				submitBtn.removeAttr("disabled");
			});

		},

		validateForm: function (form){
			var inputs = form.find("input"),
				valid = true;

			// Разрушаем все тултипы:
			inputs.tooltip("destroy");

			// Проходим по всем импутам и проверяем значения:
			$.each(inputs, function(index, val) {
				var input = $(val),
					val = input.val(),
					formGroup = input.parents(".form-group"),
					textError = "Enter your e-mail bro!";

				// Отображение тултипа:
				if(val.length === 0) {
					formGroup.addClass('has-error').removeClass('has-success');

					input.tooltip({
						trigger: 'manual',
						placement: 'right',
						title: textError
					}).tooltip('show');

					valid = false;
				} else {
					formGroup.addClass('has-success').removeClass('has-error');
				}
			});

			return valid;
		},

		removeError: function () {
			$(this).tooltip('destroy').parents('.form-group').removeClass('has-error');
		}

	}

	mail.initialize();

}());
