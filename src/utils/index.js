// blast from the past! Copied this from internet long long time ago, don't remember from where thou..
export const copyToClipboard = (elem) => {
  var targetId = "_hiddenCopyText_";
  var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
  var origSelectionStart, origSelectionEnd;

    var target = document.createElement("textarea");

      target.style.position = "absolute";
      target.style.left = "-9999px";
      target.style.top = "0";
      target.id = targetId;
      document.body.appendChild(target);

      target.textContent = elem;

    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    // copy the selection
    var succeed;
    try {
      succeed = document.execCommand("copy");
    }
    catch(e) {
      succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
      currentFocus.focus();
    }
    if (isInput) {
      // restore prior selectio
      elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    }
    else {
      // clear temporary content
      target.textContent = "";
    }
    return succeed;
} // end of copy mechanism
