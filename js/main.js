//Global var
var CRUMINA = {};

(function ($) {

	// USE STRICT
	"use strict";

	//----------------------------------------------------/
	// Predefined Variables
	//----------------------------------------------------/
	var $window = $(window),
		$document = $(document),
		$body = $('body'),

		//Elements
		$pie_chart = $('.pie-chart'),
		$header = $('#site-header'),
		$counter = $('.counter'),
		$progress_bar = $('.crumina-skills-item'),
		$preloader = $('#hellopreloader');



	/* -----------------------
	 * Preloader
	 * --------------------- */

	CRUMINA.preloader = function () {
		$window.scrollTop(0);
		setTimeout(function () {
			$preloader.fadeOut(800);
		}, 500);
		return false;
	};


	/* -----------------------
	 * Flying Balls
	 * Author : Vincent Garreau  - vincentgarreau.com
	 * MIT license: http://opensource.org/licenses/MIT
	 * Demo / Generator : vincentgarreau.com/particles.js
	 * --------------------- */

	CRUMINA.flyingBalls = function () {

		setTimeout(function () {
			$('.particles-js').each(function () {
				var id = 'particle-' + (Math.floor(Math.random() * (999 - 111 + 1)) + 111);
				$(this).attr('id', id);
				particlesJS.load(id, './js/' + $(this).data('settings') + '.json', function () {
				});
			});
		}, 500);
	};

	/* -----------------------
     * Fixed Header
     * --------------------- */

	CRUMINA.fixedHeader = function () {
		// grab an element
		$header.headroom(
			{
				"offset": 10,
				"tolerance": 5,
				"classes": {
					"initial": "animated",
					"pinned": "slideDown",
					"unpinned": "slideUp"
				}
			}
		);
	};

	//Scroll to top.
	jQuery('.back-to-top').on('click', function () {
		$('html,body').animate({
			scrollTop: 0
		}, 1200);
		return false;
	});

	/* -----------------------
     * COUNTER NUMBERS
     * --------------------- */

	CRUMINA.counters = function () {
		if ($counter.length) {
			$counter.each(function () {
				jQuery(this).waypoint(function () {
					$(this.element).find('span').countTo();
					this.destroy();
				}, {offset: '95%'});
			});
		}
	};

	/* -----------------------------
	 * Isotope sorting
	 * ---------------------------*/

	CRUMINA.IsotopeSort = function () {
		var $container = $('.sorting-container');
		$container.each(function () {
			var $current = $(this);
			var layout = ($current.data('layout').length) ? $current.data('layout') : 'masonry';
			$current.isotope({
				itemSelector: '.sorting-item',
				layoutMode: layout,
				percentPosition: true
			});

			$current.imagesLoaded().progress(function () {
				$current.isotope('layout');
			});

			var $sorting_buttons = $current.siblings('.sorting-menu').find('li');

			$sorting_buttons.on('click', function () {
				if ($(this).hasClass('active')) return false;
				$(this).parent().find('.active').removeClass('active');
				$(this).addClass('active');
				var filterValue = $(this).data('filter');
				if (typeof filterValue != "undefined") {
					$current.isotope({filter: filterValue});
					return false;
				}
			});
		});
	};

	// Ion.RangeSlider
	// version 2.2.0 Build: 380
	// © Denis Ineshin, 2017
	// https://github.com/IonDen
	//
	// Project page:    http://ionden.com/a/plugins/ion.rangeSlider/en.html
	// GitHub page:     https://github.com/IonDen/ion.rangeSlider
	//
	// Released under MIT licence:
	// http://ionden.com/a/plugins/licence-en.html

	CRUMINA.rangeSlider = function () {
		$(".range-slider-js").ionRangeSlider({
				type: "double",
				grid: true,
				min: 0,
				max: 1000,
				from: 200,
				to: 800,
				prefix: "$"
			}
		);
	};

	/* -----------------------------
     * Embedded Video in pop up
     * ---------------------------*/
	CRUMINA.mediaPopups = function () {
		$('.js-popup-iframe').magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,

			fixedContentPos: false
		});
		$('.js-zoom-image, .link-image').magnificPopup({
			type: 'image',
			removalDelay: 500, //delay removal by X to allow out-animation
			callbacks: {
				beforeOpen: function () {
					// just a hack that adds mfp-anim class to markup
					this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
					this.st.mainClass = 'mfp-zoom-in';
				}
			},
			closeOnContentClick: true,
			midClick: true
		});
	};

	/* -----------------------
     * Progress bars Animation
     * --------------------- */

	CRUMINA.progresBars = function () {
		if ($progress_bar.length) {
			$progress_bar.each(function () {
				jQuery(this).waypoint(function () {
					$(this.element).find('.count-animate').countTo();
					$(this.element).find('.skills-item-meter-active').fadeTo(300, 1).addClass('skills-animate');
					this.destroy();
				}, {offset: '90%'});
			});
		}
	};

	/* -----------------------
	 * Pie chart Animation
	 * --------------------- */

	CRUMINA.pieCharts = function () {
		if ($pie_chart.length) {
			$pie_chart.each(function () {
				jQuery(this).waypoint(function () {
					var current_cart = $(this.element);
					var startColor = current_cart.data('start-color');
					var endColor = current_cart.data('end-color');
					var counter = current_cart.data('value') * 100;

					current_cart.circleProgress({
						thickness: 16,
						startAngle: -Math.PI / 4 * 2,
						emptyFill: 'transparent',
						lineCap: 'round',
						fill: {
							gradient: [startColor, endColor],
							gradientAngle: Math.PI / 4
						}
					}).on('circle-animation-progress', function (event, progress) {
						current_cart.find('.content').html(parseInt(counter * progress, 10) + '<span>%</span>'
						)
					}).on('circle-animation-end', function () {

					});
					this.destroy();

				}, {offset: '90%'});
			});
		}
	};

	/* -----------------------------
	* Sliders and Carousels
	* ---------------------------*/

	CRUMINA.Swiper = {
		$swipers: { },
		init: function () {
			var _this = this;
			$( '.swiper-container' ).each( function ( idx ) {
				var $self = $( this );
				var id = 'swiper-unique-id-' + idx;
				$self.addClass( id + ' initialized' ).attr( 'id', id );
				$self.closest( '.crumina-module' ).find( '.swiper-pagination' ).addClass( 'pagination-' + id );

				_this.$swipers[id] = new Swiper( '#' + id, _this.getParams( $self, id ) );
				_this.addEventListeners( _this.$swipers[id] );
			} );
		},
		getParams: function ( $swiper, id ) {
			var params = {
				parallax: true,
				breakpoints: false,
				keyboardControl: true,
				setWrapperSize: true,
				preloadImages: true,
				updateOnImagesReady: true,
				prevNext: ( $swiper.data( 'prev-next' ) ) ? $swiper.data( 'prev-next' ) : false,
				changeHandler: ( $swiper.data( 'change-handler' ) ) ? $swiper.data( 'change-handler' ) : '',
				direction: ( $swiper.data( 'direction' ) ) ? $swiper.data( 'direction' ) : 'horizontal',
				mousewheel: ($swiper.data('mouse-scroll')) ? {
					releaseOnEdges: true
				} : false,
				slidesPerView: ( $swiper.data( 'show-items' ) ) ? $swiper.data( 'show-items' ) : 1,
				slidesPerGroup: ( $swiper.data( 'scroll-items' ) ) ? $swiper.data( 'scroll-items' ) : 1,
				spaceBetween: ( $swiper.data( 'space-between' ) || $swiper.data( 'space-between' ) == 0 ) ? $swiper.data( 'space-between' ) : 20,
				centeredSlides: ( $swiper.data( 'centered-slider' ) ) ? $swiper.data( 'centered-slider' ) : false,
				autoplay: ($swiper.data('autoplay')) ? {
					delay: parseInt($swiper.data('autoplay'))
				} : false,
				autoHeight: ( $swiper.hasClass( 'auto-height' ) ) ? true : false,
				loop: ( $swiper.data( 'loop' ) == false ) ? $swiper.data( 'loop' ) : true,
				effect: ( $swiper.data( 'effect' ) ) ? $swiper.data( 'effect' ) : 'slide',
				pagination: {
					type: ( $swiper.data( 'pagination' ) ) ? $swiper.data( 'pagination' ) : 'bullets',
					el: '.pagination-' + id,
					clickable: true
				},
				coverflow: {
					stretch: ( $swiper.data( 'stretch' ) ) ? $swiper.data( 'stretch' ) : 0,
					depth: ( $swiper.data( 'depth' ) ) ? $swiper.data( 'depth' ) : 0,
					slideShadows: false,
					rotate: 0,
					modifier: 2
				},
				fade: {
					crossFade: ( $swiper.data( 'crossfade' ) ) ? $swiper.data( 'crossfade' ) : true
				}
			};

			if (params['slidesPerView'] > 1) {
				params['breakpoints'] = {
					// when window width is >= 320px
					320: {
						slidesPerView: 1,
						slidesPerGroup: 1
					},
					480: {
						slidesPerView: 2,
						slidesPerGroup: 2
					},
					769: {
						slidesPerView: params['slidesPerView'],
						slidesPerGroup: params['slidesPerView']
					}

				};
			}

			return params;
		},
		addEventListeners: function ( $swiper ) {
			var _this = this;
			var $wrapper = $swiper.$el.closest( '.crumina-module-slider' );

			//Prev Next clicks
			if ( $swiper.params.prevNext ) {
				$wrapper.on( 'click', '.swiper-btn-next, .swiper-btn-prev', function ( event ) {
					event.preventDefault();
					var $self = $( this );

					if ( $self.hasClass( 'swiper-btn-next' ) ) {
						$swiper.slideNext();
					} else {
						$swiper.slidePrev();
					}
				} );
			}

			//Thumb/times clicks
			$wrapper.on( 'click', '.slider-slides .slides-item', function ( event ) {
				event.preventDefault();
				var $self = $( this );
				if ( $swiper.params.loop ) {
					$swiper.slideToLoop( $self.index() );
				} else {
					$swiper.slideTo( $self.index() );
				}
			} );

			//Times clicks
			$wrapper.on( 'click', '.time-line-slides .slides-item', function ( event ) {
				event.preventDefault();
				var $self = $( this );
				_this.changes.timeLine( $swiper, $wrapper, _this, $self.index() );
			} );

			//Run handler after change slide
			$swiper.on( 'slideChange', function () {
				var handler = _this.changes[$swiper.params.changeHandler];
				if ( typeof handler === 'function' ) {
					handler( $swiper, $wrapper, _this, this.realIndex );
				}
			} );
		},
		changes: {
			'thumbsParent': function ( $swiper, $wrapper ) {
				var $thumbs = $wrapper.find( '.slider-slides .slides-item' );
				$thumbs.removeClass( 'swiper-slide-active' );
				$thumbs.eq( $swiper.realIndex ).addClass( 'swiper-slide-active' );
			},
			'timeParent': function ( $swiper, $wrapper, main, index ) {
				var timeSwiperId = $wrapper.find('.swiper-time-line').attr('id');
				var $timeSwiper = main.$swipers[timeSwiperId];
				$timeSwiper.slideTo(index);
				main.changes.timeLine($timeSwiper, $wrapper, main, index);
			},
			'timeLine': function ( $swiper, $wrapper, main, index ) {
				var $times = $swiper.$el.find( '.swiper-slide' );
				var $active = $times.eq( index );

				if($active.hasClass('time-active')){
					return;
				}

				$times.removeClass( 'time-active' );
				$active.addClass( 'time-active' ).removeClass( 'visited' );
				$active.prevAll( '.swiper-slide' ).addClass( 'visited' );
				$active.nextAll( '.swiper-slide' ).removeClass( 'visited' );
			}
		}
	};


	$('.js-open-popup').on('click', function () {
		$(this).closest('.has-popup').find('.window-popup').toggleClass('active');
		$body.toggleClass('popup-active');
		return false;
	});

	/*---------------------------------
	ACCORDION
	-----------------------------------*/
	jQuery('.accordion-heading').on('click', function () {
		jQuery(this).parents('.panel-heading').toggleClass('active');
		jQuery(this).parents('.accordion-panel').toggleClass('active');
	});

	/* -----------------------------
     * Select2 Initialization
     * https://select2.org/getting-started/basic-usage
     * ---------------------------*/

	CRUMINA.select2Init = function () {
		$('.woox--select').select2();
	};


	/* -----------------------------
     * Select2 for Language Switcher Initialization
     * https://select2.org/getting-started/basic-usage
     * ---------------------------*/

	CRUMINA.select2LS = function () {
		var $switcher = $( '.language-switcher' );
		$switcher.select2( {
			templateResult: formatOptions
		} );

		$switcher.on( 'select2:select', function ( e ) {
			var data = e.params.data;
			var $self = jQuery(data.element);
			if ( !$self.length || data.selected !== true || data.disabled === true ) {
				return;
			}

			var href = $self.data('href');

			if(href){
				location.href = href;
			}

		} );
	};

	function formatOptions(state) {
		if (!state.id) {
			return state.text;
		}
		var $state = $(
			'<span ><img class="woox-icon" sytle="display: inline-block;" src="img/' + state.element.value.toLowerCase() + '.png" /> ' + state.text + '</span>'
		);
		return $state;
	}


	/* -----------------------------
		 * Dropdown For Sorting Menu
		 * ---------------------------*/

	$(".custom-dropdown").on("click", ".init", function () {
		$(this).closest(".custom-dropdown").children('li:not(.init)').toggle();
	});

	var allOptions = $(".custom-dropdown").children('li:not(.init)');
	$(".custom-dropdown").on("click", "li:not(.init)", function () {
		allOptions.removeClass('selected');
		$(this).addClass('selected');
		$(".custom-dropdown").children('.init').html($(this).html());
		allOptions.toggle();
	});


	/* -----------------------------
	 * Overlay Menu
	 * https://codepen.io/KingKabir/pen/QyPwgG
	 * ---------------------------*/

	CRUMINA.overlayMenu = function () {
		$('.js-open-aside').click(function () {
			$('body').toggleClass('popup-active');
			$('#overlay-menu').toggleClass('open');
		});
	};


	// Fix the submenu on the bottom side

	CRUMINA.fixSubmenuBottom = function (){
		var mobileWidthBase = 1024;
		var submenus = $("#overlay-menu").find(".sub-menu");

		if($(window).innerWidth() > mobileWidthBase){
			var menu_height = $(".overlay-menu").outerHeight(true);

			for(var i = 0; i < submenus.length; i++){
				var submenusPosition = $(submenus[i]).css("display", "block").offset().top;

				if($(submenus[i]).outerHeight() + submenusPosition > menu_height){
					$(submenus[i]).addClass("sub-menu-bottom");
				}

				else{
					if(menu_height == $(submenus[i]).outerHeight() || (menu_height - submenusPosition) < 350){
						$(submenus[i]).addClass("sub-menu-bottom");
					}
				}
			}
		}
	};

	/* -----------------------------
	 * Overlay for Body
	 * ---------------------------*/

	CRUMINA.overlayBody = function () {
		$('.js-body-overlay').click(function () {
			$('body').toggleClass('body-overlay-active');
		});
	};

	/* -----------------------------
     * Material design js effects
     * Script file: material.min.js
     * Documentation about used plugin:
     * http://demos.creative-tim.com/material-kit/components-documentation.html
     * ---------------------------*/

	CRUMINA.Materialize = function () {
		$.material.init();

		$('.checkbox > label').on('click', function () {
			$(this).closest('.checkbox').addClass('clicked');
		});

		$('.datepicker').datepicker();
	};

	/* -----------------------------
	* xdan/datetimepicker
	* https://github.com/xdan/datetimepicker
    * ---------------------------*/

	CRUMINA.standardPicker = function () {
		$('.standard-datetimepicker').datetimepicker({
			inline: true,
			timepicker: false,
			format: 'd.m.Y',
			dayOfWeekStart: 1
		})
	};


	CRUMINA.mainMenu = {
		$links: null,
		init: function () {
			this.$links = $('.overlay-menu-list > .overlay-menu-item');
		},
		addEventListeners: function () {
			var _this = this;

			this.removeEventListeners();
			if (CRUMINA.isTouch()) {

				$(document).on('click.menu', function (event) {
					var $self = $(event.target);
					if (!$self.closest('.overlay-menu-item').length && !$self.hasClass('overlay-menu-item')) {
						_this.$links.find('.sub-menu').removeClass('open');
					}
				});

				this.$links.on('click.menu', function () {
					var $self = $(this);
					var $subMenu = $self.find('.sub-menu');
					if ($subMenu.hasClass('open')) {
						$subMenu.removeClass('open');
						return;
					}

					_this.$links.find('.sub-menu').removeClass('open');
					$self.find('.sub-menu').addClass('open');
				});
			} else {
				this.$links.on('mouseenter.menu mouseleave.menu', function (event) {
					var $self = $(this);
					if (event.type === 'mouseenter') {
						$self.find('.sub-menu').addClass('open');
					}
					if (event.type === 'mouseleave') {
						$self.find('.sub-menu').removeClass('open');
					}
				});
			}
		},
		removeEventListeners: function () {
			$(document).off(".menu");
			this.$links.off(".menu");
		}
	};

	CRUMINA.isTouch = function () {
		if (navigator.userAgent.match(/Android/i)
			|| navigator.userAgent.match(/webOS/i)
			|| navigator.userAgent.match(/iPhone/i)
			|| navigator.userAgent.match(/iPad/i)
			|| navigator.userAgent.match(/iPod/i)
			|| navigator.userAgent.match(/BlackBerry/i)
			|| navigator.userAgent.match(/Windows Phone/i)
		) {
			return true;
		} else {
			return false;
		}
	};


	/* -----------------------------
	* Parallax for footer init
	* https://github.com/wagerfield/parallax
    * ---------------------------*/

	CRUMINA.parallaxBackground = function () {

		$('.scene').each(function () {
			var id = 'scene-' + (Math.floor(Math.random() * (999 - 111 + 1)) + 111);
			$(this).attr('id', id);
			var scene = document.getElementById(id);
			var parallax = new Parallax(scene);
		});
	};

	CRUMINA.updateResponsiveInit = function () {
		var resizeTimer = null;
		var resize = function () {
			resizeTimer = null;

			// Methods
			CRUMINA.mainMenu.addEventListeners();
		};

		$(window).on('resize', function () {
			if (resizeTimer === null) {
				resizeTimer = window.setTimeout(function () {
					resize();
				}, 200);
			}
		}).resize();
	};

	// Close on "Esc" click
	$window.keydown(function (eventObject) {
		if (eventObject.which == 27) {
			$('#overlay-menu').removeClass('open');
			$body.removeClass('popup-active');
			$('.window-popup').removeClass('active');
			$body.removeClass('body-overlay-active');
		}
	});


	/* -----------------------
  * Create the map
  * https://leafletjs.com/
  * --------------------- */

	CRUMINA.maps = {
		maps: {
			mapMain: {

				config: {
					id: 'map',
					map: {
						center: new L.LatLng(-37.613611, 144.963056),
						zoom: 10,
						maxZoom: 18,
						layers: new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
							attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
							subdomains: 'abcd',
							maxZoom: 19
						})
					},
					icon: {
						iconSize: [70, 87],
						iconAnchor: [22, 94],
						className: 'icon-map'
					},
					cluster: {
						iconSize: [40, 40]
					}
				},

				markers: [
					{
						coords: [-37.813611, 144.963056],
						icon: 'marker-google.png'
					}
				]

			},
			mapFull: {
				config: {
					id: 'map-full-height',
					map: {
						center: new L.LatLng(-37.613611, 144.963056),
						zoom: 10,
						maxZoom: 18,
						layers: new L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
							attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
							subdomains: 'abcd',
							maxZoom: 19
						})
					},
					icon: {
						iconSize: [70, 87],
						iconAnchor: [22, 94],
						className: 'icon-map'
					},
					cluster: {
						iconSize: [40, 49]
					}
				},
				markers: [
					{
						coords: [-37.813611, 144.963056],
						icon: 'marker-google.png'
					}
				]
			}
		},
		init: function () {
			var _this = this;

			for (var key in this.maps) {
				var data = this.maps[key];

				if (!data.config || !data.markers) {
					continue;
				}

				if (!document.getElementById(data.config.id)) {
					continue;
				}

				var map = new L.map(data.config.id, data.config.map);
				var cluster = L.markerClusterGroup({
					iconCreateFunction: function (cluster) {
						var childCount = cluster.getChildCount();
						var config = data.config.cluster;
						return new L.DivIcon({
							html: '<div><span>' + childCount + '</span></div>',
							className: 'marker-cluster marker-cluster-' + key,
							iconSize: new L.Point(config.iconSize[0], config.iconSize[1])
						});
					}
				});
				data.markers.forEach(function (item) {
					data.config.icon['iconUrl'] = './img/' + item.icon;
					var icon = L.icon(data.config.icon);

					var marker = L.marker(item.coords, {icon: icon});
					cluster.addLayer(marker);
				});

				map.addLayer(cluster);
				this.disableScroll(jQuery("#" + data.config.id), map);
			}
		},
		disableScroll: function ($map, map) {
			map.scrollWheelZoom.disable();

			$map.bind('mousewheel DOMMouseScroll', function (event) {
				event.stopPropagation();
				if (event.ctrlKey == true) {
					event.preventDefault();
					map.scrollWheelZoom.enable();
					setTimeout(function () {
						map.scrollWheelZoom.disable();
					}, 1000);
				} else {
					map.scrollWheelZoom.disable();
				}
			});

		}
	};


	$document.ready(function () {

		CRUMINA.fixedHeader();
		CRUMINA.Materialize();
		CRUMINA.Swiper.init();
		CRUMINA.select2Init();
		CRUMINA.mediaPopups();
		CRUMINA.IsotopeSort();
		CRUMINA.overlayMenu();
		CRUMINA.overlayBody();
		CRUMINA.flyingBalls();
		CRUMINA.maps.init();
		CRUMINA.standardPicker();
		CRUMINA.parallaxBackground();
		CRUMINA.fixSubmenuBottom();
		CRUMINA.select2LS();
		CRUMINA.rangeSlider();


		// On Scroll animations.
		CRUMINA.progresBars();
		CRUMINA.pieCharts();
		CRUMINA.counters();

		$('.perfect-scroll').perfectScrollbar({wheelPropagation: false});

		CRUMINA.mainMenu.init();
		CRUMINA.updateResponsiveInit();
		// CRUMINA.preloader();
	});

})(jQuery);
