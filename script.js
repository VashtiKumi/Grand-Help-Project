document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".still-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    document.querySelectorAll(".still-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      }),
    )
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number")

    counters.forEach((counter) => {
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.floor(current).toLocaleString()
          requestAnimationFrame(updateCounter)
        } else {
          counter.textContent = target.toLocaleString()
        }
      }

      updateCounter()
    })
  }

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Trigger counter animation when stats section is visible
        if (entry.target.classList.contains("platform-stats")) {
          animateCounters()
        }
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(".feature-card, .path-card, .story-card, .stat-card")
  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  // Observe stats section
  const statsSection = document.querySelector(".platform-stats")
  if (statsSection) {
    observer.observe(statsSection)
  }

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Learning path interactions
  window.startLearningPath = (pathId) => {
    showNotification(`Starting learning path: ${pathId}`, "success")

    // Find the path card and update progress
    const pathCard = event.target.closest(".path-card")
    if (pathCard) {
      const progressFill = pathCard.querySelector(".progress-fill")
      const progressText = pathCard.querySelector(".path-progress span")
      const button = pathCard.querySelector(".path-btn")

      // Animate progress
      progressFill.style.width = "10%"
      progressText.textContent = "10% Complete"
      button.textContent = "Continue Learning"
      button.style.background = "linear-gradient(45deg, #27ae60, #2ecc71)"
    }
  }

  // Feature card hover effects
  const featureCards = document.querySelectorAll(".feature-card")
  featureCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Path card hover effects
  const pathCards = document.querySelectorAll(".path-card")
  pathCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Story card hover effects
  const storyCards = document.querySelectorAll(".story-card")
  storyCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Parallax effect for hero section (disabled on mobile for performance)
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const hero = document.querySelector(".hero")
      if (hero) {
        const rate = scrolled * -0.5
        hero.style.transform = `translateY(${rate}px)`
      }
    })
  }

  // Dynamic greeting based on time
  function setDynamicGreeting() {
    const hour = new Date().getHours()
    const greetingElement = document.querySelector(".dynamic-greeting")

    if (greetingElement) {
      let greeting = "Welcome to Grand Help"

      if (hour < 12) {
        greeting = "Good Morning, Farmer!"
      } else if (hour < 17) {
        greeting = "Good Afternoon, Farmer!"
      } else {
        greeting = "Good Evening, Farmer!"
      }

      greetingElement.textContent = greeting
    }
  }

  setDynamicGreeting()

  // Form validation helper
  window.validateForm = (formElement) => {
    const requiredFields = formElement.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.classList.add("error")
        isValid = false
      } else {
        field.classList.remove("error")
      }
    })

    return isValid
  }

  // Newsletter subscription (placeholder)
  const newsletterForms = document.querySelectorAll("#newsletterForm")
  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value

      if (email) {
        showNotification("Thank you for subscribing to our newsletter!", "success")
        this.reset()
      }
    })
  })

  // Search functionality (placeholder)
  const searchInputs = document.querySelectorAll('input[type="search"]')
  searchInputs.forEach((input) => {
    input.addEventListener("input", function () {
      const query = this.value.toLowerCase()
      // Implement search logic here
      console.log("Searching for:", query)
    })
  })

  // Lazy loading for images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))

  // Performance monitoring
  if ("performance" in window) {
    window.addEventListener("load", () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart
      console.log("Page load time:", loadTime + "ms")
    })
  }

  // Error handling for failed requests
  window.addEventListener("error", (e) => {
    console.error("JavaScript error:", e.error)
    // Could send error reports to analytics service
  })

  // Service worker registration (for PWA features)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered:", registration)
      })
      .catch((error) => {
        console.log("SW registration failed:", error)
      })
  }

  // Course filtering functionality
  initializeCourseFiltering()

  // Initialize resource tabs
  initializeResourceTabs()

  // Initialize calculators
  initializeCalculators()

  // Initialize research filters
  initializeResearchFilters()
})

