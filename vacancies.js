

/* ─────────────────────────────────────────────────────────────
   SECTION 1 — JOB DATA ARRAY
   ─────────────────────────────────────────────────────────────
   Every job object must contain:
     id        — unique integer; used by openModal() to find the job
     featured  — boolean; adds star badge and always-visible gold bar
     category  — string key for the Category filter:
                   'security' | 'ops' | 'intel' | 'admin'
     locKey    — string key for the Location filter:
                   'london' | 'birmingham' | 'manchester' | 'staffordshire'
     typeKey   — string key for the Job Type filter:
                   'full-time' | 'part-time' | 'contract'
     title     — display name of the role (shown on card + modal)
     location  — full human-readable location (shown on card + modal)
     type      — display employment type (shown on card badge + modal)
     salary    — salary or day-rate range string
     badge     — CSS class for the category colour badge
     badgeLabel— text inside the category badge
     indeed    — URL for the "Apply on Indeed" button (deep-link search)
     desc      — one-paragraph role description (shown in modal)
     requirements — string[] of bullet points (shown in modal)
     duties       — string[] of bullet points (shown in modal)

   ── STATUS FIELD (controls availability display) ──────────────
     status    — 'active' | 'filled' | 'expired'
                   'active'  = role is open and accepting applications
                   'filled'  = role has been successfully recruited
                   'expired' = listing has passed its closing date
                 Cards with 'filled' or 'expired' are rendered greyed-out
                 with a status badge and no clickable action buttons.
                 They are EXCLUDED from the live vacancy count.
                 When ALL jobs are non-active, the holding banner
                 replaces the filter panel entirely.

   HOW TO MANAGE ROLES:
     — To mark a role filled:   change status to 'filled'
     — To mark a role expired:  change status to 'expired'
     — To re-open a role:       change status back to 'active'
     — To hide completely:      remove the object from the array
   ───────────────────────────────────────────────────────────── */
