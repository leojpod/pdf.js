/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/**
 * Created by leojpod on 6/9/15.
 */

"use strict";


var PDFMultiSelectionController = (function PDFMultiSelectionControllerClosure() {
  function PDFMultiSelectionController(options) {
    options = options || {};
    this.selections = [];
    this.pdfViewer = options.pdfViewer || null;
    var self = this, selectionChanged = false;
    //setup the listeners
    document.addEventListener('selectionchange', function () {
      selectionChanged = true;
    });
    document.addEventListener('mouseup', function () {
      var i, range;
      if (selectionChanged) {
        //update selections
        for (i = 0; i < window.getSelection().rangeCount; i += 1) {
          range = window.getSelection().getRangeAt(i);
          if (range.collapsed === false) {
            self.selections.push(range);
          }
        }
        //console.log('a range');
        //console.log(range);
        //re-render current page
        self.updateSelections();
      }

      //reset selectionChanged
      selectionChanged = false;
      //clear out the selection for cleaner results
      window.getSelection().removeAllRanges();
    })
  }

  PDFMultiSelectionController.prototype = {
    updateSelections: function PDFMultiSelectionController_updateSelection() {
      if (this.pdfViewer !== null) {
        var visiblePages = this.pdfViewer._getVisiblePages().views;
        var page;
        //update all the visible pages
        for (var i = 0, len = visiblePages.length; i < len; i++) {
          page = this.pdfViewer.getPageView(visiblePages[i].id - 1);
          if (page.textLayer) {
            page.textLayer.updateSelections();
          }
        }
      }
    }
  };
  return PDFMultiSelectionController;
})();
