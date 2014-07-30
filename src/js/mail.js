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