const jobs = [
  /* ── LONDON ── */
  {
    id: 1, featured: true,
    status: 'active',   /* OPEN — accepting applications */
    category: 'security', locKey: 'london', typeKey: 'full-time',
    title: 'Senior Security Supervisor',
    location: 'London, City of London', type: 'Full-Time',
    salary: '£32,000 – £38,000 p.a.',
    badge: 'badge-security', badgeLabel: 'Security',
    indeed: 'https://www.indeed.co.uk/jobs?q=senior+security+supervisor&l=London',
    desc: 'Lead and manage a team of security officers across multiple client sites in the City of London. Responsible for daily briefings, incident reporting, and client liaison.',
    requirements: ['Valid SIA Door Supervisor or Security Guard licence','Minimum 3 years supervisory experience','Strong written and verbal communication skills','Proficient in incident reporting software','First Aid certificate (desirable)'],
    duties: ['Supervise and coordinate officer rotas','Conduct site risk assessments','Liaise with police and emergency services','Produce detailed daily incident logs','Train and mentor junior officers']
  },
  {
    id: 2, featured: false,
    status: 'filled',   /* FILLED — position successfully recruited, shown greyed-out */
    category: 'security', locKey: 'london', typeKey: 'contract',
    title: 'Close Protection Officer (CPO)',
    location: 'London & Nationwide', type: 'Contract',
    salary: '£450 – £650 per day',
    badge: 'badge-security', badgeLabel: 'Security',
    indeed: 'https://www.indeed.co.uk/jobs?q=close+protection+officer&l=London',
    desc: 'Provide close protection services to high-profile individuals, executives, and VIP clients. Assignments may require national or international travel.',
    requirements: ['SIA Close Protection licence (essential)','Level 3 or 4 Close Protection qualification','First Aid / Trauma qualification','Advanced driving licence preferred','SC / DV clearance advantageous'],
    duties: ['Personal protection of assigned principals','Advance reconnaissance and route planning','Vehicle and venue security assessments','Threat and risk assessment reporting']
  },
  {
    id: 10, featured: false,
    status: 'active',   /* OPEN — accepting applications */
    category: 'ops', locKey: 'london', typeKey: 'full-time',
    title: 'Control Room Supervisor',
    location: 'London, South Bank', type: 'Full-Time',
    salary: '£33,000 – £39,000 p.a.',
    badge: 'badge-ops', badgeLabel: 'Operations',
    indeed: 'https://www.indeed.co.uk/jobs?q=control+room+supervisor+security&l=London',
    desc: 'Lead a team of CCTV and radio operators in a 24/7 control room, overseeing response coordination across all London client sites.',
    requirements: ['SIA CCTV Operator licence','3+ years control room experience','Strong leadership under pressure','Availability for nights and weekends'],
    duties: ['Supervise control room operators on shift','Coordinate security responses across all sites','Produce KPI reports for senior management','Manage escalation of critical incidents']
  },

  /* ── BIRMINGHAM ── */
  {
    id: 3, featured: false,
    status: 'active',   /* OPEN — accepting applications */
    category: 'ops', locKey: 'birmingham', typeKey: 'full-time',
    title: 'CCTV Operator & Control Room Officer',
    location: 'Birmingham, West Midlands', type: 'Full-Time',
    salary: '£24,000 – £28,000 p.a.',
    badge: 'badge-ops', badgeLabel: 'Operations',
    indeed: 'https://www.indeed.co.uk/jobs?q=CCTV+operator+security&l=Birmingham',
    desc: 'Monitor and manage CCTV systems across our Birmingham control room, responding to alerts and coordinating with deployed officers in real time.',
    requirements: ['CCTV Operator SIA licence (essential)','Experience with CCTV management systems','Calm under pressure','Strong observational skills'],
    duties: ['Monitor live CCTV feeds across multiple sites','Log and report all incidents promptly','Communicate with on-site officers via radio','Coordinate emergency responses']
  },
  {
    id: 4, featured: false,
    status: 'expired',  /* EXPIRED — listing closed, shown greyed-out */
    category: 'security', locKey: 'birmingham', typeKey: 'part-time',
    title: 'Security Officer – Corporate Sites',
    location: 'Birmingham, West Midlands', type: 'Part-Time',
    salary: '£14.50 – £16.00 per hour',
    badge: 'badge-security', badgeLabel: 'Security',
    indeed: 'https://www.indeed.co.uk/jobs?q=corporate+security+officer&l=Birmingham',
    desc: 'Provide professional security at prestigious corporate client sites across Birmingham. A smart, professional manner is essential for this client-facing role.',
    requirements: ['Valid SIA Security Guard licence','Smart, professional appearance','Customer-facing experience preferred','Reliable and punctual'],
    duties: ['Access control and visitor management','Regular patrols of assigned premises','Respond to alarms and incidents','Compile end-of-shift reports']
  },

  /* ── MANCHESTER ── */
  {
    id: 5, featured: false,
    status: 'active',   /* OPEN — accepting applications */
    category: 'security', locKey: 'manchester', typeKey: 'full-time',
    title: 'Security Officer – Retail & Events',
    location: 'Manchester, Greater Manchester', type: 'Full-Time',
    salary: '£26,000 – £30,000 p.a.',
    badge: 'badge-security', badgeLabel: 'Security',
    indeed: 'https://www.indeed.co.uk/jobs?q=retail+security+officer&l=Manchester',
    desc: 'Deliver high-quality security at retail complexes and major events across Greater Manchester, ensuring public safety and client satisfaction.',
    requirements: ['Valid SIA Door Supervisor licence','Experience in retail or events security','Excellent interpersonal skills','Ability to work varied shift patterns'],
    duties: ['Patrol and secure retail or event premises','Conduct bag searches per policy','Manage crowd control and entry','Respond to and document all incidents']
  },
  {
    id: 6, featured: false,
    status: 'filled',   /* FILLED — position successfully recruited, shown greyed-out */
    category: 'ops', locKey: 'manchester', typeKey: 'contract',
    title: 'Operations Manager – North West',
    location: 'Manchester / Remote Hybrid', type: 'Contract',
    salary: '£400 – £500 per day',
    badge: 'badge-ops', badgeLabel: 'Operations',
    indeed: 'https://www.indeed.co.uk/jobs?q=operations+manager+security&l=Manchester',
    desc: 'Oversee contract delivery across the North West portfolio, ensuring client satisfaction, officer welfare, and full regulatory compliance.',
    requirements: ['5+ years security management experience','Strong client relationship skills','Knowledge of SIA regulations and BS 7499','Budget management experience','Full UK driving licence'],
    duties: ['Manage delivery across multiple contracts','Conduct regular client site reviews','Oversee officer scheduling','Ensure regulatory and contractual compliance']
  },

  /* ── STAFFORDSHIRE ── */
  {
    id: 7, featured: true,
    status: 'active',   /* OPEN — accepting applications */
    category: 'intel', locKey: 'staffordshire', typeKey: 'full-time',
    title: 'Intelligence Analyst – Threat Assessment',
    location: 'Staffordshire', type: 'Full-Time',
    salary: '£38,000 – £48,000 p.a.',
    badge: 'badge-intel', badgeLabel: 'Intelligence',
    indeed: 'https://www.indeed.co.uk/jobs?q=intelligence+analyst+security&l=Staffordshire',
    desc: 'Analyse open-source intelligence (OSINT) and threat data to support operational planning and risk management for clients across the Midlands.',
    requirements: ['Degree in Security Studies, Intelligence, or related field','Minimum SC security clearance (or eligible)','OSINT tools proficiency','Strong report writing skills'],
    duties: ['Produce daily threat intelligence briefings','Conduct OSINT research and analysis','Assess risk levels for client sites','Present findings to senior management']
  },
  {
    id: 8, featured: false,
    status: 'active',   /* OPEN — accepting applications */
    category: 'security', locKey: 'staffordshire', typeKey: 'full-time',
    title: 'Security Patrol Officer – Industrial Sites',
    location: 'Staffordshire', type: 'Full-Time',
    salary: '£27,000 – £31,000 p.a.',
    badge: 'badge-security', badgeLabel: 'Security',
    indeed: 'https://www.indeed.co.uk/jobs?q=security+patrol+officer+industrial&l=Staffordshire',
    desc: 'Patrol and protect high-value industrial and logistics facilities across Staffordshire on rotating shifts, reporting directly to the site supervisor.',
    requirements: ['Valid SIA Security Guard licence','Full clean UK driving licence (essential)','Industrial/logistics security experience preferred','Physically fit for extensive patrols'],
    duties: ['Vehicle and foot patrols of industrial premises','Gate entry control and vehicle logging','Alarm response and first-responder duties','Produce written shift reports']
  },
  {
    id: 9, featured: false,
    status: 'active',   /* OPEN — accepting applications */
    category: 'admin', locKey: 'staffordshire', typeKey: 'part-time',
    title: 'HR & Recruitment Officer',
    location: 'Staffordshire (Hybrid)', type: 'Part-Time',
    salary: '£22,000 – £26,000 pro rata',
    badge: 'badge-admin', badgeLabel: 'Admin',
    indeed: 'https://www.indeed.co.uk/jobs?q=HR+recruitment+officer+security&l=Staffordshire',
    desc: 'Support end-to-end recruitment, onboarding, and employee record management as our Staffordshire operations continue to grow.',
    requirements: ['CIPD Level 3 or working towards','Security sector recruitment experience (desirable)','Excellent organisational skills','Knowledge of DBS check procedures'],
    duties: ['Advertise and manage job vacancies','Screen applications and coordinate interviews','Conduct right-to-work and DBS checks','Maintain accurate employee records']
  }
];


