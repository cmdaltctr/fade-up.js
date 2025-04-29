# Fade-Up JS

A lightweight, dependency-free JavaScript library for creating smooth fade-up animations as elements enter the viewport, along with optional page fade-in and fade-out transitions for seamless navigation.

---

## Description

Fade-Up JS makes it easy to add elegant fade-up animations to your web pages. Using the Intersection Observer API, it ensures optimal performance by only animating elements when they are visible in the viewport. Additionally, it includes optional page fade-in and fade-out transitions for a polished user experience.

---

## Features

- **Lightweight:** No external dependencies required.
- **Efficient:** Uses the Intersection Observer API for smooth animations without impacting performance.
- **Customisable:** Configure animation distance, duration, delay, easing, and visibility threshold for fade-up elements.
- **Page Transitions:** Optional fade-in and fade-out effects for seamless navigation using the `#inner-wrap` ID.
- **Graceful Fallback:** Includes CSS fallback for page transitions in case JavaScript fails.

---

## Installation / Usage

### Fade-Up Animations

1.  **Include the Script**

    Add the `fade-up.js` script to your HTML file, ideally just before the closing `</body>` tag:

    ```html
    <script src="fade-up.js"></script>
    ```

2.  **Add the Target Class**

    Add the class `fade-up-element` (or your chosen class if customised in the script) to any HTML elements you want to animate:

    ```html
    <div class="fade-up-element">
    	<h2>This will fade up!</h2>
    	<p>Some content here.</p>
    </div>
    ```

3.  **Customise (Optional)**

    You can initialise the `GentleFadeUp` class with custom options for specific elements if needed (assuming your `fade-up.js` exposes this class and functionality):

    ```javascript
    // Example: Assuming GentleFadeUp is exposed globally or via module import
    new GentleFadeUp(document.querySelector('.your-custom-element'), {
    	distance: '30px', // Distance to fade up from
    	duration: '800ms', // Animation duration
    	delay: '100ms', // Delay before animation starts
    	easing: 'ease-in-out', // Easing function
    	threshold: 0.1, // Percentage of element visible to trigger
    });
    ```

    _(Note: Adapt this based on how your script actually handles customisation. The default behaviour might apply to all `.fade-up-element`s automatically without needing this explicit instantiation unless you override defaults)._

4.  **No CSS Required (for Fade-Up)**

    The necessary inline styles for the fade-up animation are typically handled directly by the JavaScript.

### Page Transitions (Optional)

The `#inner-wrap` ID is used for managing page fade-in and fade-out transitions during navigation. This ensures a smooth experience when entering or leaving a page.

1.  **HTML Structure**

    Wrap your main page content within a `div` with the ID `inner-wrap`:

    ```html
    <body>
    	<div id="inner-wrap">
    		<!-- Your entire page content goes here -->
    		<h1>My Page Title</h1>
    		<p>Some content...</p>
    		<a href="another-page.html">Go to another page</a>
    	</div>
    	<script src="fade-up.js"></script>
    </body>
    ```

2.  **CSS Fallback**

    Include this CSS in your stylesheet or `<style>` tags. It provides the initial hidden state and the transition definition, acting as a fallback if JS fails and is used by the JS to trigger the animation.

    ```css
    /* Initial hidden state for page transition */
    #inner-wrap {
    	opacity: 0;
    	transform: translateY(-30px); /* Start slightly above */
    	transition:
    		opacity 0.5s ease-in-out,
    		transform 0.5s ease-in-out;
    }

    /* Final visible state triggered by JS */
    #inner-wrap.transition-active {
    	opacity: 1;
    	transform: translateY(0px); /* Move to original position */
    }
    ```

3.  **JavaScript Behaviour**

    The `fade-up.js` script should automatically handle the following for `#inner-wrap`:

    - On page load, the script adds the `transition-active` class to `#inner-wrap` to trigger the fade-in effect.
    - On clicks leading away from the page (e.g., on `<a>` tags not linking to `#`), the script can remove `transition-active` (or apply an alternative fade-out style/class) before allowing navigation to proceed, creating a fade-out effect.

4.  **Customising Page Transitions**

    If your `fade-up.js` allows custgitomisation of page transition parameters (often via constants within the script):

    ```javascript
    // Example constants within fade-up.js that might be adjustable
    const pageTransitionDuration = 800; // Duration in milliseconds
    const pageTransitionEasing = 'ease-in-out'; // Easing function
    const pageFadeOutDistance = '-30px'; // Distance to shift during fade-out
    ```

    _(Consult your `fade-up.js` code to see how these are actually configured)._

---

## Configuration Options

If your `fade-up.js` script uses the `GentleFadeUp` class constructor for customisation, it supports the following options:

| Option      | Default         | Description                                     |
| :---------- | :-------------- | :---------------------------------------------- |
| `distance`  | `'50px'`        | Distance the element moves up during animation. |
| `duration`  | `'1000ms'`      | Duration of the animation.                      |
| `delay`     | `'0ms'`         | Delay before the animation starts.              |
| `easing`    | `'ease-in-out'` | Easing function for the animation.              |
| `threshold` | `0.1`           | Percentage of the element visible to trigger.   |

_(Note: If your script uses data attributes or other methods for configuration, update this section accordingly.)_

---

## Example

You can see a live example demonstrating both fade-up elements and page transitions on [CodePen](https://codepen.io/aizat88/pen/GggOjOw).

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Changelog

[1.0.0] - 2025-04-29

- Initial release of Fade-Up JS.
- Added GentleFadeUp functionality (or core logic) for fade-up animations using the Intersection Observer API.
- Included optional page fade-in and fade-out transitions for seamless navigation via #inner-wrap.
- Added fallback CSS for #inner-wrap page transitions.
- Added documentation README and examples.
- Fixed minor typos in README and LICENSE files.
