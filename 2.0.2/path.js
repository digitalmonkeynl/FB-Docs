/* global require */
/* TODO: PATH SHOULD BE ABSOLUTE OR DIRECTLY CDN URL */
require.config({
    waitSeconds: 0,
    paths : {
        "fb"    : "2.0.2/js",
        "fb-core"  : "2.0.2",
        "fb-root"  : "./",
        'jquery': 'fb/jquery'
    },
    priority: [
        'jquery'
    ]
});