/* ─────────────────────────────────────────────────────────────
   SECTION 2 — FILTER STATE OBJECT
   Stores the currently selected value for each filter dimension.
   'all' means that dimension is unfiltered (show everything).
   search: '' means no keyword filter is active.
   ───────────────────────────────────────────────────────────── */
const state = {
  cat:    'all',   /* Category filter  : all | security | ops | intel | admin */
  loc:    'all',   /* Location filter  : all | london | birmingham | manchester | staffordshire */
  type:   'all',   /* Job Type filter  : all | full-time | part-time | contract */
  search: ''       /* Keyword search   : empty string = no search active */
};

/* Human-readable labels used when building the chip pills in the results bar */
const filterLabels = {
  cat:  { security: '🛡 Security', ops: '⚙ Operations', intel: '🔍 Intelligence', admin: '📋 Admin' },
  loc:  { london: '📍 London', birmingham: '📍 Birmingham', manchester: '📍 Manchester', staffordshire: '📍 Staffordshire' },
  type: { 'full-time': '⏰ Full-Time', 'part-time': '🕐 Part-Time', contract: '📋 Contract' }
};


/* ─────────────────────────────────────────────────────────────
   SECTION 3 — setFilter(dimension, value, buttonEl)
   Called by every filter button's onclick attribute.
   Updates the correct state dimension, marks the button active,
   and re-runs applyFilters() to refresh the displayed job list.
   ───────────────────────────────────────────────────────────── */
