/* ===================================================================
   HEART.OS — Terminal Engine
   =================================================================== */

(function () {
  'use strict';

  // ── State ──────────────────────────────────────────────────────────
  const state = {
    currentPath: '/home/manas',
    fragments: new Set(),
    fragmentTexts: {
      1: 'You swiped right and my whole',
      2: 'world started making sense.',
      3: 'Will you be my Valentine?',
    },
    history: [],
    historyIdx: -1,
    inputEnabled: false,
    typingQueue: [],
    isProcessingQueue: false,
  };

  // ── Virtual File System ────────────────────────────────────────────
  const fs = {
    home: {
      _t: 'd',
      manas: {
        _t: 'd',
        'README.md': {
          _t: 'f',
          _c: [
            { t: 'white', s: '# Hey you.' },
            { t: '', s: '' },
            { t: '', s: '3 fragments. Scattered.' },
            { t: '', s: '' },
            { t: 'accent', s: 'One in the logs.' },
            { t: 'accent', s: 'One in the code.' },
            { t: 'accent', s: 'One in the commit history.' },
            { t: '', s: '' },
            { t: 'dim', s: 'Find them all.' },
          ],
        },
        memories: {
          _t: 'd',
          'first-swipe.log': {
            _t: 'f',
            _c: [
              { t: 'dim', s: '// System log — 14 March 2024' },
              { t: '', s: '' },
              { t: 'accent', s: '[19:23:47]' },
              { t: '', s: ' INFO  Bumble.match(uma, manas) → true' },
              { t: 'accent', s: '[19:23:48]' },
              { t: '', s: ' INFO  Heartbeat.rate increased by 200%' },
              { t: 'accent', s: '[19:24:01]' },
              { t: '', s: ' INFO  Loading butterflies...' },
              { t: 'green', s: ' ████████████ done' },
              { t: 'accent', s: '[19:24:15]' },
              { t: 'red', s: ' WARN  Cannot stop smiling. This is not a bug.' },
              { t: 'accent', s: '[20:15:33]' },
              { t: '', s: ' INFO  First.message.sent("hey!")' },
              { t: 'accent', s: '[20:15:34]' },
              { t: '', s: ' INFO  Waiting for response...' },
              { t: 'accent', s: '[20:16:02]' },
              { t: 'green', s: ' INFO  Response received. Dopamine.level = MAX' },
              { t: '', s: '' },
              { t: 'fragment-banner', s: '═══════════════════════════════════════' },
              { t: 'fragment-banner', s: '  ♥ FRAGMENT 1/3 UNLOCKED' },
              { t: 'pink', s: '  "You swiped right and my whole"' },
              { t: 'fragment-banner', s: '═══════════════════════════════════════' },
            ],
            _frag: 1,
          },
          'tokyo.txt': {
            _t: 'f',
            _c: [
              { t: '', s: 'The city was bright.' },
              { t: '', s: 'But honestly?' },
              { t: '', s: '' },
              { t: 'white', s: 'I only remember your face.' },
              { t: '', s: '' },
              { t: 'dim', s: 'March 2024. Tokyo.' },
              { t: 'dim', s: 'Everything before that was just... loading.' },
            ],
          },
          'us.jpg': {
            _t: 'f',
            _c: [
              { t: 'dim', s: '[Rendering image...]' },
              { t: '', s: '' },
              { t: 'heart-ascii', s: '     ♥♥      ♥♥' },
              { t: 'heart-ascii', s: '   ♥♥♥♥♥♥  ♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '  ♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '   ♥♥♥♥♥♥♥♥♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '     ♥♥♥♥♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '       ♥♥♥♥♥♥' },
              { t: 'heart-ascii', s: '         ♥♥' },
              { t: '', s: '' },
              { t: 'dim', s: '  format: .jpg (just kidding, it\'s ASCII)' },
            ],
          },
        },
        projects: {
          _t: 'd',
          'love.py': {
            _t: 'f',
            _c: [
              { t: 'dim', s: '#!/usr/bin/env python3' },
              { t: 'dim', s: '# love.py — do not modify (jk, you can\'t)' },
              { t: '', s: '' },
              { t: 'blue', s: 'def' },
              { t: '', s: ' calculate_love():' },
              { t: '', s: '    you = "Manas"' },
              { t: '', s: '    me  = "Uma"' },
              { t: '', s: '    us  = you + " & " + me' },
              { t: '', s: '' },
              { t: '', s: '    days_together = float(\'inf\')' },
              { t: '', s: '    love_level = days_together ** 2' },
              { t: '', s: '' },
              { t: '', s: '    return f"{us} = {love_level}"' },
              { t: '', s: '' },
              { t: 'blue', s: 'if' },
              { t: '', s: ' __name__ == "__main__":' },
              { t: '', s: '    print(calculate_love())' },
              { t: '', s: '' },
              { t: 'dim', s: '# try: python love.py' },
            ],
            _runnable: true,
            _runOutput: [
              { t: 'dim', s: 'Compiling love.py...' },
              { t: 'dim', s: 'Running...' },
              { t: '', s: '' },
              { t: 'white', s: '>>> Manas & Uma = ∞' },
              { t: '', s: '' },
              { t: 'fragment-banner', s: '═══════════════════════════════════════' },
              { t: 'fragment-banner', s: '  ♥ FRAGMENT 2/3 UNLOCKED' },
              { t: 'pink', s: '  "world started making sense."' },
              { t: 'fragment-banner', s: '═══════════════════════════════════════' },
            ],
            _runFrag: 2,
          },
          'future.config': {
            _t: 'f',
            _c: [
              { t: 'dim', s: '{' },
              { t: 'blue', s: '  "relationship"' },
              { t: '', s: ': {' },
              { t: '', s: '    "status": ' },
              { t: 'green', s: '"madly_in_love"' },
              { t: '', s: ',' },
              { t: '', s: '    "duration": ' },
              { t: 'green', s: '"forever"' },
              { t: '', s: ',' },
              { t: '', s: '    "bugs": ' },
              { t: 'accent', s: '0' },
              { t: '', s: ',' },
              { t: '', s: '    "features": [' },
              { t: 'green', s: '"laughter"' },
              { t: '', s: ', ' },
              { t: 'green', s: '"adventures"' },
              { t: '', s: ', ' },
              { t: 'green', s: '"late-night-talks"' },
              { t: '', s: ']' },
              { t: '', s: '  },' },
              { t: 'blue', s: '  "deployment"' },
              { t: '', s: ': {' },
              { t: '', s: '    "target": ' },
              { t: 'green', s: '"our_future"' },
              { t: '', s: ',' },
              { t: '', s: '    "strategy": ' },
              { t: 'green', s: '"together"' },
              { t: '', s: ',' },
              { t: '', s: '    "rollback": ' },
              { t: 'red', s: 'false' },
              { t: '', s: '' },
              { t: '', s: '  }' },
              { t: 'dim', s: '}' },
            ],
          },
        },
        '.secret': {
          _t: 'd',
          'message.enc': {
            _t: 'f',
            _c: 'dynamic',
          },
        },
      },
    },
  };

  // ── Git Log ────────────────────────────────────────────────────────
  const gitLog = [
    {
      hash: 'a1b2c3d',
      author: 'Uma <uma@heart.os>',
      date: 'Feb 14, 2026',
      msg: 'feat: ask the most important question',
    },
    {
      hash: 'e4f5a6b',
      author: 'Uma <uma@heart.os>',
      date: 'Sep 2025',
      msg: 'merge: two cities, one love',
    },
    {
      hash: 'c7d8e9f',
      author: 'destiny <fate@universe>',
      date: 'Jul 19, 2024',
      msg: 'feat: the ring',
    },
    {
      hash: 'f1a2b3c',
      author: 'destiny <fate@universe>',
      date: 'Jun 5, 2024',
      msg: 'chore: make it official',
    },
    {
      hash: 'b7c8d9e',
      author: 'destiny <fate@universe>',
      date: 'Mar 14, 2024',
      msg: 'init: first swipe, first smile, first everything',
    },
  ];

  const gitShowData = [
    { t: 'commit-hash', s: 'commit a1b2c3d (HEAD -> main)' },
    { t: 'commit-author', s: 'Author: Uma <uma@heart.os>' },
    { t: 'commit-date', s: 'Date:   Feb 14, 2026' },
    { t: '', s: '' },
    { t: 'white', s: '    feat: ask the most important question' },
    { t: '', s: '' },
    { t: 'dim', s: '--- a/heart.txt' },
    { t: 'dim', s: '+++ b/heart.txt' },
    { t: 'dim', s: '@@ -1 +1,3 @@' },
    { t: 'diff-remove', s: '- status: searching' },
    { t: 'diff-add', s: '+ status: found you' },
    { t: 'diff-add', s: '+ question: pending' },
    { t: 'diff-add', s: '+ courage: finally_enough' },
    { t: '', s: '' },
    { t: 'fragment-banner', s: '═══════════════════════════════════════' },
    { t: 'fragment-banner', s: '  ♥ FRAGMENT 3/3 UNLOCKED' },
    { t: 'pink', s: '  "Will you be my Valentine?"' },
    { t: 'fragment-banner', s: '═══════════════════════════════════════' },
  ];

  // ── DOM ────────────────────────────────────────────────────────────
  const $boot = document.getElementById('boot-screen');
  const $bootText = document.getElementById('boot-text');
  const $termScreen = document.getElementById('terminal-screen');
  const $terminal = document.getElementById('terminal');
  const $output = document.getElementById('output');
  const $input = document.getElementById('cmd');
  const $prompt = document.getElementById('prompt');
  const $reveal = document.getElementById('reveal-screen');

  // ── Helpers ────────────────────────────────────────────────────────

  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function scrollToBottom() {
    $terminal.scrollTop = $terminal.scrollHeight;
  }

  function resolvePath(pathStr) {
    let parts;
    if (pathStr.startsWith('/')) {
      parts = pathStr.split('/').filter(Boolean);
    } else {
      parts = state.currentPath.split('/').filter(Boolean).concat(pathStr.split('/').filter(Boolean));
    }
    const resolved = [];
    for (const p of parts) {
      if (p === '..') resolved.pop();
      else if (p !== '.') resolved.push(p);
    }
    return '/' + resolved.join('/');
  }

  function getNode(absPath) {
    const parts = absPath.split('/').filter(Boolean);
    let node = fs;
    for (const p of parts) {
      if (!node || node._t === 'f') return null;
      node = node[p];
    }
    return node || null;
  }

  function updatePrompt() {
    let display = state.currentPath;
    if (display === '/home/manas') display = '~';
    else if (display.startsWith('/home/manas/')) display = '~/' + display.slice('/home/manas/'.length);
    $prompt.innerHTML = `<span style="color:var(--green)">manas@heart</span>:<span style="color:var(--blue)">${display}</span>$&nbsp;`;
  }

  // ── Output ─────────────────────────────────────────────────────────

  function addLine(text, cls) {
    const div = document.createElement('div');
    div.className = 'line' + (cls ? ' ' + cls : '');
    div.textContent = text;
    $output.appendChild(div);
    scrollToBottom();
  }

  function addStyledLines(lines) {
    for (const l of lines) {
      addLine(l.s, l.t);
    }
    scrollToBottom();
  }

  function addBlank() {
    addLine('');
  }

  function echoCommand(cmd) {
    const div = document.createElement('div');
    div.className = 'line cmd-echo';
    div.innerHTML = `<span class="prompt-text">${$prompt.innerHTML.replace('&nbsp;', '')}</span> ${escapeHtml(cmd)}`;
    $output.appendChild(div);
    scrollToBottom();
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ── Fragment Logic ─────────────────────────────────────────────────

  function unlockFragment(n) {
    if (state.fragments.has(n)) return;
    state.fragments.add(n);
    const el = document.getElementById('frag-' + n);
    if (el) {
      el.textContent = '♥';
      el.classList.add('found');
    }
    // After finding 2 fragments, nudge toward git if fragment 3 is still missing
    if (state.fragments.size === 2 && !state.fragments.has(3)) {
      setTimeout(() => {
        addLine('[SYSTEM] 2/3 found. Have you checked the commit history?', 'dim');
        scrollToBottom();
      }, 800);
    }
    if (state.fragments.size === 3) {
      setTimeout(() => triggerAssembly().catch(() => startReveal()), 1500);
    }
  }

  // ── Commands ───────────────────────────────────────────────────────

  const commands = {
    help() {
      addBlank();
      addLine('Available commands:', 'white');
      addBlank();
      addLine('  ls              list files & folders', 'accent');
      addLine('  cd <dir>        change directory', 'accent');
      addLine('  cat <file>      read a file', 'accent');
      addLine('  python <file>   run a python file', 'accent');
      addLine('  git log         view commit history', 'accent');
      addLine('  git show <hash> view a commit', 'accent');
      addLine('  pwd             where am I?', 'accent');
      addLine('  clear           clear terminal', 'accent');
    },

    ls(args) {
      const target = args[0] ? resolvePath(args[0]) : state.currentPath;
      const node = getNode(target);
      if (!node || node._t === 'f') {
        addLine(`ls: cannot access '${args[0] || '.'}': No such directory`, 'red');
        return;
      }
      const entries = Object.keys(node).filter((k) => !k.startsWith('_'));
      const display = entries.map((e) => {
        const child = node[e];
        if (child && child._t === 'd') return e + '/';
        return e;
      });
      addBlank();
      addLine(display.join('    '));
    },

    cd(args) {
      if (!args[0] || args[0] === '~') {
        state.currentPath = '/home/manas';
        updatePrompt();
        return;
      }
      const target = resolvePath(args[0]);
      const node = getNode(target);
      if (!node || node._t === 'f') {
        addLine(`cd: no such directory: ${args[0]}`, 'red');
        return;
      }
      state.currentPath = target;
      updatePrompt();
    },

    cat(args) {
      if (!args[0]) {
        addLine('cat: missing file argument', 'red');
        return;
      }
      const target = resolvePath(args[0]);
      const node = getNode(target);
      if (!node) {
        addLine(`cat: ${args[0]}: No such file or directory`, 'red');
        return;
      }
      if (node._t === 'd') {
        addLine(`cat: ${args[0]}: Is a directory`, 'red');
        return;
      }
      addBlank();
      if (node._c === 'dynamic') {
        showEncryptedFile();
        return;
      }
      addStyledLines(node._c);
      if (node._frag) unlockFragment(node._frag);
    },

    python(args) {
      if (!args[0]) {
        addLine('python: missing file argument', 'red');
        return;
      }
      const target = resolvePath(args[0]);
      const node = getNode(target);
      if (!node || node._t === 'd') {
        addLine(`python: can't open file '${args[0]}'`, 'red');
        return;
      }
      if (!node._runnable) {
        addLine(`python: ${args[0]}: not a runnable script`, 'dim');
        return;
      }
      addBlank();
      addStyledLines(node._runOutput);
      if (node._runFrag) unlockFragment(node._runFrag);
    },

    run(args) {
      commands.python(args);
    },

    pwd() {
      addLine(state.currentPath);
    },

    clear() {
      $output.innerHTML = '';
    },

    git(args) {
      if (!args[0]) {
        addLine('usage: git <command>', 'dim');
        return;
      }
      const sub = args[0];
      if (sub === 'log') {
        addBlank();
        for (const c of gitLog) {
          addLine(`commit ${c.hash}`, 'commit-hash');
          addLine(`Author: ${c.author}`, 'commit-author');
          addLine(`Date:   ${c.date}`, 'commit-date');
          addBlank();
          addLine(`    ${c.msg}`, 'white');
          addBlank();
        }
        addLine('Type \'git show a1b2c3d\' to see latest commit...', 'dim');
      } else if (sub === 'show') {
        const hash = args[1];
        if (hash !== 'a1b2c3d') {
          addLine(`fatal: bad object ${hash || '(none)'}`, 'red');
          return;
        }
        addBlank();
        addStyledLines(gitShowData);
        // This is THE trigger — collect all fragments and launch reveal
        unlockFragment(1);
        unlockFragment(2);
        unlockFragment(3);
      } else if (sub === 'status') {
        addBlank();
        addLine('On branch main', 'green');
        addLine('Your heart is up to date with \'origin/love\'.', '');
        addBlank();
        addLine('nothing to commit, working tree clean', 'dim');
      } else if (sub === 'blame') {
        addLine('All blame goes to Bumble. And destiny.', 'accent');
      } else {
        addLine(`git: '${sub}' is not a git command.`, 'red');
      }
    },

    whoami() {
      addLine('The one I\'ve been looking for.', 'pink');
    },

    ping(args) {
      const target = args[0] || 'heart';
      addLine(`PING ${target}: 64 bytes — 0ms latency.`, 'green');
      addLine('You\'re always close.', 'dim');
    },

    top() {
      addBlank();
      addLine('PID   PROCESS       CPU    MEM    SINCE', 'dim');
      addLine('1     love          100%   100%   14/03/2024', 'white');
      addLine('2     missing-you   99%    ∞      always', '');
      addLine('3     butterflies   78%    ♥      first-date', 'accent');
      addBlank();
    },

    man(args) {
      addBlank();
      addLine('LOVE(1)                    Heart Manual                    LOVE(1)', 'white');
      addBlank();
      addLine('NAME', 'accent');
      addLine('       love — the only manual you\'ll ever need', '');
      addBlank();
      addLine('SYNOPSIS', 'accent');
      addLine('       love [--forever] <manas> <uma>', '');
      addBlank();
      addLine('DESCRIPTION', 'accent');
      addLine('       An irreversible process that started on 14/03/2024.', '');
      addLine('       No known bugs. No planned rollback.', '');
      addBlank();
    },

    ssh() {
      addLine('Connection established to heart. You\'re already here.', 'green');
    },

    npm(args) {
      if (args[0] === 'install') {
        addLine('Installing feelings...', 'dim');
        addLine('Warning: node_modules of love is infinite.', 'accent');
        addLine('added ∞ packages in 0.14s', 'green');
      } else {
        addLine(`npm: '${args.join(' ')}' — not sure what that does here.`, 'dim');
      }
    },

    curl() {
      addLine('Error 301: Too many redirects.', 'red');
      addLine('My heart keeps redirecting to you.', 'dim');
    },

    make(args) {
      if (args[0] === 'love') {
        addLine('make: *** Permission granted.', 'green');
      } else {
        addLine(`make: *** No rule to make target '${args[0] || ''}'. Stop.`, 'red');
      }
    },

    vim() {
      addLine('Not even vim can help you quit this.', 'accent');
    },

    nano() {
      addLine('nano? In this terminal? Try \'cat\' instead.', 'dim');
    },

    exit() {
      addLine('There\'s no exit from love.', 'pink');
    },

    quit() {
      commands.exit();
    },

    sudo(args) {
      addLine('You already have root access... to my heart.', 'pink');
    },

    rm(args) {
      if (args[0] === '-rf' || args.join(' ').includes('-rf')) {
        addLine('Nice try. Love can\'t be deleted.', 'red');
      } else {
        addLine('Permission denied: these files are protected by love.', 'red');
      }
    },

    date() {
      addLine('February 14, 2026', 'accent');
      addLine('The day everything changes.', 'dim');
    },

    echo(args) {
      addLine(args.join(' '));
    },

    neofetch() {
      addBlank();
      addLine('         ♥♥    ♥♥         manas@heart.os', 'pink');
      addLine('       ♥♥♥♥♥♥♥♥♥♥        ──────────────', 'pink');
      addLine('      ♥♥♥♥♥♥♥♥♥♥♥♥       OS: HEART.OS v14.03.24', 'pink');
      addLine('       ♥♥♥♥♥♥♥♥♥♥        Host: Uma\'s Heart', 'pink');
      addLine('        ♥♥♥♥♥♥♥♥         Uptime: since Mar 14, 2024', 'pink');
      addLine('          ♥♥♥♥           Shell: love-bash', 'pink');
      addLine('           ♥♥            CPU: 100% (you)', 'pink');
      addLine('            ♥            Memory: Full of you', 'pink');
      addBlank();
    },

    docker(args) {
      if (args[0] === 'run') {
        addLine('Starting container: our_future...', 'dim');
        addLine('Container is running. No stop command available.', 'green');
      } else {
        addLine(`docker: command '${args[0] || ''}' — this heart runs natively.`, 'dim');
      }
    },

    history() {
      addBlank();
      state.history.forEach((cmd, i) => {
        addLine(`  ${i + 1}  ${cmd}`, i === state.history.length - 1 ? 'accent' : '');
      });
      addBlank();
    },
  };

  // ── Dynamic content ────────────────────────────────────────────────

  function showEncryptedFile() {
    const found = state.fragments.size;
    addLine('╔═══════════════════════════════════╗', 'dim');
    addLine('║     ENCRYPTED FILE                ║', 'accent');
    addLine('╠═══════════════════════════════════╣', 'dim');
    addLine('║  Algorithm: LOVE-256              ║', 'dim');
    addLine(`║  Status:    ${found < 3 ? 'LOCKED' : 'UNLOCKED'}               ║`, found < 3 ? 'red' : 'green');
    addLine('╠═══════════════════════════════════╣', 'dim');

    for (let i = 1; i <= 3; i++) {
      const has = state.fragments.has(i);
      const icon = has ? '♥' : '_';
      const text = has ? state.fragmentTexts[i] : '???';
      addLine(`║  [${icon}] Fragment ${i}: ${text}`, has ? 'pink' : 'dim');
    }

    addLine('╚═══════════════════════════════════╝', 'dim');

    if (found < 3) {
      addBlank();
      addLine(`${3 - found} fragment${3 - found > 1 ? 's' : ''} remaining.`, 'dim');
    }
  }

  // ── Command Processing ─────────────────────────────────────────────

  function processCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) return;

    state.history.push(trimmed);
    state.historyIdx = -1;
    echoCommand(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      addLine(`${cmd}: command not found. Type 'help' for available commands.`, 'red');
    }

    addBlank();
    scrollToBottom();
  }

  // ── Assembly & Reveal ──────────────────────────────────────────────

  async function triggerAssembly() {
    state.inputEnabled = false;
    $input.disabled = true;
    $input.style.display = 'none';

    addBlank();
    addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'accent');
    await sleep(400);
    addLine('[SYSTEM] All 3 fragments collected!', 'green');
    await sleep(600);
    addLine('[SYSTEM] Decrypting message.enc...', 'dim');
    await sleep(400);

    // Animated progress bar
    const progLine = document.createElement('div');
    progLine.className = 'line green';
    $output.appendChild(progLine);
    const barLen = 30;
    for (let i = 0; i <= barLen; i++) {
      const filled = '█'.repeat(i);
      const empty = '░'.repeat(barLen - i);
      const pct = Math.round((i / barLen) * 100);
      progLine.textContent = `[${filled}${empty}] ${pct}%`;
      scrollToBottom();
      await sleep(50);
    }

    await sleep(500);
    addBlank();
    addLine('[SYSTEM] Message assembled:', 'green');
    addBlank();
    addLine('  "You swiped right and my whole', 'white');
    addLine('   world started making sense.', 'white');
    addLine('   Will you be my Valentine?"', 'pink');
    addBlank();
    addLine('[SYSTEM] Deploying to heart...', 'dim');
    addLine('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'accent');
    scrollToBottom();

    await sleep(2000);
    startReveal();
  }

  // ── Photo Montage ────────────────────────────────────────────────

  const photos = [
    'images/1.jpg',
    'images/2.jpg',
    'images/3.jpg',
    'images/4.jpg',
    'images/5.jpg',
    'images/6.jpg',
    'images/7.jpg',
    'images/8.jpg',
    'images/9.jpg',
  ];

  function loadImage(src) {
    return new Promise((resolve) => {
      const testImg = new Image();
      testImg.onload = () => resolve(true);
      testImg.onerror = () => resolve(false);
      testImg.src = src;
      // Safety timeout — never hang more than 5s per image
      setTimeout(() => resolve(false), 5000);
    });
  }

  async function playMontage() {
    // Pre-check which photos actually exist
    const results = await Promise.all(photos.map((src) => loadImage(src)));
    const validPhotos = photos.filter((_, i) => results[i]);

    // Skip montage entirely if no photos loaded
    if (validPhotos.length === 0) return;

    const montage = document.getElementById('montage-screen');
    const img = document.getElementById('montage-img');
    montage.classList.remove('hidden');

    for (const src of validPhotos) {
      img.classList.remove('visible', 'fade-out');
      img.src = src;

      // Wait for this specific load (already cached from pre-check)
      await new Promise((resolve) => {
        if (img.complete && img.naturalWidth > 0) resolve();
        else { img.onload = resolve; img.onerror = resolve; }
        setTimeout(resolve, 3000); // safety
      });

      // Fade in
      await sleep(100);
      img.classList.add('visible');

      // Hold
      await sleep(3000);

      // Fade out
      img.classList.add('fade-out');
      await sleep(800);
    }

    // Fade out montage screen
    montage.style.transition = 'opacity 1s ease';
    montage.style.opacity = '0';
    await sleep(1000);
    montage.classList.add('hidden');
  }

  // ── Reveal ─────────────────────────────────────────────────────────

  async function startReveal() {
    try {
      // Fade out terminal
      $termScreen.style.transition = 'opacity 1.5s ease';
      $termScreen.style.opacity = '0';
      await sleep(1500);
      $termScreen.classList.add('hidden');

      // Play photo montage (skips gracefully if no photos)
      await playMontage();
      await sleep(500);
    } catch (_) {
      // Ensure we always get to the reveal even if montage errors
      $termScreen.classList.add('hidden');
      document.getElementById('montage-screen').classList.add('hidden');
    }

    // Show valentine question — always reaches here
    $reveal.classList.remove('hidden');
    startHeartsCanvas();

    await sleep(500);
    const msg = document.getElementById('reveal-message');
    msg.innerHTML = 'You swiped right and my whole world started making sense.<span class="valentine-question">Will you be my Valentine?</span>';
    msg.classList.add('visible');

    await sleep(1500);
    const btns = document.getElementById('reveal-buttons');
    btns.classList.remove('hidden');
    const noBtn = document.getElementById('btn-no');
    noBtn.style.position = 'relative';
    await sleep(50);
    btns.classList.add('visible');
  }

  // ── Hearts Canvas ──────────────────────────────────────────────────

  function startHeartsCanvas() {
    const canvas = document.getElementById('hearts-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const hearts = [];

    function spawnHeart() {
      hearts.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: 8 + Math.random() * 16,
        speed: 0.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.01 + Math.random() * 0.02,
        opacity: 0.2 + Math.random() * 0.5,
      });
    }

    function drawHeart(ctx, x, y, size) {
      ctx.beginPath();
      ctx.moveTo(x, y - size * 0.3);
      ctx.bezierCurveTo(x - size * 0.5, y - size, x - size, y - size * 0.3, x, y + size * 0.4);
      ctx.moveTo(x, y - size * 0.3);
      ctx.bezierCurveTo(x + size * 0.5, y - size, x + size, y - size * 0.3, x, y + size * 0.4);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.08) spawnHeart();

      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.y -= h.speed;
        h.wobble += h.wobbleSpeed;
        h.x += Math.sin(h.wobble) * 0.5;

        ctx.fillStyle = `rgba(236, 72, 153, ${h.opacity})`;
        drawHeart(ctx, h.x, h.y, h.size);

        if (h.y < -30) hearts.splice(i, 1);
      }
      requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ── No Button Dodge ────────────────────────────────────────────────

  function initButtons() {
    const yesBtn = document.getElementById('btn-yes');
    const noBtn = document.getElementById('btn-no');
    let dodgeCount = 0;

    noBtn.addEventListener('mouseenter', () => {
      dodgeCount++;
      const parent = document.getElementById('reveal-content');
      const rect = parent.getBoundingClientRect();
      const maxX = rect.width - 80;
      const maxY = 200;
      const rx = (Math.random() - 0.5) * maxX;
      const ry = Math.random() * maxY;
      noBtn.style.transform = `translate(${rx}px, ${ry}px)`;

      if (dodgeCount >= 5) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
      }
    });

    // Touch support for no button dodge
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      dodgeCount++;
      const parent = document.getElementById('reveal-content');
      const rect = parent.getBoundingClientRect();
      const maxX = rect.width - 80;
      const maxY = 200;
      const rx = (Math.random() - 0.5) * maxX;
      const ry = Math.random() * maxY;
      noBtn.style.transform = `translate(${rx}px, ${ry}px)`;

      if (dodgeCount >= 5) {
        noBtn.style.opacity = '0';
        noBtn.style.pointerEvents = 'none';
      }
    });

    yesBtn.addEventListener('click', () => {
      celebrate();
    });
  }

  // ── Celebration ────────────────────────────────────────────────────

  function celebrate() {
    const celeb = document.getElementById('celebration');
    celeb.classList.remove('hidden');

    startConfetti();

    const text = document.getElementById('celeb-text');
    text.innerHTML = 'It\'s a date!<span class="celeb-sub">Happy Valentine\'s Day, Manas</span>';
    setTimeout(() => text.classList.add('visible'), 300);
  }

  function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const colors = ['#ec4899', '#f59e0b', '#22c55e', '#3b82f6', '#ef4444', '#fff'];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 100,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: -Math.random() * 20 - 5,
        w: 4 + Math.random() * 8,
        h: 4 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 15,
        gravity: 0.25 + Math.random() * 0.15,
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.rotSpeed;

        if (p.y < canvas.height + 50) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rot * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      }
      if (alive) requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // ── Boot Sequence ──────────────────────────────────────────────────

  async function boot() {
    const lines = [
      { text: 'HEART.OS v14.03.24', cls: 'boot-accent', delay: 0 },
      { text: '', cls: '', delay: 100 },
      { text: 'Booting...', cls: 'boot-system', delay: 300 },
      { text: '', cls: '', delay: 100 },
      { text: 'Loading memories.......... ', cls: 'boot-system', delay: 400, progress: true },
      { text: 'Loading feelings.......... ', cls: 'boot-system', delay: 400, progress: true },
      { text: 'Loading butterflies....... ', cls: 'boot-warn', delay: 400, progressWarn: true },
      { text: '', cls: '', delay: 200 },
      { text: 'System ready.', cls: 'boot-ok', delay: 300 },
      { text: '', cls: '', delay: 200 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-system', delay: 100 },
      { text: '', cls: '', delay: 50 },
      { text: ' Hey Manas.', cls: 'boot-white', delay: 400 },
      { text: ' Something\'s waiting for you here.', cls: 'boot-white', delay: 300 },
      { text: '', cls: '', delay: 100 },
      { text: ' Type \'help\' to start.', cls: 'boot-system', delay: 200 },
      { text: '', cls: '', delay: 50 },
      { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', cls: 'boot-system', delay: 100 },
    ];

    for (const line of lines) {
      await sleep(line.delay);
      const span = document.createElement('span');
      span.className = line.cls;

      if (line.progress) {
        span.textContent = line.text;
        $bootText.appendChild(span);
        const ok = document.createElement('span');
        ok.className = 'boot-ok';
        ok.textContent = 'done';
        await sleep(300);
        $bootText.appendChild(ok);
        $bootText.appendChild(document.createTextNode('\n'));
      } else if (line.progressWarn) {
        span.textContent = line.text;
        $bootText.appendChild(span);
        const warn = document.createElement('span');
        warn.className = 'boot-error';
        warn.textContent = 'overflow (too many)';
        await sleep(400);
        $bootText.appendChild(warn);
        $bootText.appendChild(document.createTextNode('\n'));
      } else {
        span.textContent = line.text;
        $bootText.appendChild(span);
        $bootText.appendChild(document.createTextNode('\n'));
      }
    }

    await sleep(1200);

    // Transition to terminal
    $boot.style.transition = 'opacity 0.8s ease';
    $boot.style.opacity = '0';

    setTimeout(() => {
      $boot.style.display = 'none';
      $termScreen.classList.remove('hidden');
      requestAnimationFrame(() => {
        $termScreen.classList.add('visible');
        state.inputEnabled = true;
        $input.focus();

        addBlank();
      });
    }, 800);
  }

  // ── Input Handling ─────────────────────────────────────────────────

  function initInput() {
    $input.addEventListener('keydown', (e) => {
      if (!state.inputEnabled) return;

      if (e.key === 'Enter') {
        const val = $input.value;
        $input.value = '';
        processCommand(val);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (state.history.length === 0) return;
        if (state.historyIdx === -1) state.historyIdx = state.history.length;
        state.historyIdx = Math.max(0, state.historyIdx - 1);
        $input.value = state.history[state.historyIdx];
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (state.historyIdx === -1) return;
        state.historyIdx++;
        if (state.historyIdx >= state.history.length) {
          state.historyIdx = -1;
          $input.value = '';
        } else {
          $input.value = state.history[state.historyIdx];
        }
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        commands.clear();
      }
    });

    // Keep focus on input
    document.addEventListener('click', (e) => {
      if (state.inputEnabled && !e.target.closest('#reveal-screen') && !e.target.closest('#celebration')) {
        $input.focus();
      }
    });
  }

  // ── Init ───────────────────────────────────────────────────────────

  function init() {
    initInput();
    initButtons();
    updatePrompt();
    boot();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
