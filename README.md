# My Portfolio Website

A modern, responsive portfolio website showcasing my work as a Junior Software Developer.

## Features

- Responsive design that works on all devices
- Modern UI with smooth animations
- Project showcase with hover effects
- Skills section
- Testimonials slider
- Contact form
- Professional spacing and layout

## Technologies Used

- HTML5
- CSS3 (including Flexbox and Grid)
- JavaScript
- Modern CSS animations and transitions
- Local SVG icons in `assets/icons.svg`

## Featured Work

- **[StudyAndGoGlobal](https://studyandgoglobal.com/)** — a study-abroad website for East African students, with university discovery, scholarship information, application guidance, and visa support.
- **Student Portal MVP** — a Flask and SQLite portal with student/admin accounts, course assignments, transcripts, documents, and manual bank-transfer reviews. Its client data and source remain private; visitors can request a walkthrough through the contact section.

These projects use the existing card grid, colors, spacing, and dark/light themes. The project counter updates from the number of cards. To edit a project, update its `data-project` card in `index.html`; to change an icon, update the matching symbol in `assets/icons.svg`.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/simakelvinpeter/portfolio.git
```

2. Serve the website locally so the shared SVG file loads correctly:

```bash
npm install
npm start
```

3. Open [the local portfolio](http://localhost:10000).

## Structure

- `index.html` - Main HTML file
- `style.css` - Main stylesheet
- `script.js` - Page interactions, theme switcher, navigation, and project counter
- `assets/icons.svg` - Reusable SVG symbols for project and highlight icons
- `assets/` - Images and other media files

## Contact

For any inquiries, please reach out at simaclaverly@gmail.com
