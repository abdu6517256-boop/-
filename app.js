/* ==================== NILA STORE APP.JS ==================== */
/* Firebase + Vanilla JS SPA - نيلة ستور */

// ==================== FIREBASE CONFIG ====================
// !! أستبدل هذه القيم بمعلومات مشروع Firebase الخاص بك !!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ==================== CONSTANTS ====================
const ADMIN_EMAIL = 'abdu6517256@gmail.com';
const WHATSAPP_NUMBER = '249912345678'; // استبدل برقم واتساب الدعم
const STORE_NAME = 'نيلة ستور';

const SECTIONS = [
  { id:'games',icon:'🎮',name:'شحن الألعاب',desc:'فري فاير، ببجي، كود، وأكثر',color:'#7C3AED' },
  { id:'social',icon:'📱',name:'شحن تطبيقات التواصل',desc:'تيك توك، بيقو، يلا لودو',color:'#3B82F6' },
  { id:'ai',icon:'🤖',name:'اشتراكات الذكاء الاصطناعي',desc:'ChatGPT، Midjourney، Canva',color:'#10B981' },
  { id:'internet',icon:'🌐',name:'اشتراكات الإنترنت',desc:'Starlink، VPN، دومين',color:'#6366F1' },
  { id:'recharge',icon:'📞',name:'شحن الرصيد السوداني',desc:'زين، MTN، سوداني',color:'#F59E0B' },
  { id:'electricity',icon:'⚡',name:'شراء الكهرباء',desc:'وحدات كهرباء فورية',color:'#EF4444' },
  { id:'cards',icon:'💳',name:'البطاقات الرقمية',desc:'PlayStation، Steam، Google Play',color:'#8B5CF6' },
  { id:'entertainment',icon:'🎬',name:'الاشتراكات الترفيهية',desc:'Netflix، Spotify، Shahid',color:'#EC4899' },
  { id:'custom',icon:'✨',name:'خدمات حسب الطلب',desc:'أي خدمة رقمية تطلبها',color:'#14B8A6' }
];

const DEFAULT_PRODUCTS = {
  games:[
    {id:'ff',name:'Free Fire',icon:'🔥',desc:'اشحن جواهر فري فاير بسرعة وأمان',from:100,type:'game'},
    {id:'pubg',name:'PUBG Mobile',icon:'🎯',desc:'شحن UC ببجي موبايل',from:60,type:'game'},
    {id:'cod',name:'Call of Duty Mobile',icon:'💥',desc:'COD Points للعبة المفضلة',from:80,type:'game'},
    {id:'ml',name:'Mobile Legends',icon:'⚔️',desc:'Diamond للعبة Mobile Legends',from:100,type:'game'},
    {id:'roblox',name:'Robux - Roblox',icon:'🟥',desc:'شحن روبوكس بسهولة',from:50,type:'game'},
    {id:'clash',name:'Clash of Clans',icon:'🏰',desc:'جواهر Clash of Clans',from:80,type:'game'},
    {id:'fortnite',name:'Fortnite',icon:'🌀',desc:'V-Bucks فورت نايت',from:100,type:'game'},
    {id:'genshin',name:'Genshin Impact',icon:'🌸',desc:'Genesis Crystals جنشن',from:100,type:'game'},
    {id:'efootball',name:'eFootball',icon:'⚽',desc:'eFootball Coins',from:60,type:'game'},
    {id:'arena',name:'Arena Breakout',icon:'🔫',desc:'شحن Arena Breakout',from:50,type:'game'},
  ],
  social:[
    {id:'tiktok',name:'TikTok Coins',icon:'🎵',desc:'عملات تيك توك بشحن الحساب',from:70,type:'tiktok'},
    {id:'bigo',name:'Bigo Live',icon:'📡',desc:'Diamonds بيقو لايف',from:50,type:'social'},
    {id:'yalla',name:'Yalla',icon:'🎙️',desc:'شحن يلا لايف',from:50,type:'social'},
    {id:'discord',name:'Discord Nitro',icon:'💜',desc:'اشتراك Discord Nitro',from:100,type:'subscription'},
    {id:'telegram',name:'Telegram Premium',icon:'✈️',desc:'Telegram Premium مميز',from:100,type:'subscription'},
    {id:'snapchat',name:'Snapchat+',icon:'👻',desc:'اشتراك Snapchat Plus',from:100,type:'subscription'},
    {id:'likee',name:'Likee',icon:'❤️',desc:'Diamonds لايكي',from:50,type:'social'},
    {id:'xprem',name:'X Premium',icon:'𝕏',desc:'اشتراك X Premium (Twitter)',from:100,type:'subscription'},
  ],
  ai:[
    {id:'chatgpt',name:'ChatGPT Plus',icon:'🧠',desc:'ChatGPT Plus شهري/سنوي',from:500,type:'subscription'},
    {id:'midjourney',name:'Midjourney',icon:'🎨',desc:'اشتراك Midjourney للصور AI',from:400,type:'subscription'},
    {id:'gemini',name:'Gemini Advanced',icon:'♊',desc:'Google Gemini Advanced',from:500,type:'subscription'},
    {id:'canva',name:'Canva Pro',icon:'🖼️',desc:'Canva Pro للتصميم',from:200,type:'subscription'},
    {id:'capcut',name:'CapCut Pro',icon:'🎬',desc:'CapCut Pro لتحرير الفيديو',from:150,type:'subscription'},
    {id:'grammarly',name:'Grammarly Premium',icon:'✍️',desc:'Grammarly Premium',from:200,type:'subscription'},
    {id:'notion',name:'Notion AI',icon:'📓',desc:'Notion Plus + AI',from:200,type:'subscription'},
    {id:'copilot',name:'Microsoft Copilot',icon:'🪟',desc:'Microsoft Copilot Pro',from:300,type:'subscription'},
  ],
  internet:[
    {id:'starlink',name:'Starlink',icon:'🛰️',desc:'اشتراك Starlink وتجديده',from:2000,type:'subscription'},
    {id:'vpn',name:'اشتراك VPN',icon:'🔐',desc:'خدمات VPN متنوعة',from:100,type:'subscription'},
    {id:'domain',name:'دومين واستضافة',icon:'🌐',desc:'تسجيل دومين واستضافة',from:500,type:'custom'},
  ],
  recharge:[
    {id:'zain',name:'زين',icon:'🟦',desc:'شحن رصيد زين السودان',from:500,type:'recharge'},
    {id:'mtn',name:'MTN',icon:'🟨',desc:'شحن رصيد MTN',from:500,type:'recharge'},
    {id:'sudani',name:'سوداني',icon:'🟢',desc:'شحن رصيد سوداني',from:500,type:'recharge'},
  ],
  electricity:[
    {id:'elec',name:'كهرباء السودان',icon:'⚡',desc:'شراء وحدات الكهرباء برقم العداد',from:1000,type:'electricity'},
  ],
  cards:[
    {id:'ps',name:'PlayStation Store',icon:'🎮',desc:'بطاقات PlayStation اصلية',from:500,type:'card'},
    {id:'steam',name:'Steam',icon:'💨',desc:'بطاقات Steam الرقمية',from:500,type:'card'},
    {id:'google',name:'Google Play',icon:'▶️',desc:'بطاقات Google Play',from:200,type:'card'},
    {id:'apple',name:'Apple / iTunes',icon:'🍎',desc:'بطاقات Apple Store',from:200,type:'card'},
    {id:'xbox',name:'Xbox',icon:'🟢',desc:'بطاقات Xbox / Microsoft',from:500,type:'card'},
    {id:'amazon',name:'Amazon',icon:'📦',desc:'بطاقات Amazon Gift Card',from:500,type:'card'},
    {id:'netflix-card',name:'Netflix Gift',icon:'🎬',desc:'بطاقات Netflix',from:300,type:'card'},
    {id:'spotify-card',name:'Spotify Gift',icon:'🎵',desc:'بطاقات Spotify',from:200,type:'card'},
    {id:'master',name:'MasterCard Virtual',icon:'💳',desc:'بطاقات MasterCard افتراضية',from:200,type:'card'},
    {id:'visa',name:'Visa Virtual',icon:'💳',desc:'بطاقات Visa Virtual',from:200,type:'card'},
  ],
  entertainment:[
    {id:'netflix',name:'Netflix',icon:'📺',desc:'اشتراك Netflix',from:500,type:'subscription'},
    {id:'spotify',name:'Spotify Premium',icon:'🎵',desc:'Spotify Premium',from:200,type:'subscription'},
    {id:'youtube',name:'YouTube Premium',icon:'▶️',desc:'YouTube Premium بلا إعلانات',from:200,type:'subscription'},
    {id:'shahid',name:'Shahid VIP',icon:'🌙',desc:'اشتراك شاهد VIP',from:300,type:'subscription'},
    {id:'osn',name:'OSN+',icon:'📡',desc:'اشتراك OSN Plus',from:500,type:'subscription'},
    {id:'tod',name:'TOD',icon:'🏟️',desc:'اشتراك TOD رياضي',from:300,type:'subscription'},
  ],
  custom:[
    {id:'custom',name:'خدمة حسب الطلب',icon:'✨',desc:'أي خدمة رقمية تحتاجها عبر الواتساب',from:0,type:'custom'},
  ]
};

const DEFAULT_CATEGORIES = {
  ff:[
    {id:'ff100',name:'100 جوهرة',price:100,desc:''},
    {id:'ff310',name:'310 جوهرة',price:280,desc:'الأكثر طلباً',featured:true},
    {id:'ff520',name:'520 جوهرة',price:450,desc:''},
    {id:'ff1060',name:'1060 جوهرة',price:880,desc:''},
    {id:'ff2180',name:'2180 جوهرة',price:1700,desc:''},
    {id:'ff5600',name:'5600 جوهرة',price:4200,desc:''},
    {id:'weekly',name:'Weekly Diamond Pass',price:150,desc:''},
    {id:'monthly',name:'Monthly Membership',price:350,desc:''},
  ],
  pubg:[
    {id:'p60',name:'60 UC',price:80,desc:''},
    {id:'p180',name:'180 UC',price:230,desc:''},
    {id:'p325',name:'325 UC',price:400,desc:'الأكثر طلباً',featured:true},
    {id:'p660',name:'660 UC',price:780,desc:''},
    {id:'p1800',name:'1800 UC',price:2100,desc:''},
    {id:'p3850',name:'3850 UC',price:4300,desc:''},
  ],
  cod:[
    {id:'c80',name:'80 CP',price:80,desc:''},
    {id:'c400',name:'400 CP',price:400,desc:''},
    {id:'c880',name:'880 CP',price:850,desc:'الأكثر طلباً',featured:true},
    {id:'c2000',name:'2000 CP',price:1900,desc:''},
    {id:'c5000',name:'5000 CP',price:4600,desc:''},
  ],
  ml:[
    {id:'ml100',name:'100 Diamond',price:90,desc:''},
    {id:'ml250',name:'250 Diamond',price:220,desc:''},
    {id:'ml500',name:'500 Diamond',price:420,desc:'الأكثر طلباً',featured:true},
    {id:'ml1000',name:'1000 Diamond',price:820,desc:''},
    {id:'ml2000',name:'2000 Diamond',price:1600,desc:''},
  ],
  tiktok:[
    {id:'t70',name:'70 عملة',price:80,desc:''},
    {id:'t350',name:'350 عملة',price:380,desc:''},
    {id:'t700',name:'700 عملة',price:750,desc:'الأكثر طلباً',featured:true},
    {id:'t1400',name:'1400 عملة',price:1450,desc:''},
    {id:'t3500',name:'3500 عملة',price:3500,desc:''},
    {id:'t7000',name:'7000 عملة',price:6900,desc:''},
  ],
  ps:[
    {id:'ps5',name:'5 دولار',price:500,desc:''},
    {id:'ps10',name:'10 دولار',price:950,desc:''},
    {id:'ps20',name:'20 دولار',price:1850,desc:'الأكثر طلباً',featured:true},
    {id:'ps50',name:'50 دولار',price:4600,desc:''},
    {id:'ps100',name:'100 دولار',price:9000,desc:''},
  ],
  master:[
    {id:'m5',name:'5 دولار',price:600,desc:''},
    {id:'m10',name:'10 دولار',price:1100,desc:''},
    {id:'m20',name:'20 دولار',price:2100,desc:'الأكثر طلباً',featured:true},
    {id:'m50',name:'50 دولار',price:5000,desc:''},
    {id:'m100',name:'100 دولار',price:9500,desc:''},
  ],
  zain:[
    {id:'z500',name:'500 جنيه',price:500,desc:''},
    {id:'z1000',name:'1000 جنيه',price:1000,desc:''},
    {id:'z2000',name:'2000 جنيه',price:2000,desc:'الأكثر طلباً',featured:true},
    {id:'z5000',name:'5000 جنيه',price:5000,desc:''},
    {id:'z10000',name:'10000 جنيه',price:10000,desc:''},
  ],
  mtn:[
    {id:'mtn500',name:'500 جنيه',price:500,desc:''},
    {id:'mtn1000',name:'1000 جنيه',price:1000,desc:'الأكثر طلباً',featured:true},
    {id:'mtn2000',name:'2000 جنيه',price:2000,desc:''},
    {id:'mtn5000',name:'5000 جنيه',price:5000,desc:''},
  ],
  sudani:[
    {id:'s500',name:'500 جنيه',price:500,desc:''},
    {id:'s1000',name:'1000 جنيه',price:1000,desc:'الأكثر طلباً',featured:true},
    {id:'s2000',name:'2000 جنيه',price:2000,desc:''},
    {id:'s5000',name:'5000 جنيه',price:5000,desc:''},
  ],
  elec:[
    {id:'e1000',name:'1000 وحدة',price:1000,desc:''},
    {id:'e2000',name:'2000 وحدة',price:2000,desc:''},
    {id:'e5000',name:'5000 وحدة',price:5000,desc:'الأكثر طلباً',featured:true},
    {id:'e10000',name:'10000 وحدة',price:10000,desc:''},
  ],
};

// ==================== STATE ====================
let app = null, auth = null, db = null;
let currentUser = null, currentWallet = null;
let currentPage = 'home', currentParams = {};
let cart = JSON.parse(localStorage.getItem('nila_cart') || '[]');
let unsubWallet = null;

// ==================== INIT ====================
window.addEventListener('DOMContentLoaded', () => {
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
    db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });
    db.enablePersistence().catch(()=>{});
  } catch(e) {
    console.error('Firebase init error:', e);
    showToast('خطأ في الاتصال بالخادم. تأكد من تكوين Firebase.', 'error');
  }

  if (auth) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        currentUser = user;
        await loadWalletData();
        updateHeaderForUser();
        updateSidebarForUser();
        subscribeNotifCount();
      } else {
        currentUser = null;
        currentWallet = null;
        if (unsubWallet) { unsubWallet(); unsubWallet = null; }
        updateHeaderForGuest();
        updateSidebarForGuest();
      }
      hideLoading();
      const hash = window.location.hash.slice(1) || 'home';
      navigate(hash.split('?')[0], parseHashParams());
    });
  } else {
    hideLoading();
    navigate('home');
  }
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'home';
  navigate(hash.split('?')[0], parseHashParams(), true);
});

function parseHashParams() {
  const hash = window.location.hash.slice(1);
  const qi = hash.indexOf('?');
  if (qi < 0) return {};
  const ps = new URLSearchParams(hash.slice(qi+1));
  const r = {};
  for (const [k,v] of ps) r[k] = v;
  return r;
}