// Course Filtering
function initializeCourseFiltering() {
  const categoryFilter = document.getElementById("categoryFilter")
  const levelFilter = document.getElementById("levelFilter")
  const priceFilter = document.getElementById("priceFilter")
  const searchInput = document.getElementById("courseSearch")
  const courseCards = document.querySelectorAll(".course-card")

  function filterCourses() {
    const categoryValue = categoryFilter?.value || "all"
    const levelValue = levelFilter?.value || "all"
    const priceValue = priceFilter?.value || "all"
    const searchValue = searchInput?.value.toLowerCase() || ""

    courseCards.forEach((card) => {
      const cardCategory = card.dataset.category
      const cardLevel = card.dataset.level
      const cardPrice = card.dataset.price
      const courseTitle = card.querySelector("h4")?.textContent.toLowerCase() || ""
      const courseDescription = card.querySelector("p")?.textContent.toLowerCase() || ""

      let showCard = true

      if (categoryValue !== "all" && cardCategory !== categoryValue) {
        showCard = false
      }

      if (levelValue !== "all" && cardLevel !== levelValue) {
        showCard = false
      }

      if (priceValue !== "all" && cardPrice !== priceValue) {
        showCard = false
      }

      if (searchValue && !courseTitle.includes(searchValue) && !courseDescription.includes(searchValue)) {
        showCard = false
      }

      if (showCard) {
        card.style.display = "block"
        card.style.animation = "fadeIn 0.5s ease"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Add event listeners
  if (categoryFilter) categoryFilter.addEventListener("change", filterCourses)
  if (levelFilter) levelFilter.addEventListener("change", filterCourses)
  if (priceFilter) priceFilter.addEventListener("change", filterCourses)
  if (searchInput) searchInput.addEventListener("input", filterCourses)
}

// Resource Tabs
function initializeResourceTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")
  const tabContents = document.querySelectorAll(".tab-content")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const targetCategory = this.dataset.category

      // Remove active class from all tabs and contents
      tabBtns.forEach((b) => b.classList.remove("active"))
      tabContents.forEach((c) => c.classList.remove("active"))

      // Add active class to clicked tab and corresponding content
      this.classList.add("active")
      document.getElementById(targetCategory)?.classList.add("active")
    })
  })
}

// Calculator Functions
function initializeCalculators() {
  // Calculator functions are defined globally for onclick handlers
}

function calculateSeedRate() {
  const cropType = document.getElementById("cropType")?.value
  const fieldSize = Number.parseFloat(document.getElementById("fieldSize")?.value) || 0
  const targetPop = Number.parseFloat(document.getElementById("targetPop")?.value) || 0

  if (fieldSize <= 0 || targetPop <= 0) {
    showCalculatorResult("seedRateResult", "Please enter valid field size and target population.")
    return
  }

  // Simplified seed rate calculation (seeds per pound varies by crop)
  const seedsPerPound = {
    corn: 1200,
    soybean: 2800,
    wheat: 14000,
    rice: 20000,
  }

  const seedsNeeded = targetPop * fieldSize
  const poundsNeeded = Math.ceil(seedsNeeded / (seedsPerPound[cropType] || 1200))

  showCalculatorResult(
    "seedRateResult",
    `For ${fieldSize} acres of ${cropType}:<br>
         Seeds needed: ${seedsNeeded.toLocaleString()}<br>
         Seed required: ${poundsNeeded} pounds<br>
         Rate: ${Math.ceil(poundsNeeded / fieldSize)} lbs/acre`,
  )
}

