// $create     - кнопка;
// maxRadius   - максимальный радиус скругления (половина высоты кнопки);
// maxBorder   - максимальная ширина бордюра (четверть высоты кнопки);
// radiusToCss - значение радиуса для кнопки;
// borderToCss - значение ширины бордюр для кнопки;

;(function() {

	var app = {
		initialize: function() {
			this.radiusToCss = 0;
			this.borderToCss = 0;

			this.setUpListeners();
			this.setUpSlider();
		},

		setUpListeners: function() {
			$("#input-text").on("keyup", $.proxy(this.textChange, this));
			$("form").on("submit", app.submitForm);
			$("form").on("keydown", "input", app.removeError);
			$("[data-dismiss='modal']").on("click", $.proxy(this.closeModal, this));
		},

		$create   : $(".create"),
		maxRadius : $(".create").outerHeight() / 2,
		maxBorder : $(".create").outerHeight() / 4,

		// Настройки слайдера:
		setUpSlider: function() {
			var startRadius = this.$create.css("border-radius"),
				startRadius = parseInt(startRadius),
				startBorder = this.$create.css("border-width"),
				startBorder = parseInt(startBorder);

			$("#brad-slider").slider({
				range : "min",
				min   : 0,
				max   : this.maxRadius,
				step  : 1,
				value : 5,
				slide : function (event, ui) {
					app.radiusToCss = ui.value;
					app.getBorderRadius();
					app.updateResult();
				}
			});

			$("#brdr-slider").slider({
				range : "min",
				min   : 0,
				max   : 10,
				step  : 1,
				value : 3,
				slide : function (event, ui) {
					app.borderToCss = ui.value;
					app.getBorderWidth();
					app.updateResult();
				}
			});
		},

		// Получаем значение border-radius из слайдера:
		getBorderRadius: function() {

			app.$create.css({
				"border-radius" : app.radiusToCss
			});

		},

		// Получаем значение border-width из слайдера:
		getBorderWidth: function() {

			app.$create.css({
				"border-width" : app.borderToCss
			});

		},

		// Изменяем текст в кнопке:
		textChange : function() {
			var text = $("#input-text").val();

			this.$create.text(text);
			this.updateResult();
		},

		// Изменение кнопки и результатов вывода:
		updateResult: function(radiusToCss) {
			var htmlResult   = this.$create.html(),
				htmlCode     = $("#html-code"),
				cssCode      = $("#css-code"),
				borderRadius = app.radiusToCss,
				border       = app.borderToCss;

			htmlCode.text(
				"<button class='button' type='submit'>" + htmlResult + "</button>"
			);

			cssCode.text(
				".button {\n" +
				"\t background-color: #1ABC9C;\n" +
				"\t border: " + border + " solid #17A689;\n" +
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

			var $form      = $(this),
				email      = $("#mail").val(),
				css        = $("#css-code").val(),
				html       = $("#html-code").val(),
				$submitBtn = $form.find('button[type="submit"]');

			if (app.validateForm($form) === false) return false;

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
					// $("#modal").show();

					console.log("Email was send");
				}
			})

			$("#modal").modal();

			$submitBtn.attr("disabled", "disabled"); // Не работает?
			$submitBtn.css("opacity", 0.5);

			console.log(data);
		},

		// Валидация почты:
		validateForm: function(form) {
			var valid  = true,
				$input = $("#mail"),
				val    = $input.val();

			// Отображение тултипа:
			if(val.length === 0) {
				$input
					.addClass("btn-danger")
					.tooltip({
						title: "Type in your e-mail bro!",
						placement: "right",
						trigger: "manual"
					})
					.tooltip("show");

				valid = false;

			} else if ( !app.validMail() ) {
				$input
					.tooltip({
						title: "Type correct mail, bro!",
						placement: "right",
						trigger: "manual"
					})
					.tooltip("show");
			}

			return valid;
		},

		// Валидация поля Email:
		validMail: function () {
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				val      = $("#mail").val();

			if (!val.length) {
				return false;
			}

			return rv_email.test(val);
		},

		// Удаление тултипа и красной обводки для инпута:
		removeError: function () {
			$("#mail")
				.removeClass("btn-danger")
				.tooltip("destroy");
		},

		// Закрытие модального окна:
		closeModal: function () {
			var $submitBtn = $("#submit");

			$submitBtn.attr("disabled", "");
			$submitBtn.css("opacity", 1);
		}

	};

	// Инициализируем модуль:
	app.initialize();

}());
