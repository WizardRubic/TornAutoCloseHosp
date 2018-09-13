// ==UserScript==
// @name         AutoCloseHosp'd
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       WizardRubic
// @match        *.torn.com/profiles.php*
// @grant        window.close

// ==/UserScript==

(function() {
    'use strict';
    var isAttackable = function(description) {
        // if hospital or travelling then return false as they're not attackable
        if(description.indexOf("hospital")!=-1 || description.indexOf("Travel")!=-1 || description.indexOf("jail")!=-1){
            return false;
        } else {
            return true;
        }
    };
    var profileElement = (document.getElementsByClassName("content-wrapper m-left20 left summer")[0]);
    var callback = function(mutationsList) {
        var description = document.getElementsByClassName("main-desc")[0].innerHTML;
        if(!isAttackable(description)) {
            window.close();
        }
    };
    var mutationConfig = { attributes: true, childList: true, subtree: true };
    var observer = new MutationObserver(callback);
    observer.observe(profileElement, mutationConfig);
})();