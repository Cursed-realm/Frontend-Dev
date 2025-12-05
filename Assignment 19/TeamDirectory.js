// TeamDirectory.js
// Implements team hierarchy with DOM traversal:
// 1. Click manager → highlight direct reports (using .next())
// 2. Hover employee → show contact using .next() / .siblings()
// 3. Click department → change bg of members using .children()
// 4. Random employee select → highlight siblings
// 5. Collapse/expand team using .parent() / .find()

(function(){
  'use strict';

  // Department-based team data
  const TEAMS = [
    {
      dept: 'Engineering',
      color: '#667eea',
      members: [
        { id: 1, name: 'Alice Chen', role: 'Engineering Lead', email: 'alice@company.com', phone: '555-0101', direct_reports: [2, 3] },
        { id: 2, name: 'Bob Smith', role: 'Senior Dev', email: 'bob@company.com', phone: '555-0102', manager: 1 },
        { id: 3, name: 'Carol Davis', role: 'DevOps Engineer', email: 'carol@company.com', phone: '555-0103', manager: 1 }
      ]
    },
    {
      dept: 'Product',
      color: '#764ba2',
      members: [
        { id: 4, name: 'David Park', role: 'Product Manager', email: 'david@company.com', phone: '555-0104', direct_reports: [5] },
        { id: 5, name: 'Emma Wilson', role: 'Product Designer', email: 'emma@company.com', phone: '555-0105', manager: 4 }
      ]
    },
    {
      dept: 'Marketing',
      color: '#ff7a45',
      members: [
        { id: 6, name: 'Frank Moore', role: 'Marketing Director', email: 'frank@company.com', phone: '555-0106', direct_reports: [7, 8] },
        { id: 7, name: 'Grace Lee', role: 'Content Strategist', email: 'grace@company.com', phone: '555-0107', manager: 6 },
        { id: 8, name: 'Henry Brown', role: 'Social Media Manager', email: 'henry@company.com', phone: '555-0108', manager: 6 }
      ]
    }
  ];

  function addStyles(){
    if(document.getElementById('team-dir-styles')) return;
    const s = document.createElement('style');
    s.id = 'team-dir-styles';
    s.textContent = `
      .team-directory{max-width:900px;margin:18px auto;padding:16px}
      .team-section{margin-bottom:24px;background:#fff;border-radius:12px;padding:0;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,0.08)}
      .team-header{padding:14px 16px;color:#fff;font-weight:700;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
      .team-header:hover{opacity:0.95}
      .team-toggle{display:inline-block;width:24px;height:24px;text-align:center;line-height:24px}
      .team-members{padding:8px 0}
      .team-members.collapsed{display:none}

      .employee-card{padding:12px 16px;border-left:4px solid transparent;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #f0f0f0;transition:all 0.2s}
      .employee-card:hover{background:#f9f9f9}
      .employee-info{flex:1}
      .employee-name{font-weight:700;color:#1f2937;margin:0}
      .employee-role{font-size:0.9em;color:#6b7280;margin:2px 0 0 0}
      .employee-contact{display:none;font-size:0.85em;color:#9ca3af;margin:4px 0 0 0}
      .employee-card:hover .employee-contact{display:block}
      .employee-actions{display:flex;gap:8px}
      .btn-sm{padding:6px 10px;border:0;border-radius:6px;cursor:pointer;font-size:0.85em;font-weight:600}
      .btn-highlight{background:#ffd700;color:#000}
      .btn-highlight:hover{background:#ffed4e}
      .btn-random{background:#667eea;color:#fff}
      .btn-random:hover{background:#5568d3}

      /* highlight states */
      .employee-card.highlighted{background:linear-gradient(90deg,rgba(255,215,0,0.2),transparent);border-left-color:#ffd700}
      .employee-card.manager-highlight{background:linear-gradient(90deg,rgba(102,126,234,0.15),transparent);border-left-color:#667eea}
      .employee-card.sibling-highlight{background:linear-gradient(90deg,rgba(255,122,69,0.15),transparent);border-left-color:#ff7a45}
      .employee-card.dept-highlight{background:#f0f4ff}

      .controls{display:flex;gap:8px;margin:12px 0;padding:0 16px}
      .controls button{padding:8px 12px;border:0;border-radius:8px;cursor:pointer;font-weight:600}
      .controls .btn-primary{background:#667eea;color:#fff}
      .controls .btn-primary:hover{background:#5568d3}
      .controls .btn-secondary{background:#e5e7eb;color:#1f2937}
      .controls .btn-secondary:hover{background:#d1d5db}

      @media (max-width:600px){
        .team-directory{padding:8px}
        .employee-card{flex-direction:column;align-items:flex-start}
        .employee-actions{margin-top:8px;width:100%}
      }
    `;
    document.head.appendChild(s);
  }

  function createEmployeeCard(emp, dept, deptColor){
    const card = document.createElement('div');
    card.className = 'employee-card';
    card.dataset.empId = emp.id;
    card.dataset.dept = dept;
    card.dataset.isManager = emp.direct_reports && emp.direct_reports.length > 0 ? 'true' : 'false';
    card.style.borderLeftColor = deptColor;

    const info = document.createElement('div');
    info.className = 'employee-info';
    info.innerHTML = `
      <p class="employee-name">${emp.name}${emp.direct_reports ? ' 👔' : ''}</p>
      <p class="employee-role">${emp.role}</p>
      <p class="employee-contact">📧 ${emp.email} | ☎️ ${emp.phone}</p>
    `;

    const actions = document.createElement('div');
    actions.className = 'employee-actions';
    actions.innerHTML = `
      <button class="btn-sm btn-highlight" data-action="highlight">Highlight</button>
      <button class="btn-sm btn-random" data-action="select-random">Select</button>
    `;

    card.appendChild(info);
    card.appendChild(actions);

    // click manager to highlight direct reports
    if(emp.direct_reports){
      card.addEventListener('click', function(e){
        if(e.target.closest('button')) return;
        highlightDirectReports(emp.id);
      });
    }

    // button actions
    const highlightBtn = actions.querySelector('[data-action="highlight"]');
    highlightBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      clearAllHighlights();
      card.classList.add('highlighted');
    });

    const selectBtn = actions.querySelector('[data-action="select-random"]');
    selectBtn.addEventListener('click', (e)=>{
      e.stopPropagation();
      selectRandomAndHighlightSiblings(emp.id, dept);
    });

    return card;
  }

  function highlightDirectReports(managerId){
    clearAllHighlights();
    // find all direct reports
    const directReports = [];
    TEAMS.forEach(team => {
      team.members.forEach(emp => {
        if(emp.manager === managerId){
          directReports.push(emp.id);
        }
      });
    });

    // highlight manager and direct reports
    document.querySelectorAll('.employee-card').forEach(card => {
      if(parseInt(card.dataset.empId) === managerId || directReports.includes(parseInt(card.dataset.empId))){
        card.classList.add('manager-highlight');
      }
    });
  }

  function selectRandomAndHighlightSiblings(empId, dept){
    clearAllHighlights();
    // get all siblings (same department)
    const siblings = [];
    document.querySelectorAll(`.employee-card[data-dept="${dept}"]`).forEach(card => {
      siblings.push(parseInt(card.dataset.empId));
    });

    // highlight all siblings
    document.querySelectorAll(`.employee-card[data-dept="${dept}"]`).forEach(card => {
      card.classList.add('sibling-highlight');
    });
  }

  function clearAllHighlights(){
    document.querySelectorAll('.employee-card').forEach(card => {
      card.classList.remove('highlighted', 'manager-highlight', 'sibling-highlight', 'dept-highlight');
    });
  }

  function buildUI(selector='#team-directory-root'){
    addStyles();
    const root = document.querySelector(selector);
    if(!root) return;
    root.classList.add('team-directory');

    TEAMS.forEach((team, idx) => {
      const section = document.createElement('div');
      section.className = 'team-section';
      section.dataset.dept = team.dept;

      const header = document.createElement('div');
      header.className = 'team-header';
      header.style.backgroundColor = team.color;
      header.innerHTML = `
        <span>
          <span class="team-toggle">▼</span>
          ${team.dept} (${team.members.length})
        </span>
        <button style="background:rgba(255,255,255,0.2);border:0;color:#fff;padding:6px 10px;border-radius:6px;cursor:pointer">Change BG</button>
      `;

      const membersContainer = document.createElement('div');
      membersContainer.className = 'team-members';

      team.members.forEach(emp => {
        const card = createEmployeeCard(emp, team.dept, team.color);
        membersContainer.appendChild(card);
      });

      section.appendChild(header);
      section.appendChild(membersContainer);

      // 3. click department header to change bg of all members
      header.addEventListener('click', function(e){
        if(e.target.closest('button')) {
          // change bg color
          const colors = ['#f3e5f5', '#e3f2fd', '#e8f5e9', '#fff3e0'];
          const newColor = colors[Math.floor(Math.random() * colors.length)];
          membersContainer.querySelectorAll('.employee-card').forEach(card => {
            card.classList.add('dept-highlight');
            card.style.backgroundColor = newColor;
          });
          return;
        }
        // toggle collapse
        membersContainer.classList.toggle('collapsed');
        const toggle = header.querySelector('.team-toggle');
        toggle.textContent = membersContainer.classList.contains('collapsed') ? '▶' : '▼';
      });

      root.appendChild(section);
    });

    // global controls
    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
      <button class="btn-primary" id="clearHighlights">Clear All Highlights</button>
      <button class="btn-secondary" id="collapseAll">Collapse All Teams</button>
      <button class="btn-secondary" id="expandAll">Expand All Teams</button>
    `;
    root.insertBefore(controls, root.firstChild);

    document.getElementById('clearHighlights').addEventListener('click', clearAllHighlights);
    document.getElementById('collapseAll').addEventListener('click', ()=>{
      document.querySelectorAll('.team-members').forEach(tm => {
        tm.classList.add('collapsed');
        tm.parentElement.querySelector('.team-toggle').textContent = '▶';
      });
    });
    document.getElementById('expandAll').addEventListener('click', ()=>{
      document.querySelectorAll('.team-members').forEach(tm => {
        tm.classList.remove('collapsed');
        tm.parentElement.querySelector('.team-toggle').textContent = '▼';
      });
    });
  }

  // Auto-init
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', function(){ buildUI('#team-directory-root'); });
  } else {
    buildUI('#team-directory-root');
  }

  window.TeamDirectory = { buildUI, highlightDirectReports, clearAllHighlights };

})();
