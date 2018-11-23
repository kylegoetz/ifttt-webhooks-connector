module.exports = {
	transform: {
	  "^.+\\.tsx?$": "ts-jest",
	},
	testEnvironment: 'node',
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/test/',
		'/dist/'
	],
	collectCoverage: true,
	testURL: 'http://localhost'
  };
