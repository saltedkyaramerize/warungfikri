const SED_PCT = 10; // sedekah % dari seluruh pemasukan (omzet) hari ini
const SEED = [["Ale-ale","Minuman",850,1000,20],["Detergen SoKlin Lavender 1000an","Sabun Sabunan",900,1000,1],["Downy dan Molto","Sabun Sabunan",0,500,0],["Es Rasa rasa","Minuman",1000,2000,100],["Floridina","Minuman",3000,4000,0],["Garam","Sembako",1000,2000,6],["Gooday Biru","Kopi dan susu",2000,2500,9],["Gooday Cappucino","Kopi dan susu",2000,3000,0],["Gooday merah","Kopi dan susu",2000,2500,4],["INDOCAFE","Kopi dan susu",2000,2500,4],["ISO PLUS","Minuman",3000,4000,0],["Jelly cup","Minuman",800,1000,10],["Jelly saset","Minuman",500,1000,20],["Kapal Api","Kopi dan susu",2000,2500,6],["Kopi Mateng dan Susu Mateng","Kopi dan susu",2000,4000,40],["Luwak White kopi","Kopi dan susu",2000,2500,1],["Mama Lemon 2000an","Sabun Sabunan",1800,2000,0],["Mie Goreng Aceh Indomie","Sembako",3000,4000,1],["Mie Goreng Ayam Geprek Indomie","Sembako",3000,4000,4],["Mie Goreng Indomie","Sembako",3000,4000,0],["Mie Goreng Rendang Indomie","Sembako",3000,4000,2],["Mie Kuah Ayam Bawang Indomie","Sembako",2900,3500,0],["Mie Kuah Soto Indomie","Sembako",2900,3500,1],["Mie Nyemek Bangladesh Indomie","Sembako",3000,4000,1],["Mie Sedap goreng Korean Spicy Chicken","Sembako",2900,3500,2],["Mie Sedap Kuah Kari Spesial","Sembako",2900,3500,1],["Mie Sedap Kuah Laksa Singapura","Sembako",2900,3500,2],["Nipis madu","Minuman",4000,5000,0],["Pewangi Pakaian Rapika/Kispray","Sabun Sabunan",450,500,12],["Sabun Colek 2000an","Sabun Sabunan",0,2000,0],["Soffel","Sabun Sabunan",850,1000,6],["SoKlin Lantai","Sabun Sabunan",450,500,10],["SoKlin Liquid","Sabun Sabunan",0,500,0],["Susu Indomilk kotak","Minuman",0,4000,0],["Susu Milku","Minuman",3000,4000,0],["Susu Putih dan Coklat Frisian Flag","Kopi dan susu",1500,2500,6],["Susu Real Good","Minuman",1000,2000,3],["Teh gelas","Minuman",850,1000,0],["Teh Pucuk","Minuman",3000,4000,0],["Telur","Sembako",1500,2500,13],["Tic tic Mie","Snack",500,1000,8],["Sukro","Snack",1000,2000,20],["Jelly","Snack",1000,1500,20],["Corn","Snack",1000,1500,20],["Permen Tiptop","Snack",1000,1500,20],["Permen Hothot","Snack",1000,1500,20],["Panda","Snack",1000,1500,20],["Permen Milkita Macha","Snack",1000,1500,20],["Permen Milkita Coklat","Snack",1000,1500,20],["Permen Milkita Stroberi","Snack",1000,1500,20],["Permen Milkita Melon","Snack",1000,1500,20],["Susu Sasetan Kecil","Minuman",1500,2000,20],["Seres","Snack",1000,1500,20],["Seblak","Snack",1000,2000,20],["Wafer Roll","Snack",1000,1500,20],["Morriss","Snack",1000,1500,20],["Telor Cicak","Snack",1000,1500,20],["Berry Sweet","Minuman",1500,2000,20],["Fruiz Mangga","Minuman",1500,2000,20],["Fruiz Anggur","Minuman",1500,2000,20],["Fruiz Apel","Minuman",1500,2000,20],["Fruiz Markisa","Minuman",1500,2000,20],["Milky candy Kopi","Kopi dan susu",2000,2500,20],["Milky candy Matcha","Kopi dan susu",2000,2500,20],["Milky candy Strawberry","Snack",1000,1500,20],["Permen Sate","Snack",1000,1500,20],["Permen Jagoan Neon Biru","Snack",1000,1500,20],["Mie Kremez","Snack",1000,2000,20],["Sip Ah","Minuman",1500,2000,20],["Bollu Ijo","Snack",3000,4000,20],["Brownies Krispi","Snack",3000,4000,20],["Roti Aok","Snack",3000,4000,20],["Nabati","Snack",1000,1500,20],["Tik-tik Bawang Putih","Snack",1000,2000,20],["Tiktak","Snack",1000,2000,20],["Ciki Berhadiah","Snack",1000,1500,20],["Oreo","Snack",1000,1500,20]];

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt = n => 'Rp' + Math.round(n || 0).toLocaleString('id-ID');
const dt = t => new Date(t).toLocaleString('id-ID', {dateStyle:'short', timeStyle:'short'});