// ==================== NAVIGATION ====================
function navigate(page, params={}, fromHash=false) {
  currentPage = page;
  currentParams = params || {};
  if (!fromHash) {
    const ps = Object.keys(params).length ? '?'+new URLSearchParams(params).toString() : '';
    window.location.hash = page + ps;
  }
  closeSidebar();
  renderPage(page);
}

function renderPage(page) {
  const c = document.getElementById('page-container');
  if (!c) return;
  c.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  setTimeout(() => {
    const pages = {
      home: renderHome,
      sections: renderSections,
      products: renderProducts,
      categories: renderCategories,
      order: renderOrder,
      cart: renderCart,
      login: renderLogin,
      register: renderRegister,
      'forgot-password': renderForgotPassword,
      profile: renderProfile,
      wallet: renderWallet,
      'wallet-topup': renderWalletTopup,
      orders: renderOrders,
      notifications: renderNotifications,
      'edit-profile': renderEditProfile,
      support: renderSupport,
      about: renderAbout,
      faq: renderFAQ,
      privacy: renderPrivacy,
      terms: renderTerms,
      admin: renderAdmin,
      offers: renderOffers,
    };
    const fn = pages[page] || renderHome;
    fn();
  }, 50);
}

// ==================== AUTH HELPERS ====================
function requireAuth(redirectPage) {
  if (!currentUser) { navigate('login', {redirect: redirectPage || currentPage}); return false; }
  return true;
}
function isAdmin() { return currentUser && currentUser.email === ADMIN_EMAIL; }

// ==================== WALLET ====================
async function loadWalletData() {
  if (!currentUser || !db) return;
  try {
    const snap = await db.collection('wallets').where('userId','==',currentUser.uid).limit(1).get();
    if (!snap.empty) {
      currentWallet = { id: snap.docs[0].id, ...snap.docs[0].data() };
    } else {
      await createWalletForUser(currentUser.uid);
    }
  } catch(e) { console.error('loadWallet error', e); }
}

async function createWalletForUser(uid) {
  if (!db) return;
  const walletId = 'W-' + Math.random().toString(36).substr(2,8).toUpperCase();
  const walletData = { walletId, userId: uid, balance: 0, totalCharged: 0, totalSpent: 0, walletStatus:'active', createdAt: firebase.firestore.FieldValue.serverTimestamp() };
  const ref = await db.collection('wallets').add(walletData);
  currentWallet = { id: ref.id, ...walletData };
  await db.collection('users').doc(uid).set({ walletId }, { merge: true });
}

function subscribeNotifCount() {
  if (!currentUser || !db) return;
  db.collection('notifications').where('userId','==',currentUser.uid).where('read','==',false).onSnapshot(snap => {
    const c = snap.size;
    const pill = document.getElementById('notif-pill');
    const badge = document.getElementById('h-notif-badge');
    const hBtn = document.getElementById('h-notif-btn');
    if (pill) { pill.textContent = c; pill.style.display = c>0 ? 'inline-block' : 'none'; }
    if (badge) { badge.textContent = c; badge.style.display = c>0 ? 'flex' : 'none'; }
    if (hBtn) hBtn.style.display = 'flex';
  });
}

// ==================== HEADER & SIDEBAR UI ====================
function updateHeaderForUser() {
  const wChip = document.getElementById('h-wallet-chip');
  const hBal = document.getElementById('h-balance');
  if (wChip) wChip.style.display = 'flex';
  if (hBal && currentWallet) hBal.textContent = fmtNum(currentWallet.balance);
  updateCartBadge();
}
function updateHeaderForGuest() {
  const wChip = document.getElementById('h-wallet-chip');
  const hBtn = document.getElementById('h-notif-btn');
  if (wChip) wChip.style.display = 'none';
  if (hBtn) hBtn.style.display = 'none';
  updateCartBadge();
}
function updateSidebarForUser() {
  const nm = document.getElementById('s-name');
  const av = document.getElementById('s-avatar');
  const bal = document.getElementById('s-balance');
  const balVal = document.getElementById('s-balance-val');
  const authBtn = document.getElementById('s-auth-btn');
  const authTxt = document.getElementById('s-auth-text');
  const authIco = document.getElementById('s-auth-icon');
  const adminLbl = document.getElementById('s-admin-label');
  const adminLnk = document.getElementById('s-admin-link');
  const ub = currentUser.displayName || currentUser.email.split('@')[0];
  if (nm) nm.textContent = ub;
  if (av) av.textContent = ub.charAt(0).toUpperCase();
  if (bal) bal.style.display = 'block';
  if (balVal && currentWallet) balVal.textContent = fmtNum(currentWallet.balance);
  if (authTxt) authTxt.textContent = 'تسجيل الخروج';
  if (authIco) authIco.textContent = '🚪';
  if (isAdmin()) {
    if (adminLbl) adminLbl.style.display = 'block';
    if (adminLnk) adminLnk.style.display = 'flex';
  }
}
function updateSidebarForGuest() {
  const nm = document.getElementById('s-name');
  const av = document.getElementById('s-avatar');
  const bal = document.getElementById('s-balance');
  const authTxt = document.getElementById('s-auth-text');
  const authIco = document.getElementById('s-auth-icon');
  const adminLbl = document.getElementById('s-admin-label');
  const adminLnk = document.getElementById('s-admin-link');
  if (nm) nm.textContent = 'أهلاً بيك';
  if (av) av.textContent = 'N';
  if (bal) bal.style.display = 'none';
  if (authTxt) authTxt.textContent = 'تسجيل الدخول';
  if (authIco) authIco.textContent = '🔑';
  if (adminLbl) adminLbl.style.display = 'none';
  if (adminLnk) adminLnk.style.display = 'none';
}
function updateCartBadge() {
  const b = document.getElementById('h-cart-badge');
  if (!b) return;
  if (cart.length > 0) { b.textContent = cart.length; b.style.display = 'flex'; }
  else b.style.display = 'none';
}

// ==================== SIDEBAR ====================
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('active');
}
function handleSidebarAuth() {
  if (currentUser) {
    showConfirm('🚪','تسجيل الخروج','هل تريد تسجيل الخروج؟', async () => {
      await auth.signOut();
      navigate('home');
    });
  } else { navigate('login'); }
}

// ==================== LOADING ====================
function showLoading() { const el = document.getElementById('loading-overlay'); if(el) el.classList.remove('hidden'); }
function hideLoading() { const el = document.getElementById('loading-overlay'); if(el) el.classList.add('hidden'); }

// ==================== TOAST ====================
function showToast(msg, type='success', duration=3000) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.animation = 'fadeOut 0.3s forwards'; setTimeout(()=>t.remove(), 300); }, duration);
}

// ==================== CONFIRM MODAL ====================
let _confirmCb = null;
function showConfirm(emoji, title, msg, cb) {
  document.getElementById('modal-emoji').textContent = emoji;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-msg').textContent = msg;
  document.getElementById('modal-confirm').style.display = 'flex';
  _confirmCb = cb;
  document.getElementById('modal-yes-btn').onclick = () => { closeModal(); if(_confirmCb) _confirmCb(); };
}
function closeModal() { document.getElementById('modal-confirm').style.display = 'none'; _confirmCb = null; }

// ==================== HELPERS ====================
function fmtNum(n) { return (n||0).toLocaleString('ar-EG'); }
function fmtDate(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('ar-EG') + ' ' + d.toLocaleTimeString('ar-EG', {hour:'2-digit',minute:'2-digit'});
}
function genId() { return Date.now().toString(36) + Math.random().toString(36).substr(2,4); }
function statusBadge(s) {
  const m = {new:'جديد',pending:'قيد الانتظار',processing:'قيد التنفيذ',done:'تم الشحن',completed:'مكتمل',cancelled:'ملغي',rejected:'مرفوض',active:'نشط',frozen:'مجمدة'};
  const c = {new:'badge-new',pending:'badge-pending',processing:'badge-processing',done:'badge-done',completed:'badge-done',cancelled:'badge-cancelled',rejected:'badge-rejected',active:'badge-active',frozen:'badge-frozen'};
  return `<span class="badge ${c[s]||'badge-new'}">${m[s]||s}</span>`;
}
function copyText(txt) {
  navigator.clipboard.writeText(txt).then(()=>showToast('تم النسخ!','success')).catch(()=>{
    const ta = document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showToast('تم النسخ!','success');
  });
}
function openWA(msg='') {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg || 'أهلاً، أحتاج مساعدة في متجر نيلة ستور')}`;
  window.open(url,'_blank');
}
function getProductById(section, productId) {
  const prods = DEFAULT_PRODUCTS[section] || [];
  return prods.find(p=>p.id===productId) || null;
}
function getSectionById(id) { return SECTIONS.find(s=>s.id===id) || null; }
function saveCart() { localStorage.setItem('nila_cart', JSON.stringify(cart)); updateCartBadge(); }
function addToCart(item) {
  cart.push(item); saveCart();
  showToast('أُضيف للسلة ✓','success');
}
function removeFromCart(idx) { cart.splice(idx,1); saveCart(); }

// ==================== HOME PAGE ====================
function renderHome() {
  const c = document.getElementById('page-container');
  const featuredProds = [
    ...DEFAULT_PRODUCTS.games.slice(0,3),
    ...DEFAULT_PRODUCTS.social.slice(0,2),
    ...DEFAULT_PRODUCTS.cards.slice(0,2)
  ];
  const topSections = SECTIONS.slice(0,6);

  c.innerHTML = `
  <div class="page">
    <!-- HERO -->
    <div class="hero-banner">
      <div class="hero-title">أهلاً بيك في <span>نيلة ستور</span> 🎮</div>
      <div class="hero-sub">أفضل متجر شحن ألعاب وخدمات رقمية في السودان<br>اشحن لعبتك بسرعة وأمان وبأسعار مناسبة</div>
      <div class="hero-cta">
        <button class="btn btn-accent btn-lg" onclick="navigate('sections')">🚀 اشحن هسع</button>
        <button class="btn btn-outline" onclick="navigate('about')">عن المتجر</button>
      </div>
    </div>

    <!-- TRUST BAR -->
    <div class="trust-bar">
      <div class="trust-item"><div class="trust-icon">⚡</div><div class="trust-label">شحن سريع</div><div>خلال دقائق</div></div>
      <div class="trust-item"><div class="trust-icon">🔒</div><div class="trust-label">آمن 100%</div><div>مضمون</div></div>
      <div class="trust-item"><div class="trust-icon">🎧</div><div class="trust-label">دعم فني</div><div>واتساب</div></div>
      <div class="trust-item"><div class="trust-icon">🇸🇩</div><div class="trust-label">للسودان</div><div>خاص بيك</div></div>
    </div>

    <!-- QUICK SECTIONS -->
    <div class="section-title-bar">
      <h3>📦 الأقسام الرئيسية</h3>
      <span class="see-all" onclick="navigate('sections')">الكل ←</span>
    </div>
    <div class="sections-grid">
      ${topSections.map(s=>`
        <div class="section-card" onclick="navigate('products',{section:'${s.id}'})">
          <span class="sec-icon">${s.icon}</span>
          <div class="sec-name">${s.name}</div>
        </div>
      `).join('')}
    </div>

    <!-- FEATURED PRODUCTS -->
    <div class="section-title-bar" style="margin-top:20px">
      <h3>🔥 أشهر الخدمات</h3>
      <span class="see-all" onclick="navigate('sections')">الكل ←</span>
    </div>
    <div class="products-scroll">
      ${featuredProds.map(p=>{
        const sec = Object.keys(DEFAULT_PRODUCTS).find(k=>DEFAULT_PRODUCTS[k].find(x=>x.id===p.id)) || 'games';
        return `
        <div class="product-card" onclick="navigate('categories',{productId:'${p.id}',section:'${sec}'})">
          <span class="prod-emoji">${p.icon}</span>
          <div class="prod-name">${p.name}</div>
          <div class="prod-from">يبدأ من ${fmtNum(p.from)} SDG</div>
          <button class="prod-btn" onclick="event.stopPropagation();navigate('categories',{productId:'${p.id}',section:'${sec}'})">اشحن الآن</button>
        </div>`;
      }).join('')}
    </div>

    <!-- SUPPORT BANNER -->
    <div class="support-banner">
      <div class="sup-icon">🎧</div>
      <div>
        <h4>محتاج مساعدة؟</h4>
        <p>لو واجهتك أي مشكلة راسلنا مباشرة في الواتساب وهنساعدك</p>
        <button class="whatsapp-btn" onclick="openWA()">💬 تواصل واتساب</button>
      </div>
    </div>

    <!-- STATS -->
    <div style="padding:0 16px;margin-bottom:16px">
      <div class="card" style="padding:20px;text-align:center">
        <div style="font-size:36px;font-weight:900;color:var(--accent)">10,000+</div>
        <div style="font-size:14px;color:var(--text2);margin-top:4px">طلب منجز بنجاح</div>
        <div style="font-size:13px;color:var(--text3);margin-top:8px">رضا الزبون أولويتنا الأولى</div>
      </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-links">
        <a onclick="navigate('about')">عن المتجر</a>
        <a onclick="navigate('privacy')">سياسة الخصوصية</a>
        <a onclick="navigate('terms')">شروط الاستخدام</a>
        <a onclick="navigate('faq')">الأسئلة الشائعة</a>
        <a onclick="navigate('support')">تواصل معنا</a>
      </div>
      <div class="footer-copy">© 2025 نيلة ستور - جميع الحقوق محفوظة 🇸🇩</div>
    </div>
  </div>`;
}

// ==================== SECTIONS PAGE ====================
function renderSections() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header">
      <h2>📦 كل الأقسام</h2>
      <p>اختار القسم الذي تريده</p>
    </div>
    <div class="sections-page-grid">
      ${SECTIONS.map(s=>`
        <div class="sec-page-card" onclick="navigate('products',{section:'${s.id}'})">
          <span class="spc-icon">${s.icon}</span>
          <div class="spc-name">${s.name}</div>
          <div class="spc-desc">${s.desc}</div>
          <span class="spc-arrow">←</span>
        </div>
      `).join('')}
    </div>
  </div>`;
}

