
// ===================================
// INTERNSHIP DATA
// ===================================

const internships = [
    {
        id: "INT-101",
        title: "Frontend Developer Intern",
        domain: "Full Stack Development",
        mode: "Remote",
        location: "India",
        skills: ["HTML", "CSS", "JavaScript"],
        openings: 3,
        description:
            "Work with a development team to create responsive websites and improve user interfaces."
    },
    {
        id: "INT-102",
        title: "Backend Developer Intern",
        domain: "Full Stack Development",
        mode: "Hybrid",
        location: "Pune",
        skills: ["Node.js", "SQL", "API"],
        openings: 2,
        description:
            "Learn backend development and build APIs using Node.js and database technologies."
    },
    {
        id: "INT-103",
        title: "UI/UX Designer Intern",
        domain: "UI/UX",
        mode: "Remote",
        location: "India",
        skills: ["Figma", "Design", "Research"],
        openings: 1,
        description:
            "Create user-friendly designs and improve the overall experience of digital products."
    },
    {
        id: "INT-104",
        title: "Data Analyst Intern",
        domain: "Data Analytics",
        mode: "On-site",
        location: "Bengaluru",
        skills: ["Python", "SQL", "Excel"],
        openings: 2,
        description:
            "Analyze datasets, create reports and discover useful business insights."
    },
    {
        id: "INT-105",
        title: "Cyber Security Intern",
        domain: "Cyber Security",
        mode: "Remote",
        location: "India",
        skills: ["Networking", "Linux", "Security"],
        openings: 1,
        description:
            "Learn cybersecurity fundamentals and understand security monitoring."
    }
];


// ===================================
// SELECT HTML ELEMENTS
// ===================================

const grid = document.getElementById("internship-grid");

const searchInput =
    document.getElementById("search-input");

const domainFilter =
    document.getElementById("domain-filter");

const modeFilter =
    document.getElementById("mode-filter");

const resultCount =
    document.getElementById("result-count");

const filterForm =
    document.getElementById("filter-form");

const dialog =
    document.getElementById("details-dialog");

const dialogContent =
    document.getElementById("dialog-content");


// ===================================
// POPULATE DOMAIN FILTER
// ===================================

function populateDomains() {

    const domains = [
        ...new Set(internships.map(item => item.domain))
    ];

    domains.forEach(domain => {

        const option = document.createElement("option");

        option.value = domain;
        option.textContent = domain;

        domainFilter.appendChild(option);

    });

}


// ===================================
// CREATE INTERNSHIP CARD
// ===================================

function createCard(item) {

    const card = document.createElement("article");

    card.className = "internship-card";

    const top = document.createElement("div");
    top.className = "card-top";

    const domain = document.createElement("span");
    domain.className = "domain-tag";
    domain.textContent = item.domain;

    const mode = document.createElement("span");
    mode.className = "mode-tag";
    mode.textContent = item.mode;

    top.append(domain, mode);


    const title = document.createElement("h3");
    title.textContent = item.title;

    const meta = document.createElement("p");
    meta.className = "card-meta";

    meta.textContent =
        `${item.location} | ${item.id}`;


    // Display skills

    const skillList = document.createElement("div");

    skillList.className = "skill-list";

    item.skills.forEach(skillName => {

        const skill = document.createElement("span");

        skill.className = "skill";

        skill.textContent = skillName;

        skillList.appendChild(skill);

    });


    // Card bottom section

    const bottom = document.createElement("div");

    bottom.className = "card-bottom";

    const openings = document.createElement("span");

    openings.className = "openings";

    openings.textContent =
        `${item.openings} Opening(s)`;


    const detailsButton =
        document.createElement("button");

    detailsButton.className = "details-button";

    detailsButton.type = "button";

    detailsButton.textContent = "View Details";

    detailsButton.setAttribute(
        "aria-label",
        `View details for ${item.title}`
    );

    detailsButton.addEventListener("click", () => {

        showDetails(item);

    });


    bottom.append(openings, detailsButton);


    card.append(
        top,
        title,
        meta,
        skillList,
        bottom
    );

    return card;

}


// ===================================
// DISPLAY INTERNSHIP DETAILS
// ===================================