let S = null;
try { S = JSON.parse(localStorage.getItem('pos2')); } catch (e) {}
if (!S) S = {
  products: SEED.map((a, i) => ({id:i + 1, name:a[0], cat:a[1], cost:a[2], price:a[3], stock:a[4], max:a[4], img:''})),
  sales: [], closings: [], set: {pin:'1234', kasbon:true, shop:'Toko Saya'}, nid: 1000
};
const save = () => { try { localStorage.setItem('pos2', JSON.stringify(S)); } catch (e) { toast('Penyimpanan penuh'); } };

let tab = 'kasir', owner = false, cat = 'Semua', cart = [], pm = 'tunai', paid = '', cust = '', editId = null, img = '', rng = 'hari', bq = '';

/* ===== Util UI ===== */
function toast(m) { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(t.h); t.h = setTimeout(() => t.style.display = 'none', 2200); }
function dlg(msg, o, cb) {
  o = o || {};
  const d = document.createElement('div'); d.className = 'ov';
  d.innerHTML = `<div class="box"><p>${esc(msg)}</p>${o.type ? `<input id="dv" type="${o.type}">` : ''}<div class="flex"><button class="pri" id="dok">OK</button><button id="dno">Batal</button></div></div>`;
  document.body.appendChild(d);
  const i = d.querySelector('#dv'), close = () => d.remove(), go = () => { const v = i ? i.value : true; close(); cb(v); };
  d.querySelector('#dok').onclick = go; d.querySelector('#dno').onclick = close;
  if (i) { i.focus(); i.onkeydown = e => { if (e.key === 'Enter') go(); }; }
}
function needPin(cb) { if (owner) return cb(); dlg('Masukkan PIN Admin/Owner', {type:'password'}, v => v === S.set.pin ? cb() : toast('PIN salah')); }
function toggleOwner() { if (owner) { owner = false; view(); } else needPin(() => { owner = true; view(); }); }
function go(t) { tab = t; view(); }
function net() { $('#net').textContent = navigator.onLine ? ' ' : '  – data tersimpan di perangkat'; }
addEventListener('online', net); addEventListener('offline', net); net();


const stat = p => p.stock <= 0 ? 'habis' : (p.max > 0 && p.stock <= p.max * 0.2) ? 'hampir' : '';
const tag = p => { const s = stat(p); return s == 'habis' ? '<span class="tag bad">Habis</span>' : s ? '<span class="tag warn">Hampir habis</span>' : ''; };

function view() {
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('on', b.dataset.t == tab));
  const ha = S.products.filter(p => p.stock <= 0).length, hm = S.products.filter(p => stat(p) == 'hampir').length, L = $('#low');
  L.style.display = ha + hm ? 'block' : 'none';
  L.innerHTML = `⚠ ${hm} barang hampir habis · ${ha} barang habis <button onclick="go('lap')">Lihat</button>`;
  $('#role').textContent = owner ? ' Owner (ganti)' : ' Mode Kasir';
  ({kasir:vKasir, barang:vBarang, tutup:vTutup, riwayat:vRiwayat, lap:vLap})[tab]();
}


