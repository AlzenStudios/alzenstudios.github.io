const chapters = [
  { 
    title: "Getting Started", 
    file: "started.md",
    children: [
      {
        title: "Modules",
        file: "questions-about-modules.md"
      }
    ]
  },
  {
    title: "DynaWin.Windowing",
    children: [
      {
        title: "Introduction", 
        file: "docs/dynawin/windowing/introduction.md" 
      }
    ]
  },
];

const chapterMenu = document.getElementById('chapterMenu');
const contentArea = document.getElementById('content');

function parseMarkdown(md) {
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>');
}

async function loadMarkdown(file) {
  try {
    const res = await fetch(`docs/${file}`);
    const text = await res.text();
    contentArea.innerHTML = parseMarkdown(text);
  } catch (err) {
    contentArea.innerHTML = `<p>Error loading ${file}</p>`;
    console.error(err);
  }
}

// Recursive function to render chapters and subchapters
function renderChapterMenu(items, parent) {
  items.forEach(chapter => {
    const div = document.createElement('div');
    div.className = 'chapter-item';
    div.textContent = chapter.title;

    // Click to load content
    div.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('active'));
      div.classList.add('active');
      loadMarkdown(chapter.file);
    });

    // If there are children, create a submenu
    if (chapter.children && chapter.children.length > 0) {
      const submenu = document.createElement('div');
      submenu.className = 'submenu';
      renderChapterMenu(chapter.children, submenu);
      div.appendChild(submenu);

      // Toggle submenu open/close on click
      div.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        div.classList.toggle('open');
      });
    }

    parent.appendChild(div);
  });
}

// Render the entire menu
chapterMenu.innerHTML = '';
renderChapterMenu(chapters, chapterMenu);

// Load first chapter by default
const firstChapter = chapterMenu.querySelector('.chapter-item');
firstChapter.classList.add('active');
loadMarkdown(chapters[0].file);
