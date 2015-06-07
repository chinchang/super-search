(function () {
	var searchFile = 'feed/rss.xml',
		searchEl = document.querySelector('#js-search'),
		searchInputEl = document.querySelector('#js-search__input'),
		searchResultsEl = document.querySelector('#js-search__results'),
		currentInputValue = '',
		lastSearchResultHash,
		posts = [];

	// Changes XML to JSON
	// Modified version from here: http://davidwalsh.name/convert-xml-json
	function xmlToJson(xml) {
		// Create the return object
		var obj = {};
		if (xml.nodeType == 3) { // text
			obj = xml.nodeValue;
		}

		// do children
		// If just one text node inside
		if (xml.hasChildNodes() && xml.childNodes.length === 1 && xml.childNodes[0].nodeType === 3) {
			obj = xml.childNodes[0].nodeValue;
		}
		else if (xml.hasChildNodes()) {
			for(var i = 0; i < xml.childNodes.length; i++) {
				var item = xml.childNodes.item(i);
				var nodeName = item.nodeName;
				if (typeof(obj[nodeName]) == "undefined") {
					obj[nodeName] = xmlToJson(item);
				} else {
					if (typeof(obj[nodeName].push) == "undefined") {
						var old = obj[nodeName];
						obj[nodeName] = [];
						obj[nodeName].push(old);
					}
					obj[nodeName].push(xmlToJson(item));
				}
			}
		}
		return obj;
	}

	function getPostsFromXml(xml) {
		var json = xmlToJson(xml);
		return json.channel.item;
	}

	window.toggleSearch = function toggleSearch() {
		searchEl.classList.toggle('is-active');
		if (searchEl.classList.contains('is-active')) {
			// while opening
			searchInputEl.value = '';
		} else {
			// while closing
			searchResultsEl.classList.add('is-hidden');
		}
		setTimeout(function () {
			searchInputEl.focus();
		}, 210);
	}

	function handleInput() {
		var currentResultHash, d;

		currentInputValue = searchInputEl.value;
		if (!currentInputValue || currentInputValue.length < 3) {
			lastSearchResultHash = '';
			searchResultsEl.classList.add('is-hidden');
			return;
		}
		searchResultsEl.style.offsetWidth;

		var matchingPosts = posts.filter(function (post) {
			if (post.title.indexOf(currentInputValue) !== -1 || post.description.indexOf(currentInputValue) !== -1) {
				return true;
			}
		});
		if (!matchingPosts.length) {
			searchResultsEl.classList.add('is-hidden');
		}
		currentResultHash = matchingPosts.reduce(function(hash, post) { return post.title + hash; }, '');
		if (matchingPosts.length && currentResultHash !== lastSearchResultHash) {
			searchResultsEl.classList.remove('is-hidden');
			searchResultsEl.innerHTML = matchingPosts.map(function (post) {
				d = new Date(post.pubDate);
				return '<li><a href="' + post.link + '">' + post.title + '<span class="search__result-date">' + d.toUTCString().replace(/.*(\d{2})\s+(\w{3})\s+(\d{4}).*/,'$2 $1, $3') + '</span></a></li>';
			}).join('');
		}
		lastSearchResultHash = currentResultHash;
	}

	function init(options) {
		searchFile = options.searchFile || searchFile;
		searchInputEl = document.querySelector(options.inputSelector || 'super-search__input');
		searchResultsEl = document.querySelector(options.resultsSelector || 'super-search__results');

		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open('GET', searchFile);
		xmlhttp.onreadystatechange = function () {
			if (xmlhttp.readyState != 4) return;
			if (xmlhttp.status != 200 && xmlhttp.status != 304) { return; }
			var node = (new DOMParser).parseFromString(xmlhttp.responseText, 'text/xml');
			node = node.children[0];
			posts = getPostsFromXml(node);
		}
		xmlhttp.send();

		// Toggle on ESC key
		window.addEventListener('keyup', function onKeyPress(e) {
			if (e.which === 27) {
				toggleSearch();
			}
		});
		// Open on '/' key
		window.addEventListener('keypress', function onKeyPress(e) {
			if (e.which === 47 && !searchEl.classList.contains('is-active')) {
				toggleSearch();
			}
		});

		searchInputEl.addEventListener('input', function onInputChange() {
			handleInput();
		});
	}

	init.toggle = toggleSearch;

	window.superSearch = init;

})();