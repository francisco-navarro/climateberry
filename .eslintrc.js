module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "no-console": 0,
        "global-require": 0,
        "no-use-before-define": 0
    },
    "plugins": [ "jasmine" ],
    "env": {
        "jasmine": true,
        "node": true
    }
};