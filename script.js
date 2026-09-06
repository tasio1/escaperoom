/* ==========================================================================
   ESCAPE ROOM — SAVE THE SCHOOL · station selection
   Plain JavaScript, no libraries, no server. Works from file:// offline.

   EDIT HERE ↓ — this list is the whole page.
   `file` is the file the row opens, relative to this page. The names below
   are the files as they are in the Escaperoom folder; if you rename a game,
   change its `file` line to match.
   ========================================================================== */

(function () {
  'use strict';

  var BRIEFING = {
    label:"Briefing", name:"The Transmission", topic:"The hacker's message to the school",
    lang:"EN / DE", accent:"#3dff9e", icon:"signal", file:"briefing.html"
  };

  var STATIONS = [
    { n:1,  name:"The Time Machine",            topic:"Past Tenses",
      lang:"EN", accent:"#3dff9e", icon:"clock",   file:"01-the-time-machine.html" },
    { n:2,  name:"The Password Vault",          topic:"Present Perfect & Past Simple",
      lang:"EN", accent:"#ffe81f", icon:"vault",   file:"02-the-password-vault.html" },
    { n:3,  name:"The Sentence Lab",            topic:"Word Order",
      lang:"EN", accent:"#ffb45a", icon:"flask",   file:"03-the-sentence-lab.html" },
    { n:4,  name:"The Security Control Room",   topic:"Modal Verbs",
      lang:"EN", accent:"#63b8ff", icon:"shield",  file:"04-the-security-control-room.html" },
    { n:5,  name:"The Secret Files",            topic:"Pronouns & Possessives",
      lang:"EN", accent:"#cfe0ff", icon:"folder",  file:"05-the-secret-files.html" },
    { n:6,  name:"The Hidden Passage",          topic:"Prepositions",
      lang:"EN", accent:"#ff5fc8", icon:"passage", file:"06-the-hidden-passage.html" },
    { n:7,  name:"Das Klassenzimmer-Geheimnis", topic:"Klassenzimmer-Wortschatz",
      lang:"DE", accent:"#ff8a3d", icon:"board",   file:"07-das-klassenzimmer-geheimnis.html" },
    { n:8,  name:"Die Verdächtigen-Akte",       topic:"Persönliche Informationen, Familie & Hobbys",
      lang:"DE", accent:"#ff2e2e", icon:"dossier", file:"08-die-verdaechtigen-akte.html" },
    { n:9,  name:"Die Tierspur",                topic:"Tiere",
      lang:"DE", accent:"#4f6bff", icon:"paw",     file:"09-die-tierspur.html" },
    { n:10, name:"Der Kleider-Code",            topic:"Kleidung",
      lang:"DE", accent:"#45d9e0", icon:"shirt",   file:"10-der-kleider-code.html" }
  ];

  var FINAL = {
    n:11, label:"Station 11", name:"The Storm", topic:"Picture Story Writing · English or Deutsch",
    lang:"EN / DE", accent:"#eaf4ff", icon:"storm", file:"final-the-storm.html"
  };

  /* ---- inline SVG icons (no image files needed) ---- */
  var ICONS = {
    signal: '<path d="M12 13.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z"/><path d="M8.4 15.5a5 5 0 0 1 0-7.1M15.6 8.4a5 5 0 0 1 0 7.1"/><path d="M5.6 18.3a9 9 0 0 1 0-12.7M18.4 5.6a9 9 0 0 1 0 12.7"/>',
    clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 6.6V12l3.6 2.1"/>',
    vault:  '<rect x="3.5" y="10" width="17" height="10.5" rx="1.5"/><path d="M7.5 10V7a4.5 4.5 0 0 1 9 0v3"/><circle cx="12" cy="15.2" r="1.8"/>',
    flask:  '<path d="M9.5 3v6.2L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14.5 9.2V3"/><path d="M8 3h8"/><path d="M7.2 15.2h9.6"/>',
    shield: '<path d="M12 3l7.5 3v6c0 4.5-3.1 7.6-7.5 9-4.4-1.4-7.5-4.5-7.5-9V6z"/><path d="M9.2 12.2l2 2 3.8-4"/>',
    folder: '<path d="M3.5 19.5V5.5h5.4l1.9 2.4h9.7v11.6z"/><path d="M7.4 12.6h8.8M7.4 15.8h5.6"/>',
    passage:'<rect x="8.5" y="3.5" width="11.5" height="17" rx="1"/><circle cx="16.8" cy="12" r=".9"/><path d="M2.6 12h4.6M5.2 9.6L2.6 12l2.6 2.4"/>',
    board:  '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M7.6 20l1.8-4M16.4 20l-1.8-4"/><path d="M7 8.4h7M7 11.6h4.5"/>',
    dossier:'<rect x="4" y="3" width="16" height="18" rx="1.5"/><circle cx="12" cy="9.4" r="2.4"/><path d="M7.8 17.4c.7-2.1 2.3-3.2 4.2-3.2s3.5 1.1 4.2 3.2"/>',
    paw:    '<ellipse cx="12" cy="15.6" rx="4.2" ry="3.4"/><circle cx="6.7" cy="11" r="1.9"/><circle cx="10" cy="7.7" r="1.9"/><circle cx="14" cy="7.7" r="1.9"/><circle cx="17.3" cy="11" r="1.9"/>',
    shirt:  '<path d="M8.5 3.5L4 6l1.7 4 2.1-.8V20.5h8.4V9.2l2.1.8L20 6l-4.5-2.5a3.6 3.6 0 0 1-7 0z"/>',
    storm:  '<path d="M7.4 15.6a4 4 0 0 1 .4-8 5.4 5.4 0 0 1 10.2 1.3 3.4 3.4 0 0 1-.6 6.7"/><path d="M13.4 12.4L10 17.2h3.4L11.4 21.2"/>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c];
    });
  }

  function accentVars(hex) {
    var r = parseInt(hex.substr(1,2),16), g = parseInt(hex.substr(3,2),16), b = parseInt(hex.substr(5,2),16);
    function a(x){ return 'rgba(' + r + ',' + g + ',' + b + ',' + x + ')'; }
    return '--accent:' + hex + ';--accent-10:' + a(.10) + ';--accent-40:' + a(.40) + ';--accent-55:' + a(.55) + ';';
  }

  function row(x, opts) {
    opts = opts || {};
    var num = opts.label ? esc(opts.label) : (x.n < 10 ? '0' + x.n : '' + x.n);
    return '' +
      '<a class="row' + (opts.wide ? ' wide' : '') + '" href="' + esc(x.file) + '" style="' + accentVars(x.accent) + '">' +
        '<span class="num">' + num + '</span>' +
        '<span class="icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[x.icon] + '</svg></span>' +
        '<span class="text">' +
          '<span class="name">' + esc(x.name) + '</span>' +
          '<span class="topic">' + esc(x.topic) + '</span>' +
        '</span>' +
        '<span class="lang ' + (x.lang === 'DE' ? 'de' : (x.lang === 'EN' ? 'en' : '')) + '">' +
          (x.lang === 'DE' ? 'Deutsch' : (x.lang === 'EN' ? 'English' : esc(x.lang))) +
        '</span>' +
        '<span class="go">Start</span>' +
      '</a>';
  }

  document.getElementById('briefing').innerHTML = row(BRIEFING, { label: BRIEFING.label, wide: true });
  document.getElementById('list').innerHTML     = STATIONS.map(function (x) { return row(x); }).join('');
  document.getElementById('final').innerHTML    = row(FINAL, { label: FINAL.label, wide: true });

  /* =======================================================================
     MATRIX RAIN
     ======================================================================= */
  (function () {
    var canvas = document.getElementById('matrix');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノabcdefghijklmnopqrstuvwxyz0123456789<>/\\[]{}#$%&*+=';
    var font = 15, cols = 0, drops = [], w = 0, h = 0;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function size() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.ceil(w / font);
      drops = [];
      for (var i = 0; i < cols; i++) drops[i] = Math.random() * -h / font;
    }
    function frame() {
      ctx.fillStyle = 'rgba(4,7,10,.075)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = font + 'px monospace';
      for (var i = 0; i < cols; i++) {
        var ch = chars.charAt(Math.floor(Math.random() * chars.length));
        var y = drops[i] * font;
        ctx.fillStyle = Math.random() > .985 ? '#d9ffe9' : 'rgba(31,164,106,.85)';
        ctx.fillText(ch, i * font, y);
        if (y > h && Math.random() > .975) drops[i] = 0;
        drops[i] += 0.55;
      }
    }
    function still() {
      ctx.fillStyle = '#04070a'; ctx.fillRect(0, 0, w, h);
      ctx.font = font + 'px monospace'; ctx.fillStyle = 'rgba(31,164,106,.5)';
      for (var i = 0; i < cols; i++) {
        var n = 3 + Math.floor(Math.random() * 8);
        for (var j = 0; j < n; j++) {
          ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * font, Math.random() * h);
        }
      }
    }
    size();
    window.addEventListener('resize', function () { size(); if (reduced) still(); });
    if (reduced) { still(); } else { setInterval(frame, 55); }
  })();

})();