// ==================== PRODUCTS PAGE ====================
function renderProducts() {
  const { section } = currentParams;
  const sec = getSectionById(section) || SECTIONS[0];
  const products = DEFAULT_PRODUCTS[sec.id] || [];
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header">
      <div class="back-btn" onclick="navigate('sections')">→ الأقسام</div>
      <h2>${sec.icon} ${sec.name}</h2>
      <p>${sec.desc}</p>
    </div>
    <div class="products-list">
      ${products.map(p=>`
        <div class="prod-list-card card-hover" onclick="navigate('categories',{productId:'${p.id}',section:'${sec.id}'})">
          <span class="plc-icon">${p.icon}</span>
          <div class="plc-info">
            <div class="plc-name">${p.name}</div>
            <div class="plc-desc">${p.desc}</div>
            ${p.from>0?`<div class="plc-from">يبدأ من ${fmtNum(p.from)} SDG</div>`:'<div class="plc-from">راسلنا للسعر</div>'}
          </div>
          <span class="plc-arrow">←</span>
        </div>
      `).join('')}
    </div>
    ${products.length===0?`<div class="empty-state"><div class="es-icon">${sec.icon}</div><div class="es-title">لا توجد منتجات حالياً</div><div class="es-desc">قريباً ستتوفر منتجات في هذا القسم</div></div>`:''}
  </div>`;
}

// ==================== CATEGORIES PAGE ====================
async function renderCategories() {
  const { productId, section } = currentParams;
  const c = document.getElementById('page-container');
  const sec = getSectionById(section) || SECTIONS[0];
  const prod = getProductById(section, productId);
  if (!prod) { navigate('products', {section: section||'games'}); return; }

  let cats = DEFAULT_CATEGORIES[productId] || [];

  // Try to get from Firestore
  if (db) {
    try {
      const snap = await db.collection('categories').where('productId','==',productId).where('active','==',true).orderBy('sortOrder','asc').get();
      if (!snap.empty) {
        cats = snap.docs.map(d=>({id:d.id,...d.data()}));
      }
    } catch(e) {}
  }

  // Special cases
  if (prod.type === 'custom') {
    c.innerHTML = `
    <div class="page">
      <div class="cats-header">
        <div class="ch-icon">${prod.icon}</div>
        <div class="ch-name">${prod.name}</div>
        <div class="ch-desc">${prod.desc}</div>
      </div>
      <div class="section-pad">
        <div class="card" style="padding:20px;text-align:center;margin-bottom:16px">
          <div style="font-size:40px;margin-bottom:12px">💬</div>
          <h3 style="font-size:16px;margin-bottom:8px">خدمة حسب الطلب</h3>
          <p style="font-size:13px;color:var(--text2);margin-bottom:16px">هذه الخدمة تتم عبر التواصل المباشر. راسلنا في الواتساب وسنساعدك.</p>
          <button class="btn btn-success btn-full" onclick="openWA('أهلاً، أريد خدمة: ${prod.name}')">💬 تواصل واتساب</button>
        </div>
        <div class="back-btn" onclick="navigate('products',{section:'${section}'})">→ رجوع</div>
      </div>
    </div>`;
    return;
  }

  // Electricity special
  if (prod.type === 'electricity') {
    c.innerHTML = `
    <div class="page">
      <div class="cats-header">
        <div class="ch-icon">${prod.icon}</div>
        <div class="ch-name">${prod.name}</div>
        <div class="ch-desc">ادخل رقم العداد والمبلغ</div>
      </div>
      <div class="section-pad">
        <div class="form-card">
          <div class="form-group">
            <label class="form-label">رقم العداد *</label>
            <input class="form-input" id="meter-num" type="text" placeholder="ادخل رقم العداد" />
          </div>
          <div class="form-group">
            <label class="form-label">قيمة الشحن (SDG) *</label>
            <input class="form-input" id="elec-amount" type="number" placeholder="المبلغ" min="500" />
            <div class="form-hint">الحد الأدنى: 500 SDG</div>
          </div>
          <button class="btn btn-primary btn-full" onclick="submitElectricityOrder('${productId}','${prod.name}','${prod.icon}')">⚡ تأكيد الطلب</button>
        </div>
        <div class="back-btn" onclick="navigate('products',{section:'${section}'})">→ رجوع</div>
      </div>
    </div>`;
    return;
  }

  // Recharge special (unlimited amount)
  if (prod.type === 'recharge') {
    const defaultCats = DEFAULT_CATEGORIES[productId] || [];
    c.innerHTML = `
    <div class="page">
      <div class="cats-header">
        <div class="ch-icon">${prod.icon}</div>
        <div class="ch-name">${prod.name}</div>
        <div class="ch-desc">اختار الفئة أو ادخل مبلغ مخصص</div>
      </div>
      <div class="section-pad">
        <div class="form-group"><label class="form-label">رقم الهاتف *</label><input class="form-input" id="phone-num" type="tel" placeholder="09XXXXXXXXX" /></div>
        <div class="form-group"><label class="form-label">المبلغ (SDG)</label>
          <div class="amount-chips" id="recharge-chips">
            ${(defaultCats.length?defaultCats:['500','1000','2000','5000'].map(v=>({id:v,name:`${v} SDG`,price:+v}))).map(ct=>`
              <div class="amount-chip" onclick="selectAmount(${ct.price},this)">${fmtNum(ct.price)} SDG</div>
            `).join('')}
          </div>
          <input class="form-input" id="recharge-amount" type="number" placeholder="أو ادخل مبلغ مخصص" min="100" />
        </div>
        <button class="btn btn-primary btn-full" onclick="submitRechargeOrder('${productId}','${prod.name}','${prod.icon}','${section}')">📞 تأكيد الشحن</button>
      </div>
    </div>`;
    return;
  }

  c.innerHTML = `
  <div class="page">
    <div class="cats-header">
      <div class="ch-icon">${prod.icon}</div>
      <div class="ch-name">${prod.name}</div>
      <div class="ch-desc">${prod.desc}</div>
    </div>
    <div class="cats-grid">
      ${cats.map(cat=>`
        <div class="cat-card ${cat.featured?'featured':''}" onclick="navigate('order',{productId:'${productId}',section:'${section}',catId:'${cat.id}'})">
          ${cat.featured?'<div class="cc-popular">الأكثر طلباً</div>':''}
          <div class="cc-name">${cat.name}</div>
          <div class="cc-price">${fmtNum(cat.price)} SDG</div>
          ${cat.desc?`<div class="cc-desc">${cat.desc}</div>`:''}
          <button class="cc-btn" onclick="event.stopPropagation();navigate('order',{productId:'${productId}',section:'${section}',catId:'${cat.id}'})">اشحن الآن</button>
        </div>
      `).join('')}
    </div>
    ${cats.length===0?`<div class="empty-state"><div class="es-icon">${prod.icon}</div><div class="es-title">لا توجد فئات حالياً</div><div class="es-desc">قريباً ستتوفر فئات لهذا المنتج</div></div>`:''}
    <div style="padding:0 16px"><div class="back-btn" onclick="navigate('products',{section:'${section}'})">→ رجوع</div></div>
  </div>`;
}

function selectAmount(amount, el) {
  document.querySelectorAll('.amount-chip').forEach(c=>c.classList.remove('active'));
  el.classList.add('active');
  const inp = document.getElementById('recharge-amount');
  if (inp) inp.value = amount;
}

async function submitElectricityOrder(productId, productName, icon) {
  if (!requireAuth('categories')) return;
  const meter = document.getElementById('meter-num')?.value?.trim();
  const amount = parseInt(document.getElementById('elec-amount')?.value || 0);
  if (!meter) { showToast('ادخل رقم العداد','error'); return; }
  if (!amount || amount < 500) { showToast('الحد الأدنى 500 SDG','error'); return; }
  if (!currentWallet || currentWallet.balance < amount) { showToast('رصيد المحفظة غير كافٍ','error'); navigate('wallet-topup'); return; }
  const order = { userId: currentUser.uid, walletId: currentWallet.id, productId, productName, categoryName: `${fmtNum(amount)} SDG`, icon, amount, section: 'electricity', status: 'new', customerData: { meterNumber: meter, chargeValue: amount }, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
  await placeOrder(order, amount);
}

async function submitRechargeOrder(productId, productName, icon, section) {
  if (!requireAuth('categories')) return;
  const phone = document.getElementById('phone-num')?.value?.trim();
  const amount = parseInt(document.getElementById('recharge-amount')?.value || 0);
  if (!phone) { showToast('ادخل رقم الهاتف','error'); return; }
  if (!amount || amount < 100) { showToast('ادخل مبلغ صحيح','error'); return; }
  if (!currentWallet || currentWallet.balance < amount) { showToast('رصيد المحفظة غير كافٍ','error'); navigate('wallet-topup'); return; }
  const order = { userId: currentUser.uid, walletId: currentWallet.id, productId, productName, categoryName: `${fmtNum(amount)} SDG`, icon, amount, section, status: 'new', customerData: { phoneNumber: phone, networkName: productName }, createdAt: firebase.firestore.FieldValue.serverTimestamp() };
  await placeOrder(order, amount);
}

// ==================== ORDER PAGE ====================
async function renderOrder() {
  const { productId, section, catId } = currentParams;
  const c = document.getElementById('page-container');
  const prod = getProductById(section, productId);
  if (!prod) { navigate('sections'); return; }

  let cat = null;
  const defaultCats = DEFAULT_CATEGORIES[productId] || [];
  cat = defaultCats.find(ct=>ct.id===catId);

  if (!cat && db) {
    try {
      const snap = await db.collection('categories').doc(catId).get();
      if (snap.exists) cat = { id: snap.id, ...snap.data() };
    } catch(e) {}
  }
  if (!cat) { navigate('categories', {productId, section}); return; }

  const bal = currentWallet?.balance || 0;
  const sufficient = bal >= cat.price;

  const fields = getOrderFields(prod.type);

  c.innerHTML = `
  <div class="page">
    <div class="page-header">
      <div class="back-btn" onclick="navigate('categories',{productId:'${productId}',section:'${section}'})">→ رجوع</div>
      <h2>تأكيد الطلب</h2>
    </div>
    <div class="order-summary-card">
      <span class="osc-icon">${prod.icon}</span>
      <div>
        <div class="osc-name">${prod.name}</div>
        <div class="osc-cat">${cat.name}</div>
        <div class="osc-price">${fmtNum(cat.price)} SDG</div>
      </div>
    </div>
    ${currentUser ? `
    <div class="wallet-status-card">
      <div>
        <div class="wsc-label">رصيد المحفظة</div>
        <div class="wsc-balance ${sufficient?'ok':'low'}">${fmtNum(bal)} SDG</div>
      </div>
      ${!sufficient?`<button class="wsc-topup" onclick="navigate('wallet-topup')">شحن المحفظة</button>`:''}
    </div>
    ` : `
    <div style="padding:0 16px 16px"><div class="card" style="padding:14px;display:flex;gap:10px;align-items:center;border-color:var(--accent)">
      <span style="font-size:24px">🔑</span>
      <div><div style="font-weight:700;font-size:14px">سجّل دخولك للمتابعة</div><div style="font-size:12px;color:var(--text2);margin-top:4px">يلزم تسجيل الدخول لتأكيد الطلب</div></div>
      <button class="btn btn-primary btn-sm" onclick="navigate('login',{redirect:'order'})">دخول</button>
    </div></div>`}
    <div class="order-form">
      ${fields}
      ${currentUser && sufficient ? `
        <button class="btn btn-primary btn-full btn-lg" id="confirm-order-btn" onclick="submitOrder('${productId}','${section}','${catId}')">✅ تأكيد الطلب</button>
      ` : currentUser ? `
        <button class="btn btn-accent btn-full" onclick="navigate('wallet-topup')">💰 شحن المحفظة</button>
      ` : `
        <button class="btn btn-primary btn-full" onclick="navigate('login',{redirect:'order'})">🔑 تسجيل الدخول للمتابعة</button>
      `}
    </div>
  </div>`;
}

function getOrderFields(type) {
  switch(type) {
    case 'game': return `
      <div class="form-group"><label class="form-label">ID اللاعب *</label><input class="form-input" id="f-player-id" placeholder="ادخل ID اللاعب" /></div>
      <div class="form-group"><label class="form-label">الاسم في اللعبة</label><input class="form-input" id="f-nickname" placeholder="اسمك في اللعبة" /></div>
      <div class="form-group"><label class="form-label">السيرفر (إن وُجد)</label><input class="form-input" id="f-server" placeholder="مثل: Asia, NA" /></div>`;
    case 'tiktok': return `
      <div class="form-group"><label class="form-label">رقم حساب تيك توك *</label><input class="form-input" id="f-account-id" placeholder="ادخل رقم الحساب" /></div>`;
    case 'social': return `
      <div class="form-group"><label class="form-label">معرف الحساب *</label><input class="form-input" id="f-account-id" placeholder="ادخل معرف الحساب" /></div>`;
    case 'subscription': return `
      <div class="form-group"><label class="form-label">البريد الإلكتروني *</label><input class="form-input" id="f-email" type="email" placeholder="بريد الحساب" /></div>
      <div class="form-group"><label class="form-label">اسم الحساب</label><input class="form-input" id="f-account-name" placeholder="اسمك في الخدمة" /></div>`;
    case 'card': return `<div class="card" style="padding:14px;margin-bottom:16px;text-align:center"><div style="font-size:28px;margin-bottom:8px">💳</div><div style="font-size:13px;color:var(--text2)">سيتم إرسال البطاقة إليك بعد تأكيد الطلب</div></div>`;
    default: return '';
  }
}

async function submitOrder(productId, section, catId) {
  if (!requireAuth()) return;
  const btn = document.getElementById('confirm-order-btn');
  if (btn) { btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span> جاري التأكيد...'; }

  const prod = getProductById(section, productId);
  const defaultCats = DEFAULT_CATEGORIES[productId] || [];
  let cat = defaultCats.find(ct=>ct.id===catId);

  if (!cat && db) {
    try {
      const snap = await db.collection('categories').doc(catId).get();
      if (snap.exists) cat = { id: snap.id, ...snap.data() };
    } catch(e) {}
  }
  if (!cat) { showToast('حدث خطأ في الفئة','error'); return; }
  if (!currentWallet || currentWallet.balance < cat.price) { showToast('رصيد غير كافٍ','error'); navigate('wallet-topup'); return; }

  const customerData = collectOrderFields(prod?.type);
  const order = {
    userId: currentUser.uid, walletId: currentWallet.id,
    productId, productName: prod.name, categoryId: catId, categoryName: cat.name,
    icon: prod?.icon || '📦', amount: cat.price, section,
    status: 'new', customerData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  await placeOrder(order, cat.price);
}

function collectOrderFields(type) {
  const data = {};
  const g = (id) => document.getElementById(id)?.value?.trim() || '';
  switch(type) {
    case 'game': data.playerId=g('f-player-id'); data.nickname=g('f-nickname'); data.server=g('f-server'); break;
    case 'tiktok': case 'social': data.accountId=g('f-account-id'); break;
    case 'subscription': data.email=g('f-email'); data.accountName=g('f-account-name'); break;
  }
  return data;
}

async function placeOrder(order, amount) {
  if (!db) { showToast('خطأ في الاتصال','error'); return; }
  try {
    // Deduct from wallet
    await db.collection('wallets').doc(currentWallet.id).update({
      balance: firebase.firestore.FieldValue.increment(-amount),
      totalSpent: firebase.firestore.FieldValue.increment(amount),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    currentWallet.balance -= amount;
    // Create order
    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    const ref = await db.collection('orders').add({ ...order, orderId });
    // Log wallet transaction
    await db.collection('walletTransactions').add({
      walletId: currentWallet.id, userId: currentUser.uid,
      type: 'spend', amount, reason: `طلب ${order.productName}`,
      beforeBalance: currentWallet.balance + amount, afterBalance: currentWallet.balance,
      status: 'completed', createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    // Notify
    await db.collection('notifications').add({
      userId: currentUser.uid, title: 'طلبك في الانتظار',
      message: `تم استلام طلبك بخصوص ${order.productName} - ${order.categoryName}. سيتم تنفيذه قريباً.`,
      type: 'order', read: false, createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    updateHeaderForUser();
    showToast('تم إرسال طلبك! طلبك في الانتظار ✅','success',4000);
    navigate('orders');
  } catch(e) {
    console.error(e);
    showToast('حدث خطأ. حاول مرة ثانية.','error');
    const btn = document.getElementById('confirm-order-btn');
    if (btn) { btn.disabled = false; btn.textContent = '✅ تأكيد الطلب'; }
  }
}

// ==================== CART PAGE ====================
function renderCart() {
  const c = document.getElementById('page-container');
  if (cart.length === 0) {
    c.innerHTML = `<div class="page"><div class="page-header"><h2>🛒 السلة</h2></div><div class="empty-state"><div class="es-icon">🛒</div><div class="es-title">السلة فارغة</div><div class="es-desc">لم تضف أي منتجات بعد</div><button class="btn btn-primary" onclick="navigate('sections')" style="margin-top:16px">ابدأ التسوق</button></div></div>`;
    return;
  }
  const total = cart.reduce((s,i)=>s+(i.price||0),0);
  const bal = currentWallet?.balance || 0;
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>🛒 سلة المشتريات</h2><p>${cart.length} منتج</p></div>
    <div class="cart-list">
      ${cart.map((item,idx)=>`
        <div class="cart-item">
          <span class="ci-icon">${item.icon||'📦'}</span>
          <div class="ci-info">
            <div class="ci-name">${item.name}</div>
            <div class="ci-cat">${item.cat||''}</div>
            <div class="ci-price">${fmtNum(item.price)} SDG</div>
          </div>
          <button class="ci-del" onclick="removeCartItem(${idx})">🗑</button>
        </div>
      `).join('')}
    </div>
    <div class="cart-summary" style="margin:0 16px 16px">
      <div class="cs-row"><span>الإجمالي</span><span class="cs-total">${fmtNum(total)} SDG</span></div>
      ${currentUser?`<div class="cs-row"><span>رصيد المحفظة</span><span style="color:${bal>=total?'var(--success)':'var(--danger)'}">${fmtNum(bal)} SDG</span></div>`:''}
      <div class="cs-checkout">
        ${currentUser ? (bal>=total ? `<button class="btn btn-primary btn-full" onclick="checkoutCart()">✅ إتمام الشراء</button>` : `<button class="btn btn-accent btn-full" onclick="navigate('wallet-topup')">💰 شحن المحفظة</button>`) : `<button class="btn btn-primary btn-full" onclick="navigate('login')">🔑 تسجيل الدخول</button>`}
      </div>
    </div>
    <div style="padding:0 16px"><button class="btn btn-ghost btn-full" onclick="navigate('sections')">متابعة التسوق</button></div>
  </div>`;
}

