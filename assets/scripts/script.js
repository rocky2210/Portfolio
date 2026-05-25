const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");
const tabJumpButtons = document.querySelectorAll("[data-jump-tab]");

const setActiveTab = (tabName) => {
  tabButtons.forEach((btn) => btn.classList.remove("active"));
  tabContents.forEach((content) => content.classList.remove("active"));

  const activeButton = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  const activeContent = document.getElementById(`tab-${tabName}`);

  if (activeButton && activeContent) {
    activeButton.classList.add("active");
    activeContent.classList.add("active");
  }
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.tab;
    setActiveTab(tabName);
    document.getElementById(`tab-${tabName}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

tabJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const tabName = button.dataset.jumpTab;
    setActiveTab(tabName);
    document.getElementById(`tab-${tabName}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id.replace("tab-", "");
        setActiveTab(sectionId);
      }
    });
  },
  { threshold: 0.55 }
);

tabContents.forEach((section) => sectionObserver.observe(section));