function vKasir() {
  $('#app').innerHTML = `<div class="split"><div><input id="q" placeholder="Cari nama barang" oninput="grid()"><div class="chips" id="cats"></div><div class="grid" id="grid"></div></div><div class="card" id="cart"></div></div><div class="cbar" id="cb"></div>`;
  grid(); renderCart();
}
function grid() {
  const q = ($('#q').value || '').toLowerCase(), cs = ['Semua', ...new Set(S.products.map(p => p.cat))];
  $('#cats').innerHTML = cs.map(c => `<button class="${c == cat ? 'on' : ''}" onclick="cat='${esc(c)}';grid()">${esc(c)}</button>`).join('');
  $('#grid').innerHTML = S.products.filter(p => (cat == 'Semua' || p.cat == cat) && p.name.toLowerCase().includes(q)).map(p =>
    `<button class="pc ${p.stock <= 0 ? 'off' : ''}" onclick="add(${p.id})">${p.img ? `<img src="${p.img}">` : `<div class="ph">${esc(p.name[0])}</div>`}<b>${esc(p.name)}</b><small>${fmt(p.price)} · stok ${p.stock}</small><div>${tag(p)}</div></button>`
  ).join('') || '<p class="mut">Barang tidak ditemukan</p>';
}
function add(id) {
  const p = S.products.find(p => p.id == id), l = cart.find(c => c.id == id);
  if ((l ? l.qty : 0) >= p.stock) return toast('Stok ' + p.name + ' habis');
  l ? l.qty++ : cart.push({id, name:p.name, qty:1, price:p.price, orig:p.price, cost:p.cost});
  renderCart();
}
const qty = (i, d) => { const l = cart[i], p = S.products.find(p => p.id == l.id); l.qty += d; if (l.qty > p.stock) { l.qty = p.stock; toast('Melebihi stok'); } if (l.qty <= 0) cart.splice(i, 1); renderCart(); };
const setP = (i, v) => { cart[i].price = Math.max(0, +v || 0); renderCart(); };
const total = () => cart.reduce((a, l) => a + l.qty * l.price, 0);
function renderCart() {
  const T = total(), ms = ['tunai', 'qris', ...(S.set.kasbon ? ['kasbon'] : [])];
  $('#cart').innerHTML = `<h3>Keranjang</h3>${cart.map((l, i) => `<div class="ln"><b>${esc(l.name)}</b>${l.price != l.orig ? ' <span class="mut">(harga diubah, asli ' + fmt(l.orig) + ')</span>' : ''}<div class="r"><button onclick="qty(${i},-1)">−</button>${l.qty}<button onclick="qty(${i},1)">+</button><input type="number" value="${l.price}" onchange="setP(${i},this.value)"><span>${fmt(l.qty * l.price)}</span></div></div>`).join('') || '<p class="mut">Tap barang untuk menambah</p>'}
<div class="tot"><span>Total</span><span>${fmt(T)}</span></div>
<div class="chips">${ms.map(m => `<button class="${m == pm ? 'on' : ''}" onclick="pm='${m}';renderCart()">${m.toUpperCase()}</button>`).join('')}</div>
${pm == 'tunai' ? `<label>Uang diterima</label><input type="number" id="pd" value="${paid}" oninput="paid=this.value;kmb()"><p>Kembalian: <b id="km"></b></p>` : ''}
${pm == 'kasbon' ? `<label>Nama pelanggan (utang)</label><input id="cu" value="${esc(cust)}" oninput="cust=this.value">` : ''}
<button class="pri" style="width:100%;margin-top:8px" onclick="pay()">Bayar</button>${cart.length ? `<button style="width:100%;margin-top:6px" onclick="cart=[];renderCart()">Kosongkan</button>` : ''}`;
  const cb = $('#cb');
  if (cb) { const n = cart.reduce((a, l) => a + l.qty, 0); cb.classList.toggle('show', n > 0); cb.innerHTML = `<span>🛒 ${n} item · <b>${fmt(T)}</b></span><button class="pri" onclick="$('#cart').scrollIntoView({behavior:'smooth'})">Bayar ↓</button>`; }
  kmb();
}
function kmb() { const e = $('#km'); if (e) e.textContent = fmt(Math.max(0, (+paid || 0) - total())); }
function pay() {
  const T = total();
  if (!cart.length) return toast('Keranjang kosong');
  if (pm == 'tunai' && (+paid || 0) < T) return toast('Uang kurang');
  if (pm == 'kasbon' && !cust.trim()) return toast('Isi nama pelanggan');
  const cost = cart.reduce((a, l) => a + l.qty * l.cost, 0);
  const s = {id:S.nid++, ts:Date.now(), items:cart.map(l => ({...l})), total:T, cost, pm, cust:pm == 'kasbon' ? cust.trim() : '', paid:pm == 'tunai' ? +paid : T, lunas:pm != 'kasbon', void:false, cl:0, rfAmt:0};
  cart.forEach(l => S.products.find(p => p.id == l.id).stock -= l.qty);
  S.sales.push(s); save();
  const k = pm == 'tunai' ? ' · kembalian ' + fmt(s.paid - T) : '';
  cart = []; paid = ''; cust = ''; toast('Transaksi tersimpan' + k); view();
}


