(function ($) {
  ("use strict");
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Popup Sidemenu   
    09. Magnific Popup
    11. Filter
    12. Woocommerce Toggle
    13. Slick 3D Slider
    14. Tournament Hover Height Setup
    15. Tournament Slider Area
    16. Tournament Hero Slider
    17. Quantity Added
    18. WOW.js Animation
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
    tournamentFixer();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend({
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({
          scrollTop: 0,
        },
        lastScrollTop / 3
      );
      return false;
    });
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*----------- 07. Hero Slider Active ----------*/
  $(".vs-hero-carousel").each(function () {
    var vsHslide = $(this);

    // Get Data From Dom
    function d(data) {
      return vsHslide.data(data);
    }

    vsHslide.layerSlider({
      allowRestartOnResize: true,
      maxRatio: d("maxratio") ? d("maxratio") : 1,
      type: d("slidertype") ? d("slidertype") : "responsive",
      pauseOnHover: d("pauseonhover") ? true : false,
      navPrevNext: d("navprevnext") ? true : false,
      hoverPrevNext: d("hoverprevnext") ? true : false,
      hoverBottomNav: d("hoverbottomnav") ? true : false,
      navStartStop: d("navstartstop") ? true : false,
      navButtons: d("navbuttons") ? true : false,
      loop: d("loop") === false ? false : true,
      autostart: d("autostart") ? true : false,
      height: d("height") ? d("height") : 1080,
      responsiveUnder: d("responsiveunder") ? d("responsiveunder") : 1220,
      layersContainer: d("container") ? d("container") : 1220,
      showCircleTimer: d("showcircletimer") ? true : false,
      skinsPath: "layerslider/skins/",
      thumbnailNavigation: d("thumbnailnavigation") === false ? false : true,
    });
  });

  /*----------- 08. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
      '<button type="button" class="slick-prev"><i class="' +
      d("prev-arrow") +
      '"></i></button>',
      nextButton =
      '<button type="button" class="slick-next"><i class="' +
      d("next-arrow") +
      '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : false,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow") ?
        prevButton : '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow: d("next-arrow") ?
        nextButton : '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [{
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show") ?
              d("xl-slide-show") : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show") ?
              d("ml-slide-show") : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show") ?
              d("lg-slide-show") : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0,
          },
        },
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ],
    });
  });

  /*----------- 09. Ajax Contact Form ----------*/
  var form = ".ajax-contact";
  var invalidCls = "is-invalid";
  var $email = '[name="email"]';
  var $validation =
    '[name="name"],[name="email"],[name="subject"],[name="message"]'; // Must be use (,) without any space
  var formMessages = $(".form-messages");

  function sendContact() {
    var formData = $(form).serialize();
    var valid;
    valid = validateContact();
    if (valid) {
      jQuery
        .ajax({
          url: $(form).attr("action"),
          data: formData,
          type: "POST",
        })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          formMessages.removeClass("error");
          formMessages.addClass("success");
          // Set the message text.
          formMessages.text(response);
          // Clear the form.
          $(form + ' input:not([type="submit"]),' + form + " textarea").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          formMessages.removeClass("success");
          formMessages.addClass("error");
          // Set the message text.
          if (data.responseText !== "") {
            formMessages.html(data.responseText);
          } else {
            formMessages.html(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    }
  }

  function validateContact() {
    var valid = true;
    var formInput;

    function unvalid($validation) {
      $validation = $validation.split(",");
      for (var i = 0; i < $validation.length; i++) {
        formInput = form + " " + $validation[i];
        if (!$(formInput).val()) {
          $(formInput).addClass(invalidCls);
          valid = false;
        } else {
          $(formInput).removeClass(invalidCls);
          valid = true;
        }
      }
    }
    unvalid($validation);

    if (
      !$($email).val() ||
      !$($email)
      .val()
      .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
    ) {
      $($email).addClass(invalidCls);
      valid = false;
    } else {
      $($email).removeClass(invalidCls);
      valid = true;
    }
    return valid;
  }

  $(form).on("submit", function (element) {
    element.preventDefault();
    sendContact();
  });

  /*---------- 08. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*----------- 09. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*----------- 11. Filter ----------*/
  $(".filter-active").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });

      // filter items on button click
      $($filterMenu).on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({
          filter: filterValue,
        });
      });

      // Menu Active Class
      $($filterMenu).on("click", "button", function (event) {
        event.preventDefault();
        $(this).addClass("active");
        $(this).siblings(".active").removeClass("active");
      });
    }
  });

  /*----------- 12. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on("change", function () {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  /*----------- 13. Slick 3D Slider ----------*/
  var slick3d = $(".slick-3d-active");
  slick3d
    .on("init", function (event, slick, currentSlide) {
      var cur = $(slick.$slides[slick.currentSlide]),
        next = cur.next(),
        next2 = cur.next().next(),
        next3 = cur.next().next().next(),
        prev = cur.prev(),
        prev2 = cur.prev().prev(),
        prev3 = cur.prev().prev().prev();
      prev.addClass("slick-3d-prev");
      next.addClass("slick-3d-next");
      prev2.addClass("slick-3d-prev2");
      prev3.addClass("slick-3d-prev3");
      next2.addClass("slick-3d-next2");
      next3.addClass("slick-3d-next3");
      cur
        .removeClass("slick-3d-next")
        .removeClass("slick-3d-prev")
        .removeClass("slick-3d-next2")
        .removeClass("slick-3d-prev2")
        .removeClass("slick-3d-next3")
        .removeClass("slick-3d-prev3");
      slick.$prev = prev;
      slick.$next = next;
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var cur = $(slick.$slides[nextSlide]);
      slick.$prev.removeClass("slick-3d-prev");
      slick.$next.removeClass("slick-3d-next");
      slick.$prev.prev().removeClass("slick-3d-prev2");
      slick.$next.next().removeClass("slick-3d-next2");
      slick.$prev.prev().prev().removeClass("slick-3d-prev3");
      slick.$next.next().next().removeClass("slick-3d-next3");
      var next = cur.next(),
        prev = cur.prev();
      prev.addClass("slick-3d-prev");
      next.addClass("slick-3d-next");
      prev.prev().addClass("slick-3d-prev2");
      next.next().addClass("slick-3d-next2");
      prev.prev().prev().addClass("slick-3d-prev3");
      next.next().next().addClass("slick-3d-next3");
      slick.$prev = prev;
      slick.$next = next;
      cur
        .removeClass("slick-next")
        .removeClass("slick-3d-prev")
        .removeClass("slick-next2")
        .removeClass("slick-3d-prev2")
        .removeClass("slick-next3")
        .removeClass("slick-3d-prev3");
    });

  slick3d.slick({
    speed: 1000,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    centerMode: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0",
    swipe: true,
    autoplay: false,
    asNavFor: ".player-slider1",
  });

  $(".player-slider1").slick({
    speed: 1300,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    infinite: true,
    centerMode: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerPadding: "0",
    swipe: true,
    autoplay: false,
    fade: true,
    asNavFor: "#playeravater1",
  });

  /*----------- 14. Tournament Hover Height Setup ----------*/
  function tournamentFixer() {
    $(".tournament-style2").each(function () {
      var box = $(this);
      var boxBottomHeight = box.find(".tournament-bottom").height();
      var boxImgHeight = box.find(".tournament-img").height();
      box
        .css({
          "--toggle-height": boxBottomHeight + "px",
          "--img-height": boxImgHeight + "px",
        })
        .addClass("toggle-active");
    });
  }

  /*----------- 15. Tournament Slider Area  ----------*/
  let tournamentSlider = "#tournamentslide1",
    tournamentNav = ".tournament-menu2";

  $(tournamentNav).each(function () {
    var tabBtnIndex = 0;
    $(this)
      .find(".tab-btn")
      .each(function () {
        var btnCurrent = $(this);
        btnCurrent.attr("data-goto", tabBtnIndex);
        tabBtnIndex++;
        btnCurrent.on("click", function () {
          $("#tournamentslide1").slick("slickGoTo", btnCurrent.data("goto"));
        });
      });
  });

  $(tournamentSlider)
    .on("init", function (event, slick, currentSlide) {
      var cur = $(slick.$slides[slick.currentSlide]);
      var currentIndex = cur.data("slick-index");
      var prevIndex = cur.prev().data("slick-index");
      var nextIndex = cur.next().data("slick-index");
      $(`${tournamentNav} .tab-btn[data-goto="${currentIndex}"]`).addClass(
        "active"
      );
      $(`${tournamentNav} .tab-btn[data-goto="${nextIndex}"]`).addClass("next");
      $(`${tournamentNav} .tab-btn[data-goto="${prevIndex}"]`).addClass("prev");
      slick.$prevIndex = prevIndex;
      slick.$nextIndex = nextIndex;
    })
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var cur = $(slick.$slides[nextSlide]);
      var currentIndex = cur.data("slick-index");
      $(
        `${tournamentNav} .tab-btn[data-goto="${slick.$prevIndex}"]`
      ).removeClass("prev");
      $(
        `${tournamentNav} .tab-btn[data-goto="${slick.$nextIndex}"]`
      ).removeClass("next");
      var prevIndex = cur.prev().data("slick-index");
      var nextIndex = cur.next().data("slick-index");
      $(`${tournamentNav} .tab-btn[data-goto="${nextIndex}"]`).addClass("next");
      $(`${tournamentNav} .tab-btn[data-goto="${prevIndex}"]`).addClass("prev");
      slick.$prevIndex = prevIndex;
      slick.$nextIndex = nextIndex;
      $(`${tournamentNav} .tab-btn[data-goto="${currentIndex}"]`)
        .addClass("active")
        .removeClass("next")
        .removeClass("prev")
        .siblings()
        .removeClass("active");
    });

  $(tournamentSlider).slick({
    speed: 600,
    arrows: false,
    fade: true,
    dots: true,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false, // Infinite should set be false
    responsive: [{
      breakpoint: 992,
      settings: {
        dots: false,
      },
    }, ],
  });

  /*----------- 16. Tournament Hero Slider  ----------*/
  $("#tournament4554").slick({
    speed: 800,
    arrows: false,
    fade: false,
    dots: false,
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true, // Infinite should set be false
    centerPadding: "475px",
    centerMode: true,
    responsive: [{
        breakpoint: 1500,
        settings: {
          centerPadding: "300px",
        },
      },
      {
        breakpoint: 1366,
        settings: {
          centerPadding: "200px",
        },
      },
      {
        breakpoint: 992,
        settings: {
          centerPadding: "50px",
        },
      },
      {
        breakpoint: 767,
        settings: {
          centerPadding: "0",
        },
      },
    ],
  });

  /*---------- 17. Quantity Added ----------*/
  $(".quantity-plus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });
  });

  $(".quantity-minus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });
  });


  /*----------- 18. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: 'wow', // animated element css class (default is wow)
    animateClass: 'wow-animated', // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();

})(jQuery);