/**
 * @name UtilityView
 * @desc Handles operations for the command line toolbar
 *
 * TODO This is horrid, fix it!
 */

define(function() {

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
				var classes = acceptable.map(function(c) { return 'is-' + c });
				$("body").removeClass(classes.join(' '));
				$("body").addClass(	'is-' + value);
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

		handleSubmit: function(e) {
			e.preventDefault();
			var command = this.el.elements.command;

			this.current = this.commandList.length;

			var statement = command.value.split(" ");
			var action = statement[0];
			var value = statement.slice(1).join(" ");

			if (action in this.actions) {
				this.actions[action](value);
				this.commandList.push(command.value);
				command.value = action + " ";
			} else {
				this.actions.echo(command.value)
				command.value = '';
			}
		}

	});

	return UtilityView;
});
