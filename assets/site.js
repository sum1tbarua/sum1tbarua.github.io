const button = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');
button?.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =====================================================
   NEWS SORTING AND MORE BUTTON
   ===================================================== */

const newsList = document.querySelector("#news-list");
const newsMoreButton = document.querySelector("#news-more-button");
const newsMoreLabel = newsMoreButton?.querySelector(".news-more-label");
const newsMoreArrow = newsMoreButton?.querySelector(".news-more-arrow");

if (newsList && newsMoreButton) {
  const visibleNewsCount = 5;

  // Sort news automatically from newest to oldest.
  const sortedNewsRows = Array.from(
    newsList.querySelectorAll(".news-row")
  ).sort((firstItem, secondItem) => {
    const firstDate =
      firstItem.querySelector("time")?.getAttribute("datetime") || "";

    const secondDate =
      secondItem.querySelector("time")?.getAttribute("datetime") || "";

    return new Date(secondDate) - new Date(firstDate);
  });

  // Reinsert the rows in chronological order.
  sortedNewsRows.forEach((row) => newsList.appendChild(row));

  if (sortedNewsRows.length > visibleNewsCount) {
    const olderNewsRows = sortedNewsRows.slice(visibleNewsCount);

    olderNewsRows.forEach((row) => {
      row.classList.add("news-hidden");
    });

    newsMoreButton.hidden = false;

    newsMoreButton.addEventListener("click", () => {
      const isExpanded =
        newsMoreButton.getAttribute("aria-expanded") === "true";

      olderNewsRows.forEach((row) => {
        row.classList.toggle("news-hidden", isExpanded);
      });

      newsMoreButton.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      if (newsMoreLabel) {
        newsMoreLabel.textContent = isExpanded
          ? "More news"
          : "Show less";
      }

      if (newsMoreArrow) {
        newsMoreArrow.textContent = isExpanded ? "↓" : "↑";
      }
    });
  }
}

/* =====================================================
   SHOW MORE PUBLICATIONS
   ===================================================== */

const publicationList = document.querySelector("#publication-list");
const publicationMoreButton = document.querySelector(
  "#publication-more-button"
);

if (publicationList && publicationMoreButton) {
  const visiblePublicationCount = 5;

  const publicationEntries = Array.from(
    publicationList.querySelectorAll(".publication")
  );

  const hiddenPublications = publicationEntries.slice(
    visiblePublicationCount
  );

  const publicationMoreLabel = publicationMoreButton.querySelector(
    ".publication-more-label"
  );

  const publicationMoreCount = publicationMoreButton.querySelector(
    ".publication-more-count"
  );

  const publicationMoreArrow = publicationMoreButton.querySelector(
    ".publication-more-arrow"
  );

  if (hiddenPublications.length > 0) {
    hiddenPublications.forEach((publication) => {
      publication.classList.add("publication-hidden");
    });

    publicationMoreCount.textContent =
      `(${hiddenPublications.length})`;

    publicationMoreButton.hidden = false;

    publicationMoreButton.addEventListener("click", () => {
      const isExpanded =
        publicationMoreButton.getAttribute("aria-expanded") === "true";

      hiddenPublications.forEach((publication) => {
        publication.classList.toggle(
          "publication-hidden",
          isExpanded
        );
      });

      publicationMoreButton.setAttribute(
        "aria-expanded",
        String(!isExpanded)
      );

      publicationMoreLabel.textContent = isExpanded
        ? "More publications"
        : "Show fewer";

      publicationMoreCount.textContent = isExpanded
        ? `(${hiddenPublications.length})`
        : "";

      publicationMoreArrow.textContent = isExpanded ? "↓" : "↑";
    });
  }
}

const copyrightYear = document.querySelector("#copyright-year");

if (copyrightYear) {
  copyrightYear.textContent = new Date().getFullYear();
}

const lastUpdatedElement = document.querySelector("#last-updated");

if (lastUpdatedElement) {
  const modifiedDate = new Date(document.lastModified);

  if (!Number.isNaN(modifiedDate.getTime())) {
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric"
    }).format(modifiedDate);

    const machineReadableDate = [
      modifiedDate.getFullYear(),
      String(modifiedDate.getMonth() + 1).padStart(2, "0")
    ].join("-");

    lastUpdatedElement.textContent = formattedDate;
    lastUpdatedElement.setAttribute(
      "datetime",
      machineReadableDate
    );
  }
}