function setFilter(dimension, value, btn) {
  /* 1. Update the matching state dimension */
  state[dimension] = value;

  /* 2. Remove .active from all sibling buttons in the same .filter-row */
  btn.closest('.filter-row')
     .querySelectorAll('.filter-btn')
     .forEach(b => b.classList.remove('active'));

  /* 3. Mark the clicked button as active */
  btn.classList.add('active');

  /* 4. Re-render with updated filters */
  applyFilters();
}


/* ─────────────────────────────────────────────────────────────
   SECTION 4 — clearAllFilters()
   Resets every state dimension back to default.
   Also resets the search input text and re-activates the first
   button (All) in each filter row. Then re-renders.
   ───────────────────────────────────────────────────────────── */
function clearAllFilters() {
  /* Reset state */
  state.cat    = 'all';
  state.loc    = 'all';
  state.type   = 'all';
  state.search = '';

  /* Clear the search text input */
  document.getElementById('searchInput').value = '';

  /* Re-activate the first button in every filter row */
  document.querySelectorAll('.filter-row').forEach(row => {
    const btns = row.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (btns.length) btns[0].classList.add('active');
  });

  applyFilters();
}


/* ─────────────────────────────────────────────────────────────
   SECTION 5 — applyFilters()
   The central filter function. Reads current state + search input,
   applies all four filter dimensions to the jobs array, separates
   results into active vs unavailable (filled/expired), then:
     • If NO jobs are active at all (globally, ignoring filters):
         shows the holding banner and hides the filter panel.
     • Otherwise:
         shows the filter panel, renders all matched jobs
         (active first, then unavailable greyed-out at the bottom),
         and updates the results bar count.
   Called by: setFilter(), clearAllFilters(), and oninput on search.
   ───────────────────────────────────────────────────────────── */
