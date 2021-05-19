const ConcatSource = require('webpack-core/lib/ConcatSource');
const pluginName = 'ReplaceStringPatternWebpackPlugin';

class ReplaceStringPatternWebpackPlugin {
	constructor(options) {
		if (options instanceof Array) {
			this.options = options;
		} else {
			this.options = [options];
		}
	}

	apply(compiler) {
		if (typeof compiler.hooks !== 'undefined') {
			compiler.hooks.compilation.tap(pluginName, this.handleCompilation.bind(this))
		} else if (typeof compiler.plugin !== 'undefined') {
			compiler.plugin('compilation', this.handleCompilation.bind(this))
		}
	}

	handleCompilation(compilation) {
		compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, done) => {
			let options = this.options;
			options.forEach(option => {
				chunks.forEach(chunk => {
					chunk.files
						.filter(file => option.filePattern.test(file))
						.forEach(file => {
							console.log(file)
							let result = compilation.assets[file].source();
							if (!option.skip && option.pattern && option.replacement) {
								result = result.replace(option.pattern, option.replacement);
							}
							compilation.assets[file] = new ConcatSource(result);
						});
				});
			});
			done();
		});
	}
}

module.exports = ReplaceStringPatternWebpackPlugin;
