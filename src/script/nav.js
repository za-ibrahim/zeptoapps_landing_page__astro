function onDOMReady() {
    let lastScroll = 0;
    let navbar = document.getElementById("navbar-container");
    let threshold = 100; // px to scroll before effect starts
    let currentScroll = window.pageYOffset;
    const scrollAction = function () {
        currentScroll = window.pageYOffset;
        if (currentScroll > threshold) {
            if (currentScroll < lastScroll) {
                // Scrolling up
                navbar.classList.add("navbar-visible");
                navbar.classList.remove("navbar-hidden");
            } else {
                // Scrolling down
                navbar.classList.add("navbar-hidden");
                navbar.classList.remove("navbar-visible");
            }
        } else {
            navbar.classList.remove("navbar-hidden", "navbar-visible");
            navbar.style.transform = "translateY(0)";
        }
        lastScroll = currentScroll;
    }
    window.addEventListener("scroll", scrollAction);


    const navbarContainer = document.querySelector(".nav-container");
    if (navbarContainer) {
        navbarContainer.addEventListener("mouseover", () => {
            if (!navbar.classList.contains("navbar-visible") && currentScroll > threshold) {
                console.log("container")
                navbar.style.transform = "translateY(-1rem)";
                navbar.classList.remove("navbar-hidden");
            }
        });
        navbarContainer.addEventListener("mouseout", () => {
            if (!navbar.classList.contains("navbar-visible") && currentScroll > threshold) {
                navbar.classList.add("navbar-hidden");
                navbar.classList.remove("navbar-visible");
                navbar.style.transform = "translateY(0)";
            }
        });
    }



    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileDropdownTriggers = document.querySelectorAll(
        ".mobile-dropdown-trigger"
    );

    // Toggle mobile menu
    mobileMenuButton?.addEventListener("click", function () {
        const isHidden = mobileMenu?.classList.contains("hidden");

        if (isHidden) {
            // Show menu with animation
            mobileMenu?.classList.remove("hidden");
            mobileMenu?.classList.add("animate-slide-down");
            window.removeEventListener("scroll", scrollAction);
        } else {
            window.addEventListener("scroll", scrollAction);
            // Hide menu with animation
            mobileMenu?.classList.add("animate-slide-up");
            setTimeout(() => {
                mobileMenu?.classList.add("hidden");
                mobileMenu?.classList.remove(
                    "animate-slide-up",
                    "animate-slide-down"
                );
            }, 260); // Match animation duration
        }

        // Update aria-expanded
        if (mobileMenuButton) {
            mobileMenuButton.setAttribute(
                "aria-expanded",
                isHidden ? "true" : "false"
            );
        }
    });

    // Handle mobile dropdown menus
    mobileDropdownTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
            const triggerElement = event.currentTarget;
            const container = triggerElement.closest(".mobile-dropdown-container");
            const menu = container?.querySelector(".mobile-dropdown-menu");
            const icon = triggerElement.querySelector(".mobile-dropdown-icon svg");

            const isHidden = menu?.classList.contains("hidden");

            if (isHidden) {
                // Show dropdown with animation
                menu?.classList.remove("hidden");
                menu?.classList.add("animate-slide-down");
                icon?.classList.add("rotate-180");
            } else {
                // Hide dropdown with animation
                menu?.classList.add("animate-slide-up");
                icon?.classList.remove("rotate-180");
                setTimeout(() => {
                    menu?.classList.add("hidden");
                    menu?.classList.remove("animate-slide-up", "animate-slide-down");
                }, 300);
            }
        });
    });

}

document.addEventListener("DOMContentLoaded", onDOMReady);