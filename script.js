/* =========================================
   ELEMENTS
========================================= */

const sidebar = document.getElementById("sidebar");
const menuButton = document.getElementById("menuButton");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const navItems = document.querySelectorAll(".nav-item");

const pageTitle = document.getElementById("pageTitle");
const pageDescription = document.getElementById("pageDescription");


/* =========================================
   PAGE INFORMATION
========================================= */

const pages = {

    dashboard: {
        title: "Dashboard",
        description: "Your student dashboard content will appear here."
    },

    feed: {
        title: "Feed",
        description: "Everything happening across campus, in one place."
    },

    missed: {
        title: "What you missed",
        description: "Important updates you may have missed while you were away."
    },

    opportunities: {
        title: "Opportunities",
        description: "Hackathons, internships, scholarships and more."
    },

    deadlines: {
        title: "Deadlines",
        description: "Everything due, sorted by urgency."
    },

    saved: {
        title: "Saved",
        description: "Your saved announcements, opportunities and deadlines."
    },

    settings: {
        title: "Settings",
        description: "Manage your Orbit preferences."
    }

};


/* =========================================
   CHANGE PAGE
========================================= */

function changePage(page) {

    // If page doesn't exist, use dashboard
    if (!pages[page]) {

        page = "dashboard";

    }


    // Update active navigation

    navItems.forEach(item => {

        const itemPage = item.dataset.page;

        item.classList.toggle(
            "active",
            itemPage === page
        );

    });


    // Update placeholder

    pageTitle.textContent = pages[page].title;

    pageDescription.textContent =
        pages[page].description;


    // Close mobile sidebar

    closeSidebar();

}


/* =========================================
   READ URL HASH
========================================= */

function loadPageFromURL() {

    let page = window.location.hash.replace("#", "");

    if (!page) {

        page = "dashboard";

        window.location.hash = "dashboard";
    }

    changePage(page);

}


/* =========================================
   NAVIGATION CLICK
========================================= */

navItems.forEach(item => {

    item.addEventListener("click", function () {

        const page = this.dataset.page;

        changePage(page);

    });

});


/* =========================================
   HASH CHANGE
========================================= */

window.addEventListener(
    "hashchange",
    loadPageFromURL
);


/* =========================================
   MOBILE SIDEBAR
========================================= */

function openSidebar() {

    sidebar.classList.add("open");

    sidebarOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeSidebar() {

    sidebar.classList.remove("open");

    sidebarOverlay.classList.remove("active");

    document.body.style.overflow = "";

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        openSidebar
    );

}


sidebarOverlay.addEventListener(
    "click",
    closeSidebar
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeSidebar();

        }

    }
);


/* =========================================
   LUCIDE ICONS
========================================= */

lucide.createIcons();


/* =========================================
   INITIAL PAGE
========================================= */

loadPageFromURL();