replace-string-pattern-webpack-plugin
===

##Arguments
filePattern: RegExp

pattern: RegExp

replacement: Func|String
 
---
#  Example 
```js
var ReplaceStringPatternPlugin = require('replace-string-pattern-webpack-plugin');

plugins: [
	new ReplaceStringPatternPlugin({
        filePattern: new RegExp('pattern', 'g'),		// pattern to filter files
        pattern: /pattern-to-replace/g,				    // pattern to replace
        replacement: 'replacement'			            // content to replace above pattern
    })
]

```