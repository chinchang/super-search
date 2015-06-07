super-search [![npm version](https://badge.fury.io/js/cta.svg)](http://badge.fury.io/js/cta)
=====
*Add easy search to your blog*
***

`super-search` adds search feature to your blog. All you need is an existing rss file for your website.

Installation
-----

Add `super-search.js` at the end of your blog HTML.

If you want the styling for the search also, add `super-search.css` to your blog's `<head>` tag.

Usage
-----

Add markup for your search UI:

```html
<div class="super-search" id="js-search">
	<a href="javascript:void(0)" onclick="superSearch.toggleSearch()" class="super-search__close-btn">X</a>
	<input type="text" placeholder="Type here to search" class="super-search__input" id="js-super-search__input">
	<ul class="super-search__results" id="js-super-search__results"></ul>
</div>
```

And initialize `superSearch` as follows with optional parameters:

```js
superSearch({
	searchFile: '/feed/rss.xml',
	inputSelector: '#js-search__input',
	resultsSelector: '#js-search__results'
});

```

Browser Support
-----

**super-search** works best on latest versions of Google Chrome, Firefox and Safari.

License
-----

Copyright (c) 2015 Kushagra Gour, http://kushagragour.in
Licensed under the [MIT license](http://opensource.org/licenses/MIT).