function applyFilters() {
  /* Read live search text */
  state.search = document.getElementById('searchInput').value.toLowerCase().trim();

  /* ── Step 1: Check global availability ───────────────────────
     Count ALL active jobs regardless of filters.
     If zero → show holding banner, hide everything else. */
  const globallyActive = jobs.filter(j => j.status === 'active');

  const filterPanel  = document.getElementById('filterPanel');
  const resultsBar   = document.getElementById('resultsBarWrap');
  const jobList      = document.getElementById('jobList');
  const holdingBanner= document.getElementById('holdingBanner');

  if (globallyActive.length === 0) {
    /* No active roles exist at all — show holding banner, hide filters */
    filterPanel.style.display   = 'none';
    resultsBar.style.display    = 'none';
    jobList.style.display       = 'none';
    holdingBanner.style.display = 'block';
    return;
  }

  /* Active roles exist — show normal filter UI, hide holding banner */
  filterPanel.style.display   = '';
  resultsBar.style.display    = '';
  jobList.style.display       = '';
  holdingBanner.style.display = 'none';

  /* ── Step 2: Apply all four filter dimensions ────────────────
     Filter the full jobs array (active + unavailable).
     Unavailable jobs that match filters are still included in the
     rendered list (shown greyed-out) so visitors can see context,
     but they are NOT counted in the results bar. */
  const matched = jobs.filter(j => {
    /* Category match */
    const matchCat    = state.cat  === 'all' || j.category === state.cat;
    /* Location match */
    const matchLoc    = state.loc  === 'all' || j.locKey   === state.loc;
    /* Job type match */
    const matchType   = state.type === 'all' || j.typeKey  === state.type;
    /* Keyword search — title, display location, or category label */
    const s = state.search;
    const matchSearch = !s
      || j.title.toLowerCase().includes(s)
      || j.location.toLowerCase().includes(s)
      || j.badgeLabel.toLowerCase().includes(s);
    return matchCat && matchLoc && matchType && matchSearch;
  });

  /* Split matched results: active jobs first, unavailable appended after */
  const activeMatched      = matched.filter(j => j.status === 'active');
  const unavailableMatched = matched.filter(j => j.status !== 'active');
  const sortedResults      = [...activeMatched, ...unavailableMatched];

  /* ── Step 3: Render and update the results bar ───────────────
     Pass only the active count to the results bar (unavailable
     roles are rendered but not counted as open vacancies). */
  renderJobs(sortedResults, activeMatched.length);
  updateResultsBar(activeMatched.length);
}


/* ─────────────────────────────────────────────────────────────
   SECTION 6 — renderJobs(list, activeCount)
   Clears #jobList and injects a job card for every item in list.
   Active jobs render normally. Unavailable jobs (filled/expired)
   render with .unavailable class, a greyed status badge, and
   their action buttons replaced by a status-only label.
   When activeCount is 0 but unavailable jobs exist, shows a
   "no matching open roles" message above the greyed-out cards.
   ───────────────────────────────────────────────────────────── */
