let ConcatSource = require('webpack-core/lib/ConcatSource');

function ReplaceStringPatternPlugin(options) {
	this.options = options;
}

ReplaceStringPatternPlugin.prototype.apply = function (compiler) {
	compiler.plugin('compilation', (compilation) => {
		compilation.plugin('optimize-chunk-assets', (chunks, done) => {
			let options = this.options;
			chunks
				.forEach(chunk =>
					chunk.files
						.filter(file => options.filePattern.test(file))
						.forEach(file => {
							let result = compilation.assets[file].source();
							if (!options.skip && options.pattern && options.replacement) {
								result = result.replace(options.pattern, options.replacement);
							}
							compilation.assets[file] = new ConcatSource(result);
						})
				);
			done();
		})
	});
};

module.exports = ReplaceStringPatternPlugin;