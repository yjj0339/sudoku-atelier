(() => {
  'use strict';
  const S = window.Sudoku, LEVELS = window.SUDOKU_LEVELS;
  const $ = id => document.getElementById(id);
  const KEY = 'sudoku-atelier-v1';
  const ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    book: '<path d="M12 5v15M12 5C8 2 3 3 3 3v15s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2Z"/><path d="M6 7h3m6 0h3M6 11h3m6 0h3"/>',
    chart: '<path d="M4 20h17M7 16V9m5 7V4m5 12v-5"/>',
    settings: '<path d="m10 3-1 3-3 1-3 2 1 3-1 3 3 2 3 1 1 3h4l1-3 3-1 3-2-1-3 1-3-3-2-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', pause: '<path d="M9 5v14m6-14v14"/>',
    play: '<path d="m8 4 12 8-12 8Z"/>', moon: '<path d="M20.5 13A9 9 0 0 1 11 3.5 9 9 0 1 0 20.5 13Z"/>',
    undo: '<path d="M4 10h10a6 6 0 0 1 0 12M4 10l5-5m-5 5 5 5" transform="translate(0 -3)"/>',
    redo: '<path d="M20 7H10a6 6 0 0 0 0 12m10-12-5-5m5 5-5 5"/>',
    erase: '<path d="m5 17-2-2a2 2 0 0 1 0-3l8-8a2 2 0 0 1 3 0l6 6a2 2 0 0 1 0 3l-6 6H7Zm2-9 10 10M13 19h8"/>',
    pencil: '<path d="m14 4 6 6M4 20l5-1L21 7a2 2 0 0 0 0-3l-1-1a2 2 0 0 0-3 0L5 15Z"/>',
    scan: '<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 8h2v2H8Zm6 0h2v2h-2ZM8 14h2v2H8Zm6 0h2v2h-2Z"/>',
    bulb: '<path d="M9 18h6m-5 3h4M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 2H9s0-1-1-2Z"/>',
    sparkles: '<path d="m12 3 2.7 6.3L21 12l-6.3 2.7L12 21l-2.7-6.3L3 12l6.3-2.7ZM20 2v4m-2-2h4M3 18v4m-2-2h4"/>',
    leaf: '<path d="M20 3C5 1 1 9 6 15c6 6 15 1 14-12ZM4 20 16 8"/>',
    keyboard: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 12h1m4 0h1m4 0h1M7 16h10"/>',
    pointer: '<path d="m5 3 5 17 3-7 7-3Z"/>', help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 1 1 5 2c-2 1-2 1-2 3m0 3h.01"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>', lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
    trophy: '<path d="M7 3h10v7a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4m-5 3v6m-4 0h8"/>',
    check: '<path d="m5 12 4 4L19 6"/>', download: '<path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/>', restart: '<path d="M3 10a9 9 0 1 1 1 8M3 4v6h6"/>',
    back:'<path d="m15 5-7 7 7 7"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',sliders:'<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="8" cy="6" r="2" fill="currentColor"/><circle cx="16" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="18" r="2" fill="currentColor"/>',layers:'<path d="m3 7 9-5 9 5-9 5Zm0 5 9 5 9-5M3 17l9 5 9-5"/>',shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',zap:'<path d="m13 2-8 12h6l-1 8 9-13h-6Z"/>',palette:'<path d="M12 3a9 9 0 1 0 0 18h1a2 2 0 0 0 1-4 2 2 0 0 1 1-4h3a3 3 0 0 0 3-3c0-4-4-7-9-7Z"/><path d="M7 8h.01M11 6h.01M16 7h.01M6 12h.01"/>',volume:'<path d="m11 4-6 5H2v6h3l6 5Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  };
  const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ICONS.sparkles}</svg>`;
  const icons = (el = document) => el.querySelectorAll('[data-icon]').forEach(e => e.innerHTML = icon(e.dataset.icon));
  const escape = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const CHAPTERS = [
    ['初见', '轻轻启程', '入门', '熟悉行、列、宫。只要耐心观察，答案就在眼前。'],
    ['微光', '看见线索', '入门', '找到唯一候选数，建立属于你的解题节奏。'],
    ['新芽', '思路萌发', '基础', '比较不同区域，把零散的线索慢慢连起来。'],
    ['听风', '捕捉隐线', '进阶', '有些数字藏在不起眼的位置。寻找隐性唯一数。'],
    ['涟漪', '环环相扣', '进阶', '一处小小的突破，也能带动整张棋盘。'],
    ['远山', '更进一步', '挑战', '在行、列和宫之间寻找锁定的候选，学会区块排除。'],
    ['星河', '重构视角', '专家', '区块排除与数对关系逐渐交织，观察候选数的组合。'],
    ['迷境', '突破边界', '专家', '区块排除、数对与矩形关系。用多种技巧交叉推理。'],
    ['天穹', '深度推演', '大师', '复杂约束相互交织，开始接触分支验证。'],
    ['归一', '终极之境', '宗师', '最后十关为高难推演关。第 100 关是本题库搜索复杂度最高的一关。'],
  ];
  const LESSONS = [
    ['游戏规则', '从这里开始', '把数字 1–9 填入空格。每一行、每一列、每个 3×3 宫，都必须包含 1–9 且不重复。深色数字是固定题目，紫色数字是你的填写。每道题都只有一个答案。'],
    ['唯一候选数', '入门', '看一个空格所在的行、列、宫，把已经出现的数字划掉。如果只剩一个候选数字，它就是答案。例如排除 1、2、3、4、6、7、8、9 后，这格只能填 5。'],
    ['隐性唯一数', '基础', '反过来寻找一个数字的落点：如果某一行、列或宫里，只有一个格子能够放 7，即使这个格子还有别的候选数，也必须填 7。'],
    ['区块排除', '进阶', '如果某宫中数字 3 的候选位置全落在同一行，说明这一行的 3 必须位于这个宫。因此同一行中、这个宫之外的其他格子可以排除 3。行与宫、列与宫都可以互相排除。'],
    ['显性与隐性数对', '专家', '显性数对：同一单位中两个格子都只剩 {2, 8}，它们会占用这两个数字，其他格子便可排除 2 和 8。隐性数对：两个数字只能落在同样的两个格子内，那么这两个格子的其他候选数都可删除。'],
    ['X-Wing 矩形排除', '专家', '某个数字在两行里都只有两个候选位置，而且恰好位于相同的两列，形成一个矩形。这个数字必定落在矩形的一对对角上，因此对应两列中其他格子的这个候选数可以排除。行列可以交换。'],
    ['分支验证', '大师', '当当前逻辑技巧无法继续时，对候选数较少的格子建立假设，再沿着假设检查整盘约束；遇到矛盾就回退。AI 会明确标注使用搜索验证的步骤，不把它伪装成简单排除。可以先记笔记，再逐个检查假设。'],
    ['高效操作', '小窍门', '点格子再点数字。开启笔记后，可以给空格添加多个候选数；自动笔记会根据当前棋盘重建候选数。连续填数模式先点一个数字，再逐格填入。撤销和重做支持数字及笔记。按 N 切换笔记，H 打开提示，空格暂停。'],
  ];
  const defaults = () => ({ version: 2, active: 'level-1', games: {}, results: {}, settings: { sound: false, vibration: true, autoCheck: true, highlight: true, cleanNotes: true, theme: 'light', accent:'violet',material:'frosted',keypad:'double',pace:'snappy',contrast: false, large: false, motion: true, inputMode: 'cell' }, stats: { notes: 0, hints: 0 }, dailySeed: null });
  let storageOK = true, data = defaults();
  function normalize(raw) {
    if (!raw || ![1,2].includes(raw.version) || typeof raw.games !== 'object' || !raw.games || typeof raw.results !== 'object' || !raw.results) throw Error('存档格式不正确');
    const out = defaults(), keys = Object.keys(raw.games);
    if (keys.length > 600) throw Error('存档内容过多');
    const isKey = k => /^level-([1-9]\d?|100)$/.test(k) || /^daily-\d{4}-\d{2}-\d{2}$/.test(k) || /^practice-([1-9]\d?|100)$/.test(k);
    const nums = (a, max) => Array.isArray(a) && a.length === 81 && a.every(n => Number.isInteger(n) && n >= 0 && n <= max);
    for (const k of keys) {
      if (!isKey(k)) continue;
      const g = raw.games[k];
      if (!g || !nums(g.board,9) || !nums(g.notes,511) || !/^\d{81}$/.test(g.puzzle) || !/^[1-9]{81}$/.test(g.solution)) throw Error('棋盘数据不完整');
      const puzzle = [...g.puzzle].map(Number), solution = [...g.solution].map(Number);
      if (!S.valid(solution) || puzzle.some((v,i) => v && (v !== solution[i] || g.board[i] !== v)) || S.solve(puzzle,2).count !== 1) throw Error('题目校验未通过');
      // Valid earlier puzzles stay playable after a difficulty-pack update.
      const replacement=k.startsWith('daily')?null:LEVELS[Number(k.split('-')[1])-1];
      if((g.edition||1)<2&&replacement&&!g.completed&&!g.mistakes&&!g.hints&&!g.history?.length&&g.board.every((v,i)=>v===puzzle[i])&&g.notes.every(v=>!v)){out.games[k]=makeGame(replacement,k);continue;}
      out.games[k] = { ...makeGame(g, k), edition:g.edition||1,aiFilled:clamp(g.aiFilled,0,99999),board: g.board.slice(), notes: g.notes.slice(), elapsed: clamp(g.elapsed,0,31536000), mistakes: clamp(g.mistakes,0,99999), hints: clamp(g.hints,0,99999), completed: !!g.completed && g.board.every((v,i)=>v===solution[i]), selected: clamp(g.selected,-1,80), history: [], future: [] };
      for (const type of ['history','future']) if (Array.isArray(g[type])) out.games[k][type] = g[type].slice(-150).filter(h => h && nums(h.board,9) && nums(h.notes,511) && !puzzle.some((v,i)=>v&&h.board[i]!==v)).map(h => ({ board:h.board.slice(),notes:h.notes.slice(),selected:clamp(h.selected,0,80) }));
    }
    for (const [k,r] of Object.entries(raw.results)) if (isKey(k) && r && !k.startsWith('practice')) out.results[k] = { stars:clamp(r.stars,1,3),time:clamp(r.time,0,31536000),mistakes:clamp(r.mistakes,0,99999),hints:clamp(r.hints,0,99999),aiAssisted:!!r.aiAssisted,independent:r.independent===true||(!r.aiAssisted&&!r.hints),date:typeof r.date==='string'?r.date.slice(0,10):'',clears:clamp(r.clears,1,9999) };
    const s = raw.settings || {};
    Object.keys(out.settings).forEach(k => { if (typeof out.settings[k] === 'boolean' && typeof s[k] === 'boolean') out.settings[k] = s[k]; });
    if (['light','night'].includes(s.theme)) out.settings.theme = s.theme;
    if (['cell','number'].includes(s.inputMode)) out.settings.inputMode = s.inputMode;
    for(const [k,values] of Object.entries({accent:['violet','mint','peach'],material:['frosted','clear','solid'],keypad:['double','single'],pace:['snappy','gentle']}))if(values.includes(s[k]))out.settings[k]=s[k];
    out.active = typeof raw.active==='string' && out.games[raw.active] ? raw.active : 'level-1';
    out.stats = { notes:clamp(raw.stats?.notes,0,999999),hints:clamp(raw.stats?.hints,0,999999) };
    return out;
  }
  function clamp(n,a,b) { return Number.isFinite(n)?Math.min(b,Math.max(a,Math.floor(n))):a; }
  try { const saved = localStorage.getItem(KEY); if (saved) { const raw=JSON.parse(saved);if(raw.version===1&&!localStorage.getItem(KEY+'-backup'))localStorage.setItem(KEY+'-backup',saved);data = normalize(raw); } } catch(e) { storageOK = false; }
  let game, selected = -1, noteMode = false, heldNumber = 0, paused = false, screen = '', chapterTab = 0, hintStep = null, hintFocus = [], demo = null, aiTimer = null, aiRunning = false, aiSpeed = 850, aiSteps = 0, lastTick = performance.now(), toastTimer = null, audio = null, lastFocus = null, pendingConfirm = null;
  const panelStack=[];let analysisStep=null,selectedLevel=1,answerMode='all',drag=null,dragFrame=0;
  function makeGame(p, key) { return { key, edition:p.edition||2,aiFilled:0,puzzle:p.puzzle, solution:p.solution, board:[...p.puzzle].map(Number),notes:Array(81).fill(0),elapsed:0,mistakes:0,hints:0,selected:-1,history:[],future:[],completed:false }; }
  function currentId() { return Number(game.key.split('-')[1]) || 1; }
  function unlocked() { let n = 1; while (n < 100 && data.results[`level-${n}`]) n++; return n; }
  function isPractice() { return game.key.startsWith('practice'); }
  function isDaily() { return game.key.startsWith('daily'); }
  function dateKey() { const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function formatTime(s) { s = Math.floor(s); const h = Math.floor(s/3600);return (h?`${h}:`:'')+`${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`; }
  function save() {
    if (game && !demo) { game.selected=selected;data.games[game.key]=game; }
    try { localStorage.setItem(KEY,JSON.stringify(data));storageOK=true; } catch(e) { if(storageOK) toast('存档空间不足，请导出进度备份');storageOK=false; }
  }
  function load(key) {
    if(demo) endDemo(false);
    if(game)save();
    if(!data.games[key]) {
      let puzzle;
      if(key.startsWith('daily')) { const seed=Number(key.slice(6).replaceAll('-',''));puzzle=S.generate(seed,30+seed%4); }
      else puzzle=LEVELS[Number(key.split('-')[1])-1];
      if(!puzzle)return;
      data.games[key]=makeGame(puzzle,key);
    }
    game=data.games[key]; data.active=key;selected=game.selected;noteMode=false;heldNumber=0;hintFocus=[];paused=false;lastTick=performance.now();closeModal();render();save();
  }
  function applySettings() {
    document.body.dataset.theme=data.settings.theme;
    document.body.classList.toggle('high-contrast',data.settings.contrast);
    document.body.classList.toggle('large-digits',data.settings.large);
    document.body.classList.toggle('reduce-motion',!data.settings.motion);
    for(const k of ['accent','material','keypad','pace'])document.body.dataset[k]=data.settings[k];
    document.querySelector('meta[name="theme-color"]').content=data.settings.theme==='night'?'#211f2b':'#f6f5fa';
  }
  function mount() {
    $('board').innerHTML=Array.from({length:81},(_,i)=>`<button class="cell" role="gridcell" data-cell="${i}" tabindex="${i===0?0:-1}" aria-label="${S.name(i)}"></button>`).join('');
    $('number-pad').innerHTML=Array.from({length:9},(_,i)=>`<button class="number-key" data-number="${i+1}" aria-label="填入 ${i+1}"><strong>${i+1}</strong><small>9</small><span class="key-light"></span></button>`).join('')+`<button class="key-erase" data-action="erase" aria-label="擦除所选格子">${icon('erase')}<span>擦除</span></button>`;
    icons();applySettings();load(data.active);
    if(!storageOK)setTimeout(()=>toast('未能读取旧存档，已启用新棋盘；可在设置中导出备份'),800);
  }
  function renderBoard() {
    const cells=$('board').children, value=selected>=0?game.board[selected]:heldNumber;
    const hasPeer=selected>=0?new Set(S.peers[selected]):new Set();
    const solution=[...game.solution].map(Number);
    for(let i=0;i<81;i++) {
      const cell=cells[i],v=game.board[i],fixed=Number(game.puzzle[i])!==0;
      const conflict=!!v&&S.peers[i].some(j=>game.board[j]===v);
      const error=!fixed&&v&&(conflict||(data.settings.autoCheck&&v!==solution[i]));
      cell.className='cell'+(fixed?' given':' user')+(data.settings.highlight&&hasPeer.has(i)?' peer':'')+(data.settings.highlight&&value&&v===value?' same':'')+(hintFocus.includes(i)?' focus-hint':'')+(selected===i?' selected':'')+(error?' error':'');
      cell.setAttribute('aria-selected',String(selected===i));cell.setAttribute('aria-readonly',String(fixed));cell.tabIndex=(selected===i||(selected<0&&i===0))?0:-1;
      cell.setAttribute('aria-label',`${S.name(i)}，${v?v+(fixed?'，已知数字':'，已填数字'):'空格'}${error?'，错误':''}${!v&&game.notes[i]?'，候选数 '+S.bits(game.notes[i]).join('、'):''}`);
      const content=v?`<span class="digit">${v}</span>`:game.notes[i]?`<span class="notes">${Array.from({length:9},(_,j)=>`<span class="${value===j+1?'note-emphasis':''}">${game.notes[i]&(1<<j)?j+1:''}</span>`).join('')}</span>`:'';if(cell.innerHTML!==content)cell.innerHTML=content;
    }
    for(const e of $('number-pad').querySelectorAll('[data-number]')) {
      const n=Number(e.dataset.number),remaining=Math.max(0,9-game.board.filter(v=>v===n).length);
      e.classList.toggle('complete',remaining===0);e.classList.toggle('active',heldNumber===n&&data.settings.inputMode==='number');e.querySelector('small').textContent=remaining?remaining:'✓';
      e.setAttribute('aria-label',`数字 ${n}，剩余 ${remaining} 个`);
    }
    $('undo-button').disabled=!game.history.length||!!demo||game.completed;
    $('redo-button').disabled=!game.future.length||!!demo||game.completed;
    $('notes-button').classList.toggle('active',noteMode);$('notes-button').setAttribute('aria-pressed',String(noteMode));$('note-badge').textContent=noteMode?'ON':'OFF';
    $('pause-cover').hidden=!paused;
    $('filled-count').textContent=`已填 ${game.board.filter(Boolean).length} / 81`;
    $('mistakes').textContent=`错误 ${game.mistakes}`;
    $('timer').textContent=formatTime(game.elapsed);
    $('input-mode').innerHTML=icon('pointer')+(data.settings.inputMode==='number'?'连续填数 · 先选数字':'先选格，再填数');
    const status=$('board-status');status.classList.toggle('demo-ribbon',!!demo);
    status.innerHTML=`<span class="status-dot"></span>${demo?'AI 演示中 · 不计入闯关成绩':game.completed?'本题已完成，继续下一段旅程':noteMode?'笔记模式 · 再点一次数字可取消':data.settings.inputMode==='number'?(heldNumber?`连续填入 ${heldNumber} · 点击空格`:'先选择下方数字，再点空格'):selected>=0?S.name(selected)+(Number(game.puzzle[selected])?' · 已知数字':' · 等待你的答案'):'选择一个空格，开始吧'}`;
  }
  function render() {
    const c=CHAPTERS[Math.floor((currentId()-1)/10)]||CHAPTERS[0],lvl=LEVELS[currentId()-1];
    $('chapter-label').textContent=isDaily()?`DAILY MOMENT · ${game.key.slice(6)}`:`CHAPTER ${String(Math.floor((currentId()-1)/10)+1).padStart(2,'0')} · ${c[0]}`;
    $('level-title').innerHTML=isDaily()?'每日一题 <span>今天的专注时光</span>':`${isPractice()?'自由练习 · ':''}第 ${String(currentId()).padStart(2,'0')} 关 <span>${c[1]}</span>`;
    const tier=isDaily()?S.rate([...game.puzzle].map(Number)).tier:lvl.rating.tier;
    $('difficulty-label').textContent=isDaily()?'每日挑战':c[2];
    $('difficulty-dots').innerHTML=Array.from({length:6},(_,i)=>`<b class="difficulty-dot ${i<tier?'on':''}"></b>`).join('');
    $('difficulty-label').title=`逻辑等级 ${tier}/6`;
    const count=Object.keys(data.results).filter(k=>k.startsWith('level')).length;
    $('side-completed').textContent=count;$('side-progress').style.width=count+'%';
    $('side-message').textContent=count===100?'一百次突破，你已抵达归一之境。':`下一站：第 ${unlocked()} 关 · ${CHAPTERS[Math.floor((unlocked()-1)/10)][0]}`;
    document.querySelectorAll('[data-nav]').forEach(e=>e.classList.toggle('active',e.closest('.mobile-nav')?e.dataset.nav==='play':e.dataset.nav===(isDaily()?'daily':'journey')));
    const tip=Math.min(6,Math.max(1,tier));$('tip-title').textContent=LESSONS[tip][0];$('tip-copy').textContent=LESSONS[tip][2].split('。')[0]+'。';
    renderBoard();
  }
  function toast(s) { $('toast').textContent=s;$('toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('visible'),2600); }
  function feedback(type='tap') {
    if(data.settings.vibration&&navigator.vibrate)navigator.vibrate(type==='error'?[20,30,20]:8);
    if(!data.settings.sound)return;
    try{audio=audio||new(window.AudioContext||window.webkitAudioContext)();if(audio.state==='suspended')audio.resume();const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.value=type==='error'?180:type==='win'?784:440+Math.random()*100;g.gain.setValueAtTime(.035,audio.currentTime);g.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.13);o.connect(g).connect(audio.destination);o.start();o.stop(audio.currentTime+.15);}catch(e){}
  }
  function remember() { game.history.push({board:game.board.slice(),notes:game.notes.slice(),selected});if(game.history.length>150)game.history.shift();game.future=[]; }
  function canEdit() { if(paused){toast('先继续游戏，再填写数字');return false;}if(demo){toast('大师正在演示，返回棋盘后可继续填写');return false;}if(game.completed){toast('这一题已经完成，去关卡地图继续吧');return false;}return true; }
  function selectCell(i) { if(paused||demo)return;selected=i;hintFocus=[];if(data.settings.inputMode==='number'&&heldNumber&&!Number(game.puzzle[i]))input(heldNumber);else{renderBoard();save();} }
  function input(n) {
    if(!canEdit())return;
    if(selected<0){toast('先选一个空格');return;}
    if(Number(game.puzzle[selected])){toast('这是题目给出的数字，不能修改');return;}
    if(noteMode&&n){
      if(game.board[selected]){toast('先擦除数字，再添加笔记');return;}
      remember();game.notes[selected]^=1<<(n-1);data.stats.notes++;feedback();renderBoard();save();return;
    }
    if(game.board[selected]===n&&n)return;
    if(!n&&!game.board[selected]&&!game.notes[selected])return;
    remember();game.board[selected]=n;game.notes[selected]=0;hintFocus=[];
    const correct=!n||n===Number(game.solution[selected]);
    if(n&&!correct){game.mistakes++;if(data.settings.autoCheck)feedback('error');}
    else feedback();
    if(n&&correct&&data.settings.cleanNotes)S.peers[selected].forEach(i=>game.notes[i]&=~(1<<(n-1)));
    renderBoard();if(n)$('board').children[selected].classList.add('pop');
    if(n&&correct&&S.units.some(u=>u.includes(selected)&&u.every(i=>game.board[i]===Number(game.solution[i])))){$('board').classList.remove('breathe');void $('board').offsetWidth;$('board').classList.add('breathe');}
    checkWin();save();
  }
  function history(dir) {
    if(!canEdit())return;const from=dir==='undo'?game.history:game.future,to=dir==='undo'?game.future:game.history;if(!from.length)return;
    to.push({board:game.board.slice(),notes:game.notes.slice(),selected});const state=from.pop();game.board=state.board;game.notes=state.notes;selected=state.selected;hintFocus=[];renderBoard();save();
  }
  function autoNotes() {if(!canEdit())return;remember();game.notes=S.candidates(game.board);data.stats.notes++;renderBoard();save();toast('已根据当前棋盘重新生成候选数');}
  function openModal(kind,title,eyebrow,html,root=false) {
    const wasOpen=$('modal').open;
    if(!wasOpen){lastFocus=document.activeElement;panelStack.length=0;}
    else if(root)panelStack.length=0;
    else if(screen!==kind)panelStack.push({kind:screen,title:$('modal-title').textContent,eyebrow:$('modal-eyebrow').textContent,html:$('modal-content').innerHTML,scroll:$('modal-content').scrollTop,focus:document.activeElement?.outerHTML});
    if(screen==='ai'&&kind!=='ai'){stopAI();if(demo)endDemo(false);}
    screen=kind;$('modal-title').textContent=title;$('modal-eyebrow').textContent=eyebrow;$('modal-content').innerHTML=html;icons($('modal'));$('modal').dataset.screen=kind;updatePanelChrome();
    if(!wasOpen)$('modal').showModal();$('modal-content').scrollTop=0;document.body.classList.add('panel-open');
    animatePanel(wasOpen?1:0);$('modal-content').querySelector('button:not(:disabled),input,select')?.focus({preventScroll:true});
  }
  function animatePanel(direction){
    if(!data.settings.motion||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const el=direction===0?$('modal'):$('modal-content');const time=data.settings.pace==='gentle'?320:220;
    el.animate(direction===0?[{opacity:0,transform:'translateY(28px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}]:[{opacity:.2,transform:`translateX(${direction*18}px)`},{opacity:1,transform:'translateX(0)'}],{duration:time,easing:'cubic-bezier(.2,.8,.2,1)'});
  }
  function updatePanelChrome(){
    $('panel-back').hidden=!panelStack.length;$('panel-trail').hidden=!panelStack.length;
    $('panel-trail').textContent=panelStack.map(p=>p.title).join('  /  ');$('modal').dataset.depth=String(panelStack.length);
    document.querySelectorAll('.mobile-nav [data-nav]').forEach(e=>e.classList.toggle('active',e.dataset.nav===(!screen?'play':['journey','chapter','level-detail','daily'].includes(screen)?'journey':['ai','ai-home','analysis','answer','hint'].includes(screen)?'ai':['learn','lesson'].includes(screen)?'learn':'profile')));
  }
  function backPanel(){
    if(!panelStack.length){closeModal();return;}
    if(screen==='ai'){stopAI();if(demo)endDemo(false);}
    const p=panelStack.pop();screen=p.kind;$('modal-title').textContent=p.title;$('modal-eyebrow').textContent=p.eyebrow;$('modal-content').innerHTML=p.html;$('modal').dataset.screen=screen;
    $('modal-content').querySelectorAll('[data-setting]').forEach(e=>{if(e.type==='checkbox')e.checked=data.settings[e.dataset.setting];else e.value=data.settings[e.dataset.setting];});
    icons($('modal'));updatePanelChrome();$('modal-content').scrollTop=p.scroll;animatePanel(-1);$('modal-content').querySelector('button:not(:disabled),input,select')?.focus({preventScroll:true});renderBoard();
  }
  function closeModal() { if(screen==='ai'){stopAI();if(demo)endDemo(false);}cancelAnimationFrame(dragFrame);$('modal').style.transform='';$('modal').close();panelStack.length=0;screen='';hintFocus=[];hintStep=null;document.body.classList.remove('panel-open');updatePanelChrome();if(game)renderBoard();if(lastFocus&&document.contains(lastFocus))lastFocus.focus({preventScroll:true});lastTick=performance.now(); }
  function confirmAction(title,copy,label,fn) {pendingConfirm=fn;openModal('confirm',title,'A MOMENT TO DECIDE',`<p class="modal-description">${copy}</p><div class="modal-actions"><button class="secondary" data-action="close">再想一下</button><button class="primary" data-action="confirm">${label}</button></div>`);}
  function menuRow(action,glyph,title,copy,tag=''){return `<button class="menu-row" data-action="${action}"><span class="menu-icon">${icon(glyph)}</span><span><strong>${title}</strong><small>${copy}</small></span>${tag?`<b>${tag}</b>`:''}<i>${icon('chevron')}</i></button>`;}
  function showLevels(chapter){
    if(chapter!==undefined){showChapter(chapter);return;}
    const done=Object.keys(data.results).filter(k=>k.startsWith('level')).length;
    openModal('journey','一百关，一场进阶','YOUR JOURNEY',`<div class="journey-hero"><div><span class="tiny-label">下一段风景</span><h3>第 ${String(unlocked()).padStart(2,'0')} 关 <span>· ${CHAPTERS[Math.floor((unlocked()-1)/10)][0]}</span></h3><p>从轻松落笔，到深度推演。</p><button class="primary" data-action="continue-journey">继续我的旅程 ${icon('chevron')}</button></div><div class="progress-orbit" style="--progress:${done*3.6}deg"><strong>${done}<small>/ 100</small></strong></div></div><div class="menu-group">${menuRow('daily','sun','每日一题','每天一题，独立记录你的专注','TODAY')}</div><div class="section-heading"><span>十段旅程</span><small>点击章节，再挑选关卡</small></div><div class="chapter-list">${CHAPTERS.map((c,i)=>{const count=Array.from({length:10},(_,j)=>data.results[`level-${i*10+j+1}`]).filter(Boolean).length;return `<button class="chapter-card ${i===9?'chapter-final':''}" data-chapter="${i}"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><span><strong>${c[0]}<small>${c[2]}</small></strong><p>${i*10+1}–${i*10+10} 关 · ${i===0?'只需 8–17 步基础填数':i===9?'极限推演，考验你的上限':c[1]}</p><span class="chapter-progress"><b style="width:${count*10}%"></b></span></span><i>${icon('chevron')}</i></button>`;}).join('')}</div>`,true);
  }
  function showChapter(chapter){chapterTab=Math.min(9,Math.max(0,chapter));const c=CHAPTERS[chapterTab];
    openModal('chapter',`${c[0]} · ${c[1]}`,`CHAPTER ${String(chapterTab+1).padStart(2,'0')}`,`<div class="chapter-banner"><span class="chapter-big">${String(chapterTab+1).padStart(2,'0')}</span><div><span class="difficulty-pill">${c[2]}</span><p>${chapterTab===0?'很简单的十次开始。每关只需填入 8–17 个数字，建立你的第一份信心。':c[3]}</p></div></div><div class="level-grid">${Array.from({length:10},(_,i)=>{const n=chapterTab*10+i+1,r=data.results[`level-${n}`],locked=n>unlocked();return `<button class="level-tile ${locked?'locked':r?'done':''} ${n===currentId()&&!isDaily()?'current':''}" data-level="${n}" aria-label="第 ${n} 关"><strong>${String(n).padStart(2,'0')}</strong><small>${r?'★'.repeat(r.stars)+'☆'.repeat(3-r.stars):locked?'可练习':'可挑战'}</small></button>`;}).join('')}</div><p class="resume-note">逐关解锁正式挑战，也能提前自由练习。<br>点击关卡，查看难度与挑战详情。</p>`);
  }
  function chooseLevel(n){selectedLevel=n;const p=LEVELS[n-1],r=data.results[`level-${n}`],locked=n>unlocked(),saved=data.games[`${locked?'practice':'level'}-${n}`],tech=['','唯一候选数','隐性唯一数','区块排除','数对推理','X-Wing 矩形','深度分支推演'][p.rating.tier];
    openModal('level-detail',`第 ${String(n).padStart(2,'0')} 关`,`${CHAPTERS[Math.floor((n-1)/10)][0]} · ${n<=10?'轻松入门':n>90?'极限挑战':'思维进阶'}`,`<div class="level-detail-hero"><span>${n>90?'✦':'◇'}</span><h3>${n<=10?'从这一小步开始':n===100?'终极之境':n>90?'极限，也是新的起点':'给思维一点挑战'}</h3><p>${n<=10?'只需要基础观察，慢慢来就能找到全部答案。':n>90?'这道题需要持续、严密的推演。允许暂停，允许重来，答案始终存在。':'逐步梳理数字之间的约束，找到下一个突破口。'}</p></div><div class="stats-grid"><div class="stat-box"><strong>${p.clues}</strong><span>已知数字</span></div><div class="stat-box"><strong>${81-p.clues}</strong><span>待填空格</span></div><div class="stat-box"><strong>${p.rating.tier}/6</strong><span>推理等级</span></div></div><div class="detail-note">${icon('layers')}<span>核心技巧<strong>${tech}</strong></span>${r?`<b>${'★'.repeat(r.stars)}</b>`:''}</div>${saved&&saved.edition===1?'<p class="resume-note">你的旧版棋盘已保留，继续游戏不会丢失进度。<br>在工具中重玩本关，可切换到新版题目。</p>':''}<button class="primary" data-action="start-selected">${locked?'自由练习这关':saved&&!saved.completed?'继续本关':r?'查看已完成棋盘':'开始挑战'} ${icon('chevron')}</button>${locked?'<p class="resume-note">自由练习不解锁关卡；正式旅程从上一关继续。</p>':''}`);
  }
  function showHint() {
    if(!canEdit())return;
    hintStep=S.next(game.board,[...game.solution].map(Number));
    if(!hintStep){toast('棋盘已完成');return;}
    hintFocus=[hintStep.index];selected=hintStep.index;renderBoard();
    const h=hintStep;
    openModal('hint','一条线索，向前一步','MASTER INSIGHT',`<span class="hint-tag">${icon('sparkles')}${escape(h.title)}</span><p class="hint-reason">${escape(h.reason)}</p><div class="hint-answer"><span>${S.name(h.index)}</span><strong>${h.type==='repair'?'清除':h.value}</strong></div><p class="resume-note">只阅读不扣星；点击应用后记录 1 次提示。</p><div class="modal-actions"><button class="secondary" data-action="close">我自己试试</button><button class="primary" data-action="apply-hint">${h.type==='repair'?'清除错误':'应用这一步'} ${icon('chevron')}</button></div>`);
    $('ai-title').textContent=h.title;$('ai-reason').textContent=h.reason;$('mobile-ai-status').textContent=h.title;
  }
  function applyHint() {
    if(!hintStep)return;const h=hintStep;remember();game.board[h.index]=h.value;game.notes[h.index]=0;selected=h.index;
    if(h.value&&data.settings.cleanNotes)S.peers[h.index].forEach(i=>game.notes[i]&=~(1<<(h.value-1)));
    game.hints++;data.stats.hints++;closeModal();feedback();renderBoard();checkWin();save();
  }
  function showAIHome(){
    if(paused){toast('请先继续游戏');return;}
    openModal('ai-home','AI 大师，在你身边','THINK TOGETHER',`<div class="ai-home-hero"><div class="ai-lens">${icon('sparkles')}</div><span class="tiny-label">给思考，多一个视角</span><h3>想明白，或交给我。</h3><p>分析不揭晓答案，作答由你来选择。</p></div><div class="menu-group">${menuRow('analyze','scan','分析当前棋盘','候选分布、错误定位与下一步思路','分析')}${menuRow('answer','pencil','AI 帮我作答','填一格，或完成剩余棋盘','作答')}${menuRow('ai-demo','play','观看大师演示','在副本中逐步推理，随时暂停','演示')}</div><div class="coach-note">${icon('shield')}<p>分析不改变棋盘。AI 作答会标注辅助完成；演示保留你的原进度。</p></div>`);
  }
  function analyzeBoard(){
    const masks=S.candidates(game.board),empty=game.board.map((v,i)=>!v?i:-1).filter(i=>i>=0),wrong=game.board.map((v,i)=>v&&v!==Number(game.solution[i])?i:-1).filter(i=>i>=0);
    const singles=empty.filter(i=>S.count(masks[i])===1),pairs=empty.filter(i=>S.count(masks[i])===2);analysisStep=S.next(game.board,[...game.solution].map(Number));
    const hint=analysisStep,percent=Math.round(game.board.filter((v,i)=>v&&v===Number(game.solution[i])).length/81*100);
    const focus=hint?.index??-1;
    const overview=wrong.length?`有 ${wrong.length} 个数字偏离本题唯一解。先修正它们，再继续推理会更顺畅。`:!empty.length?'这一盘已正确完成。可以继续你的下一段旅程。':hint?.tier===6?'当前基础与进阶排除暂时无法产生确定数字。建议保留候选，尝试严密的分支推演。':`优先观察${S.name(focus)}附近的数字关系，可以从「${hint?.title}」继续。`;
    openModal('analysis','看见棋盘背后的线索','AI ANALYSIS',`<div class="analysis-head"><div class="progress-orbit" style="--progress:${percent*3.6}deg"><strong>${percent}<small>% 正确</small></strong></div><div><h3>${wrong.length?'先梳理，再出发':empty.length?'突破口，正在浮现':'这一盘，已圆满'}</h3><p>${overview}</p></div></div><div class="stats-grid"><div class="stat-box"><strong>${empty.length}</strong><span>待填空格</span></div><div class="stat-box"><strong>${singles.length}</strong><span>单候选格</span></div><div class="stat-box"><strong>${pairs.length}</strong><span>双候选格</span></div></div><div class="section-heading"><span>候选密度</span><small>淡色少 · 深色多 · 红色为错误</small></div><div class="analysis-map">${game.board.map((v,i)=>`<span class="${wrong.includes(i)?'map-error':i===focus?'map-focus':''}" style="--density:${v?.06:Math.max(.12,S.count(masks[i])/10)}" title="${S.name(i)}${v?'，已填 '+v:'，'+S.count(masks[i])+' 个候选'}">${v?'·':S.count(masks[i])}</span>`).join('')}</div><div class="analysis-strategy"><span>${icon(wrong.length?'shield':'bulb')}</span><div><small>推荐下一步</small><strong>${hint?escape(hint.title):'进入下一关'}</strong><p>先给你方向，具体答案由你选择是否展开。</p></div></div>${hint?'<div class="modal-actions"><button class="secondary" data-action="locate-analysis">只定位这格</button><button class="primary" data-action="hint">展开推理 '+icon('chevron')+'</button></div>':'<button class="primary" data-action="levels">继续进阶之旅</button>'}`);
  }
  function showAnswer(mode='all'){
    if(!canEdit())return;answerMode=mode;
    const wrong=game.board.filter((v,i)=>v&&v!==Number(game.solution[i])).length,empty=game.board.filter(v=>!v).length;
    const editable=selected>=0&&!Number(game.puzzle[selected]);
    openModal('answer','这一步，交给 AI','AI ASSISTED PLAY',`<p class="modal-description">只帮你一格，或替你完成这一盘。选择权始终在你。</p><div class="answer-choices"><button class="answer-option ${mode==='one'?'chosen':''}" data-answer-mode="one"><span>${icon('pencil')}</span><div><strong>帮我填写一格</strong><small>${editable?S.name(selected):'自动选择一个可推理的格子'}</small></div><b>${mode==='one'?'●':'○'}</b></button><button class="answer-option ${mode==='all'?'chosen':''}" data-answer-mode="all"><span>${icon('sparkles')}</span><div><strong>完成整个棋盘</strong><small>填入 ${empty} 个空格${wrong?'，修正 '+wrong+' 个错误':''}</small></div><b>${mode==='all'?'●':'○'}</b></button></div><div class="coach-note">${icon('shield')}<p>作答直接应用到你的棋盘，计入 AI 辅助。完成后可解锁下一关，最多获得 1 星，并单独标记；不计入独立推理成就。</p></div><button class="primary" data-action="apply-answer">${icon('sparkles')}${mode==='one'?'请 AI 填写这一格':'请 AI 完成整盘'}</button><button class="secondary" data-action="analyze">先分析，让我自己试试</button>`);
  }
  function applyAnswer(){
    if(!canEdit())return;
    let targets=[];
    if(answerMode==='all')targets=game.board.map((v,i)=>v!==Number(game.solution[i])?i:-1).filter(i=>i>=0);
    else{let i=selected>=0&&!Number(game.puzzle[selected])&&game.board[selected]!==Number(game.solution[selected])?selected:-1;if(i<0)i=S.next(game.board,[...game.solution].map(Number))?.index??-1;if(i>=0)targets=[i];}
    if(!targets.length){toast('当前棋盘已经完成');return;}
    remember();for(const i of targets){game.board[i]=Number(game.solution[i]);game.notes[i]=0;if(data.settings.cleanNotes)S.peers[i].forEach(j=>game.notes[j]&=~(1<<(game.board[i]-1)));}
    game.aiFilled=(game.aiFilled||0)+targets.length;game.hints+=targets.length;data.stats.hints+=targets.length;selected=targets.at(-1);closeModal();renderBoard();feedback();checkWin();save();if(!game.completed)toast('AI 已填写 1 格 · 可撤销');
  }
  function showAI() {
    if(paused){toast('请先继续游戏');return;}
    openModal('ai','看大师，一步步解开','AI MASTER · LOCAL REASONING',`<p class="modal-description">AI 会在你的棋盘副本上演示，逐步解释推理。可以随时暂停，或者返回你原来的棋盘。</p><div class="ai-live"><strong id="ai-live-title">${demo?`已演示 ${aiSteps} 步`:'准备好，一起找线索'}</strong><p id="ai-live-reason">从唯一候选数、区块排除，到数对、X-Wing 和分支验证，优先尝试更容易理解的解法。</p></div><div class="ai-controls"><button class="primary" id="ai-play" data-action="ai-toggle">${icon('play')}自动演示</button><select id="ai-speed" aria-label="AI 演示速度"><option value="1400">慢慢讲</option><option value="850" selected>标准速度</option><option value="250">快速演示</option></select></div><button class="secondary" data-action="ai-step">${icon('chevron')}只演示一步</button><button class="secondary" data-action="ai-return">${icon('undo')}返回我的棋盘</button><p class="resume-note">本地逻辑与搜索算法，不需联网或密钥。<br>演示不消耗提示、不计成绩、不解锁关卡。</p>`);
    const preview=document.createElement('div');preview.id='ai-preview';preview.className='ai-preview';preview.setAttribute('aria-label','AI 演示棋盘');$('modal-content').insertBefore(preview,$('modal-content').querySelector('.ai-live'));renderAIPreview();
    $('ai-speed').value=String(aiSpeed);
  }
  function renderAIPreview(){const el=$('ai-preview');if(el)el.innerHTML=game.board.map((v,i)=>`<span class="${Number(game.puzzle[i])?'given':'user'} ${i===selected?'selected':''}">${v||''}</span>`).join('');}
  function startDemo() {
    if(demo)return;
    save();demo={game,selected};game=JSON.parse(JSON.stringify(game));game.completed=false;aiSteps=0;hintFocus=[];
  }
  function aiStep() {
    startDemo();const step=S.next(game.board,[...game.solution].map(Number));
    if(!step){stopAI();if($('ai-live-title')){$('ai-live-title').textContent='演示完成 · 每一格都有了答案';$('ai-live-reason').textContent=`共演示 ${aiSteps} 步。你的原始棋盘已保留，点击下方「返回我的棋盘」继续挑战。`;}return false;}
    game.board[step.index]=step.value;game.notes[step.index]=0;selected=step.index;hintFocus=[step.index];aiSteps++;
    $('ai-title').textContent=step.title;$('ai-reason').textContent=step.reason;$('mobile-ai-status').textContent=`演示第 ${aiSteps} 步 · ${step.title}`;
    if($('ai-live-title')){$('ai-live-title').textContent=`第 ${aiSteps} 步 · ${step.title}`;$('ai-live-reason').textContent=step.reason;}
    renderBoard();renderAIPreview();return true;
  }
  function stopAI() {clearTimeout(aiTimer);aiTimer=null;aiRunning=false;if($('ai-play'))$('ai-play').innerHTML=icon('play')+'自动演示';}
  function toggleAI() {
    if(aiRunning){stopAI();return;}
    aiRunning=true;$('ai-play').innerHTML=icon('pause')+'暂停演示';
    const tick=()=>{if(!aiRunning||screen!=='ai'||document.hidden)return;if(aiStep())aiTimer=setTimeout(tick,aiSpeed);};tick();
  }
  function endDemo(refresh=true) {
    stopAI();if(demo){game=demo.game;selected=demo.selected;demo=null;hintFocus=[];if(refresh){render();save();}}
    $('mobile-ai-status').textContent='换个视角，找到下一步';
  }
  function showDaily() {
    const today=dateKey(),key=`daily-${today}`,done=data.results[key];
    openModal('daily','每天，为自己留一题','YOUR DAILY MOMENT',`<div class="daily-hero">${icon('sun')}<h3>${today.replaceAll('-',' / ')}</h3><p>同一天，同一道题，一段属于你的专注时光。</p></div><p class="modal-description">每日题目独立于 100 关旅程，进度会分别保存。${done?`今天已收获 ${'★'.repeat(done.stars)}，最佳用时 ${formatTime(done.time)}。`:'今天的题目正在等你。无需赶时间，慢慢找答案。'}</p><button class="primary" data-action="start-daily">${done?'查看今日棋盘':data.games[key]?'继续今日挑战':'开始今日挑战'} ${icon('chevron')}</button><p class="resume-note">每天按本机日期更新 · 每道题均验证唯一解</p>`);
  }
  function showLearn(){
    openModal('learn','把思路，一层层打开','THE LITTLE SUDOKU SCHOOL',`<div class="school-hero">${icon('book')}<div><h3>不只是填对，更要想明白。</h3><p>8 节小课，从第一格走到进阶推理。</p></div></div><div class="menu-group">${LESSONS.map((l,i)=>`<button class="menu-row" data-lesson="${i}"><span class="lesson-number">${String(i+1).padStart(2,'0')}</span><span><strong>${l[0]}</strong><small>${l[1]} · ${i>0&&i<7?'推理技巧':'操作指南'}</small></span><i>${icon('chevron')}</i></button>`).join('')}</div>`);
  }
  function showLesson(i){const l=LESSONS[i];openModal('lesson',l[0],`LESSON ${String(i+1).padStart(2,'0')} · ${l[1]}`,`<div class="lesson-visual"><div class="lesson-symbols">${[1,2,3,4,5,6,7,8,9].map(n=>`<span class="${n===5?'lit':''}">${n}</span>`).join('')}</div><span>${i===0?'每行、每列、每宫，1–9 不重复':'观察 · 排除 · 确认'}</span></div><p class="lesson-prose">${l[2]}</p><div class="coach-note">${icon('bulb')}<p>${i===0?'先试第一关，只需要填入 8 个数字。':i<3?'找已知数字最多的区域，往往更容易建立思路。':i<6?'先打开自动笔记，再观察候选数之间的关系。':'遇到难题先保留进度。必要时请 AI 分析当前局面。'}</p></div><button class="primary" data-action="lesson-practice" data-target-level="${[1,2,31,51,66,75,91,1][i]}">找一关练习 ${icon('chevron')}</button><button class="secondary" data-action="back">返回课程目录</button>`);}
  function showStats(view='overview') {
    const entries=Object.entries(data.results),levels=entries.filter(([k])=>k.startsWith('level')),stars=levels.reduce((s,[,r])=>s+r.stars,0),daily=entries.filter(([k])=>k.startsWith('daily'));
    const achievements=[['第一束光','完成你的第一关',levels.length>=1],['十步成章','完成 10 个闯关关卡',levels.length>=10],['行至半程','完成 50 个闯关关卡',levels.length>=50],['归一之境','完成全部 100 关',levels.length===100],['完美主义','在任意闯关关卡获得 3 星',levels.some(([,r])=>r.stars===3)],['候选观察家','使用笔记或自动笔记 10 次',data.stats.notes>=10],['每日仪式','累计完成 7 道每日挑战',daily.length>=7],['独立推理','独立完成第 90 关或更高关卡',levels.some(([k,r])=>Number(k.slice(6))>=90&&r.independent)]];
    if(view==='overview'){openModal('stats','每一步，都算数','YOUR LITTLE MILESTONES',`<div class="stats-grid"><div class="stat-box"><strong>${levels.length}</strong><span>通关 / 100</span></div><div class="stat-box"><strong>${stars}</strong><span>星星 / 300</span></div><div class="stat-box"><strong>${daily.length}</strong><span>每日挑战</span></div></div><div class="menu-group spaced">${menuRow('badges','trophy','成长徽章','每一次突破，都值得被看见',achievements.filter(a=>a[2]).length+'/8')}${menuRow('records','chart','通关记录','查看成绩、用时与辅助标记')}${menuRow('scoring','shield','星级与记录规则','了解独立通关和 AI 辅助的区别')}</div>`);return;}
    if(view==='records'){openModal('records','我走过的足迹','YOUR RECORDS',entries.length?entries.slice().reverse().map(([k,r])=>`<div class="record-row"><span>${k.startsWith('daily')?'每日 '+k.slice(6):'第 '+k.slice(6)+' 关'}<small>${'★'.repeat(r.stars)} · ${r.aiAssisted?'AI 辅助':r.hints?'使用提示':'独立完成'}</small></span><span>${formatTime(r.time)}</span></div>`).join(''):'<div class="empty-state">第一枚星星，正在等你。</div>');return;}
    openModal('badges','让成长，留下印记','YOUR BADGES',`<p class="modal-description">已点亮 ${achievements.filter(a=>a[2]).length} / 8 枚成长徽章。</p>${achievements.map(a=>`<div class="achievement ${a[2]?'earned':''}"><span class="medal">${icon(a[2]?'trophy':'lock')}</span><div><h4>${a[0]}</h4><p>${a[1]}</p></div><span>${a[2]?'已点亮':'待点亮'}</span></div>`).join('')}`);
  }
  function showSettings() {
    openModal('settings','把这里，变成你的','PREFERENCES',`<div class="settings-hero"><span class="glass-gem">${icon('palette')}</span><div><h3>你的手感，你的风格。</h3><p>每个选择，都即时生效。</p></div></div><div class="menu-group">${menuRow('settings-appearance','palette','外观与光影','毛玻璃、主题色与昼夜模式')}${menuRow('settings-controls','pointer','输入与棋盘','键盘布局、填写方式与辅助')}${menuRow('settings-feedback','zap','速度与反馈','切换节奏、触感和音效')}${menuRow('settings-access','target','显示与可读性','大字、对比度与动态效果')}${menuRow('settings-data','shield','存档与数据','导出、导入与版本信息')}</div><p class="resume-note">SUDOKU ATELIER 2.0 · 随心而动</p>`);
  }
  function choiceCards(key,items){return `<div class="choice-cards">${items.map(([v,title,copy])=>`<button class="choice-card ${data.settings[key]===v?'chosen':''}" data-preference="${key}" data-value="${v}" aria-pressed="${data.settings[key]===v}"><span class="choice-sample ${key}-${v}">${key==='accent'?'':key==='material'?'境':key==='keypad'?(v==='double'?'1 2 3 4 5':'1 2 3 ···'):key==='inputMode'?(v==='cell'?'□ → 5':'5 → □'):'✦'}</span><strong>${title}</strong><small>${copy}</small><b>${icon('check')}</b></button>`).join('')}</div>`;}
  function showSettingsSection(section) {
    const s=data.settings;
    const setting=(key,title,desc)=>`<div class="setting-row"><label for="setting-${key}">${title}<small>${desc}</small></label><input class="switch" id="setting-${key}" type="checkbox" data-setting="${key}" ${s[key]?'checked':''}></div>`;
    const content={
      appearance:['外观与光影',`<div class="material-preview"><span class="preview-orb"></span><div class="preview-glass">境<small>LET THE LIGHT IN</small></div></div><p class="section-label">一抹色彩</p>${choiceCards('accent',[['violet','雾紫','静谧与专注'],['mint','青玉','清透与呼吸'],['peach','暖杏','温柔与留白']])}<p class="section-label">玻璃质感</p>${choiceCards('material',[['frosted','磨砂','柔和透光'],['clear','水晶','通透折光'],['solid','纯净','清晰实色']])}<div class="setting-row"><label for="theme-select">昼夜模式<small>相同的安静，不同的光线。</small></label><select id="theme-select" data-setting="theme"><option value="light" ${s.theme==='light'?'selected':''}>白昼</option><option value="night" ${s.theme==='night'?'selected':''}>月夜</option></select></div>`],
      controls:['输入与棋盘',`<p class="section-label">手机数字键盘</p>${choiceCards('keypad',[['double','双排大键','大拇指更从容'],['single','经典单排','棋盘更紧凑']])}<p class="section-label">填写习惯</p>${choiceCards('inputMode',[['cell','先选格','选格子，再填数'],['number','连续填数','选数字，依次填']])}${setting('autoCheck','即时错误提醒','错误会标色；关闭后仍累计错误次数。')}${setting('highlight','关联数字高亮','同行、同列、同宫，以及相同数字。')}${setting('cleanNotes','自动清理候选数','正确填写后，清理相关笔记。')}`],
      feedback:['速度与反馈',`<p class="section-label">面板切换节奏</p>${choiceCards('pace',[['snappy','轻快','220 ms，即点即应'],['gentle','舒缓','320 ms，柔和过渡']])}${setting('sound','轻柔音效','填入数字与完成时的微小回声。')}${setting('vibration','触感反馈','设备支持时，提供轻微振动。')}<div class="coach-note">${icon('zap')}<p>数字输入即时响应。AI 解题的播放速度，可以在演示面板中单独调整。</p></div>`],
      access:['显示与可读性',`${setting('contrast','增强对比','让数字、边界和候选数更清楚。')}${setting('large','加大数字','提升棋盘与笔记字号。')}${setting('motion','柔和动效','关闭后保留即时状态反馈。')}<p class="storage-note">系统开启减少动态效果时，游戏会自动减少移动。减少透明度偏好也会被尊重。</p>`],
      data:['存档与数据',`<div class="save-status">${icon('shield')}<span><strong>${storageOK?'进度已自动保存':'请导出一份备份'}</strong><small>当前棋盘与历史关卡分别保存</small></span></div><div class="menu-group">${menuRow('export','download','导出存档','保存一份可转移的 JSON 备份')}${menuRow('import','restart','导入存档','校验后恢复另一台设备的进度')}${menuRow('restart','restart','重玩当前关卡','保留已获得的星星和解锁进度')}</div><p class="storage-note">2.0 版包含重新分级的 100 道题。旧版未完成的棋盘继续保留，重玩时进入新版题目。不同浏览器和地址使用各自的存档。备份可在设备之间转移。</p>`],
    }[section];
    openModal('settings-'+section,content[0],'PREFERENCES · '+section.toUpperCase(),content[1]);
  }
  function showProfile(){openModal('profile','属于你的，专注时光','YOUR SPACE',`<div class="profile-hero"><span>${icon('user')}</span><h3>每一格，都是成长。</h3><p>下一站，第 ${unlocked()} 关。</p></div><div class="menu-group">${menuRow('stats','chart','我的进阶','星星、徽章和通关记录')}${menuRow('daily','sun','每日时光','今天的一道小挑战')}${menuRow('settings','settings','偏好设置','外观、输入、声音与存档')}${menuRow('help','book','玩法与技巧','从规则到大师级推理')}</div>`,true);}
  function showTools(){openModal('tools','棋盘工具箱','LITTLE TOOLS · BETTER FOCUS',`<div class="tool-panel-grid"><button data-action="tool-auto-notes">${icon('scan')}<strong>自动笔记</strong><small>重新计算全部候选数</small></button><button data-action="tool-check">${icon('shield')}<strong>检查棋盘</strong><small>定位当前错误，不揭晓答案</small></button><button data-action="tool-clear-notes">${icon('erase')}<strong>清空笔记</strong><small>只清理候选，可撤销</small></button><button data-action="tool-redo" ${game.future.length?'':'disabled'}>${icon('redo')}<strong>重做一步</strong><small>恢复刚撤销的操作</small></button></div><div class="menu-group spaced">${menuRow('settings-controls','pointer','数字键盘与输入','双排大键 / 单排，连续填写')}${menuRow('settings-appearance','palette','外观与光影','让棋盘更合你的心意')}${menuRow('restart','restart','重新挑战本关','当前填写将重置，成绩保留')}</div>`);}
  function checkWin() {
    if(demo||game.completed||!game.board.every((v,i)=>v===Number(game.solution[i])))return;
    game.completed=true;const stars=game.aiFilled?1:game.mistakes===0&&game.hints===0?3:game.mistakes<=3&&game.hints<=3?2:1;
    if(!isPractice()){
      const prev=data.results[game.key],assisted=!!game.aiFilled,keepBest=prev&&(prev.stars>stars||(!prev.aiAssisted&&assisted));
      data.results[game.key]={stars:Math.max(stars,prev?.stars||0),time:keepBest?prev.time:prev&&prev.aiAssisted===assisted?Math.min(prev.time,Math.floor(game.elapsed)):Math.floor(game.elapsed),mistakes:keepBest?prev.mistakes:game.mistakes,hints:keepBest?prev.hints:game.hints,aiAssisted:keepBest?prev.aiAssisted:assisted,independent:!!prev?.independent||(!assisted&&!game.hints),date:dateKey(),clears:(prev?.clears||0)+1};
    }
    save();render();feedback('win');celebrate();
    openModal('win',isPractice()?'练习完成':!isDaily()&&currentId()===100?'你已抵达，归一之境':'这一刻，思路通明','A LITTLE VICTORY',`<div class="win-content"><div class="win-mark">${icon('trophy')}</div><div class="win-stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div><h3>${isPractice()?'一次很好的思维热身':isDaily()?'今日的专注，已收获':'第 '+currentId()+' 关，完成'}</h3><p>${isPractice()?'这次练习不计闯关进度，可以回到旅程继续挑战。':currentId()===100&&!isDaily()?'一百道谜题之后，你已经走过从入门到宗师的旅程。':'不用急着向前，先为自己的这一步感到开心。'}</p><div class="stats-grid"><div class="stat-box"><strong>${formatTime(game.elapsed)}</strong><span>用时</span></div><div class="stat-box"><strong>${game.mistakes}</strong><span>错误</span></div><div class="stat-box"><strong>${game.hints}</strong><span>提示</span></div></div><div class="modal-actions"><button class="secondary" data-action="levels">关卡地图</button><button class="primary" data-action="next-level">${!isDaily()&&!isPractice()&&currentId()<100?'前往下一关':'继续进阶之旅'} ${icon('chevron')}</button></div></div>`);
    if(game.aiFilled){$('modal-title').textContent='AI 辅助完成';$('modal-content').querySelector('.win-content>p').textContent='本次由 AI 辅助作答，记录为 1 星。也可以重玩这一关，尝试独立解开。';const stat=$('modal-content').querySelector('.stat-box:last-child');stat.querySelector('strong').textContent=game.aiFilled;stat.querySelector('span').textContent='AI 填写';}
  }
  function celebrate() {if(!data.settings.motion||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=$('celebration');c.innerHTML=Array.from({length:35},()=>`<span class="confetti" style="left:${Math.random()*100}%;background:${['#c5aedf','#e4c7a0','#aecabd','#d7bfce'][Math.floor(Math.random()*4)]};animation-delay:${Math.random()*.45}s;animation-duration:${1.7+Math.random()}s"></span>`).join('');setTimeout(()=>c.innerHTML='',3500);}
  function restart() {confirmAction('重新开始这一关？','这一关的数字、笔记与计时将重新开始，星星和解锁进度保留。旧版棋盘将进入重新分级的新版题目。','重新开始',()=>{if(demo)endDemo(false);const key=game.key;data.games[key]=makeGame(isDaily()?game:LEVELS[currentId()-1],key);game=null;load(key);});}
  function exportSave() {
    save();const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`数独境-存档-${dateKey()}.json`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000);toast('存档已准备下载');
  }
  const actions={
    close:closeModal,back:backPanel,levels:()=>showLevels(),settings:showSettings,help:showLearn,tools:showTools,stats:()=>showStats(),daily:showDaily,pause:()=>{if(demo){endDemo();toast('已返回你的棋盘');return;}paused=!paused;lastTick=performance.now();renderBoard();save();},resume:()=>{paused=false;lastTick=performance.now();renderBoard();},
    undo:()=>history('undo'),redo:()=>history('redo'),erase:()=>input(0),notes:()=>{if(!canEdit())return;noteMode=!noteMode;renderBoard();},'auto-notes':autoNotes,hint:showHint,'apply-hint':applyHint,
    ai:showAIHome,'ai-demo':showAI,analyze:analyzeBoard,answer:()=>showAnswer('one'),'apply-answer':applyAnswer,'ai-toggle':toggleAI,'ai-step':()=>{stopAI();aiStep();},'ai-return':()=>{endDemo();backPanel();toast('原棋盘已完整保留');},
    'locate-analysis':()=>{const target=analysisStep?.index;if(target===undefined)return;closeModal();selected=target;hintFocus=[target];renderBoard();toast('已定位线索，没有填写答案');},
    'start-selected':()=>load(`${selectedLevel>unlocked()?'practice':'level'}-${selectedLevel}`),
    'settings-appearance':()=>showSettingsSection('appearance'),'settings-controls':()=>showSettingsSection('controls'),'settings-feedback':()=>showSettingsSection('feedback'),'settings-access':()=>showSettingsSection('access'),'settings-data':()=>showSettingsSection('data'),
    badges:()=>showStats('badges'),records:()=>showStats('records'),scoring:()=>openModal('scoring','星星怎样被点亮','PROGRESS RULES','<div class="score-rules"><p><b>★★★</b><strong>独立而准确</strong><span>零错误，零提示，未使用 AI 作答。</span></p><p><b>★★☆</b><strong>有所借鉴</strong><span>错误和提示各不超过 3 次，未使用 AI 作答。</span></p><p><b>★☆☆</b><strong>坚持完成</strong><span>其他正常完成，或使用 AI 帮填。AI 作答会单独标记。</span></p></div><p class="resume-note">分析、阅读提示和自动笔记不扣星。应用提示会计数。<br>自由练习与 AI 演示不解锁关卡。</p>'),
    'tool-auto-notes':()=>{autoNotes();closeModal();},'tool-clear-notes':()=>{if(!canEdit())return;remember();game.notes.fill(0);closeModal();save();toast('候选数已清空，可撤销');},'tool-redo':()=>{history('redo');closeModal();},'tool-check':()=>{const wrong=game.board.map((v,i)=>v&&v!==Number(game.solution[i])?i:-1).filter(i=>i>=0);closeModal();hintFocus=wrong;if(wrong.length)selected=wrong[0];renderBoard();toast(wrong.length?`发现 ${wrong.length} 处错误，已定位第一处`:'已填写的数字都正确，继续保持');},
    'continue-journey':()=>load(`level-${unlocked()}`),'start-daily':()=>load(`daily-${dateKey()}`),'next-level':()=>load(`level-${!isDaily()&&!isPractice()&&currentId()<100?currentId()+1:unlocked()}`),
    'input-mode':()=>{data.settings.inputMode=data.settings.inputMode==='cell'?'number':'cell';heldNumber=0;renderBoard();save();toast(data.settings.inputMode==='number'?'连续填数：先选下方数字，再点空格':'先选格：点空格，再填数字');},
    confirm:()=>{const fn=pendingConfirm;pendingConfirm=null;closeModal();if(fn)fn();},restart,export:exportSave,import:()=>{$('import-file').value='';$('import-file').click();}
  };
  document.addEventListener('click',e=>{
    const cell=e.target.closest('[data-cell]');if(cell){selectCell(Number(cell.dataset.cell));return;}
    const num=e.target.closest('[data-number]');if(num){const n=Number(num.dataset.number);if(data.settings.inputMode==='number'){heldNumber=heldNumber===n?0:n;renderBoard();}else input(n);return;}
    const preference=e.target.closest('[data-preference]');if(preference){const key=preference.dataset.preference;data.settings[key]=preference.dataset.value;if(key==='inputMode')heldNumber=0;applySettings();renderBoard();save();document.querySelectorAll(`[data-preference="${key}"]`).forEach(el=>{const chosen=el.dataset.value===data.settings[key];el.classList.toggle('chosen',chosen);el.setAttribute('aria-pressed',String(chosen));});feedback();return;}
    const answer=e.target.closest('[data-answer-mode]');if(answer){showAnswer(answer.dataset.answerMode);return;}
    const lesson=e.target.closest('[data-lesson]');if(lesson){showLesson(Number(lesson.dataset.lesson));return;}
    const practice=e.target.closest('[data-target-level]');if(practice){chooseLevel(Number(practice.dataset.targetLevel));return;}
    const action=e.target.closest('[data-action]');if(action){actions[action.dataset.action]?.();return;}
    const nav=e.target.closest('[data-nav]');if(nav){({play:closeModal,journey:()=>showLevels(),daily:showDaily,learn:showLearn,stats:()=>showStats(),profile:showProfile,ai:showAIHome})[nav.dataset.nav]();return;}
    const chapter=e.target.closest('[data-chapter]');if(chapter){showLevels(Number(chapter.dataset.chapter));return;}
    const level=e.target.closest('[data-level]');if(level){chooseLevel(Number(level.dataset.level));return;}
    const brand=e.target.closest('.brand');if(brand){e.preventDefault();showLevels();}
  });
  document.addEventListener('change',e=>{
    if(e.target.dataset.setting){const k=e.target.dataset.setting;data.settings[k]=e.target.type==='checkbox'?e.target.checked:e.target.value;applySettings();renderBoard();save();}
    if(e.target.id==='ai-speed')aiSpeed=Number(e.target.value);
  });
  $('import-file').addEventListener('change',async e=>{
    const file=e.target.files[0];if(!file)return;if(file.size>6e6){toast('存档文件过大');return;}
    try{const incoming=normalize(JSON.parse(await file.text()));confirmAction('导入这份存档？',`已经校验 ${Object.keys(incoming.games).length} 个棋盘和 ${Object.keys(incoming.results).length} 条通关记录。导入会替换本机存档，建议先导出当前进度。`,'替换并导入',()=>{if(demo)endDemo(false);game=null;data=incoming;applySettings();load(data.active);toast('存档已导入，欢迎回来');});}catch(err){toast('无法导入：'+err.message);}
  });
  $('modal').addEventListener('cancel',e=>{e.preventDefault();backPanel();});
  $('modal').addEventListener('click',e=>{if(e.target===$('modal')){const r=$('modal').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeModal();}});
  document.addEventListener('keydown',e=>{
    if(e.target.matches('input,select,textarea')||e.altKey||e.metaKey)return;
    if($('modal').open)return;
    if(e.ctrlKey&&e.key.toLowerCase()==='z'){e.preventDefault();history(e.shiftKey?'redo':'undo');return;}
    if(e.ctrlKey&&e.key.toLowerCase()==='y'){e.preventDefault();history('redo');return;}
    if(e.ctrlKey)return;
    if(/^[1-9]$/.test(e.key)){e.preventDefault();input(Number(e.key));}
    else if(['Backspace','Delete','0'].includes(e.key)){e.preventDefault();input(0);}
    else if(e.key.toLowerCase()==='n'){e.preventDefault();actions.notes();}
    else if(e.key.toLowerCase()==='h'){e.preventDefault();showHint();}
    else if(e.code==='Space'&&(!e.target.matches('button')||e.target.matches('.cell'))){e.preventDefault();actions.pause();}
    else if(e.key.startsWith('Arrow')){e.preventDefault();if(paused||demo)return;const i=selected<0?0:selected,r=Math.floor(i/9),c=i%9;selected=e.key==='ArrowLeft'?r*9+(c+8)%9:e.key==='ArrowRight'?r*9+(c+1)%9:e.key==='ArrowUp'?((r+8)%9)*9+c:((r+1)%9)*9+c;hintFocus=[];renderBoard();$('board').children[selected].focus({preventScroll:true});}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden){if(aiRunning)stopAI();save();}lastTick=performance.now();});
  function settleSheet(target,velocity=0,finish){
    cancelAnimationFrame(dragFrame);const el=$('modal');let y=Number(el.dataset.drag||0),v=velocity,last=performance.now();
    const step=now=>{if(!el.open)return;const dt=Math.min((now-last)/1000,.032);last=now;v+=((target-y)*380-v*37)*dt;y+=v*dt;el.dataset.drag=String(y);el.style.transform=`translateY(${y}px)`;
      if(Math.abs(y-target)<.4&&Math.abs(v)<4){el.style.transform='';el.dataset.drag='0';finish?.();return;}dragFrame=requestAnimationFrame(step);};
    if(!data.settings.motion||matchMedia('(prefers-reduced-motion: reduce)').matches){el.style.transform='';el.dataset.drag='0';finish?.();return;}dragFrame=requestAnimationFrame(step);
  }
  $('sheet-handle').addEventListener('pointerdown',e=>{cancelAnimationFrame(dragFrame);const el=$('modal'),transform=getComputedStyle(el).transform,y=transform==='none'?0:new DOMMatrixReadOnly(transform).m42;el.getAnimations().forEach(a=>a.cancel());el.dataset.drag=String(y);el.style.transform=`translateY(${y}px)`;drag={id:e.pointerId,start:e.clientY-y,y,last:e.clientY,time:performance.now(),velocity:0};e.currentTarget.setPointerCapture(e.pointerId);});
  $('sheet-handle').addEventListener('pointermove',e=>{if(!drag||e.pointerId!==drag.id)return;const now=performance.now(),dy=e.clientY-drag.start;drag.velocity=(e.clientY-drag.last)/Math.max(8,now-drag.time)*1000;drag.last=e.clientY;drag.time=now;drag.y=dy<0?dy*.12:dy;$('modal').style.transform=`translateY(${drag.y}px)`;$('modal').dataset.drag=String(drag.y);});
  function endSheetDrag(e){if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const dismiss=e.type!=='pointercancel'&&(d.y>95||d.y>22&&d.velocity>550);settleSheet(dismiss?Math.min(innerHeight*.8,650):0,d.velocity,dismiss?()=>backPanel():undefined);}
  $('sheet-handle').addEventListener('pointerup',endSheetDrag);$('sheet-handle').addEventListener('pointercancel',endSheetDrag);
  document.addEventListener('pointerdown',e=>{const key=e.target.closest('.number-key');if(key){const r=key.getBoundingClientRect();key.style.setProperty('--press-x',(e.clientX-r.left)+'px');key.style.setProperty('--press-y',(e.clientY-r.top)+'px');}});
  window.addEventListener('pagehide',save);
  window.addEventListener('beforeunload',save);
  let saveTicks=0;
  setInterval(()=>{const now=performance.now(),delta=Math.min((now-lastTick)/1000,2);lastTick=now;if(game&&!paused&&!screen&&!demo&&!document.hidden&&!game.completed){game.elapsed+=delta;$('timer').textContent=formatTime(game.elapsed);if(++saveTicks%5===0)save();}},500);
  mount();
  if('serviceWorker' in navigator && /^https?:$/.test(location.protocol))navigator.serviceWorker.register('./sw.js').catch(()=>{});
})();