function renderJobs(list, activeCount) {
  const container = document.getElementById('jobList');

  /* Completely empty — no jobs match filters at all */
  if (!list.length) {
    container.innerHTML = `
      <div class="no-results">
        <strong>NO VACANCIES FOUND</strong>
        Try adjusting your filters or clearing the search to see all open roles.
      </div>`;
    return;
  }

  /* Some jobs match but none are active — prepend an informational notice */
  const noActiveNotice = (activeCount === 0 && list.length > 0) ? `
    <div class="no-results" style="padding:28px 20px 24px">
      <strong style="font-size:20px">NO OPEN ROLES IN THIS SELECTION</strong>
      The roles below are no longer accepting applications.
      <a href="#apply" style="color:var(--gold);display:block;margin-top:8px;font-size:14px">
        Send us a speculative CV instead →
      </a>
    </div>` : '';

  /* Build card HTML — behaviour branches on job.status */
  const cardsHTML = list.map(j => {
    const isUnavailable = j.status !== 'active';

    /* Status badge label and icon */
    const statusBadge = isUnavailable
      ? `<span class="job-badge badge-filled">
           ${j.status === 'filled' ? '✓ Position Filled' : '⏱ Vacancy Expired'}
         </span>`
      : '';

    /* Action buttons: shown for active roles, replaced by a note for unavailable */
    const actionButtons = isUnavailable
      ? `<div style="font-size:12px;color:var(--text-muted);letter-spacing:1px;text-transform:uppercase;text-align:right;line-height:1.6">
           ${j.status === 'filled' ? 'This position has<br>been filled' : 'This listing has<br>expired'}
         </div>`
      : `<button class="btn-apply" onclick="openModal(${j.id})">View Role →</button>
         <a class="btn-indeed" href="${j.indeed}" target="_blank" rel="noopener noreferrer">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
             <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-6h2v6zm-1-7.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
           </svg>
           Apply on Indeed
         </a>`;

    return `
    <div class="job-card ${j.featured && !isUnavailable ? 'featured' : ''} ${isUnavailable ? 'unavailable' : ''}">

      <!-- Left: badges, title, salary, meta -->
      <div class="job-info">

        <!-- Badge row: Featured + category + type + status (if unavailable) -->
        <div class="job-top">
          ${j.featured && !isUnavailable ? '<span class="job-badge badge-featured">⭐ Featured</span>' : ''}
          <span class="job-badge ${j.badge}">${j.badgeLabel}</span>
          <span class="job-badge ${
            j.typeKey === 'full-time'  ? 'badge-full'  :
            j.typeKey === 'part-time'  ? 'badge-part'  : 'badge-contract'
          }">${j.type}</span>
          ${statusBadge}
        </div>

        <!-- Job title — struck through when unavailable via CSS -->
        <div class="job-title">${j.title}</div>

        <!-- Salary range -->
        <div class="salary">${j.salary}</div>

        <!-- Location and type meta icons -->
        <div class="job-meta">
          <span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            ${j.location}
          </span>
          <span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            ${j.type}
          </span>
        </div>
      </div>

      <!-- Right: action buttons OR unavailability message -->
      <div class="job-actions">
        ${actionButtons}
      </div>

    </div>`;
  }).join('');

  container.innerHTML = noActiveNotice + cardsHTML;
}


/* ─────────────────────────────────────────────────────────────
   SECTION 7 — updateResultsBar(activeCount)
   Updates the results count text (active roles only — unavailable
   roles are displayed but not counted as open vacancies) and
   builds chip pills for every non-'all' active filter.
   Shows or hides the "Clear all" button as needed.
   ───────────────────────────────────────────────────────────── */
function updateResultsBar(activeCount) {
  /* Count label — shows only open/active vacancy count */
  document.getElementById('resultsCount').innerHTML =
    `<strong>${activeCount}</strong> open ${activeCount === 1 ? 'vacancy' : 'vacancies'}`;

  /* Build chip pills for any non-default filter dimensions */
  const chips = [];
  if (state.cat    !== 'all') chips.push(filterLabels.cat[state.cat]    || state.cat);
  if (state.loc    !== 'all') chips.push(filterLabels.loc[state.loc]    || state.loc);
  if (state.type   !== 'all') chips.push(filterLabels.type[state.type]  || state.type);
  if (state.search)           chips.push(`🔎 "${state.search}"`);

  /* Render chip pills */
  document.getElementById('activeFilters').innerHTML =
    chips.map(c => `<span class="chip">${c}</span>`).join('');

  /* "Clear all" button only appears when a filter is actually active */
  document.getElementById('clearBtn').style.display = chips.length ? 'inline-block' : 'none';
}


/* ─────────────────────────────────────────────────────────────
   SECTION 8 — openModal(id)
   Finds the job by its id, populates #modalContent with full role
   detail HTML, and makes the modal overlay visible.
   ───────────────────────────────────────────────────────────── */
