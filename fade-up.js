/**
 * File: fade-up.js
 * Simple library for adding fade-up animations to elements and page transitions.
 * Version: 1.0.0
 * Author: Aizat
 * License: MIT
 */

/**
 * !! GentleFadeUp - Individual Element Fade-Up Animation !!
 * Handles fade-up animations for elements with the class 'fade-up-element'.
 */
class GentleFadeUp {
	constructor(element, options = {}) {
		this.element = element;
		this.options = {
			distance: options.distance || '50px', // Distance to fade up from
			duration: options.duration || '1000ms', // Animation duration
			delay: options.delay || '0ms', // Delay before animation starts
			easing: options.easing || 'ease-in-out', // Easing function
			threshold: options.threshold || 0.1, // Percentage of element visible to trigger
		};

		this.element.style.opacity = 0; // Initially hide the element
		this.element.style.transform = `translateY(${this.options.distance})`;
		this.element.style.transition = `opacity ${this.options.duration} ${this.options.easing} ${this.options.delay}, transform ${this.options.duration} ${this.options.easing} ${this.options.delay}`;

		this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
			threshold: this.options.threshold,
		});

		this.observer.observe(this.element);
	}

	handleIntersection(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				this.element.style.opacity = 1;
				this.element.style.transform = 'translateY(0)';
				observer.unobserve(this.element); // Stop observing after animation
			}
		});
	}
}

// Initialize GentleFadeUp for elements with the class 'fade-up-element'

document.addEventListener('DOMContentLoaded', function () {
	const elements = document.querySelectorAll('.fade-up-element');

	elements.forEach((element) => {
		new GentleFadeUp(element, {
			distance: '30px', // Adjust distance as needed
			duration: '800ms', // Adjust duration as needed
			delay: '100ms', // Adjust delay as needed
		});
	});
});
// --- End Gentle Fade Up Animation ---

/**
 * !! Page Fade Down In on Load (JS Only Approach) !!
 * This script below adds a smooth fade-in transition when navigating into the page.
 * It should be used in conjunction with the fade-out script to create a seamless transition
 * when navigating away from the page.
 */
document.addEventListener('DOMContentLoaded', () => {
	// Use the same selector as your fade-out script
	// #inner-wrap is the out MOST wrapper ID for KadenceWP
	const pageWrapperSelector = '#inner-wrap'; // *** Make sure this matches with fade-out script below ***
	const pageWrapper = document.querySelector(pageWrapperSelector);

	// --- Configuration (Should match fade-out animation) ---
	const animationDurationMs = 800; // Duration in milliseconds (MAKE SURE THIS MATCHES fade-out duration)
	const animationEasing = 'ease-in-out'; // Easing function (MAKE SURE THIS MATCHES fade-out easing)
	const initialShiftDistance = '-30px'; // Starting position (shifted UP)
	// --- End Configuration ---

	if (pageWrapper) {
		// 1. Set initial state INSTANTLY (no transition)
		pageWrapper.style.opacity = '0';
		pageWrapper.style.transform = `translateY(${initialShiftDistance})`;
		pageWrapper.style.transition = 'none'; // IMPORTANT: Apply state change instantly

		// 2. Use setTimeout to apply transition and final state AFTER
		//    the initial state is rendered by the browser.
		setTimeout(() => {
			// Check if element still exists (user might navigate away fast)
			if (!document.querySelector(pageWrapperSelector)) return;

			// 3. Apply the transition property now using configured duration and easing
			pageWrapper.style.transition = `opacity ${animationDurationMs}ms ${animationEasing}, transform ${animationDurationMs}ms ${animationEasing}`;
			pageWrapper.style.willChange = 'opacity, transform'; // Optional performance hint

			// 4. Apply the final state (triggering the animation)
			pageWrapper.style.opacity = '1';
			pageWrapper.style.transform = 'translateY(0)';

			// 5. Optional: Clean up inline transition style after animation
			//    This prevents this inline style from potentially interfering later.
			setTimeout(() => {
				// Re-check element existence
				if (document.querySelector(pageWrapperSelector)) {
					pageWrapper.style.transition = ''; // Remove inline transition
					pageWrapper.style.willChange = ''; // Remove hint
				}
			}, animationDurationMs + 50); // Wait a bit longer than animation
		}, 10); // Tiny delay (e.g., 10ms). Can try 0, but 10-20 is often safer.
	} else {
		// Log error if wrapper not found
		console.warn(
			'Page fade in script: Could not find page wrapper element. Selector:',
			pageWrapperSelector,
		);
	}
});

/**
 * !! Page Fade Out Transition on Link Click with Enhanced Error Handling !!
 * This script below adds a smooth fade-out transition when navigating away from the page.
 */