function removeCartItem(idx) {
  removeFromCart(idx);
  renderCart();
}

async function checkoutCart() {
  if (!requireAuth()) return;
  const total = cart.reduce((s,i)=>s+(i.price||0),0);
  if (!currentWallet || currentWallet.balance < total) { showToast('رصيد غير كافٍ','error'); return; }
  showConfirm('🛒','تأكيد الشراء',`هل تريد تأكيد شراء ${cart.length} منتج بإجمالي ${fmtNum(total)} SDG؟`, async () => {
    for (const item of cart) {
      await placeOrder({ ...item, userId: currentUser.uid, walletId: currentWallet.id, status:'new', createdAt: firebase.firestore.FieldValue.serverTimestamp() }, item.price);
    }
    cart = [];
    saveCart();
    navigate('orders');
  });
}

// ==================== LOGIN PAGE ====================
function renderLogin() {
  if (currentUser) { navigate(currentParams.redirect || 'home'); return; }
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="auth-page">
    <div class="auth-header-art">
      <div class="auth-logo-big">N</div>
      <div class="auth-title">أهلاً بيك في نيلة ستور</div>
      <div class="auth-sub">سجّل دخولك للمتابعة</div>
    </div>
    <div class="auth-card">
      <div class="form-group">
        <label class="form-label">البريد الإلكتروني</label>
        <input class="form-input" id="login-email" type="email" placeholder="your@email.com" dir="ltr" />
      </div>
      <div class="form-group">
        <label class="form-label">كلمة المرور</label>
        <input class="form-input" id="login-pass" type="password" placeholder="••••••••" dir="ltr" />
      </div>
      <div style="text-align:left;margin-bottom:16px"><span style="font-size:13px;color:var(--primary-light);cursor:pointer" onclick="navigate('forgot-password')">نسيت كلمة المرور؟</span></div>
      <button class="btn btn-primary btn-full btn-lg" id="login-btn" onclick="doLogin()">تسجيل الدخول</button>
      <div class="auth-footer-link">ما عندك حساب؟ <span onclick="navigate('register')">أنشئ حساب جديد</span></div>
    </div>
  </div>`;
  document.getElementById('login-pass')?.addEventListener('keydown', e => { if(e.key==='Enter') doLogin(); });
}

async function doLogin() {
  const email = document.getElementById('login-email')?.value?.trim();
  const pass = document.getElementById('login-pass')?.value;
  const btn = document.getElementById('login-btn');
  if (!email || !pass) { showToast('ادخل البريد وكلمة المرور','error'); return; }
  btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span>';
  try {
    await auth.signInWithEmailAndPassword(email, pass);
    showToast('تم الدخول بنجاح ✅','success');
    navigate(currentParams.redirect || 'home');
  } catch(e) {
    const msgs = { 'auth/user-not-found':'البريد غير موجود', 'auth/wrong-password':'كلمة المرور خاطئة', 'auth/invalid-email':'البريد الإلكتروني غير صحيح', 'auth/too-many-requests':'كثير من المحاولات. حاول بعد قليل.' };
    showToast(msgs[e.code] || 'خطأ في تسجيل الدخول','error');
    btn.disabled = false; btn.textContent = 'تسجيل الدخول';
  }
}

// ==================== REGISTER PAGE ====================
function renderRegister() {
  if (currentUser) { navigate('home'); return; }
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="auth-page">
    <div class="auth-header-art">
      <div class="auth-logo-big">N</div>
      <div class="auth-title">إنشاء حساب جديد</div>
      <div class="auth-sub">انضم لمجتمع نيلة ستور</div>
    </div>
    <div class="auth-card">
      <div class="form-group"><label class="form-label">الاسم الكامل *</label><input class="form-input" id="reg-name" type="text" placeholder="اسمك الكامل" /></div>
      <div class="form-group"><label class="form-label">البريد الإلكتروني *</label><input class="form-input" id="reg-email" type="email" placeholder="your@email.com" dir="ltr" /></div>
      <div class="form-group"><label class="form-label">كلمة المرور *</label><input class="form-input" id="reg-pass" type="password" placeholder="6 أحرف على الأقل" dir="ltr" /></div>
      <div class="form-group"><label class="form-label">تأكيد كلمة المرور *</label><input class="form-input" id="reg-pass2" type="password" placeholder="أعد كلمة المرور" dir="ltr" /></div>
      <div class="form-group">
        <label class="form-label">الدولة</label>
        <select class="form-select" id="reg-country"><option value="SD">🇸🇩 السودان</option><option value="EG">🇪🇬 مصر</option><option value="SA">🇸🇦 السعودية</option><option value="AE">🇦🇪 الإمارات</option><option value="other">أخرى</option></select>
      </div>
      <div style="margin-bottom:16px;display:flex;align-items:center;gap:8px">
        <input type="checkbox" id="reg-agree" style="width:16px;height:16px;accent-color:var(--primary)" />
        <label for="reg-agree" style="font-size:13px;color:var(--text2)">أوافق على <span style="color:var(--primary-light);cursor:pointer" onclick="navigate('terms')">شروط الاستخدام</span></label>
      </div>
      <button class="btn btn-primary btn-full btn-lg" id="reg-btn" onclick="doRegister()">إنشاء الحساب</button>
      <div class="auth-footer-link">عندك حساب؟ <span onclick="navigate('login')">سجّل دخولك</span></div>
    </div>
  </div>`;
}

