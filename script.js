// JobConnect: sample job listings

const jobs = [
    {
        id: 1,
        title: "Junior Frontend Developer",
        company: "BrightTech",
        category: "Frontend Development",
        type: "Remote",
        salary: "₦150,000 - ₦250,000/month",
        icon: "💻",
        description: "Build responsive websites using HTML, CSS and JavaScript."
    },
    {
        id: 2,
        title: "Frontend Developer Intern",
        company: "CodeStart",
        category: "Frontend Development",
        type: "Remote",
        salary: "₦50,000 - ₦100,000/month",
        icon: "🚀",
        description: "Learn frontend development while working on practice projects."
    },
    {
        id: 3,
        title: "UI/UX Design Intern",
        company: "Pixel Studio",
        category: "UI/UX Design",
        type: "Hybrid",
        salary: "₦60,000 - ₦120,000/month",
        icon: "🎨",
        description: "Help design simple and user-friendly digital experiences."
    },
    {
        id: 4,
        title: "Junior Backend Developer",
        company: "ServerPro",
        category: "Backend Development",
        type: "Onsite",
        salary: "₦180,000 - ₦300,000/month",
        icon: "⚙️",
        description: "Assist with server-side programming and API development."
    },
    {
        id: 5,
        title: "React Developer Intern",
        company: "WebWorks",
        category: "Frontend Development",
        type: "Remote",
        salary: "₦70,000 - ₦130,000/month",
        icon: "⚛️",
        description: "Practise building user interfaces with React."
    },
    {
        id: 6,
        title: "Junior UI Designer",
        company: "Creative Labs",
        category: "UI/UX Design",
        type: "Onsite",
        salary: "₦120,000 - ₦200,000/month",
        icon: "🖌️",
        description: "Create interface layouts and design prototypes."
    }
];

const jobList = document.getElementById("job-list");
const searchInput = document.getElementById("search-input");
const typeFilter = document.getElementById("type-filter");
const categoryFilter = document.getElementById("category-filter");
const jobCount = document.getElementById("job-count");
const noJobs = document.getElementById("no-jobs");

const modal = document.getElementById("application-modal");
const closeModalButton = document.getElementById("close-modal");
const applicationForm = document.getElementById("application-form");

const selectedJob = document.getElementById("selected-job");
const jobTitleInput = document.getElementById("job-title");
const formMessage = document.getElementById("form-message");

const applicantName = document.getElementById("applicant-name");
const applicantEmail = document.getElementById("applicant-email");
const portfolioLink = document.getElementById("portfolio-link");
const applicantCV = document.getElementById("applicant-cv");

// Load demo applications from browser storage
let applications = [];

try {
    const savedApplications =
        JSON.parse(localStorage.getItem("jobconnectApplications"));

    if (Array.isArray(savedApplications)) {
        applications = savedApplications;
    }
} catch (error) {
    applications = [];
}

// Display jobs
function displayJobs(jobArray) {
    jobList.innerHTML = "";

    jobArray.forEach(function(job) {
        const card = document.createElement("article");
        card.className = "job-card";

        const icon = document.createElement("div");
        icon.className = "company-icon";
        icon.textContent = job.icon;

        const title = document.createElement("h3");
        title.textContent = job.title;

        const company = document.createElement("p");
        company.className = "company-name";
        company.textContent = job.company;

        const description = document.createElement("p");
        description.textContent = job.description;

        const tags = document.createElement("div");
        tags.className = "job-tags";

        [job.category, job.type].forEach(function(value) {
            const tag = document.createElement("span");
            tag.className = "job-tag";
            tag.textContent = value;
            tags.appendChild(tag);
        });

        const salary = document.createElement("p");
        salary.className = "job-salary";
        salary.textContent = job.salary;

        const button = document.createElement("button");
        button.className = "apply-button";
        button.textContent = "Apply Now";

        button.addEventListener("click", function() {
            openApplicationForm(job);
        });

        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(company);
        card.appendChild(description);
        card.appendChild(tags);
        card.appendChild(salary);
        card.appendChild(button);

        jobList.appendChild(card);
    });

    jobCount.textContent =
        jobArray.length + (jobArray.length === 1 ? " job found" : " jobs found");

    noJobs.hidden = jobArray.length !== 0;
}

// Search and filter jobs
function filterJobs() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredJobs = jobs.filter(function(job) {
        const matchesKeyword =
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword);

        const matchesType =
            selectedType === "all" || job.type === selectedType;

        const matchesCategory =
            selectedCategory === "all" ||
            job.category === selectedCategory;

        return matchesKeyword && matchesType && matchesCategory;
    });

    displayJobs(filteredJobs);
}

searchInput.addEventListener("input", filterJobs);
typeFilter.addEventListener("change", filterJobs);
categoryFilter.addEventListener("change", filterJobs);

// Open application form
function openApplicationForm(job) {
    applicationForm.reset();

    jobTitleInput.value = job.title;
    selectedJob.textContent = job.title + " at " + job.company;

    formMessage.textContent = "";
    modal.hidden = false;

    applicantName.focus();
}

// Close application form
function closeApplicationForm() {
    modal.hidden = true;
    applicationForm.reset();
    formMessage.textContent = "";
}

closeModalButton.addEventListener("click", closeApplicationForm);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeApplicationForm();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && !modal.hidden) {
        closeApplicationForm();
    }
});

// Submit a demo application
applicationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const cv = applicantCV.files[0];

    if (!cv) {
        formMessage.textContent = "Please select your CV.";
        return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (!allowedExtensions.test(cv.name)) {
        formMessage.textContent =
            "Please upload a PDF, DOC or DOCX file.";
        return;
    }

    // Limit selected CV to 5 MB
    if (cv.size > 5 * 1024 * 1024) {
        formMessage.textContent =
            "Your CV must be 5 MB or smaller.";
        return;
    }

    const application = {
        id: Date.now(),
        jobTitle: jobTitleInput.value,
        name: applicantName.value.trim(),
        email: applicantEmail.value.trim(),
        portfolio: portfolioLink.value.trim(),
        cvFileName: cv.name,
        date: new Date().toLocaleString()
    };

    applications.push(application);

    try {
        localStorage.setItem(
            "jobconnectApplications",
            JSON.stringify(applications)
        );
    } catch (error) {
        applications.pop();

        formMessage.textContent =
            "Could not save the demo application in this browser.";
        return;
    }

    formMessage.textContent =
        "Demo application saved successfully! we got yoir message we will soon contacted you.";

    applicationForm.reset();

    // Keep the confirmation visible briefly before closing
    setTimeout(function() {
        modal.hidden = true;
        formMessage.textContent = "";
    }, 2500);
});

// Show all jobs when the website opens
displayJobs(jobs);