function vBarang() {
  if (!owner) { $('#app').innerHTML = `<div class="card"><h3>Data Barang</h3><p>Hanya Admin yang dapat mengelola barang.</p><button class="pri" onclick="toggleOwner()">Masuk sebagai CEO warung</button></div>`; return; }
  const e = S.products.find(p => p.id == editId) || {}; img = e.img || '';
  $('#app').innerHTML = `<div class="card"><h3>${e.id ? 'Ubah' : 'Tambah'} Barang</h3><div class="row">
<div><label>Nama</label><input id="f_n" value="${esc(e.name)}"></div>
<div><label>Kategori</label><input id="f_c" list="cl" value="${esc(e.cat)}"><datalist id="cl">${[...new Set(S.products.map(p => p.cat))].map(c => `<option>${esc(c)}`).join('')}</datalist></div>
<div><label>Harga jual</label><input id="f_p" type="number" value="${e.price ?? ''}"></div>
<div><label>Harga modal (HPP)</label><input id="f_m" type="number" value="${e.cost ?? ''}"></div>
<div><label>Stok</label><input id="f_s" type="number" value="${e.stock ?? ''}"></div>
<div><label>Foto (kamera / galeri)</label><input type="file" accept="image/*" onchange="pickImg(this)"></div></div>
<div class="flex" style="margin-top:8px"><img id="pv" src="${img}" style="width:56px;height:56px;border-radius:8px;object-fit:cover;${img ? '' : 'display:none'}"><button class="pri" onclick="saveP()">Simpan</button>${e.id ? '<button onclick="editId=null;vBarang()">Batal</button>' : ''}</div></div>
<div class="card"><h3>Daftar Barang (${S.products.length})</h3><input placeholder="Cari barang" value="${esc(bq)}" oninput="bq=this.value;listB()"><div style="overflow-x:auto;margin-top:8px"><table id="lb" class="stack"></table></div></div>
<div class="card"><h3>Pengaturan</h3>
<label>Nama toko (untuk nota)</label><input value="${esc(S.set.shop)}" onchange="S.set.shop=this.value;save()">
<label><input type="checkbox" ${S.set.kasbon ? 'checked' : ''} onchange="S.set.kasbon=this.checked;save()"> Aktifkan utang (kasbon)</label>
<label>PIN Admin/Owner</label><input value="${esc(S.set.pin)}" onchange="if(this.value.length>=4){S.set.pin=this.value;save();toast('PIN diubah')}else toast('Minimal 4 karakter')"></div>`;
  listB();
}
function listB() {
  const q = bq.toLowerCase();
  $('#lb').innerHTML = '<tr class="hd"><th>Nama</th><th>Modal</th><th>Harga</th><th>Stok</th><th></th></tr>' + S.products.filter(p => p.name.toLowerCase().includes(q)).map(p =>
    `<tr><td>${esc(p.name)}<div class="mut">${esc(p.cat)}</div></td><td data-l="Modal">${fmt(p.cost)}</td><td data-l="Harga">${fmt(p.price)}</td><td data-l="Stok">${p.stock} ${tag(p)}</td><td style="white-space:nowrap"><button class="sm pri" onclick="addStock(${p.id})">+ Stok</button> <button class="sm" onclick="editId=${p.id};vBarang();scrollTo(0,0)">Ubah</button> <button class="sm del" onclick="delP(${p.id})">Hapus</button></td></tr>`
  ).join('');
}
function addStock(id) {
  const p = S.products.find(p => p.id == id);
  dlg('Tambah stok "' + p.name + '" (jumlah masuk)', {type:'number'}, v => {
    const n = Math.floor(+v); if (!(n > 0)) return toast('Jumlah tidak valid');
    p.stock += n; p.max = Math.max(p.max, p.stock); save(); toast('Stok ' + p.name + ' jadi ' + p.stock); view(); listB();
  });
}
function pickImg(inp) {
  const f = inp.files[0]; if (!f) return;
  const r = new FileReader;
  r.onload = ev => { const i = new Image; i.onload = () => { const k = Math.min(1, 200 / Math.max(i.width, i.height)), c = document.createElement('canvas'); c.width = i.width * k; c.height = i.height * k; c.getContext('2d').drawImage(i, 0, 0, c.width, c.height); img = c.toDataURL('image/jpeg', .7); const p = $('#pv'); p.src = img; p.style.display = 'block'; }; i.src = ev.target.result; };
  r.readAsDataURL(f);
}
function saveP() {
  const n = $('#f_n').value.trim(); if (!n) return toast('Nama wajib diisi');
  const o = {name:n, cat:$('#f_c').value.trim() || 'Lainnya', price:+$('#f_p').value || 0, cost:+$('#f_m').value || 0, stock:+$('#f_s').value || 0, img};
  const e = S.products.find(p => p.id == editId);
  if (e) { Object.assign(e, o); e.max = Math.max(e.max || 0, e.stock); } else S.products.push({id:S.nid++, max:o.stock, ...o});
  editId = null; save(); toast('Barang tersimpan'); view();
}
function delP(id) { dlg('Hapus barang ini?', {}, () => { S.products = S.products.filter(p => p.id != id); save(); view(); }); }