async function doRegister() {
  const name = document.getElementById('reg-name')?.value?.trim();
  const email = document.getElementById('reg-email')?.value?.trim();
  const pass = document.getElementById('reg-pass')?.value;
  const pass2 = document.getElementById('reg-pass2')?.value;
  const country = document.getElementById('reg-country')?.value;
  const agree = document.getElementById('reg-agree')?.checked;
  const btn = document.getElementById('reg-btn');
  if (!name) { showToast('ادخل الاسم الكامل','error'); return; }
  if (!email) { showToast('ادخل البريد الإلكتروني','error'); return; }
  if (!pass || pass.length < 6) { showToast('كلمة المرور 6 أحرف على الأقل','error'); return; }
  if (pass !== pass2) { showToast('كلمة المرور غير متطابقة','error'); return; }
  if (!agree) { showToast('وافق على الشروط أولاً','error'); return; }
  btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span> جاري الإنشاء...';
  try {
    const cred = await auth.createUserWithEmailAndPassword(email, pass);
    await cred.user.updateProfile({ displayName: name });
    await db.collection('users').doc(cred.user.uid).set({ fullName: name, email, country, accountStatus:'active', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    await createWalletForUser(cred.user.uid);
    await db.collection('notifications').add({ userId: cred.user.uid, title: 'أهلاً بيك في نيلة ستور! 🎉', message: `مرحب يا ${name}! تم إنشاء حسابك ومحفظتك بنجاح. ابدأ الشحن هسع!`, type:'welcome', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('تم إنشاء الحساب بنجاح! أهلاً بيك 🎉','success');
    navigate('home');
  } catch(e) {
    const msgs = {'auth/email-already-in-use':'البريد مستخدم بالفعل','auth/invalid-email':'البريد غير صحيح','auth/weak-password':'كلمة المرور ضعيفة'};
    showToast(msgs[e.code]||'حدث خطأ','error');
    btn.disabled = false; btn.textContent = 'إنشاء الحساب';
  }
}

// ==================== FORGOT PASSWORD ====================
function renderForgotPassword() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="auth-page">
    <div class="auth-header-art">
      <div class="auth-logo-big">🔑</div>
      <div class="auth-title">استرداد كلمة المرور</div>
      <div class="auth-sub">ادخل بريدك وسنرسل لك رابط الاسترداد</div>
    </div>
    <div class="auth-card">
      <div class="form-group"><label class="form-label">البريد الإلكتروني</label><input class="form-input" id="fp-email" type="email" placeholder="your@email.com" dir="ltr" /></div>
      <button class="btn btn-primary btn-full btn-lg" id="fp-btn" onclick="doForgotPass()">إرسال رابط الاسترداد</button>
      <div class="auth-footer-link"><span onclick="navigate('login')">→ العودة لتسجيل الدخول</span></div>
    </div>
  </div>`;
}

async function doForgotPass() {
  const email = document.getElementById('fp-email')?.value?.trim();
  const btn = document.getElementById('fp-btn');
  if (!email) { showToast('ادخل البريد الإلكتروني','error'); return; }
  btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span>';
  try {
    await auth.sendPasswordResetEmail(email);
    showToast('تم إرسال رابط الاسترداد لبريدك ✅','success');
    navigate('login');
  } catch(e) {
    showToast('البريد غير موجود أو حدث خطأ','error');
    btn.disabled = false; btn.textContent = 'إرسال رابط الاسترداد';
  }
}

// ==================== PROFILE PAGE ====================
async function renderProfile() {
  if (!requireAuth()) return;
  const c = document.getElementById('page-container');
  const name = currentUser.displayName || currentUser.email.split('@')[0];
  const bal = currentWallet?.balance || 0;
  const wid = currentWallet?.walletId || '-';

  let orderCount = 0;
  if (db) {
    try {
      const snap = await db.collection('orders').where('userId','==',currentUser.uid).get();
      orderCount = snap.size;
    } catch(e){}
  }

  c.innerHTML = `
  <div class="page">
    <div class="profile-hero">
      <div class="prof-avatar-wrap">
        <div class="prof-avatar">${name.charAt(0).toUpperCase()}</div>
      </div>
      <div class="prof-name">${name}</div>
      <div class="prof-email">${currentUser.email}</div>
      <div class="prof-wallet-chip">
        <span class="prof-wallet-id">${wid}</span>
        <span class="prof-wallet-copy" onclick="copyText('${wid}')" title="نسخ">📋</span>
      </div>
    </div>
    <div class="profile-stats">
      <div class="ps-item"><div class="ps-val text-accent">${fmtNum(bal)}</div><div class="ps-lbl">SDG رصيد</div></div>
      <div class="ps-item"><div class="ps-val text-primary">${orderCount}</div><div class="ps-lbl">طلب منجز</div></div>
      <div class="ps-item"><div class="ps-val text-success">⭐</div><div class="ps-lbl">زبون مميز</div></div>
    </div>
    <div class="profile-menu">
      <div class="pm-item" onclick="navigate('wallet')"><div class="pm-icon gold">💰</div><span class="pm-label">المحفظة - ${fmtNum(bal)} SDG</span><span class="pm-arrow">←</span></div>
      <div class="pm-item" onclick="navigate('wallet-topup')"><div class="pm-icon purple">⬆️</div><span class="pm-label">شحن المحفظة</span><span class="pm-arrow">←</span></div>
      <div class="pm-item" onclick="navigate('orders')"><div class="pm-icon blue">📋</div><span class="pm-label">طلباتي</span><span class="pm-arrow">←</span></div>
      <div class="pm-item" onclick="navigate('notifications')"><div class="pm-icon purple">🔔</div><span class="pm-label">الإشعارات</span><span class="pm-arrow">←</span></div>
      <div class="pm-item" onclick="navigate('edit-profile')"><div class="pm-icon green">✏️</div><span class="pm-label">تعديل الحساب</span><span class="pm-arrow">←</span></div>
      <div class="pm-item" onclick="navigate('support')"><div class="pm-icon blue">🎧</div><span class="pm-label">الدعم الفني</span><span class="pm-arrow">←</span></div>
      ${isAdmin()?`<div class="pm-item" onclick="navigate('admin')"><div class="pm-icon gold">⚙️</div><span class="pm-label">لوحة الإدارة</span><span class="pm-arrow">←</span></div>`:''}
      <div class="pm-item" onclick="handleSidebarAuth()"><div class="pm-icon red">🚪</div><span class="pm-label">تسجيل الخروج</span><span class="pm-arrow">←</span></div>
    </div>
  </div>`;
}

// ==================== WALLET PAGE ====================
async function renderWallet() {
  if (!requireAuth()) return;
  const c = document.getElementById('page-container');
  await loadWalletData();
  const bal = currentWallet?.balance || 0;
  const charged = currentWallet?.totalCharged || 0;
  const spent = currentWallet?.totalSpent || 0;
  const wid = currentWallet?.walletId || '-';

  let txs = [];
  if (db) {
    try {
      const snap = await db.collection('walletTransactions').where('walletId','==',currentWallet?.id||'x').orderBy('createdAt','desc').limit(10).get();
      txs = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }

  c.innerHTML = `
  <div class="page">
    <div class="wallet-hero">
      <div class="wallet-bal-label">رصيدك الحالي</div>
      <div class="wallet-bal-amount">${fmtNum(bal)}</div>
      <div class="wallet-bal-sdg">جنيه سوداني (SDG)</div>
      <div class="wallet-id-row">🪙 ${wid} <span class="wid-copy" onclick="copyText('${wid}')">📋</span></div>
    </div>
    <div class="wallet-stats">
      <div class="ws-item"><div class="ws-val in">+${fmtNum(charged)}</div><div class="ws-lbl">إجمالي الشحن</div></div>
      <div class="ws-item"><div class="ws-val out">-${fmtNum(spent)}</div><div class="ws-lbl">إجمالي الصرف</div></div>
    </div>
    <div style="padding:16px;display:flex;gap:10px">
      <button class="btn btn-primary" style="flex:1" onclick="navigate('wallet-topup')">⬆️ شحن المحفظة</button>
      <button class="btn btn-ghost" style="flex:1" onclick="copyText('${wid}')">📋 نسخ الرقم</button>
    </div>
    <div style="padding:0 16px">
      <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">آخر العمليات</h3>
      ${txs.length ? txs.map(tx=>`
        <div class="card" style="padding:12px 14px;margin-bottom:8px;display:flex;align-items:center;gap:10px">
          <div style="font-size:24px">${tx.type==='charge'?'⬆️':tx.type==='spend'?'⬇️':'↕️'}</div>
          <div style="flex:1">
            <div style="font-size:13px;font-weight:600">${tx.reason||tx.type}</div>
            <div style="font-size:11px;color:var(--text3)">${fmtDate(tx.createdAt)}</div>
          </div>
          <div style="font-size:15px;font-weight:700;color:${tx.type==='charge'?'var(--success)':'var(--danger)'}">${tx.type==='charge'?'+':'-'}${fmtNum(tx.amount)}</div>
        </div>
      `).join('') : '<div class="empty-state"><div class="es-icon">📊</div><div class="es-title">لا توجد عمليات</div></div>'}
    </div>
  </div>`;
}

// ==================== WALLET TOPUP PAGE ====================
function renderWalletTopup() {
  if (!requireAuth()) return;
  const wid = currentWallet?.walletId || '-';
  const bal = currentWallet?.balance || 0;
  const c = document.getElementById('page-container');
  const methods = [
    {id:'zain',icon:'🟦',name:'زين كاش',desc:'تحويل عبر زين كاش'},
    {id:'bankak',icon:'💜',name:'بنكك',desc:'تحويل عبر بنكك'},
    {id:'fawri',icon:'🟠',name:'فوري',desc:'تحويل عبر فوري'},
    {id:'bank',icon:'🏦',name:'تحويل بنكي',desc:'تحويل بنكي مباشر'},
    {id:'admin',icon:'🤝',name:'عبر الإدارة',desc:'تواصل مع الإدارة'},
  ];
  let selectedMethod = '';
  c.innerHTML = `
  <div class="page">
    <div class="page-header">
      <div class="back-btn" onclick="navigate('wallet')">→ المحفظة</div>
      <h2>💰 شحن المحفظة</h2>
      <p>رصيدك الحالي: ${fmtNum(bal)} SDG</p>
    </div>
    <div style="padding:16px">
      <div class="card" style="padding:14px;margin-bottom:16px;text-align:center">
        <div style="font-size:12px;color:var(--text3);margin-bottom:4px">رقم محفظتك</div>
        <div style="font-size:18px;font-weight:700;color:var(--accent)">${wid}</div>
        <button class="btn btn-ghost btn-sm" style="margin-top:8px" onclick="copyText('${wid}')">📋 نسخ الرقم</button>
      </div>
      <div class="form-group">
        <label class="form-label">اختار طريقة الدفع</label>
        <div class="topup-methods" id="topup-methods">
          ${methods.map(m=>`
            <div class="method-btn" id="m-${m.id}" onclick="selectMethod('${m.id}')">
              <span class="mb-icon">${m.icon}</span>
              <div class="mb-info"><div class="mb-name">${m.name}</div><div class="mb-desc">${m.desc}</div></div>
              <div class="method-radio" id="mr-${m.id}"></div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">المبلغ المطلوب (SDG)</label>
        <div class="amount-chips">
          ${[1000,2000,5000,10000,20000].map(a=>`<div class="amount-chip" onclick="selectTopupAmount(${a},this)">${fmtNum(a)}</div>`).join('')}
        </div>
        <input class="form-input" id="topup-amount" type="number" placeholder="أو ادخل مبلغاً مخصصاً" min="500" style="margin-top:8px" />
      </div>
      <div class="form-group">
        <label class="form-label">ملاحظة (اختياري)</label>
        <textarea class="form-textarea" id="topup-note" placeholder="أي تفاصيل إضافية..." style="min-height:60px"></textarea>
      </div>
      <button class="btn btn-primary btn-full btn-lg" onclick="submitTopup()">📤 إرسال طلب الشحن</button>
      <div style="height:12px"></div>
      <button class="btn btn-success btn-full" onclick="sendTopupWA()">💬 إرسال عبر الواتساب مباشرة</button>
    </div>
  </div>`;

  window.selectMethod = (id) => {
    selectedMethod = id;
    document.querySelectorAll('.method-btn').forEach(b=>b.classList.remove('selected'));
    document.querySelectorAll('.method-radio').forEach(r=>r.classList.remove('selected'));
    document.getElementById('m-'+id)?.classList.add('selected');
    document.getElementById('mr-'+id)?.classList.add('selected');
  };
  window.selectTopupAmount = (a,el) => {
    document.querySelectorAll('.amount-chip').forEach(c=>c.classList.remove('active'));
    el.classList.add('active');
    const inp=document.getElementById('topup-amount'); if(inp) inp.value=a;
  };
  window.sendTopupWA = () => {
    const amount = document.getElementById('topup-amount')?.value || '؟';
    const note = document.getElementById('topup-note')?.value || '';
    const msg = `أهلاً، أريد شحن محفظتي في نيلة ستور\n👤 الاسم: ${currentUser.displayName||'غير محدد'}\n📧 البريد: ${currentUser.email}\n🪙 رقم المحفظة: ${wid}\n💰 المبلغ المطلوب: ${amount} SDG\n💳 طريقة الدفع: ${selectedMethod||'لم يحدد'}\n📝 ملاحظة: ${note||'لا يوجد'}`;
    openWA(msg);
  };
  window.submitTopup = async () => {
    const amount = parseInt(document.getElementById('topup-amount')?.value||0);
    const note = document.getElementById('topup-note')?.value?.trim();
    if (!amount || amount < 500) { showToast('الحد الأدنى للشحن 500 SDG','error'); return; }
    if (!selectedMethod) { showToast('اختار طريقة الدفع','error'); return; }
    if (!db) { window.sendTopupWA(); return; }
    try {
      await db.collection('walletTopups').add({
        userId: currentUser.uid, walletId: currentWallet?.id||'', walletIdStr: wid,
        amount, paymentMethod: selectedMethod, notes: note||'', status:'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      await db.collection('notifications').add({ userId: currentUser.uid, title:'تم استلام طلب الشحن', message:`طلب شحن ${fmtNum(amount)} SDG قيد المراجعة. سيتم إضافته قريباً.`, type:'topup', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      showToast('تم إرسال طلب الشحن ✅','success');
      navigate('wallet');
    } catch(e) { showToast('حدث خطأ، راسلنا على الواتساب','error'); }
  };
}

// ==================== ORDERS PAGE ====================
async function renderOrders() {
  if (!requireAuth()) return;
  const c = document.getElementById('page-container');
  c.innerHTML = `<div class="page"><div class="page-header"><h2>📋 طلباتي</h2></div><div class="spinner-overlay"><div class="spinner-sm"></div></div></div>`;

  let orders = [];
  if (db) {
    try {
      const snap = await db.collection('orders').where('userId','==',currentUser.uid).orderBy('createdAt','desc').limit(50).get();
      orders = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){ console.error(e); }
  }

  const filters = ['الكل','جديد','قيد الانتظار','قيد التنفيذ','تم الشحن','ملغي'];
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>📋 طلباتي</h2><p>${orders.length} طلب</p></div>
    <div class="filter-tabs">
      ${filters.map((f,i)=>`<div class="chip ${i===0?'active':''}" onclick="filterOrders('${f}',this)">${f}</div>`).join('')}
    </div>
    <div class="orders-list" id="orders-list">
      ${orders.length ? orders.map(o=>orderItemHTML(o)).join('') : '<div class="empty-state"><div class="es-icon">📋</div><div class="es-title">لا توجد طلبات</div><div class="es-desc">ابدأ التسوق الآن</div><button class="btn btn-primary" onclick="navigate(\'sections\')" style="margin-top:16px">تسوق الآن</button></div>'}
    </div>
  </div>`;

  window._allOrders = orders;
  window.filterOrders = (f, el) => {
    document.querySelectorAll('.filter-tabs .chip').forEach(c=>c.classList.remove('active'));
    el.classList.add('active');
    const list = document.getElementById('orders-list');
    const statusMap = {'جديد':'new','قيد الانتظار':'pending','قيد التنفيذ':'processing','تم الشحن':'done','ملغي':'cancelled'};
    const filtered = f==='الكل' ? window._allOrders : window._allOrders.filter(o=>o.status===statusMap[f]);
    list.innerHTML = filtered.length ? filtered.map(o=>orderItemHTML(o)).join('') : '<div class="empty-state"><div class="es-title">لا توجد طلبات</div></div>';
  };
}

function orderItemHTML(o) {
  return `
  <div class="order-item">
    <div class="order-item-top"><span class="oi-id">${o.orderId||o.id}</span>${statusBadge(o.status)}</div>
    <div class="order-item-main">
      <span class="oi-icon">${o.icon||'📦'}</span>
      <div class="oi-info">
        <div class="oi-name">${o.productName||'منتج'}</div>
        <div class="oi-cat">${o.categoryName||''}</div>
        <div class="oi-price">${fmtNum(o.amount)} SDG</div>
      </div>
    </div>
    <div class="oi-date">${fmtDate(o.createdAt)}</div>
    ${o.status==='done'&&o.codeValue?`<div style="margin-top:8px;padding:8px;background:rgba(16,185,129,0.1);border-radius:6px;font-size:12px;color:var(--success)">🎁 الكود: <strong>${o.codeValue}</strong></div>`:''}
  </div>`;
}

// ==================== NOTIFICATIONS PAGE ====================
async function renderNotifications() {
  if (!requireAuth()) return;
  const c = document.getElementById('page-container');
  c.innerHTML = `<div class="page"><div class="page-header"><h2>🔔 الإشعارات</h2></div><div class="spinner-overlay"><div class="spinner-sm"></div></div></div>`;

  let notifs = [];
  if (db) {
    try {
      const snap = await db.collection('notifications').where('userId','==',currentUser.uid).orderBy('createdAt','desc').limit(50).get();
      notifs = snap.docs.map(d=>({id:d.id,...d.data()}));
      // Mark all as read
      const batch = db.batch();
      snap.docs.forEach(d=>{ if(!d.data().read) batch.update(d.ref,{read:true}); });
      await batch.commit();
    } catch(e){}
  }

  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>🔔 الإشعارات</h2><p>${notifs.length} إشعار</p></div>
    <div class="notif-list">
      ${notifs.length ? notifs.map(n=>`
        <div class="notif-item ${n.read?'':'unread'}">
          <div class="notif-top"><span class="notif-title">${n.title}</span>${!n.read?'<span class="notif-unread-dot"></span>':''}</div>
          <div class="notif-msg">${n.message}</div>
          <div class="notif-time">${fmtDate(n.createdAt)}</div>
        </div>
      `).join('') : '<div class="empty-state"><div class="es-icon">🔔</div><div class="es-title">لا توجد إشعارات</div></div>'}
    </div>
  </div>`;
}

// ==================== EDIT PROFILE ====================
function renderEditProfile() {
  if (!requireAuth()) return;
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header">
      <div class="back-btn" onclick="navigate('profile')">→ حسابي</div>
      <h2>✏️ تعديل الحساب</h2>
    </div>
    <div style="padding:16px">
      <div class="form-card">
        <div class="form-group"><label class="form-label">الاسم الكامل</label><input class="form-input" id="ep-name" value="${currentUser.displayName||''}" /></div>
        <button class="btn btn-primary btn-full" id="ep-name-btn" onclick="updateName()">💾 حفظ الاسم</button>
      </div>
      <div class="form-card">
        <h4 style="font-size:15px;font-weight:700;margin-bottom:16px">تغيير كلمة المرور</h4>
        <div class="form-group"><label class="form-label">كلمة المرور الجديدة</label><input class="form-input" id="ep-pass" type="password" placeholder="6 أحرف على الأقل" dir="ltr" /></div>
        <div class="form-group"><label class="form-label">تأكيد كلمة المرور</label><input class="form-input" id="ep-pass2" type="password" placeholder="أعد كلمة المرور" dir="ltr" /></div>
        <button class="btn btn-primary btn-full" id="ep-pass-btn" onclick="updatePass()">🔑 تغيير كلمة المرور</button>
      </div>
    </div>
  </div>`;
}

async function updateName() {
  const name = document.getElementById('ep-name')?.value?.trim();
  if (!name) { showToast('ادخل الاسم','error'); return; }
  const btn = document.getElementById('ep-name-btn');
  btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span>';
  try {
    await currentUser.updateProfile({ displayName: name });
    if (db) await db.collection('users').doc(currentUser.uid).set({ fullName: name }, { merge: true });
    showToast('تم تحديث الاسم ✅','success');
    updateSidebarForUser();
  } catch(e) { showToast('حدث خطأ','error'); }
  btn.disabled = false; btn.textContent = '💾 حفظ الاسم';
}

async function updatePass() {
  const p = document.getElementById('ep-pass')?.value;
  const p2 = document.getElementById('ep-pass2')?.value;
  if (!p || p.length < 6) { showToast('كلمة المرور قصيرة','error'); return; }
  if (p !== p2) { showToast('كلمتا المرور غير متطابقتين','error'); return; }
  const btn = document.getElementById('ep-pass-btn');
  btn.disabled = true; btn.innerHTML = '<span class="loader-inline"></span>';
  try {
    await currentUser.updatePassword(p);
    showToast('تم تغيير كلمة المرور ✅','success');
  } catch(e) {
    if (e.code==='auth/requires-recent-login') showToast('تحتاج إعادة تسجيل الدخول لتغيير كلمة المرور','warning');
    else showToast('حدث خطأ','error');
  }
  btn.disabled = false; btn.textContent = '🔑 تغيير كلمة المرور';
}

// ==================== SUPPORT PAGE ====================
async function renderSupport() {
  if (!requireAuth('support')) {
    const c = document.getElementById('page-container');
    c.innerHTML = `
    <div class="page">
      <div class="page-header"><h2>🎧 الدعم الفني</h2></div>
      <div style="padding:16px">
        <div class="card" style="padding:20px;text-align:center;margin-bottom:16px">
          <div style="font-size:48px;margin-bottom:12px">💬</div>
          <h3 style="margin-bottom:8px">تواصل معنا مباشرة</h3>
          <p style="font-size:13px;color:var(--text2);margin-bottom:16px">لو عندك مشكلة راسلنا في الواتساب وهنساعدك بسرعة</p>
          <button class="btn btn-success btn-full" onclick="openWA()">💬 الواتساب</button>
        </div>
        <div class="auth-footer-link"><span onclick="navigate('login',{redirect:'support'})">سجّل دخولك لرفع تذكرة دعم</span></div>
      </div>
    </div>`;
    return;
  }
  const c = document.getElementById('page-container');
  const problems = ['مشكلة في الشحن','لم يصل الطلب','مشكلة في المحفظة','مشكلة في الحساب','أخرى'];
  let tickets = [];
  if (db) {
    try {
      const snap = await db.collection('support').where('userId','==',currentUser.uid).orderBy('createdAt','desc').limit(10).get();
      tickets = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }

  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>🎧 الدعم الفني</h2></div>
    <div style="padding:16px">
      <button class="whatsapp-btn" style="width:100%;justify-content:center;margin-bottom:16px;font-size:14px" onclick="openWA()">💬 تواصل مباشر عبر الواتساب</button>
      <div class="form-card">
        <h4 style="font-size:15px;font-weight:700;margin-bottom:16px">رفع تذكرة دعم</h4>
        <div class="form-group">
          <label class="form-label">نوع المشكلة</label>
          <select class="form-select" id="sup-type">${problems.map(p=>`<option>${p}</option>`).join('')}</select>
        </div>
        <div class="form-group"><label class="form-label">وصف المشكلة *</label><textarea class="form-textarea" id="sup-msg" placeholder="وصّف مشكلتك بالتفصيل..."></textarea></div>
        <div class="form-group"><label class="form-label">رقم الطلب (إن وجد)</label><input class="form-input" id="sup-order" placeholder="مثال: ORD-XXXXX" /></div>
        <button class="btn btn-primary btn-full" onclick="submitSupport()">📤 إرسال التذكرة</button>
      </div>
      ${tickets.length ? `
      <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">تذاكري السابقة</h3>
      <div class="ticket-list">
        ${tickets.map(t=>`
          <div class="ticket-item">
            <div class="ticket-top"><span class="ticket-title">${t.type}</span>${statusBadge(t.status||'pending')}</div>
            <div class="ticket-msg">${t.message}</div>
            <div class="ticket-date">${fmtDate(t.createdAt)}</div>
          </div>
        `).join('')}
      </div>` : ''}
    </div>
  </div>`;
}

async function submitSupport() {
  const type = document.getElementById('sup-type')?.value;
  const msg = document.getElementById('sup-msg')?.value?.trim();
  const order = document.getElementById('sup-order')?.value?.trim();
  if (!msg) { showToast('صف مشكلتك','error'); return; }
  if (!db) { openWA(`مشكلة: ${type}\n${msg}`); return; }
  try {
    await db.collection('support').add({ userId: currentUser.uid, email: currentUser.email, walletId: currentWallet?.walletId||'', type, message: msg, orderRef: order||'', status:'open', createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('تم إرسال التذكرة ✅','success');
    renderSupport();
  } catch(e) { showToast('حدث خطأ','error'); }
}

// ==================== OFFERS PAGE ====================
function renderOffers() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>🎁 العروض الخاصة</h2><p>أحدث العروض والخصومات</p></div>
    <div style="padding:16px">
      <div class="card" style="padding:20px;text-align:center;margin-bottom:16px;border-color:var(--accent)">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <h3 style="font-size:16px;margin-bottom:8px;color:var(--accent)">قريباً!</h3>
        <p style="font-size:13px;color:var(--text2)">نحضر لك عروض مميزة. تابعنا على الواتساب لتكون أول من يعرف!</p>
        <button class="whatsapp-btn" style="margin:16px auto 0;display:inline-flex" onclick="openWA()">💬 تابعنا على الواتساب</button>
      </div>
    </div>
  </div>`;
}

// ==================== STATIC PAGES ====================
function renderAbout() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>ℹ️ عن نيلة ستور</h2></div>
    <div class="static-content">
      <p>نيلة ستور هو متجر رقمي سوداني متخصص في تقديم خدمات الشحن الرقمية للألعاب والتطبيقات والاشتراكات، مع التركيز على خدمة المستخدم السوداني بشكل خاص.</p>
      <h3>🎯 ما نقدمه</h3>
      <ul>
        <li>شحن ألعاب جوال: Free Fire، PUBG، وأكثر من 10 لعبة</li>
        <li>شحن تطبيقات التواصل: تيك توك، بيقو، يلا وغيرها</li>
        <li>اشتراكات الذكاء الاصطناعي: ChatGPT، Midjourney، Canva Pro</li>
        <li>البطاقات الرقمية: PlayStation، Steam، Google Play</li>
        <li>شحن الرصيد السوداني: زين، MTN، سوداني</li>
        <li>شراء وحدات الكهرباء</li>
        <li>الاشتراكات الترفيهية: Netflix، Spotify وغيرها</li>
      </ul>
      <h3>🏆 مميزاتنا</h3>
      <ul>
        <li>شحن سريع خلال دقائق</li>
        <li>أسعار تنافسية ومناسبة للسوق السوداني</li>
        <li>دعم فني على واتساب</li>
        <li>محفظة إلكترونية آمنة</li>
        <li>واجهة عربية سهلة ومريحة</li>
      </ul>
      <h3>📞 تواصل معنا</h3>
      <button class="btn btn-success" onclick="openWA()">💬 واتساب</button>
    </div>
  </div>`;
}

function renderFAQ() {
  const c = document.getElementById('page-container');
  const faqs = [
    {q:'كيف أشحن المحفظة؟',a:'اذهب لصفحة المحفظة > شحن المحفظة، اختار طريقة الدفع والمبلغ، وأرسل الطلب. سيتم إضافة الرصيد خلال دقائق.'},
    {q:'كيف أشتري منتج؟',a:'اختار القسم > المنتج > الفئة > أدخل بياناتك > أكد الطلب. سيُخصم المبلغ من محفظتك تلقائياً.'},
    {q:'كيف أتابع طلبي؟',a:'اذهب لصفحة "طلباتي" لمتابعة حالة طلبك في الوقت الحقيقي.'},
    {q:'ماذا أفعل إذا لم يصل الشحن؟',a:'راسلنا على الواتساب برقم الطلب وسنتابع معك فوراً.'},
    {q:'هل يمكنني استرجاع المبلغ؟',a:'نعم، في حالة عدم تنفيذ الطلب يتم إعادة الرصيد للمحفظة خلال 24 ساعة.'},
    {q:'ما هي طرق الدفع المتاحة؟',a:'زين كاش، بنكك، فوري، تحويل بنكي، أو عبر الإدارة مباشرة.'},
    {q:'كيف أتواصل مع الدعم الفني؟',a:'عبر الواتساب المباشر في أي وقت. الدعم متاح طوال اليوم.'},
    {q:'هل بياناتي آمنة؟',a:'نعم، نستخدم Firebase بأعلى معايير الأمان. لا نشارك بياناتك مع أي طرف ثالث.'},
  ];
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>❓ الأسئلة الشائعة</h2></div>
    <div class="static-content">
      ${faqs.map((f,i)=>`
        <div class="faq-item">
          <div class="faq-q" onclick="toggleFaq(${i},this)">${f.q} <span>▼</span></div>
          <div class="faq-a" id="fa-${i}">${f.a}</div>
        </div>
      `).join('')}
    </div>
  </div>`;
  window.toggleFaq = (i, el) => {
    const a = document.getElementById('fa-'+i);
    el.classList.toggle('open'); a.classList.toggle('open');
  };
}

function renderPrivacy() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>🔒 سياسة الخصوصية</h2></div>
    <div class="static-content">
      <h3>البيانات التي نجمعها</h3>
      <ul><li>الاسم والبريد الإلكتروني عند التسجيل</li><li>بيانات الطلبات والمعاملات</li><li>معلومات الجهاز لتحسين التجربة</li></ul>
      <h3>كيف نستخدم بياناتك</h3>
      <ul><li>تنفيذ الطلبات وإرسال الإشعارات</li><li>تحسين خدماتنا وتجربة المستخدم</li><li>حل المشاكل التقنية</li></ul>
      <h3>حماية البيانات</h3>
      <p>نستخدم Firebase بأعلى معايير الأمان. جميع البيانات مشفرة ومحمية.</p>
      <h3>مشاركة البيانات</h3>
      <p>لا نشارك بياناتك مع أي طرف ثالث إلا في حالات الضرورة التشغيلية القصوى.</p>
      <h3>حقوقك</h3>
      <ul><li>حق الاطلاع على بياناتك</li><li>حق تصحيح بياناتك</li><li>حق حذف حسابك وبياناتك</li></ul>
      <p style="margin-top:16px">للاستفسار تواصل معنا عبر الواتساب.</p>
    </div>
  </div>`;
}

function renderTerms() {
  const c = document.getElementById('page-container');
  c.innerHTML = `
  <div class="page">
    <div class="page-header"><h2>📜 شروط الاستخدام</h2></div>
    <div class="static-content">
      <h3>مسؤولية المستخدم</h3>
      <ul><li>أنت مسؤول عن دقة البيانات التي تدخلها (ID اللاعب، رقم الهاتف، إلخ)</li><li>أي خطأ في البيانات المدخلة يتحمله المستخدم</li></ul>
      <h3>سياسة الإلغاء والاسترداد</h3>
      <ul><li>يمكن الإلغاء قبل تنفيذ الطلب</li><li>بعد التنفيذ لا يمكن الاسترداد</li><li>في حالة الخطأ من جانبنا يُسترد المبلغ كاملاً</li></ul>
      <h3>شروط تنفيذ الخدمات</h3>
      <ul><li>يتم الشحن خلال 1-30 دقيقة حسب نوع الخدمة</li><li>في أوقات الذروة قد يتأخر التنفيذ</li></ul>
      <h3>حق الإدارة</h3>
      <p>تحتفظ الإدارة بحق تعليق أي حساب يثبت إساءته لنظام المتجر أو محاولة الاحتيال.</p>
      <h3>الاتصال بنا</h3>
      <button class="btn btn-success" onclick="openWA()">💬 واتساب</button>
    </div>
  </div>`;
}

// ==================== ADMIN PANEL ====================
function renderAdmin() {
  if (!isAdmin()) {
    showToast('غير مصرح لك بالوصول','error');
    navigate('home'); return;
  }
  const c = document.getElementById('page-container');
  const tabs = ['الرئيسية','الطلبات','الحسابات','المحافظ','الشحن','المنتجات','الفئات','الأكواد','الإشعارات','الدعم','الإعدادات'];
  c.innerHTML = `
  <div class="page">
    <div style="background:linear-gradient(135deg,var(--primary-dark),var(--bg2));padding:16px;border-bottom:1px solid var(--card-border)">
      <div style="font-size:18px;font-weight:700">⚙️ لوحة الإدارة</div>
      <div style="font-size:12px;color:var(--text3);margin-top:4px">نيلة ستور - إدارة كاملة</div>
    </div>
    <div class="admin-tabs" id="admin-tabs">
      ${tabs.map((t,i)=>`<div class="adm-tab ${i===0?'active':''}" onclick="adminTab(${i},this)">${t}</div>`).join('')}
    </div>
    <div class="admin-content" id="admin-tab-content">
      <div class="spinner-overlay"><div class="spinner-sm"></div></div>
    </div>
  </div>`;

  window.adminTab = (i, el) => {
    document.querySelectorAll('.adm-tab').forEach(t=>t.classList.remove('active'));
    el.classList.add('active');
    const fns = [adminHome,adminOrders,adminUsers,adminWallets,adminTopups,adminProducts,adminCategories,adminCodes,adminNotifications,adminSupportTickets,adminSettings];
    fns[i]?.();
  };
  adminHome();
}

async function adminHome() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let stats = { orders:0, newOrders:0, users:0, totalBalance:0, products:0 };
  if (db) {
    try {
      const [oSnap,uSnap,wSnap] = await Promise.all([
        db.collection('orders').get(),
        db.collection('users').get(),
        db.collection('wallets').get()
      ]);
      stats.orders = oSnap.size;
      stats.newOrders = oSnap.docs.filter(d=>d.data().status==='new').length;
      stats.users = uSnap.size;
      stats.totalBalance = wSnap.docs.reduce((s,d)=>s+(d.data().balance||0),0);
    } catch(e){}
  }
  t.innerHTML = `
    <div class="admin-stats-grid">
      <div class="stat-card"><div class="sc-icon">📋</div><div class="sc-val">${stats.orders}</div><div class="sc-lbl">إجمالي الطلبات</div></div>
      <div class="stat-card"><div class="sc-icon">🆕</div><div class="sc-val" style="color:var(--danger)">${stats.newOrders}</div><div class="sc-lbl">طلبات جديدة</div></div>
      <div class="stat-card"><div class="sc-icon">👥</div><div class="sc-val">${stats.users}</div><div class="sc-lbl">المستخدمون</div></div>
      <div class="stat-card"><div class="sc-icon">💰</div><div class="sc-val">${fmtNum(stats.totalBalance)}</div><div class="sc-lbl">إجمالي الأرصدة</div></div>
    </div>
    <div class="adm-card">
      <div class="adm-card-top"><div class="adm-card-title">🔍 بحث سريع</div></div>
      <div class="admin-search-bar">
        <input id="global-search" type="text" placeholder="ابحث بالبريد أو رقم المحفظة أو رقم الطلب..." />
        <button class="btn btn-primary btn-sm" onclick="globalSearch()">بحث</button>
      </div>
      <div id="search-results"></div>
    </div>
    <div class="adm-card">
      <div class="adm-card-title" style="margin-bottom:12px">⚡ إجراءات سريعة</div>
      <div class="adm-actions">
        <button class="adm-btn adm-btn-primary" onclick="adminOrders()">عرض الطلبات الجديدة</button>
        <button class="adm-btn adm-btn-warning" onclick="adminTopups()">طلبات الشحن</button>
        <button class="adm-btn adm-btn-success" onclick="adminProducts()">إدارة المنتجات</button>
        <button class="adm-btn adm-btn-ghost" onclick="adminUsers()">إدارة الحسابات</button>
      </div>
    </div>`;

  window.globalSearch = async () => {
    const q = document.getElementById('global-search')?.value?.trim();
    const r = document.getElementById('search-results');
    if (!q || !db) return;
    r.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
    try {
      const results = [];
      const [byEmail,byWallet,byOrder] = await Promise.all([
        db.collection('users').where('email','==',q).get(),
        db.collection('wallets').where('walletId','==',q).get(),
        db.collection('orders').where('orderId','==',q).get(),
      ]);
      byEmail.docs.forEach(d=>results.push({type:'user',data:d.data()}));
      byWallet.docs.forEach(d=>results.push({type:'wallet',data:d.data()}));
      byOrder.docs.forEach(d=>results.push({type:'order',data:d.data()}));
      if (!results.length) { r.innerHTML = '<div class="empty-state" style="padding:20px"><div class="es-title">لا توجد نتائج</div></div>'; return; }
      r.innerHTML = results.map(res=>`
        <div class="adm-card" style="margin-top:10px">
          <div class="adm-card-title">${res.type==='user'?'👤 مستخدم':res.type==='wallet'?'💰 محفظة':'📋 طلب'}</div>
          <pre style="font-size:11px;color:var(--text2);margin-top:8px;white-space:pre-wrap;direction:ltr">${JSON.stringify(res.data,null,2)}</pre>
          ${res.type==='wallet'?`<div class="adm-actions"><button class="adm-btn adm-btn-success" onclick="adminAddBalance('${res.data.walletId}')">+ إضافة رصيد</button><button class="adm-btn adm-btn-danger" onclick="adminDeductBalance('${res.data.walletId}')">- خصم رصيد</button></div>`:''}
        </div>
      `).join('');
    } catch(e) { r.innerHTML = '<div style="color:var(--danger);padding:12px">خطأ في البحث</div>'; }
  };
}

async function adminOrders() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let orders = [];
  if (db) {
    try {
      const snap = await db.collection('orders').orderBy('createdAt','desc').limit(100).get();
      orders = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  const filters = ['الكل','جديد','قيد الانتظار','قيد التنفيذ','تم الشحن','ملغي'];
  const statusMap = {'جديد':'new','قيد الانتظار':'pending','قيد التنفيذ':'processing','تم الشحن':'done','ملغي':'cancelled'};
  window._adminOrders = orders;
  const renderOrderTable = (list) => list.length ? `
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>رقم الطلب</th><th>المستخدم</th><th>المنتج</th><th>المبلغ</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th></tr></thead>
        <tbody>${list.map(o=>`
          <tr>
            <td style="font-size:11px;direction:ltr">${o.orderId||o.id.slice(0,8)}</td>
            <td style="font-size:12px">${o.userId?.slice(0,8)||'-'}</td>
            <td>${o.productName||'-'}<br><span style="font-size:11px;color:var(--text3)">${o.categoryName||''}</span></td>
            <td class="text-accent font-bold">${fmtNum(o.amount)}</td>
            <td>${statusBadge(o.status)}</td>
            <td style="font-size:11px">${fmtDate(o.createdAt)}</td>
            <td>
              <div class="adm-actions">
                ${o.status==='new'?`<button class="adm-btn adm-btn-warning" onclick="updateOrderStatus('${o.id}','pending')">انتظار</button>`:''}
                ${o.status==='pending'?`<button class="adm-btn adm-btn-primary" onclick="updateOrderStatus('${o.id}','processing')">تنفيذ</button>`:''}
                ${o.status==='processing'?`<button class="adm-btn adm-btn-success" onclick="updateOrderStatus('${o.id}','done')">أكمل</button>`:''}
                ${['new','pending'].includes(o.status)?`<button class="adm-btn adm-btn-danger" onclick="updateOrderStatus('${o.id}','cancelled')">إلغاء</button>`:''}
              </div>
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>` : '<div class="empty-state"><div class="es-title">لا توجد طلبات</div></div>';

  t.innerHTML = `
    <div class="admin-search-bar"><input id="ord-search" type="text" placeholder="بحث برقم الطلب أو اسم المنتج..." /><button class="btn btn-primary btn-sm" onclick="searchAdminOrders()">بحث</button></div>
    <div class="filter-tabs" style="margin-bottom:16px">
      ${filters.map((f,i)=>`<div class="chip ${i===0?'active':''}" onclick="filterAdminOrders('${f}',this)">${f}</div>`).join('')}
    </div>
    <div id="orders-table">${renderOrderTable(orders)}</div>`;

  window.filterAdminOrders = (f,el) => {
    document.querySelectorAll('#admin-tab-content .chip').forEach(c=>c.classList.remove('active')); el.classList.add('active');
    const filtered = f==='الكل' ? window._adminOrders : window._adminOrders.filter(o=>o.status===statusMap[f]);
    document.getElementById('orders-table').innerHTML = renderOrderTable(filtered);
  };
  window.searchAdminOrders = () => {
    const q = document.getElementById('ord-search')?.value?.toLowerCase();
    if (!q) { document.getElementById('orders-table').innerHTML = renderOrderTable(window._adminOrders); return; }
    const filtered = window._adminOrders.filter(o=>(o.orderId||'').toLowerCase().includes(q)||(o.productName||'').toLowerCase().includes(q));
    document.getElementById('orders-table').innerHTML = renderOrderTable(filtered);
  };
}

window.updateOrderStatus = async (orderId, status) => {
  if (!db) return;
  try {
    const ref = db.collection('orders').doc(orderId);
    await ref.update({ status, updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    const snap = await ref.get();
    const order = snap.data();
    // Notify user
    const msgs = { pending:'طلبك قيد الانتظار', processing:'جاري تنفيذ طلبك الآن', done:'تم الشحن بنجاح! 🎉', cancelled:'تم إلغاء طلبك' };
    if (order?.userId && db) {
      await db.collection('notifications').add({ userId: order.userId, title: msgs[status]||status, message: `حالة طلبك "${order.productName}" تغيرت إلى: ${msgs[status]||status}`, type:'order', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    }
    // If cancelled, refund
    if (status==='cancelled' && order?.walletId && order?.amount) {
      await db.collection('wallets').doc(order.walletId).update({ balance: firebase.firestore.FieldValue.increment(order.amount), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    }
    showToast('تم تحديث حالة الطلب ✅','success');
    adminOrders();
  } catch(e) { showToast('حدث خطأ','error'); }
};

async function adminUsers() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let users = [];
  if (db) {
    try {
      const snap = await db.collection('users').orderBy('createdAt','desc').limit(100).get();
      users = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  t.innerHTML = `
    <div class="admin-search-bar"><input id="usr-search" type="text" placeholder="بحث بالبريد أو الاسم..." /><button class="btn btn-primary btn-sm" onclick="searchAdminUsers()">بحث</button></div>
    <div id="users-list">
      ${users.map(u=>`
        <div class="adm-card">
          <div class="adm-card-top">
            <div>
              <div style="font-weight:700">${u.fullName||'-'}</div>
              <div style="font-size:12px;color:var(--text3)">${u.email||u.id}</div>
            </div>
            ${statusBadge(u.accountStatus||'active')}
          </div>
          <div style="font-size:12px;color:var(--text3)">المحفظة: ${u.walletId||'-'} | الدولة: ${u.country||'-'}</div>
          <div class="adm-actions">
            <button class="adm-btn adm-btn-primary" onclick="adminUserWallet('${u.walletId||''}')">المحفظة</button>
            <button class="adm-btn adm-btn-ghost" onclick="adminUserOrders('${u.id}')">الطلبات</button>
            <button class="adm-btn adm-btn-${u.accountStatus==='active'?'danger':'success'}" onclick="toggleUserStatus('${u.id}','${u.accountStatus||'active'}')">
              ${u.accountStatus==='active'?'إيقاف':'تفعيل'}
            </button>
            <button class="adm-btn adm-btn-success" onclick="adminSendNotif('${u.id}')">إشعار</button>
          </div>
        </div>
      `).join('')}
      ${!users.length?'<div class="empty-state"><div class="es-title">لا توجد حسابات</div></div>':''}
    </div>`;
  window.searchAdminUsers = async () => {
    const q = document.getElementById('usr-search')?.value?.trim();
    if (!q || !db) return;
    try {
      const snap = await db.collection('users').where('email','>=',q).where('email','<=',q+'\uf8ff').get();
      const users2 = snap.docs.map(d=>({id:d.id,...d.data()}));
      // rerender
    } catch(e){}
  };
}

window.toggleUserStatus = async (uid, current) => {
  const newStatus = current==='active'?'suspended':'active';
  if (!db) return;
  try {
    await db.collection('users').doc(uid).update({ accountStatus: newStatus });
    showToast(`تم ${newStatus==='active'?'تفعيل':'إيقاف'} الحساب`,'success');
    adminUsers();
  } catch(e){ showToast('خطأ','error'); }
};

window.adminUserWallet = (walletId) => {
  const el = document.getElementById('global-search');
  if (el) { el.value = walletId; }
  adminHome();
};

window.adminUserOrders = async (uid) => {
  adminOrders();
};

async function adminWallets() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let wallets = [];
  if (db) {
    try {
      const snap = await db.collection('wallets').orderBy('balance','desc').limit(100).get();
      wallets = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  t.innerHTML = `
    <div class="admin-search-bar"><input id="wal-search" type="text" placeholder="بحث برقم المحفظة أو البريد..." /><button class="btn btn-primary btn-sm" onclick="searchAdminWallets()">بحث</button></div>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>رقم المحفظة</th><th>الرصيد</th><th>إجمالي الشحن</th><th>إجمالي الصرف</th><th>الحالة</th><th>إجراءات</th></tr></thead>
        <tbody>${wallets.map(w=>`
          <tr>
            <td style="direction:ltr;font-size:12px">${w.walletId}</td>
            <td class="text-accent font-bold">${fmtNum(w.balance)}</td>
            <td class="text-success">${fmtNum(w.totalCharged)}</td>
            <td class="text-danger">${fmtNum(w.totalSpent)}</td>
            <td>${statusBadge(w.walletStatus||'active')}</td>
            <td>
              <div class="adm-actions">
                <button class="adm-btn adm-btn-success" onclick="adminAddBalance('${w.walletId}','${w.id}')">+ إضافة</button>
                <button class="adm-btn adm-btn-danger" onclick="adminDeductBalance('${w.walletId}','${w.id}')">- خصم</button>
                <button class="adm-btn adm-btn-${w.walletStatus==='active'?'ghost':'primary'}" onclick="toggleWalletStatus('${w.id}','${w.walletStatus||'active'}')">
                  ${w.walletStatus==='active'?'تجميد':'تفعيل'}
                </button>
              </div>
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>`;
}

window.adminAddBalance = (walletId, docId) => {
  const amount = parseInt(prompt(`إضافة رصيد للمحفظة ${walletId}:\nادخل المبلغ:`));
  if (!amount || amount <= 0) return;
  const reason = prompt('سبب الإضافة:') || 'إضافة إدارية';
  processWalletAdjust(walletId, docId, amount, 'add', reason);
};
window.adminDeductBalance = (walletId, docId) => {
  const amount = parseInt(prompt(`خصم من المحفظة ${walletId}:\nادخل المبلغ:`));
  if (!amount || amount <= 0) return;
  const reason = prompt('سبب الخصم:') || 'خصم إداري';
  processWalletAdjust(walletId, docId, amount, 'deduct', reason);
};

async function processWalletAdjust(walletId, docId, amount, type, reason) {
  if (!db) return;
  try {
    // Find wallet doc
    let ref;
    if (docId) { ref = db.collection('wallets').doc(docId); }
    else {
      const snap = await db.collection('wallets').where('walletId','==',walletId).limit(1).get();
      if (snap.empty) { showToast('المحفظة غير موجودة','error'); return; }
      ref = snap.docs[0].ref;
    }
    const delta = type==='add' ? amount : -amount;
    await ref.update({ balance: firebase.firestore.FieldValue.increment(delta), [type==='add'?'totalCharged':'totalSpent']: firebase.firestore.FieldValue.increment(amount), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    const walData = (await ref.get()).data();
    await db.collection('walletTransactions').add({ walletId, userId: walData.userId||'', type: type==='add'?'charge':'deduct', amount, reason, status:'completed', adminId: currentUser.uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    if (walData.userId) {
      await db.collection('notifications').add({ userId: walData.userId, title: type==='add'?`تم إضافة ${fmtNum(amount)} SDG لمحفظتك`:`تم خصم ${fmtNum(amount)} SDG من محفظتك`, message: `السبب: ${reason}`, type:'wallet', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    }
    showToast(type==='add'?'تم إضافة الرصيد ✅':'تم الخصم ✅','success');
    adminWallets();
  } catch(e) { showToast('حدث خطأ','error'); console.error(e); }
}

window.toggleWalletStatus = async (docId, current) => {
  const newStatus = current==='active'?'frozen':'active';
  if (!db) return;
  await db.collection('wallets').doc(docId).update({ walletStatus: newStatus });
  showToast(`تم ${newStatus==='active'?'تفعيل':'تجميد'} المحفظة`,'success');
  adminWallets();
};

async function adminTopups() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let topups = [];
  if (db) {
    try {
      const snap = await db.collection('walletTopups').orderBy('createdAt','desc').limit(100).get();
      topups = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  t.innerHTML = `
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>المستخدم</th><th>المحفظة</th><th>المبلغ</th><th>الطريقة</th><th>الحالة</th><th>التاريخ</th><th>إجراءات</th></tr></thead>
        <tbody>${topups.map(tp=>`
          <tr>
            <td style="font-size:12px">${tp.email||tp.userId?.slice(0,8)||'-'}</td>
            <td style="direction:ltr;font-size:11px">${tp.walletIdStr||'-'}</td>
            <td class="text-accent font-bold">${fmtNum(tp.amount)}</td>
            <td>${tp.paymentMethod||'-'}</td>
            <td>${statusBadge(tp.status)}</td>
            <td style="font-size:11px">${fmtDate(tp.createdAt)}</td>
            <td>
              ${tp.status==='pending'?`
                <div class="adm-actions">
                  <button class="adm-btn adm-btn-success" onclick="approveTopup('${tp.id}','${tp.walletIdStr||''}','${tp.amount}','${tp.userId}')">قبول وشحن</button>
                  <button class="adm-btn adm-btn-danger" onclick="rejectTopup('${tp.id}','${tp.userId}','${tp.amount}')">رفض</button>
                </div>` : ''}
            </td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>
    ${!topups.length?'<div class="empty-state"><div class="es-title">لا توجد طلبات شحن</div></div>':''}`;
}

window.approveTopup = async (topupId, walletIdStr, amount, userId) => {
  if (!db) return;
  try {
    const walSnap = await db.collection('wallets').where('walletId','==',walletIdStr).limit(1).get();
    if (walSnap.empty) { showToast('المحفظة غير موجودة','error'); return; }
    const walRef = walSnap.docs[0].ref;
    await walRef.update({ balance: firebase.firestore.FieldValue.increment(parseInt(amount)), totalCharged: firebase.firestore.FieldValue.increment(parseInt(amount)), updatedAt: firebase.firestore.FieldValue.serverTimestamp() });
    await db.collection('walletTopups').doc(topupId).update({ status:'completed', completedAt: firebase.firestore.FieldValue.serverTimestamp() });
    await db.collection('walletTransactions').add({ walletId: walletIdStr, userId, type:'charge', amount:parseInt(amount), reason:'شحن محفظة معتمد', status:'completed', adminId: currentUser.uid, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    await db.collection('notifications').add({ userId, title:`تم إضافة ${fmtNum(parseInt(amount))} SDG لمحفظتك`, message:'تم قبول طلب الشحن وإضافة الرصيد بنجاح ✅', type:'topup', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    showToast('تم شحن المحفظة ✅','success');
    adminTopups();
  } catch(e) { showToast('حدث خطأ','error'); console.error(e); }
};

window.rejectTopup = async (topupId, userId, amount) => {
  if (!db) return;
  await db.collection('walletTopups').doc(topupId).update({ status:'rejected' });
  await db.collection('notifications').add({ userId, title:'تم رفض طلب الشحن', message:`تم رفض طلب شحن ${fmtNum(parseInt(amount))} SDG. للاستفسار تواصل معنا.`, type:'topup', read:false, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  showToast('تم رفض الطلب','warning');
  adminTopups();
};

async function adminProducts() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let dbProds = [];
  if (db) {
    try {
      const snap = await db.collection('products').orderBy('createdAt','desc').get();
      dbProds = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  const sectionOpts = SECTIONS.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
  t.innerHTML = `
    <div class="form-card">
      <h4>➕ إضافة منتج جديد</h4>
      <div class="form-row">
        <div class="form-group"><label class="form-label">اسم المنتج *</label><input class="form-input" id="np-name" placeholder="اسم المنتج" /></div>
        <div class="form-group"><label class="form-label">القسم *</label><select class="form-select" id="np-section">${sectionOpts}</select></div>
      </div>
      <div class="form-group"><label class="form-label">الوصف</label><input class="form-input" id="np-desc" placeholder="وصف مختصر" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">الأيقونة (إيموجي)</label><input class="form-input" id="np-icon" placeholder="🎮" /></div>
        <div class="form-group"><label class="form-label">يبدأ من (SDG)</label><input class="form-input" id="np-from" type="number" placeholder="100" /></div>
      </div>
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
        <label><input type="checkbox" id="np-featured" style="accent-color:var(--primary)"> مميز</label>
        <label><input type="checkbox" id="np-home" style="accent-color:var(--primary)"> يظهر في الرئيسية</label>
      </div>
      <button class="btn btn-primary" onclick="saveProduct()">💾 حفظ المنتج</button>
    </div>
    <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">المنتجات في قاعدة البيانات (${dbProds.length})</h3>
    ${dbProds.map(p=>`
      <div class="adm-card">
        <div class="adm-card-top"><div class="adm-card-title">${p.icon||'📦'} ${p.name}</div>${statusBadge(p.active!==false?'active':'cancelled')}</div>
        <div style="font-size:12px;color:var(--text3)">${p.section} | يبدأ من ${fmtNum(p.from||0)} SDG</div>
        <div class="adm-actions">
          <button class="adm-btn adm-btn-${p.active!==false?'danger':'success'}" onclick="toggleProduct('${p.id}',${p.active!==false})">
            ${p.active!==false?'تعطيل':'تفعيل'}
          </button>
          <button class="adm-btn adm-btn-danger" onclick="deleteProduct('${p.id}')">حذف</button>
        </div>
      </div>
    `).join('')}`;

  window.saveProduct = async () => {
    const name = document.getElementById('np-name')?.value?.trim();
    const section = document.getElementById('np-section')?.value;
    if (!name) { showToast('ادخل اسم المنتج','error'); return; }
    if (!db) return;
    try {
      await db.collection('products').add({ name, section, desc: document.getElementById('np-desc')?.value||'', icon: document.getElementById('np-icon')?.value||'📦', from: parseInt(document.getElementById('np-from')?.value||0), featured: document.getElementById('np-featured')?.checked||false, showOnHome: document.getElementById('np-home')?.checked||false, active: true, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      showToast('تم إضافة المنتج ✅','success');
      adminProducts();
    } catch(e) { showToast('خطأ','error'); }
  };
  window.toggleProduct = async (id, active) => {
    await db.collection('products').doc(id).update({ active: !active }); adminProducts();
  };
  window.deleteProduct = async (id) => {
    if (!confirm('حذف المنتج نهائياً؟')) return;
    await db.collection('products').doc(id).delete(); showToast('تم الحذف','success'); adminProducts();
  };
}

async function adminCategories() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let dbProds = [], cats = [];
  if (db) {
    try {
      const [ps,cs] = await Promise.all([db.collection('products').get(), db.collection('categories').orderBy('sortOrder','asc').get()]);
      dbProds = ps.docs.map(d=>({id:d.id,...d.data()}));
      cats = cs.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  const prodOpts = dbProds.map(p=>`<option value="${p.id}">${p.name}</option>`).join('');
  t.innerHTML = `
    <div class="form-card">
      <h4>➕ إضافة فئة</h4>
      <div class="form-row">
        <div class="form-group"><label class="form-label">اسم الفئة *</label><input class="form-input" id="nc-name" placeholder="مثل: 100 جوهرة" /></div>
        <div class="form-group"><label class="form-label">السعر (SDG) *</label><input class="form-input" id="nc-price" type="number" placeholder="100" /></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">المنتج</label><select class="form-select" id="nc-prod">${prodOpts||'<option>لا توجد منتجات</option>'}</select></div>
        <div class="form-group"><label class="form-label">معرف المنتج (الثابت)</label><input class="form-input" id="nc-prod-id" placeholder="مثل: ff أو pubg" /></div>
      </div>
      <div class="form-group"><label class="form-label">الوصف</label><input class="form-input" id="nc-desc" placeholder="وصف اختياري" /></div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">الترتيب</label><input class="form-input" id="nc-order" type="number" placeholder="1" /></div>
        <div class="form-group" style="display:flex;align-items:flex-end;gap:12px">
          <label><input type="checkbox" id="nc-featured" style="accent-color:var(--primary)"> الأكثر طلباً</label>
        </div>
      </div>
      <button class="btn btn-primary" onclick="saveCategory()">💾 حفظ الفئة</button>
    </div>
    <h3 style="font-size:15px;font-weight:700;margin-bottom:12px">الفئات في قاعدة البيانات (${cats.length})</h3>
    ${cats.map(ct=>`
      <div class="adm-card">
        <div class="adm-card-top"><div class="adm-card-title">${ct.name}</div><div class="text-accent font-bold">${fmtNum(ct.price)} SDG</div></div>
        <div style="font-size:12px;color:var(--text3)">منتج: ${ct.productId} | ترتيب: ${ct.sortOrder||0} ${ct.featured?'| ⭐ الأكثر طلباً':''}</div>
        <div class="adm-actions">
          <button class="adm-btn adm-btn-${ct.active!==false?'danger':'success'}" onclick="toggleCat('${ct.id}',${ct.active!==false})">${ct.active!==false?'تعطيل':'تفعيل'}</button>
          <button class="adm-btn adm-btn-danger" onclick="deleteCat('${ct.id}')">حذف</button>
        </div>
      </div>
    `).join('')}`;

  window.saveCategory = async () => {
    const name = document.getElementById('nc-name')?.value?.trim();
    const price = parseInt(document.getElementById('nc-price')?.value||0);
    const productId = document.getElementById('nc-prod-id')?.value?.trim() || document.getElementById('nc-prod')?.value;
    if (!name||!price||!productId) { showToast('تأكد من إدخال الاسم والسعر ومعرف المنتج','error'); return; }
    if (!db) return;
    try {
      await db.collection('categories').add({ name, price, productId, desc: document.getElementById('nc-desc')?.value||'', sortOrder: parseInt(document.getElementById('nc-order')?.value||99), featured: document.getElementById('nc-featured')?.checked||false, active: true, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
      showToast('تمت الإضافة ✅','success'); adminCategories();
    } catch(e) { showToast('خطأ','error'); }
  };
  window.toggleCat = async (id,active) => { await db.collection('categories').doc(id).update({active:!active}); adminCategories(); };
  window.deleteCat = async (id) => { if(!confirm('حذف الفئة؟')) return; await db.collection('categories').doc(id).delete(); adminCategories(); };
}

async function adminCodes() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let codes = [];
  if (db) {
    try {
      const snap = await db.collection('codes').orderBy('createdAt','desc').limit(100).get();
      codes = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  const unused = codes.filter(c=>c.status==='unused').length;
  t.innerHTML = `
    <div class="admin-stats-grid" style="grid-template-columns:repeat(3,1fr)">
      <div class="stat-card"><div class="sc-val">${codes.length}</div><div class="sc-lbl">إجمالي الأكواد</div></div>
      <div class="stat-card"><div class="sc-val text-success">${unused}</div><div class="sc-lbl">غير مستخدمة</div></div>
      <div class="stat-card"><div class="sc-val text-danger">${codes.length-unused}</div><div class="sc-lbl">مستخدمة</div></div>
    </div>
    ${unused<5?`<div class="card" style="padding:12px;margin-bottom:16px;border-color:var(--danger);color:var(--danger);font-size:13px;font-weight:700">⚠️ تحذير: الأكواد المتبقية أقل من 5!</div>`:''}
    <div class="form-card">
      <h4>➕ إضافة أكواد</h4>
      <div class="form-row">
        <div class="form-group"><label class="form-label">معرف المنتج</label><input class="form-input" id="code-prod" placeholder="مثل: ps أو steam" /></div>
        <div class="form-group"><label class="form-label">معرف الفئة</label><input class="form-input" id="code-cat" placeholder="مثل: ps10" /></div>
      </div>
      <div class="form-group"><label class="form-label">الأكواد (كود واحد في كل سطر)</label><textarea class="form-textarea" id="code-vals" placeholder="CODE-1234&#10;CODE-5678&#10;CODE-9012" style="min-height:120px;direction:ltr"></textarea></div>
      <button class="btn btn-primary" onclick="saveCodes()">💾 حفظ الأكواد</button>
    </div>
    <div class="adm-table-wrap">
      <table class="adm-table">
        <thead><tr><th>الكود</th><th>المنتج</th><th>الفئة</th><th>الحالة</th><th>إجراءات</th></tr></thead>
        <tbody>${codes.map(code=>`
          <tr>
            <td style="direction:ltr;font-family:monospace">${code.codeValue}</td>
            <td>${code.productId}</td>
            <td>${code.categoryId}</td>
            <td>${statusBadge(code.status)}</td>
            <td><button class="adm-btn adm-btn-danger" onclick="deleteCode('${code.id}')">حذف</button></td>
          </tr>
        `).join('')}</tbody>
      </table>
    </div>`;

  window.saveCodes = async () => {
    const prodId = document.getElementById('code-prod')?.value?.trim();
    const catId = document.getElementById('code-cat')?.value?.trim();
    const vals = document.getElementById('code-vals')?.value?.split('\n').map(v=>v.trim()).filter(v=>v);
    if (!prodId||!catId||!vals.length) { showToast('أدخل جميع البيانات','error'); return; }
    if (!db) return;
    let added = 0;
    for (const v of vals) {
      await db.collection('codes').add({ codeValue:v, productId:prodId, categoryId:catId, status:'unused', addedBy:currentUser.uid, createdAt:firebase.firestore.FieldValue.serverTimestamp() });
      added++;
    }
    showToast(`تم إضافة ${added} كود ✅`,'success'); adminCodes();
  };
  window.deleteCode = async (id) => { await db.collection('codes').doc(id).delete(); showToast('تم الحذف','success'); adminCodes(); };
}

async function adminNotifications() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = `
    <div class="form-card">
      <h4>📤 إرسال إشعار</h4>
      <div class="form-group"><label class="form-label">نوع الإرسال</label>
        <select class="form-select" id="notif-type-send" onchange="toggleNotifTarget()">
          <option value="user">مستخدم محدد</option>
          <option value="all">جميع المستخدمين</option>
        </select>
      </div>
      <div id="notif-target-field">
        <div class="form-group"><label class="form-label">معرف المستخدم (UID) أو البريد</label><input class="form-input" id="notif-uid" placeholder="UID المستخدم" /></div>
      </div>
      <div class="form-group"><label class="form-label">عنوان الإشعار *</label><input class="form-input" id="notif-title-inp" placeholder="عنوان الإشعار" /></div>
      <div class="form-group"><label class="form-label">نص الإشعار *</label><textarea class="form-textarea" id="notif-msg-inp" placeholder="نص الإشعار"></textarea></div>
      <button class="btn btn-primary" onclick="sendAdminNotif()">📤 إرسال</button>
    </div>`;

  window.toggleNotifTarget = () => {
    const type = document.getElementById('notif-type-send')?.value;
    const field = document.getElementById('notif-target-field');
    if (field) field.style.display = type==='user' ? 'block' : 'none';
  };
  window.sendAdminNotif = async () => {
    const type = document.getElementById('notif-type-send')?.value;
    const title = document.getElementById('notif-title-inp')?.value?.trim();
    const msg = document.getElementById('notif-msg-inp')?.value?.trim();
    if (!title||!msg) { showToast('ادخل العنوان والنص','error'); return; }
    if (!db) return;
    if (type==='user') {
      const uid = document.getElementById('notif-uid')?.value?.trim();
      if (!uid) { showToast('ادخل معرف المستخدم','error'); return; }
      await db.collection('notifications').add({ userId:uid, title, message:msg, type:'admin', read:false, createdAt:firebase.firestore.FieldValue.serverTimestamp() });
      showToast('تم الإرسال ✅','success');
    } else {
      const snap = await db.collection('users').get();
      const batch = db.batch();
      snap.docs.forEach(d=>{
        const ref = db.collection('notifications').doc();
        batch.set(ref,{ userId:d.id, title, message:msg, type:'admin', read:false, createdAt:firebase.firestore.FieldValue.serverTimestamp() });
      });
      await batch.commit();
      showToast(`تم الإرسال لـ ${snap.size} مستخدم ✅`,'success');
    }
  };
  window.adminSendNotif = (uid) => { adminNotifications(); setTimeout(()=>{ const el=document.getElementById('notif-uid'); if(el) el.value=uid; },100); };
}

async function adminSupportTickets() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = '<div class="spinner-overlay"><div class="spinner-sm"></div></div>';
  let tickets = [];
  if (db) {
    try {
      const snap = await db.collection('support').orderBy('createdAt','desc').limit(100).get();
      tickets = snap.docs.map(d=>({id:d.id,...d.data()}));
    } catch(e){}
  }
  t.innerHTML = `
    <div class="ticket-list">
      ${tickets.map(tk=>`
        <div class="ticket-item">
          <div class="ticket-top"><span class="ticket-title">${tk.type}</span>${statusBadge(tk.status||'open')}</div>
          <div style="font-size:12px;color:var(--text3);margin-top:4px">${tk.email} ${tk.walletId?'| '+tk.walletId:''} ${tk.orderRef?'| طلب: '+tk.orderRef:''}</div>
          <div class="ticket-msg">${tk.message}</div>
          <div class="ticket-date">${fmtDate(tk.createdAt)}</div>
          <div class="adm-actions">
            <button class="adm-btn adm-btn-primary" onclick="openWA('ردنا على تذكرتك: ${tk.type}')">رد واتساب</button>
            <button class="adm-btn adm-btn-success" onclick="closeSupportTicket('${tk.id}','${tk.userId}')">إغلاق</button>
          </div>
        </div>
      `).join('')}
      ${!tickets.length?'<div class="empty-state"><div class="es-title">لا توجد تذاكر</div></div>':''}
    </div>`;
  window.closeSupportTicket = async (id, userId) => {
    await db.collection('support').doc(id).update({status:'closed'});
    if (userId) await db.collection('notifications').add({userId, title:'تم الرد على تذكرتك', message:'تم حل مشكلتك وإغلاق التذكرة. للاستفسار راسلنا مجدداً.', type:'support', read:false, createdAt:firebase.firestore.FieldValue.serverTimestamp()});
    showToast('تم إغلاق التذكرة','success'); adminSupportTickets();
  };
}

async function adminSettings() {
  const t = document.getElementById('admin-tab-content');
  t.innerHTML = `
    <div class="form-card">
      <h4>⚙️ إعدادات المتجر</h4>
      <div class="form-group"><label class="form-label">اسم المتجر</label><input class="form-input" value="${STORE_NAME}" id="set-name" /></div>
      <div class="form-group"><label class="form-label">رقم الواتساب</label><input class="form-input" value="${WHATSAPP_NUMBER}" id="set-wa" dir="ltr" /></div>
      <div class="form-group"><label class="form-label">رقم Firebase Config - للتحديث عدّل مباشرة في ملف app.js</label>
        <div style="background:var(--bg2);padding:12px;border-radius:8px;font-size:12px;color:var(--text3);direction:ltr">
          apiKey: "${firebaseConfig.apiKey}"<br/>
          projectId: "${firebaseConfig.projectId}"
        </div>
      </div>
      <button class="btn btn-primary" onclick="showToast('لتحديث الإعدادات عدّل ثوابت STORE_NAME وWHATSAPP_NUMBER في ملف app.js','info')">💾 حفظ</button>
    </div>
    <div class="form-card">
      <h4>🔐 إعدادات الأمان</h4>
      <div style="font-size:13px;color:var(--text2);margin-bottom:12px">البريد الإداري: <strong>${ADMIN_EMAIL}</strong></div>
      <div style="font-size:13px;color:var(--text3)">لتغيير البريد الإداري عدّل قيمة ADMIN_EMAIL في ملف app.js</div>
    </div>`;
}
