document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     HOTEL ATITHI WEBSITE
     MAIN JAVASCRIPT
  ===================================================== */


  /* =====================================================
     01. ENABLE JAVASCRIPT ANIMATIONS
  ===================================================== */

  document.documentElement.classList.add("js-enabled");


  /* =====================================================
     02. MOBILE NAVIGATION
  ===================================================== */

  const menuButton = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");


  if (menuButton && navLinks) {

    menuButton.setAttribute("aria-expanded", "false");


    /* OPEN / CLOSE MOBILE MENU */

    menuButton.addEventListener("click", () => {

      const isOpen =
        navLinks.classList.toggle("show");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    /* CLOSE MENU AFTER CLICKING A LINK */

    document
      .querySelectorAll(".nav-links a")
      .forEach(link => {

        link.addEventListener("click", () => {

          navLinks.classList.remove("show");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        });

      });


    /* CLOSE MENU WHEN CLICKING OUTSIDE */

    document.addEventListener("click", event => {

      const clickedInsideMenu =
        navLinks.contains(event.target);

      const clickedMenuButton =
        menuButton.contains(event.target);


      if (
        !clickedInsideMenu &&
        !clickedMenuButton
      ) {

        navLinks.classList.remove("show");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* =====================================================
     03. HEADER SCROLL EFFECT
  ===================================================== */

  const header =
    document.querySelector(".header");


  function updateHeader() {

    if (!header) return;


    if (window.scrollY > 20) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  updateHeader();


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =====================================================
     04. SCROLL REVEAL ANIMATION
  ===================================================== */

  const revealItems =
    document.querySelectorAll(".reveal");


  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(

        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },

        {
          threshold: 0.08,
          rootMargin: "0px 0px -30px 0px"
        }

      );


    revealItems.forEach(item => {

      revealObserver.observe(item);

    });

  }

  else {

    /* FALLBACK FOR OLD BROWSERS */

    revealItems.forEach(item => {

      item.classList.add("visible");

    });

  }


  /* =====================================================
     05. COPYRIGHT YEAR
  ===================================================== */

  const year =
    document.getElementById("currentYear");


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     06. WEBSITE INTRO VIDEO
     PLAY ONCE PER BROWSER SESSION
  ===================================================== */

  const introScreen =
    document.getElementById(
      "introVideoScreen"
    );

  const introVideo =
    document.getElementById(
      "introVideo"
    );

  const introSkip =
    document.getElementById(
      "introSkip"
    );


  /* SESSION STORAGE HELPERS */

  function introWasPlayed() {

    try {

      return (
        sessionStorage.getItem(
          "hotelAtithiIntroPlayed"
        ) === "yes"
      );

    }

    catch (error) {

      return false;

    }

  }


  function rememberIntroPlayed() {

    try {

      sessionStorage.setItem(
        "hotelAtithiIntroPlayed",
        "yes"
      );

    }

    catch (error) {

      /* Ignore if storage is unavailable */

    }

  }


  /* CLOSE INTRO */

  function closeIntro() {

    if (!introScreen) return;


    rememberIntroPlayed();


    document.body.classList.remove(
      "intro-active"
    );


    introScreen.classList.add(
      "hide-intro"
    );


    if (introVideo) {

      introVideo.pause();

    }


    setTimeout(() => {

      introScreen.style.display = "none";

    }, 850);

  }


  /* =====================================================
     INTRO ALREADY PLAYED
  ===================================================== */

  if (introScreen) {

    if (introWasPlayed()) {

      introScreen.style.display = "none";

      document.body.classList.remove(
        "intro-active"
      );

    }


    /* ===================================================
       FIRST VISIT THIS SESSION
    =================================================== */

    else {

      document.body.classList.add(
        "intro-active"
      );


      if (introVideo) {

        /* MARK AS PLAYED ONCE VIDEO STARTS */

        introVideo.addEventListener(
          "play",
          rememberIntroPlayed,
          { once: true }
        );


        /* CLOSE INTRO WHEN VIDEO FINISHES */

        introVideo.addEventListener(
          "ended",
          closeIntro
        );


        /* IF VIDEO FAILS, OPEN WEBSITE */

        introVideo.addEventListener(
          "error",
          closeIntro
        );


        /* TRY TO START AUTOPLAY */

        const playPromise =
          introVideo.play();


        if (
          playPromise !== undefined
        ) {

          playPromise.catch(() => {

            /*
              Muted video normally autoplays,
              but if browser blocks it,
              close intro instead of freezing.
            */

            closeIntro();

          });

        }

      }

      else {

        closeIntro();

      }


      /* SKIP BUTTON */

      if (introSkip) {

        introSkip.addEventListener(
          "click",
          closeIntro
        );

      }

    }

  }


  /* =====================================================
     07. CLOSE MOBILE MENU WHEN WINDOW BECOMES DESKTOP
  ===================================================== */

  window.addEventListener("resize", () => {

    if (
      window.innerWidth > 768 &&
      navLinks
    ) {

      navLinks.classList.remove("show");


      if (menuButton) {

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }

  });

});