const open = () => S.sales.filter(s => !s.void && !s.cl);
const sum = (a, k) => a.reduce((x, s) => x + s[k], 0);
function vTutup() {
  const o = open();
  $('#app').innerHTML = `<div class="card"><h3>Rekap Otomatis Penjualan</h3><p class="mut">${o.length} transaksi belum direkap. Sistem menjumlahkan semua penjualan hari ini, tunai maupun non-tunai (QRIS). Sedekah otomatis dipotong saat kasir ditutup.</p><div id="rk" class="row"></div></div>
<div class="card" id="rh"></div>
<div class="card"><h3>Hitung Uang Fisik</h3><p class="mut">Saat toko mau tutup, hitung seluruh uang tunai yang ada di laci kasir, lalu isi totalnya di bawah.</p><label>Total uang tunai di laci</label><input id="ac" type="number" inputmode="numeric" placeholder="0" oninput="calcT()"><p id="sel"></p></div>
<div class="card"><h3>Potongan Sedekah</h3><p class="mut">Sedekah ${SED_PCT}% dari seluruh pemasukan hari ini, otomatis terpotong saat Tutup Kasir.</p><div id="pv2" class="row"></div>
<button class="pri" onclick="closeShift()">Tutup Kasir & Simpan Rekap</button></div>`;
  calcT(); rHist();
}
function figs(o) { const om = sum(o, 'total'), hp = sum(o, 'cost'); return {om, hp, lb:om - hp}; }
function calcT() {
  const o = open(), f = figs(o), by = m => o.filter(s => s.pm == m).reduce((a, s) => a + s.total, 0);
  const kp = (l, v, w) => `<div class="kpi${w ? ' wide' : ''}"><small>${l}</small><b>${fmt(v)}</b></div>`;
  $('#rk').innerHTML = kp('Total penjualan hari ini', f.om, 1) + kp('Tunai', by('tunai')) + kp('QRIS', by('qris')) + kp('Kasbon (belum dibayar)', by('kasbon')) + kp('HPP', f.hp) + kp('Laba bersih', f.lb) + kp('Refund (sudah dikurangi dari penjualan)', o.reduce((a, x) => a + (x.rfAmt || 0), 0));
  const exp = by('tunai'), ac = $('#ac').value;
  $('#sel').innerHTML = `Penjualan tunai menurut sistem: <b>${fmt(exp)}</b>` + (ac === '' ? '' : +ac === exp ? ' · <b>Cocok ✓</b>' : ` · Selisih: <b class="bad">${fmt(+ac - exp)}</b> (${+ac > exp ? 'lebih' : 'kurang'})`);
  const r = calcCut(f); $('#pv2').innerHTML = kp('Pemasukan hari ini', f.om) + kp('Sedekah ' + SED_PCT + '%', r.amt) + kp('Laba bersih setelah sedekah', f.lb - r.amt, 1);
}
function calcCut(f) {
  return {kind:'Sedekah', src:'omzet', mode:'pct', v:SED_PCT, amt:Math.round(Math.max(0, f.om) * SED_PCT / 100)};
}
function closeShift() {
  const o = open(); if (!o.length) return toast('Belum ada transaksi');
  const f = figs(o), tn = o.filter(s => s.pm == 'tunai').reduce((a, s) => a + s.total, 0), c = calcCut(f), ac = $('#ac').value, id = S.nid++;
  S.closings.push({id, ts:Date.now(), ...f, tn, ac:ac === '' ? null : +ac, sel:ac === '' ? null : +ac - tn, kind:c.kind, src:c.src, mode:c.mode, v:c.v, amt:c.amt});
  o.forEach(s => s.cl = id); save(); toast('Kasir ditutup, sedekah ' + fmt(c.amt) + ' terpotong'); tab = 'lap'; view();
}


