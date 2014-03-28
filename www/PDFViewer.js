/*
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2013, Creative Skills (http://creativeskills.nl)
 */

 cordova.define("xtensive/plugins/pdfviewer", 
    function(require, exports, module) {
        
        var exec = require('cordova/exec');

        var PDFViewer = function() {};

        PDFViewer.CLOSE_EVENT = 0;
        PDFViewer.LOCATION_CHANGED_EVENT = 1;

        /**
         * Close the browser opened by showWebPage.
         */
        PDFViewer.prototype.close = function() {
            
            cordova.exec(null, null, "PDFViewer", "close", []);
        };

        /**
         * Display a PDFViewer with the specified URL.
         * This method starts a new web browser activity.
         *
         * @param path           The path to load
         */
        PDFViewer.prototype.openPDF = function(path) {

            cordova.exec(null, null, "PDFViewer", "openPDF", [ { fileName: path } ]);
        };

        /**
         * Method called when the PDFViewer has an event.
         */
        PDFViewer.prototype._onEvent = function(data) {

            if (data.type == PDFViewer.CLOSE_EVENT && typeof window.plugins.PDFViewer.onClose === "function") {
                window.plugins.childBrowser.onClose();
            }
            if (data.type == PDFViewer.LOCATION_CHANGED_EVENT && typeof window.plugins.PDFViewer.onLocationChange === "function") {
                window.plugins.PDFViewer.onLocationChange( data.location );
            }
        };

        /**
         * Method called when the PDFViewer has an error.
         */
        PDFViewer.prototype._onError = function(data) {

            if (typeof window.plugins.PDFViewer.onError === "function") {
                window.plugins.PDFViewer.onError( data );
            }
        };

        /**
         * Maintain API consistency with iOS
         */
        PDFViewer.prototype.install = function(){
        };

        var pdfviewer = new PDFViewer();
        module.exports = pdfviewer;
    }
);

/**
 * Load PDFViewer
 */
if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.PDFViewer) {
    window.plugins.PDFViewer = cordova.require("xtensive/plugins/pdfviewer");
}