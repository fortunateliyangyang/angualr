popped="state"in window.history,initialURL=location.href,$(document).ready(function(){BrowserFallbacks.init(),Search.init(),Dropdowns.init(),Forms.init(),Downloads.init(),DownloadBox.init(),AboutContent.init(),FlippyBook.init();!function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.id="gauges-tracker",e.setAttribute("data-site-id","4f919d1df5a1f504b3000026"),e.src="//secure.gaug.es/track.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}()});var DownloadBox={init:function(){$("#gui-os-filter").addClass("visible");var e=window.session.browser.os;"Mac"==e?($(".monitor").addClass("mac"),$("#download-link").text("Downloads for Mac").attr("href","/download/mac"),$("#gui-link").removeClass("mac").addClass("gui"),$("#gui-link").text("Mac GUIs").attr("href","/download/gui/mac"),$("#gui-os-filter").attr("data-os","mac"),$("#gui-os-filter").text("Only show GUIs for my OS (Mac)")):"Windows"==e?($(".monitor").addClass("windows"),$("#download-link").text("Downloads for Windows").attr("href","/download/win"),$("#gui-link").removeClass("mac").addClass("gui"),$("#gui-link").text("Windows GUIs").attr("href","/download/gui/win"),$("#alt-link").removeClass("windows").addClass("mac"),$("#alt-link").text("Mac Build").attr("href","/download/mac"),$("#gui-os-filter").attr("data-os","windows"),$("#gui-os-filter").text("Only show GUIs for my OS (Windows)")):"Linux"==e&&($(".monitor").addClass("linux"),$("#download-link").text("Downloads for Linux").attr("href","/download/linux"),$("#gui-link").removeClass("mac").addClass("gui"),$("#gui-link").text("Linux GUIs").attr("href","/download/gui/linux"),$("#alt-link").removeClass("windows").addClass("mac"),$("#alt-link").text("Mac Build").attr("href","/download/mac"),$("#gui-os-filter").attr("data-os","linux"),$("#gui-os-filter").text("Only show GUIs for my OS (Linux)"))}},BrowserFallbacks={init:function(){BrowserFallbacks.initPlaceholders()},initPlaceholders:function(){Modernizr.input.placeholder||$("input[placeholder], textarea[placeholder]").each(function(){$(this).defaultValue($(this).attr("placeholder"),"active","inactive")})}},Search={searching:!1,currentSearch:"",selectedIndex:0,init:function(){Search.observeFocus(),Search.observeTextEntry(),Search.observeResultsClicks()},observeFocus:function(){$("form#search input").focus(function(){$(this).parent("form#search").switchClass("","focus",200)}),$("form#search input").blur(function(){Search.resetForm()})},observeTextEntry:function(){$("form#search input").keyup(function(){Search.runSearch()}),$("form#search input").keydown(function(e){switch($("#search-results").not(":visible")&&27!=e.which&&($("#search-results").fadeIn(.2),Search.highlight(Search.selectedIndex)),e.which){case 13:return Search.selectResultOption(),!1;case 27:Search.resetForm();break;case 38:e.preventDefault(),Search.resultsNav("up");break;case 40:e.preventDefault(),Search.resultsNav("down")}})},observeResultsClicks:function(){$("#search-results").mousedown(function(e){e.preventDefault()})},runSearch:function(){var e=$("#search-text").val();return e.length<2?!1:void(Search.searching?(clearTimeout(Search.timeout),Search.timeout=setTimeout(function(){Search.searching=!1,Search.runSearch()},300)):(Search.searching=!0,e!=Search.currentSearch&&(Search.currentSearch=e,$.get("/search",{search:e},function(e){$("#search-results").html(e),Search.searching=!1},"html"))))},selectResultOption:function(){var e=$("#search-results a")[Search.selectedIndex],t=$(e).attr("href");if(!e){var o=$("#search-text").val();t="/search/results?search="+o}window.location.href=t,selectedIndex=0},resultsNav:function(e){Search.selectedIndex+="down"==e?1:-1,Search.highlight(Search.selectedIndex)},highlight:function(e){var t=$("#search-results a").removeClass("highlight");$(t[e]).addClass("highlight")},resetForm:function(){$("form#search").switchClass("focus","",200),$("#search-results").fadeOut(.2),Search.selectedIndex=0}},Dropdowns={init:function(){Dropdowns.observeTriggers()},observeTriggers:function(){$(".dropdown-trigger").click(function(e){e.preventDefault();var t=$(this).attr("data-panel-id");$(this).hasClass("active")?($(this).removeClass("active"),$("#"+t).hide()):($(this).addClass("active"),$("#"+t).show())})}},Forms={init:function(){Forms.observeCopyableInputs()},observeCopyableInputs:function(){$("input.copyable").click(function(){$(this).select()})}},Downloads={userOS:"",init:function(){Downloads.observeGUIOSFilter()},observeGUIOSFilter:function(){$("a#gui-os-filter").click(function(e){e.preventDefault(),Downloads.userOS=$(this).attr("data-os");var t=Downloads.userOS.charAt(0).toUpperCase()+Downloads.userOS.slice(1);if($(this).hasClass("filtering"))$("ul.gui-thumbnails li").switchClass("masked","",200),$(this).html("Only show GUIs for my OS ("+t+")"),$(this).removeClass("filtering"),$("#os-filter-count").hide();else{$("ul.gui-thumbnails li").not("."+Downloads.userOS).switchClass("","masked",200),$(this).html("Show GUIs for all OSes"),$(this).addClass("filtering");var o=$("ul.gui-thumbnails li."+Downloads.userOS).length;$("#os-filter-count strong").html(o),$("#os-filter-count .os").html(t),$("#os-filter-count").show()}})}},AboutContent={defaultSection:"branching-and-merging",init:function(){0!==$("body#about").length&&($("section.about").hide(),$("section.about .bottom-nav").show(),AboutContent.observeNav(),AboutContent.observePopState(),AboutContent.showSection(AboutContent.getSection()))},observePopState:function(){return window.history&&window.history.pushState?$(window).bind("popstate",function(){var e;return initialPop=!popped&&location.href===initialURL,popped=!0,initialPop?void 0:(e=AboutContent.getSection(),AboutContent.showSection(e))}):void 0},getSection:function(){var e;return e=location.href.substring(location.href.lastIndexOf("/")+1),(0===e.length||"about"==e)&&(e=AboutContent.defaultSection),e},showSection:function(e){"about"==e&&(e=AboutContent.defaultSection),$("ol#about-nav a").removeClass("current"),$("ol#about-nav a#nav-"+e).addClass("current"),$("section").hide(0,function(){$("section#"+e).show()})},observeNav:function(){$("ol#about-nav a, .bottom-nav a").click(function(e){e.preventDefault();var t=$(this).attr("data-section-id");window.history&&window.history.pushState&&history.pushState(null,$(this).html(),"/about/"+t),AboutContent.showSection(t)})}},FlippyBook={threeDee:!1,init:function(){FlippyBook.initBrowsers(),FlippyBook.observeOpenCloseClicks()},initBrowsers:function(){Modernizr.webkit&&(FlippyBook.threeDee=!0,$("#book-container").addClass("three-dee")),$("#about-book").addClass("visible")},observeOpenCloseClicks:function(){$("#book-cover-outside, #open-book").click(function(e){e.preventDefault(),$("#book-cover").removeClass("close").addClass("open"),$("#book-intro").css("z-index",""),FlippyBook.threeDee||($("#book-cover-inside").show(),$("#book-inside-page").show())}),$("#about-book").click(function(e){if(e.preventDefault(),$("#book-cover").removeClass("open").addClass("close"),FlippyBook.threeDee){setTimeout("$('#book-intro').css('z-index', 100)",1e3)}else $("#book-cover-inside").hide(),$("#book-inside-page").hide(),$("#book-intro").css("z-index",100)})}};