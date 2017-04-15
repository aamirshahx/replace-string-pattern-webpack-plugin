let ConcatSource = require('webpack-core/lib/ConcatSource');

function ReplaceStringPatternPlugin(options) {
	if (options instanceof Array) {
		this.options = options;
	} else {
		this.options = [options];
	}
}

ReplaceStringPatternPlugin.prototype.apply = function (compiler) {
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('optimize-chunk-assets', (chunks, done) => {
			let options = this.options;
			options.forEach(option => {
				chunks.forEach(chunk => chunk
					.files
					.filter(file => option.filePattern.test(file))
					.forEach(file => {
						let result = compilation.assets[file].source();
						if (!option.skip && option.pattern && option.replacement) {
							result = result.replace(option.pattern, option.replacement);
						}
						compilation.assets[file] = new ConcatSource(result);
					})
				);
			});
			done();
		})
	});
};

module.exports = ReplaceStringPatternPlugin;