function calculateFertilizer() {
  const crop = document.getElementById("fertCrop")?.value
  const soilN = Number.parseFloat(document.getElementById("soilN")?.value) || 0
  const soilP = Number.parseFloat(document.getElementById("soilP")?.value) || 0
  const soilK = Number.parseFloat(document.getElementById("soilK")?.value) || 0

  // Simplified fertilizer recommendations (lbs/acre)
  const recommendations = {
    corn: { N: 150, P: 60, K: 120 },
    soybean: { N: 0, P: 40, K: 80 },
    wheat: { N: 100, P: 50, K: 60 },
  }

  const cropNeeds = recommendations[crop] || recommendations["corn"]

  // Calculate needed fertilizer based on soil test
  const nNeeded = Math.max(0, cropNeeds.N - soilN * 0.5)
  const pNeeded = Math.max(0, cropNeeds.P - soilP * 0.3)
  const kNeeded = Math.max(0, cropNeeds.K - soilK * 0.4)

  showCalculatorResult(
    "fertilizerResult",
    `Fertilizer recommendations for ${crop}:<br>
         Nitrogen (N): ${Math.round(nNeeded)} lbs/acre<br>
         Phosphorus (P₂O₅): ${Math.round(pNeeded)} lbs/acre<br>
         Potassium (K₂O): ${Math.round(kNeeded)} lbs/acre`,
  )
}

function calculateProfit() {
  const expectedYield = Number.parseFloat(document.getElementById("expectedYield")?.value) || 0
  const price = Number.parseFloat(document.getElementById("marketPrice")?.value) || 0
  const costs = Number.parseFloat(document.getElementById("totalCosts")?.value) || 0
  const acres = Number.parseFloat(document.getElementById("profitFieldSize")?.value) || 0

  if (expectedYield <= 0 || price <= 0 || acres <= 0) {
    showCalculatorResult("profitResult", "Please enter valid values for all fields.")
    return
  }

  const revenuePerAcre = expectedYield * price
  const profitPerAcre = revenuePerAcre - costs
  const totalRevenue = revenuePerAcre * acres
  const totalProfit = profitPerAcre * acres
  const profitMargin = ((profitPerAcre / revenuePerAcre) * 100).toFixed(1)

  showCalculatorResult(
    "profitResult",
    `Profit Analysis:<br>
         Revenue per acre: $${revenuePerAcre.toFixed(2)}<br>
         Profit per acre: $${profitPerAcre.toFixed(2)}<br>
         Total revenue: $${totalRevenue.toLocaleString()}<br>
         Total profit: $${totalProfit.toLocaleString()}<br>
         Profit margin: ${profitMargin}%`,
  )
}

function showCalculatorResult(elementId, message) {
  const resultElement = document.getElementById(elementId)
  if (resultElement) {
    resultElement.innerHTML = message
    resultElement.classList.add("show")
  }
}

// Research Filters
function initializeResearchFilters() {
  const categoryFilter = document.getElementById("researchCategory")
  const yearFilter = document.getElementById("researchYear")
  const researchPapers = document.querySelectorAll(".research-paper")

  function filterResearch() {
    const categoryValue = categoryFilter?.value || "all"
    const yearValue = yearFilter?.value || "all"

    researchPapers.forEach((paper) => {
      const paperCategory = paper.dataset.category
      const paperYear = paper.dataset.year

      let showPaper = true

      if (categoryValue !== "all" && paperCategory !== categoryValue) {
        showPaper = false
      }

      if (yearValue !== "all" && paperYear !== yearValue) {
        showPaper = false
      }

      paper.style.display = showPaper ? "block" : "none"
    })
  }

  if (categoryFilter) categoryFilter.addEventListener("change", filterResearch)
  if (yearFilter) yearFilter.addEventListener("change", filterResearch)
}

// Course Functions
function enrollCourse(courseId) {
  showNotification(`Processing enrollment for ${courseId}...`, "info")

  setTimeout(() => {
    showNotification("Successfully enrolled! Welcome to the course.", "success")
  }, 2000)
}

function previewCourse(courseId) {
  showNotification(`Loading preview for ${courseId}...`, "info")

  setTimeout(() => {
    showNotification("Course preview feature coming soon!", "info")
  }, 1000)
}

