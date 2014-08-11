(function() {

	var mail = {

		initialize : function () {
			this.setUpListeners();
		},

		setUpListeners: function () {
			$("form").on("submit", mail.submitForm);
			$("form").on("keydown", "input", mail.removeError);
		},

		submitForm: function (e) {
			e.preventDefault();

			var form = $(this),
				submitBtn = form.find('button[type="submit"]'),
				data = "mail="+$("#mail").val()+"&html="+$("#html-code").text()+"&css="+$("#css-code").text();

			if (mail.validateForm(form) === false) return false;

			$.ajax({
				url: "src/post.php",
				type: "POST",
				data: data
			})

			submitBtn.attr("disabled", "disabled"); // Не работает?
			submitBtn.css("opacity", 0.5);
		},

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
			} else if (!mail.validMail()) {
				input.tooltip({
					title: "Type correct mail, bro!",
					trigger: "manual",
					placement: "right"
				}).tooltip('show');
			}

			return valid;
		},

		// Валидация поля Email
		validMail: function () {
			var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				val = $("#mail").val();
			if (!val.length) {return false;}

			return rv_email.test(val);
		},

		removeError: function () {
			$("#mail")
				.removeClass("btn-danger")
				.tooltip("destroy");
		}

	}

	mail.initialize();

}());
