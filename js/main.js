// ==========================================================================
// ULLAL DARGAH - PURE CLIENT-SIDE JAVASCRIPT ENGINE
// Hazrath Sayyid Muhammad Shareeful Madani (R.A.) Dargah, Mangalore
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. THEME MANAGER (LIGHT / DARK MODE WITH SYSTEM PREFERENCE & STORAGE)
  // --------------------------------------------------------------------------
  const themeToggle = document.getElementById("themeToggle");

  const updateThemeUI = (isDark) => {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("dark-mode");
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun" style="color:var(--accent);"></i>';
        themeToggle.setAttribute("aria-label", "Switch to Light Mode");
      }
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.remove("dark-mode");
      if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.setAttribute("aria-label", "Switch to Dark Mode");
      }
    }
  };

  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialIsDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

  updateThemeUI(initialIsDark);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isCurrentlyDark =
        document.documentElement.getAttribute("data-theme") === "dark" ||
        document.body.classList.contains("dark-mode");
      const nextIsDark = !isCurrentlyDark;
      localStorage.setItem("theme", nextIsDark ? "dark" : "light");
      updateThemeUI(nextIsDark);
    });
  }

  // --------------------------------------------------------------------------
  // 2. MOBILE NAVIGATION CONTROLLER & ACTIVE LINK HIGHLIGHTER
  // --------------------------------------------------------------------------
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");
  const navCloseBtn = document.getElementById("navCloseBtn");

  const closeMobileNav = () => {
    if (navLinks) navLinks.classList.remove("open");
    if (navOverlay) navOverlay.classList.remove("active");
    if (menuBtn) {
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
    document.body.style.overflow = "";
  };

  const openMobileNav = () => {
    if (navLinks) navLinks.classList.add("open");
    if (navOverlay) navOverlay.classList.add("active");
    if (menuBtn) {
      menuBtn.classList.add("active");
      menuBtn.setAttribute("aria-expanded", "true");
    }
    document.body.style.overflow = "hidden";
  };

  if (menuBtn && navLinks) {
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navCloseBtn) {
    navCloseBtn.addEventListener("click", closeMobileNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMobileNav);
  }

  if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks && navLinks.classList.contains("open")) {
      closeMobileNav();
    }
  });

  // Highlight Current Active Page in Navigation
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (navLinks) {
    const links = navLinks.querySelectorAll(".nav-link");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === currentPage || (currentPage === "" && href === "index.html")) {
        link.classList.add("active");
      } else if (!href.includes("#")) {
        link.classList.remove("active");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. UI DECORATIONS & SCROLL UTILITIES
  // --------------------------------------------------------------------------
  // Date Display in Top Bar
  const dateElement = document.getElementById("current-date");
  if (dateElement) {
    const date = new Date();
    dateElement.innerHTML = date.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  // Sticky Header Scroll Effect
  const header = document.querySelector(".main-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 40);
    });
  }

  // Back to Top Button
  const topBtn = document.getElementById("topBtn");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        topBtn.style.display = "flex";
      } else {
        topBtn.style.display = "none";
      }
    });

    topBtn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }

  // FAQ Accordion Toggle
  const faqBtns = document.querySelectorAll(".faq-btn");
  faqBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector("i");
      const isOpen = content.style.display === "block";

      // Close all other FAQs for clean accordion feel
      document.querySelectorAll(".faq-content").forEach((c) => (c.style.display = "none"));
      document.querySelectorAll(".faq-btn i").forEach((i) => {
        i.classList.remove("fa-chevron-up");
        i.classList.add("fa-chevron-down");
      });

      if (!isOpen) {
        content.style.display = "block";
        if (icon) {
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        }
      }
    });
  });

  // Countdown Timer (Events Page)
  const daysEl = document.getElementById("days");
  if (daysEl) {
    const targetDate = new Date("November 15, 2026 00:00:00").getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
      }
    };
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Preloader Hide Logic
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 300);
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll(".reveal");
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // Particles.js Background Initialization
  if (document.getElementById("particles-js") && typeof particlesJS !== "undefined") {
    try {
      particlesJS("particles-js", {
        particles: {
          number: { value: 45, density: { enable: true, value_area: 800 } },
          color: { value: ["#D4AF37", "#10B981", "#ffffff"] },
          shape: { type: "circle" },
          opacity: { value: 0.3, random: true },
          size: { value: 3.5, random: true },
          line_linked: { enable: true, distance: 130, color: "#D4AF37", opacity: 0.15, width: 1 },
          move: { enable: true, speed: 1.2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
          detect_on: "canvas",
          events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
          modes: { grab: { distance: 140, line_linked: { opacity: 0.6 } }, push: { particles_nb: 3 } }
        },
        retina_detect: true
      });
    } catch (e) {
      console.warn("Particles.js init skipped:", e);
    }
  }

  // --------------------------------------------------------------------------
  // 4. PRAYER TIMES ENGINE (ULLAL / MANGALORE LOCAL TIMINGS & HIGHLIGHT)
  // --------------------------------------------------------------------------
  const prayerTimesData = {
    fajr: "05:08 AM",
    sunrise: "06:18 AM",
    dhuhr: "12:32 PM",
    asr: "03:54 PM",
    maghrib: "06:45 PM",
    isha: "08:01 PM"
  };

  const initPrayerTimes = () => {
    // Update Home Page Prayer Strip
    const homePrayerIds = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
    homePrayerIds.forEach((id) => {
      const el = document.getElementById(`home-${id}`);
      if (el) el.textContent = prayerTimesData[id];
    });

    // Update Events Page Prayer Grid
    if (document.getElementById("prayer-fajr")) {
      const fajrEl = document.querySelector("#prayer-fajr .time-display");
      const dhuhrEl = document.querySelector("#prayer-dhuhr .time-display");
      const asrEl = document.querySelector("#prayer-asr .time-display");
      const maghribEl = document.querySelector("#prayer-maghrib .time-display");
      const ishaEl = document.querySelector("#prayer-isha .time-display");

      if (fajrEl) fajrEl.innerText = prayerTimesData.fajr;
      if (dhuhrEl) dhuhrEl.innerText = prayerTimesData.dhuhr;
      if (asrEl) asrEl.innerText = prayerTimesData.asr;
      if (maghribEl) maghribEl.innerText = prayerTimesData.maghrib;
      if (ishaEl) ishaEl.innerText = prayerTimesData.isha;
    }
  };
  initPrayerTimes();

  // --------------------------------------------------------------------------
  // 5. NEWS & ANNOUNCEMENTS SLIDER
  // --------------------------------------------------------------------------
  const newsItems = [
    {
      title: "Annual Urs Shareef Preparations Commenced",
      date: "02 August 2026",
      image: "images/fviewdargah.jpeg",
      fallbackImage: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&q=80&w=800",
      content: "Preparations for the upcoming grand Urs festival celebrating Hazrath Sayyid Shareeful Madani (R.A.) have officially begun under the committee guidance."
    },
    {
      title: "Madani Educational Complex Admissions Open",
      date: "28 July 2026",
      image: "images/madanihall.jpeg",
      fallbackImage: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800",
      content: "Applications are now open for higher religious & modern academic studies for the academic year 2026-27 at Ullal Dargah educational institutions."
    },
    {
      title: "Weekly Swalat Majlis Every Thursday Evening",
      date: "20 July 2026",
      image: "images/waterdargah.jpeg",
      fallbackImage: "https://images.unsplash.com/photo-1519817650390-64a93bdb5fbf?auto=format&fit=crop&q=80&w=800",
      content: "Join thousands of devotees for the weekly spiritual Swalat Majlis conducted after Maghrib prayers every Thursday night."
    },
    {
      title: "Community Free Meal (Langar) Expansion",
      date: "12 July 2026",
      image: "images/sviewdargah.jpeg",
      fallbackImage: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&q=80&w=800",
      content: "The Dargah committee has expanded the daily free meal distribution kitchen to serve over 1,500 daily pilgrims and visitors."
    }
  ];

  const loadNewsSlider = () => {
    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";
    newsItems.forEach((item) => {
      const slide = document.createElement("div");
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="news-card">
          <div class="news-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy"
                 onerror="this.src='${item.fallbackImage}'">
          </div>
          <div class="news-content">
            <span class="news-date"><i class="far fa-calendar-alt"></i> ${item.date}</span>
            <h3>${item.title}</h3>
            <p>${item.content}</p>
          </div>
        </div>
      `;
      container.appendChild(slide);
    });

    if (typeof Swiper !== "undefined") {
      new Swiper(".news-slider", {
        slidesPerView: 1,
        spaceBetween: 25,
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: {
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }
      });
    }
  };
  loadNewsSlider();

  // --------------------------------------------------------------------------
  // 6. EVENTS TIMELINE LOADER
  // --------------------------------------------------------------------------
  const eventsData = [
    {
      title: "Weekly Swalat Majlis",
      schedule: "Every Thursday after Maghrib @ Main Dargah Courtyard"
    },
    {
      title: "Monthly Qatme Quran & Burda Majlis",
      schedule: "1st Friday of Islamic Month @ Madani Darbar Hall"
    },
    {
      title: "Grand Urs Shareef 2026",
      schedule: "15 - 20 November 2026 @ Ullal Dargah Premises"
    },
    {
      title: "Milad-un-Nabi Spiritual Conference",
      schedule: "12 Rabi-ul-Awwal @ Educational Complex Ground"
    }
  ];

  const loadEventsTimeline = () => {
    const container = document.getElementById("events-timeline");
    if (!container) return;

    container.innerHTML = "";
    eventsData.forEach((ev) => {
      const parts = ev.schedule.split("@");
      const topic = parts[0] ? parts[0].trim() : "";
      const venue = parts[1] ? `@ ${parts[1].trim()}` : "";

      const div = document.createElement("div");
      div.className = "timeline-item";
      div.innerHTML = `
        <span><i class="fas fa-bullhorn" style="margin-right:6px;"></i>${ev.title}</span>
        <h3>${topic}<br><span style="font-size:0.9rem; font-weight:normal; color:var(--text-muted);">${venue}</span></h3>
      `;
      container.appendChild(div);
    });
  };
  loadEventsTimeline();

  // --------------------------------------------------------------------------
  // 7. DU'A REQUEST WALL (WITH LOCALSTORAGE PERSISTENCE & SAY AMIN)
  // --------------------------------------------------------------------------
  const defaultDuas = [
    {
      id: 1,
      name: "Ahmed Raza",
      location: "Mangalore, India",
      message: "Please pray for my mother's complete health and speedy recovery.",
      date: "04 Aug 2026",
      amins: 42
    },
    {
      id: 2,
      name: "Fatima Syed",
      location: "Dubai, UAE",
      message: "Praying for success in examinations and guidance in career path.",
      date: "03 Aug 2026",
      amins: 29
    },
    {
      id: 3,
      name: "Mohammed Ibrahim",
      location: "Bangalore, India",
      message: "May Allah grant peace, unity, and prosperity to our family and Ummah.",
      date: "01 Aug 2026",
      amins: 56
    }
  ];

  const getStoredDuas = () => {
    const stored = localStorage.getItem("ullal_duas");
    if (!stored) {
      localStorage.setItem("ullal_duas", JSON.stringify(defaultDuas));
      return defaultDuas;
    }
    return JSON.parse(stored);
  };

  const saveStoredDuas = (duas) => {
    localStorage.setItem("ullal_duas", JSON.stringify(duas));
  };

  const initDuaWall = () => {
    const duaForm = document.getElementById("duaForm");
    const duaWall = document.getElementById("duaWall");

    const renderDuaWall = () => {
      if (!duaWall) return;
      const duas = getStoredDuas();

      if (duas.length === 0) {
        duaWall.innerHTML = `
          <div class="empty-wall" style="text-align:center; padding:40px; color:var(--text-muted);">
            <i class="fas fa-hands-praying" style="font-size:2.5rem; margin-bottom:15px; color:var(--accent);"></i>
            <p>No public Du'as posted yet. Be the first to request a prayer from the community.</p>
          </div>
        `;
        return;
      }

      duaWall.innerHTML = "";
      duas.forEach((dua) => {
        const card = document.createElement("div");
        card.className = "dua-card";
        card.innerHTML = `
          <div class="dua-header">
            <div class="dua-info">
              <h4>${dua.name}</h4>
              <span>📍 ${dua.location}</span>
            </div>
            <span class="dua-date">${dua.date}</span>
          </div>
          <p class="dua-message">"${dua.message}"</p>
          <div class="dua-footer">
            <button class="amin-btn" data-id="${dua.id}">
              <i class="far fa-heart"></i> Say Amin (<span class="amin-count">${dua.amins}</span>)
            </button>
          </div>
        `;
        duaWall.appendChild(card);
      });

      // Bind Say Amin buttons
      duaWall.querySelectorAll(".amin-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const id = parseInt(btn.getAttribute("data-id"));
          const duasList = getStoredDuas();
          const target = duasList.find((d) => d.id === id);

          if (target) {
            target.amins += 1;
            saveStoredDuas(duasList);

            btn.classList.add("clicked");
            btn.innerHTML = `<i class="fas fa-heart" style="color:#ef4444;"></i> Amin (<span class="amin-count">${target.amins}</span>)`;

            spawnFloatingAmin(e.clientX, e.clientY);
          }
        });
      });
    };

    const spawnFloatingAmin = (x, y) => {
      const span = document.createElement("span");
      span.className = "floating-amin";
      span.innerHTML = "🤲";
      span.style.left = `${x - 15}px`;
      span.style.top = `${y - 35}px`;
      span.style.position = "fixed";
      span.style.pointerEvents = "none";
      span.style.zIndex = "9999";
      span.style.fontSize = "1.8rem";
      span.style.transition = "transform 1s ease-out, opacity 1s ease-out";

      document.body.appendChild(span);

      requestAnimationFrame(() => {
        span.style.transform = "translateY(-50px) scale(1.3)";
        span.style.opacity = "0";
      });

      setTimeout(() => {
        span.remove();
      }, 1000);
    };

    if (duaForm) {
      duaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("duaName");
        const locationInput = document.getElementById("duaLocation");
        const messageInput = document.getElementById("duaMessage");

        const newDua = {
          id: Date.now(),
          name: nameInput.value.trim(),
          location: locationInput.value.trim(),
          message: messageInput.value.trim(),
          date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
          amins: 1
        };

        const currentDuas = getStoredDuas();
        currentDuas.unshift(newDua);
        saveStoredDuas(currentDuas);

        if (typeof Swal !== "undefined") {
          Swal.fire({
            title: "Du'a Request Posted!",
            text: "Jazakallah Khair! Your prayer request is now live on the Du'a Wall.",
            icon: "success",
            confirmButtonColor: "#065F46"
          });
        } else {
          alert("Jazakallah Khair! Your prayer request is posted.");
        }

        duaForm.reset();
        renderDuaWall();
      });
    }

    if (duaWall) renderDuaWall();
  };
  initDuaWall();

  // --------------------------------------------------------------------------
  // 8. DONATIONS CONTROLLER & SUPPORTERS LIST
  // --------------------------------------------------------------------------
  const defaultDonors = [
    { name: "Haji Abdul Rahman", amount: 5000, type: "General Donation" },
    { name: "K. M. Shareef", amount: 2500, type: "Food Distribution" },
    { name: "Yousuf Beary", amount: 10000, type: "Urs Maintenance" }
  ];

  const getStoredDonors = () => {
    const stored = localStorage.getItem("ullal_donors");
    if (!stored) {
      localStorage.setItem("ullal_donors", JSON.stringify(defaultDonors));
      return defaultDonors;
    }
    return JSON.parse(stored);
  };

  const saveStoredDonors = (donors) => {
    localStorage.setItem("ullal_donors", JSON.stringify(donors));
  };

  const launchGPayPayment = (amount, name, type) => {
    const upiId = "ullaldargah@upi";
    const payeeName = "Ullal Dargah";
    const note = `${type} - ${name || "Devotee"}`;

    const encodedName = encodeURIComponent(payeeName);
    const encodedNote = encodeURIComponent(note);
    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR&tn=${encodedNote}`;
    const intentUrl = `intent://pay?pa=${upiId}&pn=${encodedName}&am=${amount}&cu=INR&tn=${encodedNote}#Intent;scheme=upi;package=com.google.android.apps.nps;end`;

    const isAndroid = /Android/i.test(navigator.userAgent);
    try {
      if (isAndroid) {
        window.location.href = intentUrl;
      } else {
        window.location.href = upiUrl;
      }
    } catch (err) {
      console.warn("GPay launcher error:", err);
      window.location.href = upiUrl;
    }
  };

  const initDonations = () => {
    const triggerBtns = document.querySelectorAll(".donate-trigger-btn");
    const donorsList = document.getElementById("donors-list");

    const renderDonors = () => {
      if (!donorsList) return;
      const donors = getStoredDonors();

      if (donors.length === 0) {
        donorsList.innerHTML = `<p style="color:var(--text-muted); font-style:italic;">Be the first to support this sacred cause.</p>`;
        return;
      }

      donorsList.innerHTML = "";
      donors.forEach((donor) => {
        const badge = document.createElement("div");
        badge.className = "donor-badge";
        badge.style.cssText = `
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: var(--shadow-sm);
        `;
        badge.innerHTML = `<span>🤲</span> <strong>${donor.name}</strong> - <span style="color:var(--secondary); font-weight:600;">₹${donor.amount}</span> <small style="font-size:0.75rem; color:var(--text-muted);">(${donor.type})</small>`;
        donorsList.appendChild(badge);
      });
    };

    triggerBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const type = btn.getAttribute("data-type") || "General Donation";

        if (typeof Swal !== "undefined") {
          const { value: formValues } = await Swal.fire({
            title: `Support Ullal Dargah`,
            html: `
              <div style="text-align:center;">
                <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:12px;">Category: <strong>${type}</strong></p>
                <div class="preset-amounts-container" style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap; margin-bottom:12px;">
                  <button type="button" class="preset-amount-btn" onclick="document.getElementById('swal-input-amount').value=100" style="padding:6px 14px; border-radius:20px; border:1px solid var(--border-color); background:var(--bg-primary); cursor:pointer; font-weight:600;">₹100</button>
                  <button type="button" class="preset-amount-btn" onclick="document.getElementById('swal-input-amount').value=500" style="padding:6px 14px; border-radius:20px; border:1px solid var(--border-color); background:var(--bg-primary); cursor:pointer; font-weight:600;">₹500</button>
                  <button type="button" class="preset-amount-btn" onclick="document.getElementById('swal-input-amount').value=1000" style="padding:6px 14px; border-radius:20px; border:1px solid var(--border-color); background:var(--bg-primary); cursor:pointer; font-weight:600;">₹1000</button>
                  <button type="button" class="preset-amount-btn" onclick="document.getElementById('swal-input-amount').value=2500" style="padding:6px 14px; border-radius:20px; border:1px solid var(--border-color); background:var(--bg-primary); cursor:pointer; font-weight:600;">₹2500</button>
                </div>
                <input id="swal-input-name" class="swal2-input" placeholder="Your Name" value="Devotee" style="margin:8px auto; max-width:85%;">
                <input id="swal-input-amount" type="number" class="swal2-input" placeholder="Enter Amount (INR)" value="500" style="margin:8px auto; max-width:85%;">
                <p style="font-size:0.85rem; color:var(--text-muted); margin-top:12px;"><i class="fab fa-google-pay" style="color:#4285F4; font-size:1.3rem; vertical-align:middle;"></i> Tapping below opens <strong>Google Pay</strong> directly</p>
              </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: '<i class="fab fa-google-pay" style="font-size:1.4rem; vertical-align:middle; margin-right:6px;"></i> Pay with GPay',
            confirmButtonColor: "#1a73e8",
            cancelButtonText: "Cancel",
            preConfirm: () => {
              const name = document.getElementById("swal-input-name").value.trim() || "Devotee";
              const amount = document.getElementById("swal-input-amount").value;
              if (!amount || amount <= 0) {
                Swal.showValidationMessage("Please enter a valid amount");
                return false;
              }
              return { name, amount: parseInt(amount) };
            }
          });

          if (formValues) {
            // Immediately open GPay app via UPI deep link
            launchGPayPayment(formValues.amount, formValues.name, type);

            // Record supporter
            const donors = getStoredDonors();
            donors.unshift({ name: formValues.name, amount: formValues.amount, type: type });
            saveStoredDonors(donors);

            renderDonors();

            setTimeout(() => {
              Swal.fire({
                title: "Jazakallah Khair!",
                html: `Thank you, <strong>${formValues.name}</strong>!<br>Google Pay launched for <strong>₹${formValues.amount}</strong> towards ${type}.<br><br><small style="color:var(--text-muted);">UPI ID: <strong>ullaldargah@upi</strong></small>`,
                icon: "success",
                confirmButtonColor: "#065F46"
              });
            }, 600);
          }
        } else {
          const amount = prompt("Enter donation amount (INR):", "500");
          const name = prompt("Enter your name:", "Devotee") || "Devotee";
          if (amount && parseInt(amount) > 0) {
            launchGPayPayment(parseInt(amount), name, type);
            const donors = getStoredDonors();
            donors.unshift({ name, amount: parseInt(amount), type });
            saveStoredDonors(donors);
            renderDonors();
          }
        }
      });
    });

    renderDonors();
  };
  initDonations();

  // --------------------------------------------------------------------------
  // 9. CONTACT FORM HANDLER
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
      const emailInput = contactForm.querySelector('input[placeholder="Your Email"]');
      const messageInput = contactForm.querySelector('textarea[placeholder="Your Message"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        if (typeof Swal !== "undefined") {
          Swal.fire({ title: "Form Error", text: "Please fill in all required fields.", icon: "warning" });
        } else {
          alert("Please fill in all required fields.");
        }
        return;
      }

      if (typeof Swal !== "undefined") {
        Swal.fire({
          title: "Message Received!",
          text: "Jazakallah Khair! We have received your message. Our committee team will get back to you shortly.",
          icon: "success",
          confirmButtonColor: "#065F46"
        });
      } else {
        alert("Jazakallah Khair! Message sent successfully.");
      }

      contactForm.reset();
    });
  }
});