function showDetails(item) {

    dialogContent.replaceChildren();

    const title = document.createElement("h2");

    title.id = "dialog-title";

    title.textContent = item.title;


    const information = document.createElement("p");

    information.textContent =
        `Domain: ${item.domain} | Mode: ${item.mode}`;


    const location = document.createElement("p");

    location.textContent =
        `Location: ${item.location}`;


    const description = document.createElement("p");

    description.textContent = item.description;


    const skills = document.createElement("p");

    skills.textContent =
        "Required Skills: " + item.skills.join(", ");


    const note = document.createElement("p");

    note.textContent =
        "This is a fictional sample internship listing.";


    dialogContent.append(
        title,
        information,
        location,
        description,
        skills,
        note
    );

    dialog.showModal();

}


// ===================================
// SEARCH AND FILTER FUNCTION
// ===================================

function renderInternships() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedDomain =
        domainFilter.value;

    const selectedMode =
        modeFilter.value;


    // Filter internship records

    const filteredInternships =
        internships.filter(item => {

            const searchableText = [

                item.title,
                item.domain,
                item.location,
                item.mode,
                ...item.skills

            ].join(" ").toLowerCase();


            const matchesSearch =
                searchableText.includes(searchValue);


            const matchesDomain =
                selectedDomain === "all" ||
                item.domain === selectedDomain;


            const matchesMode =
                selectedMode === "all" ||
                item.mode === selectedMode;


            return (
                matchesSearch &&
                matchesDomain &&
                matchesMode
            );

        });


    // Clear old cards

    grid.replaceChildren();


    // Update result count

    resultCount.textContent =
        `${filteredInternships.length} internship(s) found`;


    // Empty state

    if (filteredInternships.length === 0) {

        const empty = document.createElement("div");

        empty.className = "empty-state";

        const heading = document.createElement("h3");

        heading.textContent = "No Internships Found";

        const message = document.createElement("p");

        message.textContent =
            "Try another keyword or clear your filters.";

        empty.append(heading, message);

        grid.appendChild(empty);

        return;

    }


    // Display filtered cards

    filteredInternships.forEach(item => {

        grid.appendChild(createCard(item));

    });

}


// ===================================
// ERROR STATE
// ===================================

function showError() {

    grid.replaceChildren();

    resultCount.textContent =
        "Unable to load internships.";

    const error = document.createElement("div");

    error.className = "error-state";

    const heading = document.createElement("h3");

    heading.textContent = "Something went wrong";

    const message = document.createElement("p");

    message.textContent =
        "Please try loading the internship list again.";

    const retry = document.createElement("button");

    retry.className = "retry-button";

    retry.type = "button";

    retry.textContent = "Try Again";

    retry.addEventListener("click", loadInternships);

    error.append(heading, message, retry);

    grid.appendChild(error);

}


// ===================================
// LOAD INTERNSHIPS
// ===================================

function loadInternships() {

    grid.setAttribute("aria-busy", "true");

    resultCount.textContent =
        "Loading internships...";

    grid.replaceChildren();

    try {

        if (!Array.isArray(internships)) {

            throw new Error("Invalid internship data");

        }

        populateDomains();

        renderInternships();

        grid.setAttribute("aria-busy", "false");

    }

    catch (error) {

        console.error(error);

        grid.setAttribute("aria-busy", "false");

        showError();

    }

}


// ===================================
// EVENT LISTENERS
// ===================================

// Search while typing

searchInput.addEventListener(
    "input",
    renderInternships
);


// Filter by domain

domainFilter.addEventListener(
    "change",
    renderInternships
);


// Filter by work mode

modeFilter.addEventListener(
    "change",
    renderInternships
);


// Clear all filters

filterForm.addEventListener("reset", () => {

    setTimeout(renderInternships, 0);

});


// Close details dialog

document
    .getElementById("close-dialog")
    .addEventListener("click", () => {

        dialog.close();

    });


// Close dialog when clicking outside

dialog.addEventListener("click", event => {

    if (event.target === dialog) {

        dialog.close();

    }

});


// ===================================
// START APPLICATION
// ===================================

loadInternships();
