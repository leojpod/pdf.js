/* -*- Mode: Java; tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
/**
 * Created by leojpod on 6/9/15.
 */

"use strict";


console.info('init multi-selection mode');

var previousSelection=null;

document.addEventListener('selectionchange', function (e) {
  console.log('selection changed');
  var i;
  //add the new selection to the old

  //version 1 -> brute force -> add all the previous selection
  if (previousSelection !== null) {
    for (i = 0; i < previousSelection.length; i += 1) {
      window.getSelection().addRange(previousSelection[i]);
    }
  }

  //update previousSelection to match the new one
  previousSelection = [];
  for (i = 0 ; i < window.getSelection().rangeCount; i += 1) {
    previousSelection[i] = window.getSelection().getRangeAt(i);
  }

});

