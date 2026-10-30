'use strict';
const filters = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('.product')];
filters.forEach(button => button.addEventListener('click', () => {
 const selected = button.dataset.filter;
 filters.forEach(filter => { const active = filter === button; filter.classList.toggle('active', active); filter.setAttribute('aria-pressed', String(active)); });
 let count=0; products.forEach(product => { product.hidden = selected !== 'all' && product.dataset.category !== selected; if(!product.hidden) count++; });
 document.querySelector('#filter-status').textContent = `Показано коллекций: ${count}`;
}));
const menuToggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
menuToggle.addEventListener('click',()=>{const expanded=menuToggle.getAttribute('aria-expanded')==='true'; menuToggle.setAttribute('aria-expanded',String(!expanded)); menuToggle.setAttribute('aria-label',expanded?'Открыть меню':'Закрыть меню'); menu.hidden=expanded;});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Открыть меню');menuToggle.focus();}});
const search=document.querySelector('#instruction-search');
const instructionRows=[...document.querySelectorAll('.instruction-row')];
const keywords=['ковровая вышивка инструкция набор ковер коврик','santal санталь видео обзор лен лён люрекс пряжа'];
search.addEventListener('input',()=>{const q=search.value.toLocaleLowerCase('ru').trim().replaceAll('ё','е');let found=0;instructionRows.forEach((row,i)=>{row.hidden=q.length>0&&!keywords[i].replaceAll('ё','е').includes(q);if(!row.hidden)found++;});document.querySelector('#instruction-empty').hidden=found>0;});
const productData={
 lanasoft:{name:'Lanasoft',image:'lanasoft',description:'Полушерстяная пряжа для тёплых вязаных вещей. Спокойная база для ваших повседневных идей.',specs:{'Состав':'30% шерсть, 70% акрил','Вес мотка':'100 г','Длина нити':'210 м','В упаковке':'5 мотков'},url:'3066-lanasoft'},
 fortuna:{name:'Fortuna',image:'fortuna',description:'Одна из коллекций ARTLAND. Посмотрите палитру, подробный состав и доступные оттенки в действующем каталоге.',specs:{'Бренд':'ARTLAND','Вес мотка':'50 г','Длина нити':'165 м','В упаковке':'5 мотков'},url:'3056-fortuna'},
 topwash:{name:'Topwash',image:'topwash',description:'Носочная пряжа Comfort Socks с шерстью и нейлоном. Для носков, которые приятно вязать и носить.',specs:{'Состав':'65% шерсть, 35% нейлон','Вес мотка':'100 г','Длина нити':'400 м','В упаковке':'5 мотков'},url:'3070-topwash-comfort-socks'},
 candy:{name:'Candy',image:'candy',description:'Полиэфирный шнур с градиентом. Материал для ваших идей в декоре и рукоделии.',specs:{'Состав':'100% полиэфир','Толщина':'3 мм','Вес':'3 000 г','Длина':'1 500 м'},url:'3083-candy-3-mm-poli-firnyj-shnur-gradient-3-kg'}
};
const dialog=document.querySelector('.product-dialog');
document.querySelectorAll('[data-product]').forEach(button=>button.addEventListener('click',()=>{
 const data=productData[button.dataset.product];document.querySelector('#dialog-title').textContent=data.name;document.querySelector('#dialog-description').textContent=data.description;
 const image=document.querySelector('#dialog-image');image.src=`assets/${data.image}.webp`;image.alt=`Пряжа ARTLAND ${data.name}`;
 const specs=document.querySelector('#dialog-specs');specs.replaceChildren();Object.entries(data.specs).forEach(([key,value])=>{const row=document.createElement('div');const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=key;dd.textContent=value;row.append(dt,dd);specs.append(row);});
 document.querySelector('#dialog-link').href=`https://xn----7sbbv2athd0a0j.xn--p1ai/catalogue/artland/${data.url}`;
 dialog.showModal();document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
