/**
 * @name UtilityView
 * @desc Handles operations for the command line toolbar
 *
 * TODO This is horrid, fix it!
 */

var UtilityView = Marionette.ItemView.extend({

	commandList: [],
	current: 0,

	actions: {
		hostname: function(value) {
			this.hostname = value;
		},

		cd: function(value) {
			window.location.pathname = value;
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

	handleSubmit: function(e) {
		e.preventDefault();

		var command = this.el.elements.command;

		this.commandList.push(command.value);
		this.current = this.commandList.length;

		var el = this.el;
		var actions = this.actions;
		var statement = command.value.split(" ");
		var action = statement[0];
		var value = statement.slice(1).join(" ");

		if (action in actions) {
			actions[action](value);
		} else {
			el.classList.add("error");
			setTimeout(function() {
				el.classList.remove("error");
			}, 200);
		}

		command.value = action + " ";
	}

});
