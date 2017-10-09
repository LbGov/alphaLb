(function ($) {

	var
		clIsFiltered = false, // Used to construct the page title
		clPageIndex = 1,      // The index of the current page as selected in the pagination class
		clPerPage = 0,        // The number of consultations to display per page, as retrieved from #cl-perpage on first use
		clRSSLink = '',       // The base path for the RSS link, retrieved on first use
		clPageTitle = '',     // Page title, retrieved on first use
		clTotalPages = 0;     // Total count of pages for current filter

	/**
	 * Called by clFiltersApply and clPaginate
	 * Displays the clPerPage number of consultations on the clPageIndex page
	 */
	function clDisplay() {
		var
			bHasClass = false,
			bVisible = false,
			iDisplayCount = 0,
			iStartID = (clPageIndex * clPerPage) - clPerPage,
			iTotalCount = 0;
		$(".cl-item").each(function (index) {
			bHasClass = $(this).hasClass('cl-filter-match');
			// Increment the total number of items that match the filter: this determines how many pages we have
			if (bHasClass)
				iTotalCount++;
			bVisible = (iTotalCount > iStartID) && (iDisplayCount < clPerPage) && bHasClass; // LH first iTotalCount was index >=
			// Increment the number of items being displayed (the current page's contents to date)
			if (bVisible)
				iDisplayCount++;
			// Set the display on this item
			$(this).toggle(bVisible);
		});
		clDisplayPagination(iTotalCount);
		clDisplayPageTitle();
	}

	function clDisplayPageTitle() {
		if (clPageTitle === '')
			clPageTitle = $(document).prop('title');
		var
			iPos = clPageTitle.indexOf('|'),
			sStart = (iPos === -1) ? clPageTitle : $.trim(clPageTitle.substr(0, iPos - 1)),
			sEnd = (iPos === -1) ? '' : ' ' + $.trim(clPageTitle.substr(iPos));
		$(document).prop('title', sStart + ', ' + ((clIsFiltered) ? ' filtered' : '') +
		' page ' + clPageIndex + ' of ' + clTotalPages + sEnd);
	}

	/**
	 * Called by clDisplay
	 * Empties the .pagination element and populates it with the correct number of page items
	 * @param iCount - the number of consultations displayed for the current filters
	 */
	function clDisplayPagination(iCount) {
		// Remove all existing pagination <li>s
		$('#cl-pagination').empty('li');
		// Create the necessary number of new ones
		var sOut = '';
		clTotalPages = Math.trunc((iCount <= clPerPage) ? 1 : ((iCount / clPerPage) + ((iCount % clPerPage === 0) ? 0 : 1)));
		// Don't show pagination unless we have more than one page
		if (clTotalPages > 1) {
			// MOBILE
			if ($(window).width() < 768) {
				sOut += '<li' + ((clPageIndex === 1) ? ' class="cl-hidden"' : '') +
				'><a href="#" aria-label="First" id="cl-page-first">' +
				'<span aria-hidden="true">&laquo;</span></a></li>';
				sOut += '<li' + ((clPageIndex === 1) ? ' class="cl-hidden"' : '') +
				'><a href="#" aria-label="Previous" id="cl-page-prev">' +
				'<span aria-hidden="true">&lt;</span></a></li>';
				sOut += '<li class="cl-ellipsis"><span aria-hidden="true">Page ' + clPageIndex + ' of ' + clTotalPages + '</span></li>';
				if (clPageIndex !== clTotalPages) {
					sOut += '<li><a href="#" aria-label="Next" id="cl-page-next">' +
					'<span aria-hidden="true">&gt;</span></a></li>'; //
					sOut += '<li><a href="#" aria-label="Last" id="cl-page-last">' +
					'<span aria-hidden="true">&raquo;</span></a></li>'; //
				}
			}
			// DESKTOP
			else {
				var
					iPos = 0,
					sActive = '';
				sOut += '<li' + ((clPageIndex === 1) ? ' class="cl-hidden"' : '') +
				'><a href="#" aria-label="First" id="cl-page-first">' +
				'<span aria-hidden="true"><i class="fa fa-angle-double-left"></i></span></a></li>'; //&laquo;
				sOut += '<li' + ((clPageIndex === 1) ? ' class="cl-hidden"' : '') +
				'><a href="#" aria-label="Previous" id="cl-page-prev">' +
				'<span aria-hidden="true"><i class="fa fa-angle-left"></i></span></a></li>'; // &lt;
				if (clTotalPages < 9) // 7
					sOut += clDisplayPaginationPages(1, clTotalPages, clPageIndex)
				else if (clPageIndex < 7) { // 5
					sOut += clDisplayPaginationPages(1, 7, clPageIndex); // 5
					sOut += '<li class="cl-ellipsis"><span aria-hidden="true">...</span></li>';
					sOut += clDisplayPaginationPages(clTotalPages, clTotalPages, clPageIndex);
				}
				else if (clPageIndex > clTotalPages - 5) { // 4
					sOut += clDisplayPaginationPages(1, 1, clPageIndex);
					sOut += '<li class="cl-ellipsis"><span aria-hidden="true">...</span></li>';
					sOut += clDisplayPaginationPages(clTotalPages - 6, clTotalPages, clPageIndex); // 4
				}
				else {
					// First page always displayed
					sOut += clDisplayPaginationPages(1, 1, clPageIndex);
					sOut += '<li class="cl-ellipsis"><span aria-hidden="true">...</span></li>';
					sOut += clDisplayPaginationPages(clPageIndex - 2, clPageIndex + 2, clPageIndex); // -1 + 1
					sOut += '<li class="cl-ellipsis"><span aria-hidden="true">...</span></li>';
					sOut += clDisplayPaginationPages(clTotalPages, clTotalPages, clPageIndex);
				}
				if (clPageIndex !== clTotalPages) {
					sOut += '<li><a href="#" aria-label="Next" id="cl-page-next">' +
					'<span aria-hidden="true"><i class="fa fa-angle-right"></i></span></a></li>'; // &gt;
					sOut += '<li><a href="#" aria-label="Last" id="cl-page-last">' +
					'<span aria-hidden="true"><i class="fa fa-angle-double-right"></i></span></a></li>'; // &raquo;
				}
			}
		}
		$('#cl-pagination').html(sOut);
		$("#cl-pageindex").html(clPageIndex);
		$("#cl-pagetotal").html(clTotalPages);
	}

	function clDisplayPaginationPages(iStart, iEnd, iIndex) {
		var sOut = '';
		for (var iPos = iStart; iPos <= iEnd; iPos++) {
			sActive = (iPos === iIndex) ? ' class="active"' : '';
			sOut += '<li' + sActive + '><a href="#" class="cl-page-number" aria-label="Page ' + iPos + '">' + iPos + '</a></li>';
		}
		return sOut;
	}

	/**
	 * Called by clFiltersApply
	 * @param oItem - the current consultation item
	 * @param sValue - the value of the Agencies filter
	 * @returns {boolean} - true if this consultation item matches the filter
	 */
	function clFilterAgency(oItem, sValue) {
		return (sValue === "All agencies") || ($('.cli-agencies', oItem).html().indexOf(sValue) > -1);
	}

	/**
	 * Prevent filters from firing
	 * @param event
	 * @returns {boolean}
	 */
	function clFilterKeyevent(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			return false;
		}
	}

	/**
	 * Called by clFiltersApply
	 * @param oItem - the current consultation item
	 * @param sValue - the text of the Search box
	 * @returns {boolean} - true if this consultation item matches the filter
	 */
	function clFilterSearch(oItem, sValue) {
		return (sValue === "") ||
		($('.cli-title', oItem).html().toLowerCase().indexOf(sValue.toLowerCase()) > -1) ||
		($('.cli-description', oItem).html().toLowerCase().indexOf(sValue.toLowerCase()) > -1);
	}

	/**
	 * Called by clFiltersApply
	 * @param oItem - the current consultation item
	 * @param sValue - the value of the Status filter
	 * @returns {boolean} - true if this consultation item matches the filter
	 */
	function clFilterStatus(oItem, sValue) {
		return (sValue === "Any status") || ($('.cli-status', oItem).html().indexOf(sValue) > -1) || (sValue === 'Open' && $('.cli-status', oItem).html().indexOf('Closing soon') > -1);
	}

	/**
	 * Called by clFiltersApply
	 * @param oItem - the current consultation item
	 * @param sValue - the value of the Topics filter
	 * @returns {boolean} - true if this consultation item matches the filter
	 */
	function clFilterTopic(oItem, sValue) {
		return (sValue === "All topics") || ($('.cli-topics', oItem).html().indexOf(sValue) > -1);
	}

	/**
	 * Called when any filter value changes - see document.ready
	 * Iterates through all the consultation items and determines which of them match all selected filters
	 * Toggles the class cl-filter-match on the consultation item depending on whether it matches
	 * @param event
	 */
	function clFiltersApply(event) {
		var
			bMatch = false,
			iCount = 0,
			sAgency = $.trim($("#cl-filter-agencies").children(':selected').text()),
			sSearch = $.trim($("#cl-filter-search").val()),
			sStatus = $.trim($("#cl-filter-status").children(':selected').text()),
			sTopic = $.trim($("#cl-filter-topics").children(':selected').text());
		if (event !== null)
			event.preventDefault();
		clPageIndex = 1;
		$(".cl-item").each(function (index) {
			bMatch =
				clFilterAgency(this, sAgency) &&
				clFilterSearch(this, sSearch) &&
				clFilterStatus(this, sStatus) &&
				clFilterTopic(this, sTopic);
			if (bMatch)
				iCount++;
			$(this).toggleClass('cl-filter-match', bMatch);
		});
		clFiltersShowCount(iCount, sAgency, sSearch, sStatus, sTopic);
		clFiltersSetRSSAndURL(sAgency, sSearch, sStatus, sTopic);
		clFiltersSetRSSText(sAgency, sSearch, sStatus, sTopic);
		clDisplay();
	}

	/**
	 * Resets all the filters
	 * @param event
	 * @returns {boolean}
	 */
	function clFiltersReset(event, bApply) {
		event.preventDefault();
		$("#cl-filter-agencies").prop('selectedIndex', 0);
		$("#cl-filter-search").val('');
		$("#cl-filter-status").prop('selectedIndex', 0);
		$("#cl-filter-topics").prop('selectedIndex', 0);
		if (bApply)
			clFiltersApply(event);
		return false;
	}

	/**
	 * Called by clFiltersApply
	 * Rewrites the RSS link based on the selected filters
	 * Updates the browser location and history for modern browsers which support this
	 * @param sAgency - the current Agency filter value
	 * @param sSearch - the current Search box value
	 * @param sStatus - the current Status filter value
	 * @param sTopic - the current Topic filter value
	 */
	function clFiltersSetRSSAndURL(sAgency, sSearch, sStatus, sTopic) {
		// Create array of valid params
		var aRSS = {};
		if (sAgency !== 'All agencies')
			aRSS['agency'] = sAgency;
		if (sSearch !== '')
			aRSS['keyword'] = sSearch;
		if (sStatus !== 'Any status')
			aRSS['status'] = sStatus;
		if (sTopic !== 'All topics')
			aRSS['topic'] = sTopic;
		var sRSS = $.param(aRSS);
		if (sRSS !== '')
			sRSS = '?' + sRSS;
		$("#cl-rss-feed").attr("href", clRSSLink + sRSS);
		if (history.pushState) {
			var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + sRSS;
			window.history.pushState({path: newurl}, '', newurl);
		}
	}

	/**
	 * Sets the display text for the RSS feed
	 * @param sAgency
	 * @param sSearch
	 * @param sStatus
	 * @param sTopic
	 */
	function clFiltersSetRSSText(sAgency, sSearch, sStatus, sTopic) {
		var sOut = '';
		if (sSearch !== '')
			sOut += ' + "' + sSearch + '"';
		if (sTopic !== 'All topics')
			sOut += ' + "' + sTopic + '"';
		if (sStatus !== 'Any status')
			sOut += ' + "' + sStatus + '"';
		if (sAgency !== 'All agencies')
			sOut += ' + "' + sAgency + '"';
		// This is the most convenient point at which to set this global
		clIsFiltered = (sOut !== '');
		sOut = 'Subscribe to the RSS feed for ' + ((sOut === '')
			? ''
			: sOut.substr(3)) + ' consultations';
		$("#cl-rss-text").html(sOut);
	}

	/**
	 * Updates the count and description of consultation items, displayed at the top of each page
	 * @param iCount - count of consultation items matching the current filters
	 * @param sAgency - text of the Agency filter
	 * @param sSearch - text of the Search box
	 * @param sStatus - text of the Status filter
	 * @param sTopic - text of the Topic filter
	 */
	function clFiltersShowCount(iCount, sAgency, sSearch, sStatus, sTopic) {
		// Show the number
		$("#cl-count-number").html(iCount);
		// Create and display the description
		var sOut = '';
		if (sStatus !== 'Any status' && sStatus !== 'Closing soon')
			sOut = sStatus.toLowerCase() + ' ';
		sOut += (iCount === 1) ? 'result ' : 'results ';
		if (sStatus === 'Closing soon')
			sOut += 'closing soon ';
		sOut += (sSearch === '') ? '' : 'for "' + sSearch + '"';
		if (sTopic !== 'All topics')
			sOut += ((sSearch === '') ? ' for "' : ' and "') + sTopic + '"';
		sOut += (sAgency === 'All agencies') ? '' : ' from "' + sAgency + '"';
		// Add pages
		sOut = $.trim(sOut) + ', page <span id="cl-pageindex">' + clPageIndex +
		'</span> of <span id="cl-pagetotal">' + clTotalPages + "</span>";
		$("#cl-count-text").html(sOut);
	}

	/**
	 * Parse URL queries and populate the filters with the values
	 */
	function clFilterURLQueries() {
		clFilterURLSelect("#cl-filter-status", clFilterURLQuery('status'));
		clFilterURLSelect("#cl-filter-search", clFilterURLQuery('keyword'));
		clFilterURLSelect("#cl-filter-topics", clFilterURLQuery('topic'));
		clFilterURLSelect("#cl-filter-agencies", clFilterURLQuery('agency'));
	}

	/**
	 * Return a single URL query by name
	 * @param name
	 * @returns {string}
	 */
	function clFilterURLQuery(name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	/**
	 * If the value isn't empty, set the select to match the corresponding option, if it exists
	 * @param sSelect
	 * @param sValue
	 */
	function clFilterURLSelect(sSelect, sValue) {
		if (sValue !== '') {
			$(sSelect + " option").filter(function () {
				return $(this).text() === sValue;
			}).prop('selected', true);
		}
	}

	/**
	 * Called when a pagination item is clicked - see document.ready
	 * @param event
	 */
	function clPaginate(event, key) {
		event.preventDefault();
		switch (key) {
			case ('prev'):
				clPageIndex--;
				break;
			case ('next'):
				clPageIndex++;
				break;
			case ('first'):
				clPageIndex = 1;
				break;
			case ('last'):
				clPageIndex = clTotalPages;
				break;
			default:
				var sAction = $(event.target).html();
				clPageIndex = parseInt(sAction);
		}
		if (clPageIndex > clTotalPages)
			clPageIndex = clTotalPages;
		clDisplay();
		$('html, body').animate({
			scrollTop: $(".cl-filters:first").offset().top
		}, 300, function () {
			//$("#cl-rss-feed").focus();
			$("#cl-results").focus();
		});
	}

	/**
	 * Called on document.ready
	 * Stores embedded values required for later use
	 */
	function clSetVars() {
		clPerPage = parseInt($("#cl-perpage").val());
		clRSSLink = $("#cl-rss-feed").attr("href");
	}

	/**
	 * Called on document.ready
	 * Displays the filter form (<noscript> users have no filters or pagination)
	 */
	function clShowFilters() {
		$("#cl-filter-form").removeClass("hide");
	}

	$(document).ready(function () {
		clShowFilters();
		clSetVars();
		clFilterURLQueries();
		clFiltersApply(null);
		$("#cl-filter-agencies").on('change', function (event) {
			clFiltersApply(event);
		});
		$("#cl-filter-reset").on('click', function (event) {
			clFiltersReset(event, true);
		});
		$("#cl-filter-search").on('focus', function (event) {
			$("#cl-filter-search").attr('placeholder', '');
		});
		$("#cl-filter-search").on('blur', function (event) {
			$("#cl-filter-search").attr('placeholder', 'eg pollution');
		});
		$("#cl-filter-search").on('keydown', function (event) {
			clFilterKeyevent(event, true);
		});
		$("#cl-filter-search").on('keyup', function (event) {
			clFiltersApply(event);
		});
		$("#cl-filter-status").on('change', function (event) {
			clFiltersApply(event);
		});
		$("#cl-filter-topics").on('change', function (event) {
			clFiltersApply(event);
		});
		$("#cl-pagination").on('click', 'a#cl-page-first', function (event) {
			clPaginate(event, 'first');
		});
		$("#cl-pagination").on('click', 'a#cl-page-last', function (event) {
			clPaginate(event, 'last');
		});
		$("#cl-pagination").on('click', 'a#cl-page-next', function (event) {
			clPaginate(event, 'next');
		});
		$("#cl-pagination").on('click', 'a#cl-page-prev', function (event) {
			clPaginate(event, 'prev');
		});
		$("#cl-pagination").on('click', 'a.cl-page-number', function (event) {
			clPaginate(event, '');
		});
	}) // document.ready
})(jQuery);