(function () {
	// Use an IIFE

	// --- Configuration ---
	const pageWrapperSelector = '#inner-wrap'; // *** IMPORTANT: Should match selector in fade-in script ***
	const animationDuration = 800; // Duration in milliseconds (MAKE SURE THIS MATCHES fade-in duration)
	const animationEasing = 'ease-in-out'; // Easing function (MAKE SURE THIS MATCHES fade-in easing) <<< Added for consistency
	const fadeUpDistance = '-30px'; // Distance to shift UP during fade-out
	// --- End Configuration ---

	const pageWrapper = document.querySelector(pageWrapperSelector);

	// Initial Check: Exit early if the main wrapper isn't found
	if (!pageWrapper) {
		console.warn(
			'Page fade out script: Could not find page wrapper element. Aborting script. Selector:',
			pageWrapperSelector,
		);
		return;
	}

	// Pre-apply styles needed for transition (optional but good practice)
	// This ensures the transition is defined *before* the click happens.
	try {
		// Set transition using configured duration and easing
		pageWrapper.style.transition = `opacity ${animationDuration}ms ${animationEasing}, transform ${animationDuration}ms ${animationEasing}`;
		pageWrapper.style.willChange = 'opacity, transform';
	} catch (styleError) {
		console.error('Page fade out script: Error applying initial styles.', styleError);
		// Can abort completely here, or just log and continue
	}

	document.addEventListener(
		'click',
		function (event) {
			const link = event.target.closest('a');

			// Basic link check
			if (!link || !link.href) {
				return;
			}

			// --- Link Filtering (same as before) ---
			if (
				link.target === '_blank' ||
				!['http:', 'https:'].includes(link.protocol) ||
				(link.pathname === window.location.pathname && link.hash) ||
				link.classList.contains('no-fade-transition')
			) {
				return;
			}
			// --- End Link Filtering ---

			// --- Proceed with animation attempt ---
			event.preventDefault(); // Prevent immediate navigation

			const targetURL = link.href; // Correctly grab the href from the link

			try {
				let navigateImmediately = false;

				// --- Perform Navigation ---
				if (navigateImmediately) {
					window.location.href = targetURL;
				} else {
					// Ensure the transition is explicitly set just before animating
					pageWrapper.style.transition = `opacity ${animationDuration}ms ${animationEasing}, transform ${animationDuration}ms ${animationEasing}`;
					pageWrapper.style.willChange = 'opacity, transform'; // Re-apply hint

					// Apply the fade-out styles (triggering the animation)
					pageWrapper.style.opacity = '0';
					pageWrapper.style.transform = `translateY(${fadeUpDistance})`;

					// Set timeout to navigate *after* the configured animation duration
					setTimeout(() => {
						window.location.href = targetURL; // Navigate after animation completes
					}, animationDuration); // Use the duration defined in JS config
				}
			} catch (error) {
				// Catch any runtime errors during the animation setup/trigger
				console.error(
					'Page fade out script: Error occurred during fade-out attempt. Navigating immediately as fallback.',
					error,
				);
				// Fallback: Navigate immediately
				window.location.href = targetURL;
			}
		},
		false,
	);
})();
// Immediately invoke the function expression to run the script

/**
 * !! FOUC Fix: On link click or page transition trigger !!
 * Handles Flash of Unstyled Content prevention when navigating away.
 */
try {
	localStorage.setItem('isTransitioning', 'true');

	const pageWrapper = document.querySelector('#inner-wrap');
	if (pageWrapper) {
		pageWrapper.style.transition = `opacity 0.5s ease-in-out, transform 0.5s ease-in-out`;
		pageWrapper.style.opacity = '0';
		pageWrapper.style.transform = `translateY(-30px)`;
	}

	// then handle the actual navigation after a short timeout
	setTimeout(() => {
		// window.location.href = linkHref; // This line was causing the error
	}, 500); // match the transition duration
} catch (err) {
	console.warn('Problem setting localStorage', err);
}

/**
 * !! FOUC FIX: On page load !!
 * Handles Flash of Unstyled Content prevention when navigating into a page.
 */
document.addEventListener('DOMContentLoaded', () => {
	const pageWrapper = document.querySelector('#inner-wrap');
	if (!pageWrapper) return;

	try {
		if (localStorage.getItem('isTransitioning') === 'true') {
			localStorage.removeItem('isTransitioning');
			pageWrapper.classList.add('transition-active');
		} else {
			// Optional: if no transition flag, immediately show the page (prevent stuck opacity 0)
			pageWrapper.classList.add('transition-active');
		}
	} catch (err) {
		console.warn('Problem handling localStorage', err);
	}
});
