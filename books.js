// =========================================
// books.js, "Books I've read" section
// =========================================
// ✏️  EDIT THIS LIST: swap titles, change topics, add a `rating` (1–5) and a
//     personal note in `blurb`. `topic` must match one of the TOPICS below.
//     Leave `rating` out (or null) and the stars stay hidden until you add one.
//     Leave `buy` empty and the button becomes an auto "find it online" search.
// =========================================

const TOPICS = [
  "Crime & mystery",
  "Fiction",
  "Big ideas",
  "Spiritual & mystic"
];

// A colour per topic, used for the book-cover backgrounds + chips.
const TOPIC_COLORS = {
  "Crime & mystery":    "#1B3A5C",
  "Fiction":            "#e11d48",
  "Big ideas":          "#d97706",
  "Spiritual & mystic": "#7c3aed"
};

const BOOKS = [
  {
    title: "Aghori",
    author: "",            // ✏️ add the author if you'd like
    topic: "Spiritual & mystic",
    rating: null,          // ✏️ your rating 1–5
    blurb: "A journey into the mysterious world of the Aghori, the ascetic mystics of the cremation grounds, and their confronting path beyond fear and duality."
  },
  {
    title: "Sam's Letters to Jennifer",
    author: "James Patterson",
    topic: "Fiction",
    rating: null,
    blurb: "A tender love story uncovered through a grandmother's hidden letters, read by Jennifer as she keeps vigil at her bedside."
  },
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    topic: "Big ideas",
    rating: null,
    blurb: "A sweeping history of humankind, from the cognitive revolution to the modern age, and how Homo sapiens came to rule the world."
  },
  {
    title: "Frost at Christmas",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "The first DI Jack Frost case: a missing choirgirl and a buried body test the scruffy, insubordinate detective over a bleak Denton Christmas."
  },
  {
    title: "A Touch of Frost",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Frost juggles a murdered teenager, an armed robbery and a missing pensioner, all with his trademark gallows humour."
  },
  {
    title: "Night Frost",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A poison-pen letter campaign, a possible serial killer and a flu-ravaged station push Frost to his limits."
  },
  {
    title: "Hard Frost",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A kidnapping, a child murder and a wave of crime converge on the overstretched Denton CID."
  },
  {
    title: "Winter Frost",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Missing girls and a killer on the loose as Frost battles both the case and his exasperated superiors."
  },
  {
    title: "A Killing Frost",
    author: "R.D. Wingfield",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Wingfield's final Frost novel, a string of grisly murders and a poisoning case keep Denton on edge."
  },
  {
    title: "First Frost",
    author: "James Henry",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A prequel: a young DS Frost in 1980s Denton, facing a missing girl and a decomposing body as his career begins."
  },
  {
    title: "Fatal Frost",
    author: "James Henry",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A body on the railway line and a kidnapping draw a still-green Frost deeper into Denton's dark side."
  },
  {
    title: "Morning Frost",
    author: "James Henry",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Frost grieves his wife while a severed hand and a daring bank raid keep Denton CID working flat out."
  },
  {
    title: "Frost at Midnight",
    author: "Danny Miller",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Frost returns in a later outing, a body turns up and a web of secrets unravels across 1980s Denton."
  },
  {
    title: "Mosaic",
    author: "Soheir Khashoggi",
    topic: "Fiction",
    rating: null,
    blurb: "A mother's desperate search after her children are abducted and taken across the world, a story of family, identity and resolve."
  },
  {
    title: "The Broker",
    author: "John Grisham",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A disgraced Washington power-broker is pardoned and quietly resettled in Italy, then left as bait to see which government kills him first."
  },
  {
    title: "Together is Better",
    author: "Simon Sinek",
    topic: "Big ideas",
    rating: null,
    blurb: "A small, illustrated parable about finding courage, leadership and the people worth walking with. A quick, hopeful read."
  },
  {
    title: "Pride & Prejudice",
    author: "Jane Austen",
    topic: "Fiction",
    rating: null,
    blurb: "Elizabeth Bennet and the proud Mr Darcy spar their way toward love in Austen's sharp, enduring comedy of manners."
  },
  {
    title: "The Fault in Our Stars",
    author: "John Green",
    topic: "Fiction",
    rating: null,
    blurb: "Two teenagers who meet at a cancer support group fall in love and chase a reclusive author, funny, aching and unforgettable."
  },
  {
    title: "Wuthering Heights",
    author: "Emily Brontë",
    topic: "Fiction",
    rating: null,
    blurb: "The wild, destructive passion between Catherine and Heathcliff haunts the Yorkshire moors across two generations."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    topic: "Fiction",
    rating: null,
    blurb: "Jay Gatsby's doomed pursuit of Daisy and the American Dream, told through Nick Carraway amid Jazz Age glamour and rot."
  },
  {
    title: "Love Story",
    author: "Erich Segal",
    topic: "Fiction",
    rating: null,
    blurb: "A privileged Harvard boy and a sharp-tongued working-class girl fall in love against the odds in this famously heartbreaking classic."
  },
  {
    title: "The Path",
    author: "Michael Puett & Christine Gross-Loh",   // ✏️ confirm, there are a few books called "The Path"
    topic: "Big ideas",
    rating: null,
    blurb: "What classical Chinese philosophers can teach us about living a good life, one small, deliberate act at a time."
  },
  {
    title: "The Perfect Us",
    author: "Durjoy Datta",
    topic: "Fiction",
    rating: null,
    blurb: "An Indian romance about a couple whose picture-perfect relationship unravels, and the messy work of finding their way back."
  },
  {
    title: "Eleven Minutes",
    author: "Paulo Coelho",
    topic: "Fiction",
    rating: null,
    blurb: "A young Brazilian woman's journey through disillusionment and desire toward real love and self-worth."
  },
  {
    title: "I Still Think About You",
    author: "Arpit Vageria",   // ✏️ confirm the author
    topic: "Fiction",
    rating: null,
    blurb: "A bittersweet Indian romance about first love, loss, and the memories that refuse to fade."
  },
  {
    title: "31 Dream Street",
    author: "Lisa Jewell",
    topic: "Fiction",
    rating: null,
    blurb: "A ramshackle London lodging house and its oddball tenants quietly change one another's lives."
  },
  {
    title: "Turtles All the Way Down",
    author: "John Green",
    topic: "Fiction",
    rating: null,
    blurb: "Sixteen-year-old Aza investigates a missing billionaire while battling her own spiralling anxiety and OCD."
  },
  {
    title: "Blood Memory",
    author: "Greg Iles",   // ✏️ confirm, there are a couple of books by this title
    topic: "Crime & mystery",
    rating: null,
    blurb: "A forensic dentist's buried childhood trauma resurfaces as she hunts a killer through New Orleans."
  },
  {
    title: "The Last Secret of the Deverills",
    author: "Santa Montefiore",
    topic: "Fiction",
    rating: null,
    blurb: "The sweeping finale of the Deverill saga, family secrets, love and an Irish castle across the decades."
  },
  {
    title: "Sleep No More",
    author: "Greg Iles",
    topic: "Crime & mystery",
    rating: null,
    blurb: "A married man is pulled into a dangerous obsession with a woman who seems to know his every secret, a Southern psychological thriller."
  },
  {
    title: "And Then There Were None",
    author: "Agatha Christie",
    topic: "Crime & mystery",
    rating: null,
    blurb: "Ten strangers lured to an island are killed one by one, matching a sinister nursery rhyme, Christie's best-selling masterpiece."
  }
];

