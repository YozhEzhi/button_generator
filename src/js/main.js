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
			this.getBorderRadius();
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
			$("form").on("submit", app.submitForm);
			$("form").on("keydown", "input", app.removeError);
			$("[data-dismiss='modal']").on("click", $.proxy(this.closeModal, this));
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
				min: 0,
				max: this.maxRadius,
				step: 1,
				value: 5,
				slide: function (event, ui) {
					var newRadiusToCss = ui.value;
					app.getBorderRadius(newRadiusToCss);
				}
			});

			$("#brdr-slider").slider({
				range: "min",
				min: 0,
				max: 10,
				step: 1,
				value: 3,
				slide: function (event, ui) {
					var newBorderToCss = ui.value;
					app.getBorderWidth(newBorderToCss);
				}
			});
		},

		// Получаем значение border-radius из слайдера:
		getBorderRadius: function(newRadiusToCss) {
			console.log(newRadiusToCss);

			app.create.css({
				"border-radius" : newRadiusToCss
			});

			app.updateResult();
		},

		// Получаем значение border-width из слайдера:
		getBorderWidth: function(newBorderToCss) {

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
		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				email = $("#mail").val(),
				css = $("#css-code").val(),
				html = $("#html-code").val(),
				submitBtn = form.find('button[type="submit"]');

			if (app.validateForm(form) === false) return false;

			$.ajax({
				url: "src/post.php",
				type: "POST",
				data: {
					email: this.email,
					css: this.css,
					html: this.html
				},
				success: function () {
					$(".modal__email").text(email);
					$(".modal__html").text(html);
					$(".modal__css").text(css);
					$("#modal").show();
					console.log("Email was send");
				}
			})

			console.log(data);

			submitBtn.attr("disabled", "disabled"); // Не работает?
			submitBtn.css("opacity", 0.5);
		},

		// Валидация почты:
		validateForm: function (form){
			var valid = true,
				input = $("#mail"),
				val = input.val();

			// Отображение тултипа:
			if(val.length === 0) {

				input.addClass("btn-danger").tooltip({
					placement: "right",
					trigger: "manual",
					title: "Enter your e-mail bro!"
				}).tooltip("show");

				valid = false;
			} else if (!app.validMail()) {
				input.tooltip({
					title: "Type correct mail, bro!",
					trigger: "manual",
					placement: "right"
				}).tooltip('show');
			}

			return valid;
		},

		// Валидация поля Email:
		validMail: function () {
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				val = $("#mail").val();
			if (!val.length) {return false;}

			return rv_email.test(val);
		},

		// Удаление тултипа и красной обводки на инпута:
		removeError: function () {
			$("#mail")
				.removeClass("btn-danger")
				.tooltip("destroy");
		},

		// Закрытие модального окна:
		closeModal: function () {
			var submitBtn = $("#submit");

			submitBtn.attr("disabled", "");
			submitBtn.css("opacity", 1);
		}

	};

	// Инициализируем модуль:
	app.initialize();

}());