function openModal(id) {
  const j = jobs.find(j => j.id === id);
  if (!j) return;

  document.getElementById('modalContent').innerHTML = `
    <!-- Modal header -->
    <h2>${j.title}</h2>
    <div class="modal-meta">
      📍 ${j.location} &nbsp;·&nbsp; ⏰ ${j.type} &nbsp;·&nbsp; 💷 ${j.salary}
    </div>

    <!-- Role details: description, requirements, duties -->
    <div class="modal-body">
      <p>${j.desc}</p>
      <h4>Requirements</h4>
      <ul>${j.requirements.map(r => `<li>${r}</li>`).join('')}</ul>
      <h4>Key Duties</h4>
      <ul>${j.duties.map(d => `<li>${d}</li>`).join('')}</ul>
    </div>

    <!-- Apply buttons: Indeed (new tab) or direct CV upload (same page) -->
    <div class="modal-actions">
      <a class="btn-indeed" href="${j.indeed}" target="_blank" rel="noopener noreferrer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
          <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-6h2v6zm-1-7.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
        </svg>
        Apply on Indeed
      </a>
      <a class="btn-apply" href="#apply" onclick="closeModalDirect()">
        Send CV Directly →
      </a>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
}


/* ─────────────────────────────────────────────────────────────
   SECTION 9 — closeModal(event)
   Called by the overlay's onclick handler.
   Only closes the modal if the click target IS the overlay itself
   (not a click inside the white modal box).
   ───────────────────────────────────────────────────────────── */
function closeModal(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModalDirect();
}


/* ─────────────────────────────────────────────────────────────
   SECTION 10 — closeModalDirect()
   Unconditionally removes .open from the overlay, hiding the modal.
   Called by the ✕ button, the "Send CV Directly" link, and
   indirectly by closeModal().
   ───────────────────────────────────────────────────────────── */
function closeModalDirect() {
  document.getElementById('modalOverlay').classList.remove('open');
}


/* ─────────────────────────────────────────────────────────────
   SECTION 11 — CV FORM HELPERS
   ───────────────────────────────────────────────────────────── */

/* showFileName — displays the selected file name inside the drop zone */
function showFileName(input) {
  const f = input.files[0];
  document.getElementById('fileName').textContent = f ? '✓ ' + f.name : '';
}

/* handleDragOver — adds .drag highlight class to the drop zone */
function handleDragOver(e) {
  e.preventDefault();
  document.getElementById('dropZone').classList.add('drag');
}

/* handleDragLeave — removes .drag class when pointer leaves the zone */
function handleDragLeave() {
  document.getElementById('dropZone').classList.remove('drag');
}

/* handleDrop — reads the first dropped file and shows its name */
function handleDrop(e) {
  e.preventDefault();
  const f = e.dataTransfer.files[0];
  if (f) {
    document.getElementById('fileName').textContent = '✓ ' + f.name;
    document.getElementById('dropZone').classList.remove('drag');
  }
}

/* submitForm — validates required fields, shows toast, and resets form.
   Required fields: First Name, Last Name, Email, Phone.
   On first invalid field: highlights red border and focuses that field. */
function submitForm() {
  const required = ['fname', 'lname', 'femail', 'fphone'];
  let firstError = null;

  for (const id of required) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      el.style.borderColor = '#e74c3c';   /* Red error border */
      if (!firstError) firstError = el;
    }
  }

  /* Abort if any required field is empty */
  if (firstError) { firstError.focus(); return; }

  /* Show success toast */
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);

  /* Reset all form fields after successful submission */
  ['fname', 'lname', 'femail', 'fphone', 'frole', 'fmessage'].forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.style.borderColor = '';
  });
  document.getElementById('fileName').textContent = '';
}

/* Clear red error border as soon as user starts typing in a field */
document.querySelectorAll('.form-group input, .form-group select').forEach(el => {
  el.addEventListener('input', () => { el.style.borderColor = ''; });
});


/* ─────────────────────────────────────────────────────────────
   SECTION 12 — INITIALISATION
   Run applyFilters() immediately when the page loads.
   This renders all jobs with the default state (nothing filtered)
   and sets the initial "X vacancies found" count.
   ───────────────────────────────────────────────────────────── */
applyFilters();

