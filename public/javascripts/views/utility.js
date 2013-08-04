/**
 * @name UtilityView
 * @desc Handles operations for the command line toolbar
 *
 * TODO This is horrid, fix it!
 */

define(function() {
	var $window = $(window);
	var $body = $("body");

	var UtilityView = Marionette.ItemView.extend({
		commandList: [],
		current: 0,

		actions: {
			hostname: function(value) {
				this.hostname = value;
			},

			cd: function(value) {
				window.location.pathname = value;
			},

			mode: function(value) {
				var acceptable = ['fullscreen', 'default']
				var classes = acceptable.map(function(c) { return 'mode-' + c });
				$body.removeClass(classes.join(' '));
				$body.addClass('mode-' + value);

				$window.trigger('resize');
			}
		},

		events: {
			'keyup' : 'handleKeyup',
			'submit': 'handleSubmit'
		},

		initialize: function() {
			this.el.elements.command.focus();
		},

		registerTask: function(action, callback) {
			this.actions[action] = callback.bind(this);
		},

		handleKeyup: function(e) {
			var UP = 38;
			var DOWN = 40;

			switch(e.keyCode) {
				case UP:
					this.current = Math.max(0, this.current - 1);
					this.el.elements.command.value = this.commandList[this.current] || "";
					break;
				case DOWN:
					this.current = Math.min(this.commandList.length, this.current + 1);
					this.el.elements.command.value = this.commandList[this.current] || "";
					break;
			}

		},

		flagError: function() {
			var $el = this.$el;
			$el.addClass('error');
			setTimeout(function() {
				$el.removeClass("error");
			}, 200);
		},

		clear: function() {
			this.el.elements.command.value = '';
		},

		handleSubmit: function(e) {
			e.preventDefault();

			var command = this.el.elements.command;
			var value = command.value;
			var action = 'echo'
			var statement = command.value.match(/\/(\w+?)\b(.+)/);

			this.current = this.commandList.length;

			action = (statement? statement[1] : action).trim()
			value = (statement? statement[2] : value).trim()

			if (action in this.actions) {
				this.actions[action](value);
				this.commandList.push(value);
				this.clear();
			}
		}
	});

	return UtilityView;
});
