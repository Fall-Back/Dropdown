/*!
    Fall-Back Dropdown v1.0.0
    https://github.com/Fall-Back/Dropdown
    Copyright (c) 2017, Andy Kirk
    Released under the MIT license https://git.io/vwTVl
*/
(function() {
    var ready = function(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

	var dropdown = {

        init: function() {
            var dropdown = document.querySelector('.dropdown');
            var dropdown_js_classname = 'js-dropdown';
            // Note that `getComputedStyle` on pseudo elements doesn't work in Opera Mini, but in
            // this case I'm happy to serve only the un-enhanced version to Opera Mini.
            var css_is_loaded = (
                window.getComputedStyle(dropdown, ':before')
                .getPropertyValue('content')
                .replace(/(\"|\')/g, '')
                == 'CSS Loaded'
            );
            //console.log(window.getComputedStyle(dropdown, ':before').getPropertyValue('content'));
            //console.log(css_is_loaded);

            if (css_is_loaded) {
                // Add the JS class names ...
                if (dropdown.classList) {
                    dropdown.classList.add(dropdown_js_classname);
                } else {
                    dropdown.className += ' ' + dropdown_js_classname;
                }
                // ... and button actions:
                // (note a dilemma here, as the toggle button code is designed to be generic, but I
                // don't want to run it for ALL `.js-toggle-button` by default, because I'm being
                // more discerning than that. I.e. I NEVER want this running for Opera Mini, and I
                // ONLY want it running for Dropdowns if the Dropdown CSS has loaded.
                // Maybe just abstract the toggle code into a standalone file, and make it callable
                // and act upon a selector that's passed to it).
                // NOTE! Can't use .js-toggle-button as a general classname because of collisions
                // with other scripts. I.e. nav0bar in this case. I can't have both nav-bar AND
                // dropdown events on the same button.
                var buttons = document.querySelectorAll('.js-dropdown .js-dropdown__button');
                Array.prototype.forEach.call(buttons, function(button, i) {
                    var button_id = button.getAttribute('id');

                    button.setAttribute('aria-expanded', 'false');

                    // Main button:
                    button.addEventListener('click', function() {
                        // Switch the `aria-expanded` attribute:
                        var expanded = this.getAttribute('aria-expanded') === 'true' || false;

                        // Close any open dropdown:
                        var expanded_buttons = document.querySelectorAll('.js-dropdown .js-dropdown__button[aria-expanded="true"]');
                        Array.prototype.forEach.call(expanded_buttons, function(expanded_button, i) {
                            expanded_button.setAttribute('aria-expanded', 'false');
                        });

                        // Set the attribute:
                        this.setAttribute('aria-expanded', !expanded);

                        // Set the focus to the first link if submenu newly opened:
                        if (!expanded) {
                            var first_link = document.querySelector('#' + button_id + '--target .drop__link');
                            if (first_link) {
                                first_link.focus();
                            }
                        }
                    });

                });
            }
        }
	}

	ready(dropdown.init);
})();