function vLap() {
  const t0 = new Date().setHours(0, 0, 0, 0), from = rng == 'hari' ? t0 : rng == '7' ? t0 - 6 * 864e5 : 0;
  const ss = S.sales.filter(s => !s.void && s.ts >= from), f = figs(ss);
  const sed = S.closings.filter(c => c.kind == 'Sedekah'), pu = S.sales.filter(s => !s.void && !s.lunas), last = S.closings[S.closings.length - 1];
  const sorted = S.products.slice().sort((a, b) => (!!stat(b)) - (!!stat(a)));
  $('#app').innerHTML = `<div class="card"><div class="flex"><h3 style="margin:0">Laporan Keuntungan</h3><select style="width:auto" onchange="rng=this.value;vLap()"><option value="hari" ${rng == 'hari' ? 'selected' : ''}>Hari ini</option><option value="7" ${rng == '7' ? 'selected' : ''}>7 hari</option><option value="all" ${rng == 'all' ? 'selected' : ''}>Semua</option></select></div>
<div class="row" style="margin-top:8px"><div class="kpi"><small>Omzet kotor</small><b>${fmt(f.om)}</b></div><div class="kpi"><small>Total HPP</small><b>${fmt(f.hp)}</b></div><div class="kpi"><small>Laba bersih</small><b>${fmt(f.lb)}</b></div><div class="kpi"><small>Transaksi</small><b>${ss.length}</b></div></div></div>
<div class="card"><h3>Dana Sedekah</h3><div class="row"><div class="kpi"><small>Sedekah terkumpul</small><b>${fmt(sum(sed, 'amt'))}</b></div></div>
<table>${sed.map(c => `<tr><td>${dt(c.ts)}</td><td>Sedekah</td><td>${c.mode == 'pct' ? c.v + '% dari ' + (c.src == 'omzet' ? 'omzet' : 'laba') : 'Nominal'}</td><td>${fmt(c.amt)}</td></tr>`).join('')}</table></div>
<div class="card"><h3>Uang Fisik (rekap terakhir)</h3>${last && last.ac != null ? `<p>${dt(last.ts)}: tunai sistem ${fmt((last.ka || 0) + last.tn)}, uang fisik ${fmt(last.ac)}, selisih <b class="${last.sel ? 'bad' : ''}">${fmt(last.sel)}</b></p>` : '<p class="mut">Belum ada rekap dengan hitung uang fisik.</p>'}</div>
<div class="card"><h3>Piutang / Kasbon (${fmt(sum(pu, 'total'))})</h3><table>${pu.map(s => `<tr><td>${esc(s.cust)}</td><td>${dt(s.ts)}</td><td>${fmt(s.total)}</td><td><button class="sm" onclick="lunas(${s.id})">Lunasi</button></td></tr>`).join('') || '<tr><td class="mut">Tidak ada piutang</td></tr>'}</table></div>
<div class="card"><h3>Stok Barang (yang menipis di atas)</h3><div style="overflow-x:auto"><table>${sorted.map(p => `<tr><td>${esc(p.name)}</td><td>${p.stock} ${tag(p)}</td></tr>`).join('')}</table></div></div>`;
}
let hf = {y:'', m:'', d:'', t1:'', t2:''};
const BLN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const itx = s => s.items.map(i => esc(i.name) + '×' + (i.qty - (i.rf || 0)) + (i.rf ? ` (refund ${i.rf})` : '')).join(', ');
function vRiwayat() {
  const yrs = [...new Set(S.sales.map(s => new Date(s.ts).getFullYear()))].sort((a, b) => b - a);
  const opt = (v, l) => `<option value="${v}" ${String(hf[cur]) == String(v) ? 'selected' : ''}>${l}</option>`;
  let cur = 'y'; const oy = ['<option value="">Semua</option>'].concat(yrs.map(y => opt(y, y))).join('');
  cur = 'm'; const om = ['<option value="">Semua</option>'].concat(BLN.map((n, i) => opt(i + 1, n))).join('');
  cur = 'd'; const od = ['<option value="">Semua</option>'].concat(Array.from({length:31}, (_, i) => opt(i + 1, i + 1))).join('');
  const mm = t => { const [h, m] = t.split(':'); return +h * 60 + +m; };
  const list = S.sales.slice().reverse().filter(s => {
    const d = new Date(s.ts), tm = d.getHours() * 60 + d.getMinutes();
    return (!hf.y || d.getFullYear() == hf.y) && (!hf.m || d.getMonth() + 1 == hf.m) && (!hf.d || d.getDate() == hf.d)
      && (!hf.t1 || tm >= mm(hf.t1)) && (!hf.t2 || tm <= mm(hf.t2));
  });
  const ok = list.filter(s => !s.void), LIM = 200, filtered = hf.y || hf.m || hf.d || hf.t1 || hf.t2;
  $('#app').innerHTML = `<div class="card"><h3>Filter Riwayat</h3>
<div class="row"><div><label>Tahun</label><select onchange="hf.y=this.value;vRiwayat()">${oy}</select></div><div><label>Bulan</label><select onchange="hf.m=this.value;vRiwayat()">${om}</select></div><div><label>Tanggal</label><select onchange="hf.d=this.value;vRiwayat()">${od}</select></div><div><label>Waktu dari</label><input type="time" value="${hf.t1}" onchange="hf.t1=this.value;vRiwayat()"></div><div><label>Waktu sampai</label><input type="time" value="${hf.t2}" onchange="hf.t2=this.value;vRiwayat()"></div></div>
<div class="flex" style="margin-top:10px"><button onclick="hf={y:'',m:'',d:'',t1:'',t2:''};vRiwayat()">Reset filter</button></div></div>
<div class="card"><div class="row"><div class="kpi"><small>Jumlah transaksi</small><b>${ok.length}</b></div><div class="kpi"><small>Total belanja</small><b>${fmt(sum(ok, 'total'))}</b></div></div></div>
<div class="card"><h3>${filtered ? ' (terfilter)' : ''}</h3><p class="mut">Dihitung dari transaksi yang tampil di bawah, sudah dikurangi refund.</p>${ringkas(ok)}</div>
<div class="card"><h3>Riwayat Transaksi${filtered ? ' (terfilter)' : ''}</h3><div style="overflow-x:auto"><table class="stack">${list.slice(0, LIM).map(s => `<tr style="${s.void ? 'opacity:.45;text-decoration:line-through' : ''}"><td>${dt(s.ts)}</td><td>${itx(s)}</td><td data-l="Bayar">${s.pm}</td><td data-l="Total">${fmt(s.total)}</td><td style="white-space:nowrap">${s.void ? '' : `<button class="sm" onclick="nota(${s.id})">🖨 Nota</button> <button class="sm del" onclick="voidS(${s.id})">Hapus</button>`}</td></tr>`).join('') || '<tr><td class="mut">Tidak ada transaksi pada filter ini</td></tr>'}</table></div>${list.length > LIM ? `<p class="mut">Menampilkan ${LIM} dari ${list.length} transaksi. Persempit filter untuk melihat sisanya.</p>` : ''}</div>`;
}
function ringkas(ok) {
  const m = {};
  ok.forEach(s => s.items.forEach(i => { const q = i.qty - (i.rf || 0); if (q <= 0) return; const o = m[i.id] || (m[i.id] = {name:i.name, q:0, rev:0}); o.q += q; o.rev += q * i.price; }));
  const sold = Object.values(m), laris = sold.slice().sort((a, b) => b.q - a.q || b.rev - a.rev).slice(0, 10), jarang = sold.slice().sort((a, b) => a.q - b.q || a.rev - b.rev).slice(0, 10);
  const un = S.products.filter(p => !m[p.id]).map(p => p.name).sort();
  const tb = a => `<table>${a.map((x, n) => `<tr><td>${n + 1}</td><td>${esc(x.name)}</td><td>${x.q} terjual</td><td>${fmt(x.rev)}</td></tr>`).join('') || '<tr><td class="mut">Belum ada penjualan</td></tr>'}</table>`;
  return `<h3> Paling laris (10 teratas)</h3>${tb(laris)}<h3 style="margin-top:12px"> Jarang dibeli (terjual paling sedikit)</h3>${tb(jarang)}<details style="margin-top:12px"><summary><b>Belum terjual sama sekali (${un.length} barang)</b></summary><p class="mut">${un.map(esc).join(', ') || 'Semua barang pernah terjual'}</p></details>`;
}
function rHist() {
  const e = $('#rh'); if (!e) return;
  const t0 = new Date().setHours(0, 0, 0, 0), L = S.sales.filter(s => !s.void && s.ts >= t0).reverse();
  e.innerHTML = `<h3>Histori Belanja Hari Ini (${L.length})</h3><p class="mut">kalo udah di rekap tidak bisa direfund direfund.</p>` + (L.map(s => `<div class="ln"><div class="flex" style="justify-content:space-between"><b>#${s.id} · ${new Date(s.ts).toLocaleTimeString('id-ID', {timeStyle:'short'})} · ${s.pm.toUpperCase()}</b><b>${fmt(s.total)}</b></div>${s.cl ? '<span class="tag warn">Sudah direkap</span>' : ''}
${s.items.map((i, x) => { const q = i.qty - (i.rf || 0); return `<div class="flex" style="justify-content:space-between"><span class="${q ? '' : 'mut'}" style="${q ? '' : 'text-decoration:line-through'}">${esc(i.name)} × ${q} @ ${fmt(i.price)}${i.rf ? ` <span class="tag warn">refund ${i.rf}</span>` : ''}</span>${q && !s.cl ? `<button class="sm del" onclick="refundItem(${s.id},${x})">Refund</button>` : ''}</div>`; }).join('')}</div>`).join('') || '<p class="mut">Belum ada belanja hari ini</p>');
}
function refundItem(sid, x) {
  const s = S.sales.find(a => a.id == sid), i = s && s.items[x]; if (!i || s.cl || s.void) return;
  const max = i.qty - (i.rf || 0); if (max <= 0) return;
  needPin(() => dlg(`Refund "${i.name}": jumlah yang dikembalikan (maks ${max})`, {type:'number'}, v => {
    const q = +v; if (!Number.isInteger(q) || q < 1 || q > max) return toast('Jumlah tidak valid');
    const amt = q * i.price, p = S.products.find(a => a.id == i.id);
    i.rf = (i.rf || 0) + q; s.total -= amt; s.cost -= q * i.cost; s.rfAmt = (s.rfAmt || 0) + amt;
    if (p) p.stock += q;
    save(); toast(`Refund ${fmt(amt)} · stok ${i.name} +${q}`); view();
  }));
}
function voidS(id) {
  needPin(() => {
    const s = S.sales.find(s => s.id == id);
    const run = () => { s.void = true; s.items.forEach(i => { const p = S.products.find(p => p.id == i.id); if (p) p.stock += i.qty - (i.rf || 0); }); save(); toast('Transaksi dihapus, stok dikembalikan'); view(); };
    s.cl ? dlg('Transaksi ini sudah masuk rekap tutup kasir. Tetap hapus?', {}, run) : run();
  });
}
function lunas(id) { S.sales.find(s => s.id == id).lunas = true; save(); view(); }