// Resource Functions
function downloadResource(filename) {
  showNotification(`Downloading ${filename}...`, "info")

  // Simulate download progress
  let progress = 0
  const interval = setInterval(() => {
    progress += 20
    if (progress <= 100) {
      showNotification(`Downloading ${filename}... ${progress}%`, "info")
    } else {
      clearInterval(interval)
      showNotification(`${filename} downloaded successfully!`, "success")
    }
  }, 500)
}

function viewPaper(paperId) {
  showNotification(`Opening abstract for ${paperId}...`, "info")

  setTimeout(() => {
    showNotification("Paper abstract opened in new window.", "success")
  }, 1000)
}

function downloadPaper(filename) {
  showNotification(`Downloading research paper: ${filename}...`, "info")

  setTimeout(() => {
    showNotification("Research paper downloaded successfully!", "success")
  }, 2000)
}

// Notification System
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  let icon = "check-circle"
  if (type === "error") icon = "exclamation-triangle"
  if (type === "info") icon = "info-circle"
  if (type === "warning") icon = "exclamation-triangle"

  notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background: none; border: none; color: inherit; margin-left: 1rem; cursor: pointer; font-size: 1.2rem;">×</button>
    `

  // Add notification styles if not already present
  if (!document.querySelector("#notification-styles")) {
    const styles = document.createElement("style")
    styles.id = "notification-styles"
    styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                color: white;
                display: flex;
                align-items: center;
                z-index: 3000;
                animation: slideInRight 0.3s ease;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                max-width: 400px;
                backdrop-filter: blur(10px);
            }
            .notification-success { 
                background: linear-gradient(45deg, #4CAF50, #81C784); 
            }
            .notification-error { 
                background: linear-gradient(45deg, #f44336, #ef5350); 
            }
            .notification-info { 
                background: linear-gradient(45deg, #2196F3, #64B5F6); 
            }
            .notification-warning { 
                background: linear-gradient(45deg, #FF9800, #FFB74D); 
            }
            .notification i {
                margin-right: 0.5rem;
                font-size: 1.2rem;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `
    document.head.appendChild(styles)
  }

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideInRight 0.3s ease reverse"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

// Utility function for loading states
function setLoadingState(element, isLoading) {
  if (isLoading) {
    element.classList.add("loading")
    element.disabled = true
    const originalText = element.textContent
    element.dataset.originalText = originalText
    element.innerHTML = '<span class="spinner"></span>Loading...'
  } else {
    element.classList.remove("loading")
    element.disabled = false
    element.textContent = element.dataset.originalText || "Submit"
  }
}

// Utility function for form handling
function handleFormSubmission(formElement, submitUrl, successMessage) {
  const formData = new FormData(formElement)
  const submitButton = formElement.querySelector('button[type="submit"]')

  setLoadingState(submitButton, true)

  // Simulate API call (replace with actual fetch in production)
  setTimeout(() => {
    setLoadingState(submitButton, false)
    showNotification(successMessage, "success")
    formElement.reset()
  }, 2000)
}

// Global navigation helper
function navigateTo(page) {
  window.location.href = page
}

// Global search function
function performSearch(query) {
  if (query.trim()) {
    showNotification(`Searching for: ${query}`, "info")
    // Implement actual search logic here
    console.log("Performing search for:", query)
  }
}

// Theme toggle (for future dark mode implementation)
function toggleTheme() {
  document.body.classList.toggle("dark-theme")
  const isDark = document.body.classList.contains("dark-theme")
  localStorage.setItem("theme", isDark ? "dark" : "light")
}

// Initialize theme from localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
  }
}

// Call theme initialization
initializeTheme()

// Export functions for use in other scripts
window.GrandHelp = {
  showNotification,
  setLoadingState,
  handleFormSubmission,
  navigateTo,
  performSearch,
  toggleTheme,
  enrollCourse,
  previewCourse,
  downloadResource,
  viewPaper,
  downloadPaper,
  calculateSeedRate,
  calculateFertilizer,
  calculateProfit,
}
