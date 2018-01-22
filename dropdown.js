/*!
    Fall-Back Dropdown v1.0.0
    https://github.com/Fall-Back/Dropdown
    Copyright (c) 2017, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/
(function() {
    
    var dropdown_js_classname = 'js-dropdown'; 

    var check_for_css = function(selector) {
        var rules;
        var haveRule = false;
        if (typeof document.styleSheets != "undefined") {// is this supported
            var cssSheets = document.styleSheets;
            outerloop:
            for (var i = 0; i < cssSheets.length; i++) {
                // using IE or FireFox/Standards Compliant
                rules = (typeof cssSheets[i].cssRules != "undefined") ? cssSheets[i].cssRules : cssSheets[i].rules;
                for (var j = 0; j < rules.length; j++) {
                    if (rules[j].selectorText == selector) {
                        haveRule = true;
                        break outerloop;
                    }
                }
            }
        }
        return haveRule;
    }
    
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

	var dropdown = {

        init: function() {
            var dropdowns = document.querySelectorAll('.dropdown');
            /*var dropdown_js_classname = 'js-dropdown';
            // Note that `getComputedStyle` on pseudo elements doesn't work in Opera Mini, but in
            // this case I'm happy to serve only the un-enhanced version to Opera Mini.
            var css_is_loaded = (
                window.getComputedStyle(dropdown, ':before')
                .getPropertyValue('content')
                .replace(/(\"|\')/g, '')
                == 'CSS Loaded'
            );*/

            if (css_is_loaded) {
                Array.prototype.forEach.call(dropdowns, function(dropdown, i) {
                    // Add the JS class names ...
                    if (dropdown.classList) {
                        dropdown.classList.add(dropdown_js_classname);
                    } else {
                        dropdown.className += ' ' + dropdown_js_classname;
                    }
                    // ... and button actions:
                    var buttons = document.querySelectorAll('[data-js="dropdown__button"]');
                    Array.prototype.forEach.call(buttons, function(button, i) {
                        var button_id = button.getAttribute('id');

                        button.setAttribute('aria-expanded', 'false');

                        // Main button:
                        button.addEventListener('click', function() {
                            // Switch the `aria-expanded` attribute:
                            var expanded = this.getAttribute('aria-expanded') === 'true' || false;

                            // Close any open dropdown:
                            var expanded_buttons = document.querySelectorAll('[data-js="dropdown__button"][aria-expanded="true"]');
                            Array.prototype.forEach.call(expanded_buttons, function(expanded_button, i) {
                                expanded_button.setAttribute('aria-expanded', 'false');
                            });

                            // Set the attribute:
                            this.setAttribute('aria-expanded', !expanded);

                            // Set the focus to the first link if submenu newly opened:
                            if (!expanded) {
                                var first_link = document.querySelector('#' + button_id + '--target [data-js="dropdown__focus-start"]');
                                if (first_link) {
                                    first_link.focus();
                                }
                            }
                        });
                    });
                });
            }
        }
	}
    
    var css_is_loaded = check_for_css('.' + dropdown_js_classname);
    
    if (css_is_loaded) {
        // Add the JS class name ...
        
        var hmtl_el = document.querySelector('html');
        
        if (hmtl_el.classList) {
            hmtl_el.classList.add(dropdown_js_classname);
        } else {
            hmtl_el.className += ' ' + dropdown_js_classname;
        }
    }

	ready(dropdown.init);
})();
