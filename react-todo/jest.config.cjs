module.exports = {
    "transform": {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    "testEnvironment": "jsdom",
    "modulePaths": ['<rootDir>/../node_modules'],
    "moduleNameMapper": {
        '^@hoges/(.*)$': '<rootDir>/hogehoge/$1',
    },
};
