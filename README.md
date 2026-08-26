# Muhammad Ahmad — Engineering Portfolio

A Swiss Minimalist, high-contrast dark mode personal portfolio website for **Muhammad Ahmad** (Electrical & Computer Engineering student at the University of British Columbia).

## 🚀 Live Preview & Pages
- **About (`index.html`)**: Personal overview, academic focus at UBC, and technical competencies matrix.
- **Experience (`experience.html`)**: Professional roles at Stryker, UBC AgroBot (Applied AI Team Lead), Yankai Group (Research Assistant), and academic coursework.
- **Projects (`projects.html`)**: Interactive showcase of 5 engineering projects with full hardware architectures, firmware design, technical metrics, and slots for images & video demos.
- **Contact (`contact.html`)**: Contact channels, one-click email copying with toast notification, and an interactive message launcher.

---

## 🛠️ Deploying to GitHub Pages (2 Minutes)

Since this site is built using standard, dependency-free HTML5, CSS3, and JavaScript, deploying to GitHub Pages requires **no build step**:

1. **Initialize Git & Commit**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```

2. **Link to your GitHub Repository**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/Sully2005/<your-repo-name>.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub.
   - Click **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
   - Your site will be live at `https://Sully2005.github.io/<your-repo-name>/` in ~60 seconds!

---

## 📁 Adding Your Images, Videos & Resume
- **Resume**: Save your official PDF as `assets/resume.pdf`.
- **Project Photos**: Place your photos in `assets/projects/` and update the `<img>` tags in `projects.html`.
- **Demos & Videos**: You can embed YouTube/Vimeo iframes, Google Drive preview links, or HTML5 `<video>` tags directly into the video containers in `projects.html`.