function nota(id) {
  const s = S.sales.find(s => s.id == id); if (!s) return;
  const old = $('#nota'); if (old) old.remove();
  const d = document.createElement('div'); d.id = 'nota'; d.className = 'ov';
  d.innerHTML = `<div class="box np"><div style="text-align:center"><b>${esc(S.set.shop)}</b><br>Nota #${s.id}<br>${dt(s.ts)}</div><hr>
${s.items.map(i => `<div>${esc(i.name)}</div><div class="l"><span>${i.qty} x ${fmt(i.price)}</span><span>${fmt(i.qty * i.price)}</span></div>`).join('')}<hr>
${s.rfAmt ? `<div class="l"><span>Refund</span><span>-${fmt(s.rfAmt)}</span></div>` : ''}
<div class="l"><b>TOTAL</b><b>${fmt(s.total)}</b></div>
<div class="l"><span>Bayar (${s.pm})</span><span>${fmt(s.pm == 'kasbon' ? 0 : s.paid)}</span></div>
${s.pm == 'tunai' ? `<div class="l"><span>Kembali</span><span>${fmt(s.paid - s.total - (s.rfAmt || 0))}</span></div>` : ''}
${s.pm == 'kasbon' ? `<div class="l"><span>Utang a.n. ${esc(s.cust)}</span><span>${s.lunas ? 'LUNAS' : fmt(s.total)}</span></div>` : ''}
<hr><div style="text-align:center">Terima kasih</div>
<div class="flex noprint"><button class="pri" onclick="window.print()">Cetak</button><button onclick="$('#nota').remove()">Tutup</button></div></div>`;
  document.body.appendChild(d);
}

if (S.sales.some(s => s.pm == 'transfer')) { S.sales.forEach(s => { if (s.pm == 'transfer') s.pm = 'qris'; }); save(); }
view();
