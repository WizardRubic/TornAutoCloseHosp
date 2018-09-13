// ==UserScript==
// @name         AutoCloseHosp'd
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  automatically closes torn profile pages if target is in the hospital
// @author       WizardRubic
// @match        *.torn.com/loader.php*
// @grant        window.close

// ==/UserScript==

(function() {
    'use strict';
    var isAttackable = function(description) {
        // if hospital or travelling then return false as they're not attackable
        if(description=="" || description.indexOf("Start fight")!=-1) {
            return true;
        } else {
            return false;
        }
    };
    var profileElement = document.body;
    var callback = function(mutationsList) {
        if(document.getElementsByClassName("dialog___1j2Dg").length == 0) {
           return;
        }
        var description = document.getElementsByClassName("dialog___1j2Dg")[0].innerHTML;
        if(!isAttackable(description)) {
            window.close();
        }
    };
    var mutationConfig = { attributes: true, childList: true, subtree: true };
    var observer = new MutationObserver(callback);
    observer.observe(profileElement, mutationConfig);
})();