var require = {
	baseURL: '/javascripts',

	hbars: {
		extension: '.html'
	},

	paths: {
		backbone: 'vendor/backbone',
		Handlebars: 'vendor/Handlebars',
		hbars: 'vendor/hbars',
		jquery: 'vendor/jquery-2.0.3',
		marionette: 'vendor/marionette',
		text: 'vendor/text',
		lodash: 'vendor/lodash',
		hex: 'vendor/hex/grid',
		simplewebrtc: 'vendor/simplewebrtc'
	},

	shim: {
		backbone: {
			deps: ['lodash', 'jquery'],
			exports: 'Backbone'
		},

		setup: {
			deps: ['hex', 'marionette'],
			exports: 'Doppelganger'
		},

		Handlebars: {
			exports: 'Handlebars'
		},

		hex: {
			deps: ['vendor/hex/tools', 'vendor/hex/calculations']
		},

		marionette: {
			deps: ['backbone'],
			exports: 'Marionette'
		},

		simplewebrtc: {
			exports: 'SimpleWebRTC'
		}
	},
	stubModules: ['text', 'hbars'],
	removeCombined: true,
	onBuildWrite : function(moduleName, path, content){
		// replace handlebars with the runtime version
		if (moduleName === 'Handlebars') {
			path = path.replace('Handlebars.js','handlebars.runtime.js');
			content = fs.readFileSync(path).toString();
			content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
		}
		return content;
	}
};
