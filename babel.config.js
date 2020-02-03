module.exports = function(api) {
    api.cache(true)

    return ({
        presets: [
            "@babel/preset-react",
            "@babel/preset-env",
            [ "@babel/typescript", { isTSX: true, allExtensions: true } ]
        ],
        plugins: [
			"@babel/proposal-class-properties",
			"@babel/proposal-object-rest-spread"
	    ]
    })
}