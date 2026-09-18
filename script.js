// Current year
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling and close Bootstrap navbar on mobile
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      const navbarCollapse =
        document.getElementById("mainNavbar");

      if (
        navbarCollapse &&
        navbarCollapse.classList.contains("show")
      ) {
        const bootstrapCollapse =
          bootstrap.Collapse.getOrCreateInstance(
            navbarCollapse
          );

        bootstrapCollapse.hide();
      }
    }
  });
});

// Enquiry form
const enquiryForm =
  document.getElementById("enquiryForm");

const formMessage =
  document.getElementById("formMessage");

enquiryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name =
    document.getElementById("name").value.trim();

  const mobile =
    document.getElementById("mobile").value.trim();

  const email =
    document.getElementById("email").value.trim();

  const course =
    document.getElementById("course").value;

  const message =
    document.getElementById("message").value.trim();

  if (!name || !mobile || !email || !course) {
    formMessage.innerHTML = `
      <div class="alert alert-danger mt-3">
        Please complete all required fields.
      </div>
    `;
    return;
  }

  const subject =
    encodeURIComponent(
      `Course Enquiry - ${course}`
    );

  const emailBody =
    encodeURIComponent(
`Dear V-Enlight Pharmacy Academy,

I would like to enquire about the following program:

Name: ${name}
Mobile: ${mobile}
Email: ${email}
Program: ${course}

Message:
${message}

Thank you.`
    );

  formMessage.innerHTML = `
    <div class="alert alert-success mt-3">
      Thank you, ${name}. Your email application will now open so that you can send your enquiry to V-Enlight Pharmacy Academy.
    </div>
  `;

  setTimeout(() => {
    window.location.href =
      `mailto:enlightpharmacy@gmail.com?subject=${subject}&body=${emailBody}`;
  }, 700);
});