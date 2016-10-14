super-search
=====
*Easy to add search for your blog*
***

`super-search` adds search feature to your blog. `super-search` works on your blog's RSS feeds to enable searching posts.

I created this plugin to be used with a Jekyll blog. But it will work equally good with any blog having an RSS feed file. If you do not have one already, here are some easy ways to do it for your blog:

- [RSS for Jekyll blog](http://joelglovier.com/writing/rss-for-jekyll).

Demo
-----

[Visit my website](http://kushagragour.in/) and press '/' key.

Or Checkout the `example.html` file in this repo. Remember to run it on http/https protocol.

![Screenshot](/screenshot1.png)

Installation
-----

Add `super-search.js` at the end of your blog HTML.

If you want readymade styling for the search also, add `super-search.css` inside your blog's `<head>` tag.

Usage
-----

Add markup for your search UI:

```html
<div class="super-search" id="js-super-search">
	<a href="javascript:void(0)" onclick="superSearch.toggle()" class="super-search__close-btn">X</a>
	<input type="text" placeholder="Type here to search" class="super-search__input" id="js-super-search__input">
	<ul class="super-search__results" id="js-super-search__results"></ul>
</div>
```

And initialize `superSearch` as follows with optional parameters:

```js
superSearch({
	searchFile: '/feed.xml',
	searchSelector: '#js-super-search', // CSS Selector for search container element.
	inputSelector: '#js-super-search__input', // CSS selector for <input>
	resultsSelector: '#js-super-search__results' // CSS selector for results container
});

```

Browser Support
-----

**super-search** works best on latest versions of Google Chrome, Firefox and Safari.

License
-----

Copyright (c) 2015 Kushagra Gour, http://kushagragour.in
Licensed under the [MIT license](http://opensource.org/licenses/MIT).