// ── Slug (must match the cover filenames in photos/books/) ──
function slugify(t) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

// ── Amazon link for a book (opens an Amazon search) ──
function buyLink(b) {
  if (b.buy) return b.buy;
  const q = b.author ? b.title + " " + b.author : b.title;
  return "https://www.amazon.in/s?k=" + encodeURIComponent(q);
}

// ── Star rating markup (empty string when unrated) ──
function stars(n) {
  if (n == null) return '';
  let html = '<span class="stars" aria-label="' + n + ' out of 5">';
  for (let i = 1; i <= 5; i++) {
    html += '<svg class="star ' + (i <= n ? 'on' : 'off') + '" width="15" height="15" viewBox="0 0 24 24"><use href="#icon-star-solid" /></svg>';
  }
  return html + '</span>';
}

// ── Book cover: real image if we have one, typographic fallback if not.
//    (The <img> removes itself on error → the styled cover shows through.) ──
function cover(b) {
  const c = TOPIC_COLORS[b.topic] || "#1a1a1a";
  const src = "photos/books/" + slugify(b.title) + ".jpg";
  return (
    '<div class="book-cover" style="--cv:' + c + '">' +
      '<span class="bc-spine"></span>' +
      '<span class="bc-title">' + b.title + '</span>' +
      (b.author ? '<span class="bc-author">' + b.author + '</span>' : '') +
      '<img class="bc-img" src="' + src + '" alt="' + b.title + ' cover" loading="lazy" ' +
        'onerror="this.remove()">' +
    '</div>'
  );
}

(function () {
  const grid   = document.getElementById('booksGrid');
  const chips  = document.getElementById('bookChips');
  const count  = document.getElementById('booksCount');
  const modal  = document.getElementById('bookModal');
  const bmBody = document.getElementById('bmBody');
  if (!grid || !chips) return;

  let filter = "All";

  if (count) {
    count.textContent = BOOKS.length + " books · " + TOPICS.length + " topics";
  }

  // ── Chips ──
  function renderChips() {
    const all = ["All", ...TOPICS];
    chips.innerHTML = all.map(t => {
      const n = t === "All" ? BOOKS.length : BOOKS.filter(b => b.topic === t).length;
      const active = t === filter ? ' active' : '';
      const color = t === "All" ? '' : ' style="--cv:' + (TOPIC_COLORS[t] || '#1a1a1a') + '"';
      return '<button class="book-chip' + active + '"' + color + ' data-topic="' + t + '">' +
               t + '<span class="chip-n">' + n + '</span>' +
             '</button>';
    }).join('');
    chips.querySelectorAll('.book-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        filter = btn.dataset.topic;
        renderChips();
        renderGrid();
      });
    });
  }

  // ── Grid: each book links straight to Amazon ──
  function renderGrid() {
    const list = filter === "All" ? BOOKS : BOOKS.filter(b => b.topic === filter);
    grid.innerHTML = list.map((b, i) => {
      const note = b.author ? b.title + ', ' + b.author : b.title;
      return (
        '<a class="book-card fade-up" style="animation-delay:' + (i * 0.04).toFixed(2) + 's" ' +
           'href="' + buyLink(b) + '" target="_blank" rel="noopener noreferrer" ' +
           'title="' + note.replace(/"/g, '&quot;') + ' · view on Amazon">' +
          cover(b) +
          '<span class="book-meta">' +
            '<span class="book-title">' + b.title + '</span>' +
            (b.author ? '<span class="book-author">' + b.author + '</span>' : '') +
            stars(b.rating) +
          '</span>' +
        '</a>'
      );
    }).join('');
    grid.querySelectorAll('.book-card').forEach(card => card.classList.add('visible'));
  }

  renderChips();
  renderGrid();
})();
