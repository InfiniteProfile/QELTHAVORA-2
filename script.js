(() => {
"use strict";
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const structures = [
["01","The Veyrith Field","A relational field in which distinctions can persist without becoming isolated. Its boundary is unknown."],
["02","The Lethic Fold","A region of overlapping causal sequences. Records disagree on whether it is a place or a condition."],
["03","The Orraic Loom","A structure said to bind separate events into patterns that can be observed across distance."],
["04","The Nhal Vectors","Directional relations that do not correspond to physical direction. Their measurements are incomplete."],
["05","The Serev Archive","A layer where traces of events remain accessible, though not necessarily in their original order."],
["06","The Turoth Reach","A proposed order of reality in which observation changes the relation being observed."],
["07","The Unclosed Margin","A hypothetical outer condition beyond which no stable description has survived."]
];
const roles = [
["01","First Deliberant","Coordinates open assemblies and may not declare an interpretation final."],
["02","Keeper of Measures","Maintains the archive's units, date conventions, and disputed calculations."],
["03","Vault Cartographer","Maps relationships among records and marks uncertain connections."],
["04","Witness Examiner","Compares extraordinary testimony without deciding in advance that it is true."],
["05","Interval Reader","Studies gaps, omissions, and conflicting durations in historical accounts."],
["06","Material Conservator","Preserves objects and documents while recording every restoration."],
["07","Question Steward","Ensures unresolved questions remain accessible to future investigators."],
["08","Dissent Recorder","Documents minority interpretations and institutional disagreements."]
];
const principles = [
["The Open Measure","A measurement is useful only when its limits are recorded.","A map that marks an unknown border is more honest than one that invents a boundary."],
["The Distinction Oath","Difference does not prove separation; connection does not prove sameness.","Two witnesses may disagree and still describe related parts of one event."],
["The Repair Record","A repaired thing carries evidence of both its earlier form and its later use.","A restored archive leaf keeps the restoration visible."],
["The Unforced Answer","No conclusion should be made stronger than the evidence that supports it.","A question may remain open without being abandoned."],
["The Shared Interval","An individual's actions alter relations beyond the individual's awareness.","A small choice can change a distant community's options."],
["The Right of Revision","Every interpretation must remain open to correction.","Even a senior custodian can be challenged by a newly found record."]
];
const history = [
["VC 000","The Veyrith Notation","An anonymous mark records the first distinction. Its date is inferred from the sequence of later copies."],
["VC 014","The Sevenfold Unfurling","Early observers classify seven orders of relation, though the list changes between manuscripts."],
["VC 061","The First Listening Chamber","A public room is built to compare observations without requiring agreement."],
["VC 103","The Narrow Vault Testimony","Mareth's account introduces the disputed term Theskarin."],
["VC 129","The Measure Dispute","Three custodians publish incompatible calculations of one interval."],
["VC 177","The Archive Compact","The first shared rules for preserving contradictory accounts are adopted."],
["VC 241","The Silent Catalogue","A catalogue appears with entries for documents that have not yet been found."],
["VC 308","The Split Deliberation","The assembly divides over whether Vael Turoth can be said to possess intention."],
["VC 366","The Unlit Repository","A storage complex is found empty, though its inventory lists hundreds of objects."],
["VC 402","The Revision Accord","The institution formalizes the right to challenge any official interpretation."],
["VC 517","The Missing Interval","A full cycle is absent from several independent records."],
["VC 604","The Present Register","The archive's current period begins; its end date is deliberately left blank."]
];
const docs = [
["QVA-001","The Leaf Before Measure","Unknown / earliest copied period","A fragment describing Oruun-Vey through negation. Three versions disagree on its final sentence."],
["QVA-017","Mareth's Narrow Account","Mareth of the Narrow Vault","A witness statement containing the first surviving description of a Theskarin encounter."],
["QVA-044","The Three Measures","Keeper Ilyen","A comparative record of one interval counted as duration, memory, and observational gap."],
["QVA-092","Inventory of the Unlit Repository","Unknown","A list of objects whose existence cannot be confirmed by the empty repository."],
["QVA-138","The Open Measure Commentary","The Second Deliberation","A philosophical argument that uncertainty is a property of responsible record-keeping."],
["QVA-211","The Margin That Moved","Unattributed","A document whose page references change between copies without any physical alteration."]
];
const namesA=["Arel","Veyra","Othren","Maelis","Ithra","Nereth","Sova","Kareth","Elun","Thalen","Ivara","Ruun"];
const namesB=["Voss","Teyr","Aven","Mora","Seth","Quorin","Vael","Dareth","Orr","Nhal","Etris","Uven"];
const types=["Historical witness","Archive custodian","Philosophical interpreter","Unidentified phenomenon","Lost settlement","Cosmic observation","Historical event","Uncatalogued artifact","Unsolved investigation","Theskarin account"];
const periods=["The Early Notation","The Sevenfold Period","The Chamber Era","The Measure Dispute","The Archive Compact","The Present Register"];
const symbols=["◌","⟡","⌁","◇","⋈","⧖","⌘","∿","⟐","⊹","⌬","◈"];
const subjects=["an interval that appears shorter in every copy","a record that describes an event before its recorded date","a chamber whose acoustics preserve no spoken word","a pattern found in unrelated archive fragments","a settlement absent from every surviving map","a measurement that changes when repeated","a witness whose account contains two incompatible memories","an artifact bearing a mark not used by any known scribe","a catalogue entry with no corresponding document","a boundary that appears only in damaged copies"];
const descriptions=[
"Fragments associated with this record suggest that the event was observed from more than one order of relation. No surviving account establishes which observer came first.",
"The archive preserves this identity through cross-references rather than a complete biography. Later custodians disagree about whether the name refers to an individual or an office.",
"A sequence of measurements appears consistent until the final entry, where the unit changes without explanation. The original measuring instrument has not been recovered.",
"Several unrelated documents point toward this subject, but each uses a different vocabulary. The connection may be historical, symbolic, or an error repeated by later copyists.",
"The record is important less for what it confirms than for the question it leaves open. Its most cited passage is missing from the oldest surviving copy."
];
const cluePhrases=["THE SECOND LINE IS NOT A BORDER","COUNT THE ABSENCE, NOT THE MARKS","THREE MEASURES, ONE INTERVAL","THE WITNESS ARRIVED AFTER THE RECORD","A NAME CAN OUTLIVE ITS SUBJECT"];
function hashString(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function choose(arr,n){return arr[n%arr.length]}
function profileFor(id){
 const h=hashString(id), h2=hashString(id+"qelthavora");
 const name=choose(namesA,h)+ " "+choose(namesB,h>>>5);
 const type=choose(types,h>>>9), subject=choose(subjects,h>>>13);
 const title = type==="Unidentified phenomenon" ? "The "+choose(["Unclosed","Pale","Distant","Unmeasured","Quiet"],h>>>16)+" "+choose(["Interval","Fold","Trace","Resonance","Margin"],h>>>20) : name;
 return {id,name:title,type,period:choose(periods,h>>>17),symbol:choose(symbols,h>>>21),subject,description:choose(descriptions,h2),clue:choose(cluePhrases,h>>>24),related:(BigInt(id)+BigInt((h%17)+1)).toString(),h};
}
const state={nextId:1n,prepared:0n,batchSize:300n,renderedStart:-1,renderedEnd:-1,renderedCols:0,renderedTop:-1,renderedBottom:-1,rowHeight:232,modalReturn:null,loading:false,discovered:new Set(JSON.parse(localStorage.getItem("qelthavora-found")||"[]"))};
function addLore(){
 $("#structureGrid").innerHTML=structures.map(x=>`<article class="structure-item"><div class="num">${x[0]}</div><div><h3>${x[1]}</h3><p>${x[2]}</p></div></article>`).join("");
 $("#roleList").innerHTML=roles.map(x=>`<div class="role-row"><span>${x[0]}</span><b>${x[1]}</b><p>${x[2]}</p></div>`).join("");
 $("#principleGrid").innerHTML=principles.map((x,i)=>`<article><small>PRINCIPLE 0${i+1}</small><h3>${x[0]}</h3><p>${x[1]}</p><p style="margin-top:10px;color:#aaa4ba">EXAMPLE — ${x[2]}</p></article>`).join("");
 $("#historyList").innerHTML=history.map(x=>`<div class="history-row"><span>${x[0]}</span><h3>${x[1]}</h3><p>${x[2]}</p></div>`).join("");
 $("#archiveDocs").innerHTML=docs.map(x=>`<article class="archive-doc"><span>${x[0]} / ${x[2]}</span><h3>${x[1]}</h3><p>${x[3]}</p></article>`).join("");
 renderDiscoveries();
}
function prepareBatch(){
 if(state.loading)return;
 state.loading=true;
 const target=state.prepared+state.batchSize;
 const build=()=>{
   // Reserve the next consecutive ID range in small slices. Profile content is
   // deterministic and materialized only for visible cards, avoiding a growing
   // in-memory array of every record on low-memory devices.
   const remaining=target-state.prepared;
   const slice=remaining>50n?50n:remaining;
   state.prepared+=slice;
   state.nextId=state.prepared+1n;
   if(state.prepared<target){
     if("requestIdleCallback" in window) requestIdleCallback(build,{timeout:100});
     else setTimeout(build,0);
   }else{
     state.loading=false;
     $("#recordCount").textContent=state.prepared.toString();
     $("#feedStatus").textContent=state.prepared.toString()+" RECORDS PREPARED";
     state.renderedStart=-1;
     renderFeed(true);
     // If the visitor has already crossed the next threshold, immediately prepare again.
     maybePrepare();
   }
 };
 if("requestIdleCallback" in window) requestIdleCallback(build,{timeout:100});
 else setTimeout(build,0);
}
function cardHTML(p){return `<article class="profile-card" data-id="${p.id}" tabindex="0" role="button" aria-label="Open ${escapeHTML(p.name)}"><div class="profile-card-top"><span>${escapeHTML(p.type.toUpperCase())}</span><span>${escapeHTML(p.symbol)} &nbsp; ${escapeHTML(p.period)}</span></div><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)} Subject: ${escapeHTML(p.subject)}.</p><div class="profile-card-foot"><span>RECORD / ${escapeHTML(p.id)}</span><b>EXAMINE ↗</b></div></article>`}
function feedColumns(){return window.matchMedia("(max-width:760px)").matches?1:2}
function renderFeed(force=false){
 const feed=$("#profileFeed");
 if(!feed || state.prepared===0n)return;
 const cols=feedColumns();
 const feedTop=feed.getBoundingClientRect().top+window.scrollY;
 const local=Math.max(0,window.scrollY-feedTop);
 const visibleRow=Math.floor(local/state.rowHeight);
 const startRow=Math.max(0,visibleRow-4);
 const visibleRows=22;
 const totalProfiles=Number(state.prepared);
 const totalRows=Math.ceil(totalProfiles/cols);
 const endRow=Math.min(totalRows,startRow+visibleRows);
 const start=startRow*cols;
 const end=Math.min(totalProfiles,endRow*cols);
 const top=startRow*state.rowHeight;
 const bottom=Math.max(0,(totalRows-endRow)*state.rowHeight);
 if(!force && cols===state.renderedCols && start===state.renderedStart && end===state.renderedEnd && top===state.renderedTop && bottom===state.renderedBottom)return;
 let cards="";
 for(let i=start;i<end;i++)cards+=cardHTML(profileFor(String(i+1)));
 // Spacer geometry exactly matches fixed-height rows. Replacing the window therefore
 // does not change the feed's total height or move the visitor's scroll position.
 feed.innerHTML=`<div class="feed-spacer" style="height:${top}px" aria-hidden="true"></div>${cards}<div class="feed-spacer" style="height:${bottom}px" aria-hidden="true"></div>`;
 state.renderedStart=start;state.renderedEnd=end;state.renderedCols=cols;state.renderedTop=top;state.renderedBottom=bottom;
}
let renderQueued=false;
function scheduleRender(){
 if(renderQueued)return;
 renderQueued=true;
 requestAnimationFrame(()=>{renderQueued=false;renderFeed();maybePrepare()});
}
function maybePrepare(){
 if(state.loading || state.prepared===0n)return;
 const feed=$("#profileFeed");
 const feedTop=feed.getBoundingClientRect().top+window.scrollY;
 const cols=feedColumns();
 const row=Math.max(0,Math.floor((window.scrollY-feedTop)/state.rowHeight));
 const approximateProfile=BigInt(row*cols);
 // Start a full 300-record batch when the visitor reaches 100 records
 // before the end of the currently prepared sequence.
 if(approximateProfile>=state.prepared-200n)prepareBatch();
}
function openProfile(id,restore=true){
 const p=profileFor(id);state.modalReturn=restore?window.scrollY:null;
 $("#modalType").textContent=p.type.toUpperCase()+" / "+p.period.toUpperCase();
 $("#modalTitle").textContent=p.name;$("#modalId").textContent="PROFILE IDENTIFIER / "+p.id;
 $("#modalSymbol").textContent=p.symbol;$("#modalDescription").textContent=p.description+" The record concerns "+p.subject+". Its relation to record "+p.related+" remains open to comparison.";
 $("#modalDetails").innerHTML=`<div class="modal-detail"><small>HISTORICAL PERIOD</small><p>${escapeHTML(p.period)}</p></div><div class="modal-detail"><small>CLASSIFICATION</small><p>${escapeHTML(p.type)}</p></div><div class="modal-detail"><small>RELATED RECORD</small><p>${escapeHTML(p.related)}</p></div><div class="modal-detail"><small>ARCHIVE NOTE</small><p>Identity and cross-references are deterministic. This record will remain stable across visits.</p></div>`;
 $("#modalClue").textContent="FRAGMENT / "+p.clue;
 $("#profileModal").hidden=false;document.body.style.overflow="hidden";
}
function closeModal(){if($("#profileModal").hidden)return;$("#profileModal").hidden=true;document.body.style.overflow="";if(state.modalReturn!==null)window.scrollTo({top:state.modalReturn,behavior:"instant"});state.modalReturn=null}
function canonicalId(raw){const s=String(raw).trim();if(!/^[0-9]+$/.test(s))return null;const c=s.replace(/^0+(?=\d)/,"");return c==="0"?null:c}
function search(q){
 const query=q.trim();const results=$("#searchResults");results.innerHTML="";
 if(!query)return;
 const id=canonicalId(query);
 if(id){const p=profileFor(id);results.innerHTML=`<div class="search-result" data-id="${id}"><span>${escapeHTML(p.name)} — ${escapeHTML(p.type)}</span><b>OPEN ↗</b></div>`;return}
 const firstProfiles=[];for(let i=1n;i<=300n;i++)firstProfiles.push(profileFor(i.toString()));
 const corpus=[...firstProfiles,...history.map((x,i)=>({id:"H-"+i,name:x[1],type:"Historical event",subject:x[2],period:x[0]})),...docs.map(x=>({id:x[0],name:x[1],type:"Archive document",subject:x[3]}))];
 const hits=corpus.filter(p=>(p.name+" "+p.type+" "+(p.subject||"")).toLowerCase().includes(query.toLowerCase())).slice(0,12);
 results.innerHTML=hits.length?hits.map(p=>`<div class="search-result" data-id="${escapeHTML(p.id)}"><span>${escapeHTML(p.name)} <small>— ${escapeHTML(p.type)}</small></span><b>OPEN ↗</b></div>`).join(""):"No matching indexed record. Try an exact profile ID or a broader term.";
}
function renderDiscoveries(){
 const labels=["The open line","The second measure","The uncounted interval","The witness sequence","The unresolved margin"];
 const n=state.discovered.size;$("#discoveryCount").textContent=n+" / 5";$("#progressBar").style.width=(n/5*100)+"%";
 $("#fragmentList").innerHTML=labels.map((x,i)=>`<div class="fragment ${state.discovered.has(i)?"found":""}">${state.discovered.has(i)?"◆":"◇"} &nbsp; ${x}</div>`).join("");
}
function discover(i){state.discovered.add(i);localStorage.setItem("qelthavora-found",JSON.stringify([...state.discovered]));renderDiscoveries()}
function setup(){
 addLore();prepareBatch();
 $("#searchToggle").addEventListener("click",()=>{$("#searchPanel").classList.toggle("open");if($("#searchPanel").classList.contains("open"))$("#searchInput").focus()});
 $("#searchForm").addEventListener("submit",e=>{e.preventDefault();search($("#searchInput").value)});
 $("#searchInput").addEventListener("input",e=>search(e.target.value));
 $("#searchResults").addEventListener("click",e=>{const row=e.target.closest("[data-id]");if(!row)return;const id=row.dataset.id;if(/^\d+$/.test(id)){openProfile(id);$("#searchPanel").classList.remove("open")}else{const found=docs.find(x=>x[0]===id)||history.find((x,i)=>"H-"+i===id);if(found)alert(found[1]+"\n\n"+(found[3]||found[2]))}});
 $("#menuToggle").addEventListener("click",()=>{const open=$("#sidebar").classList.toggle("open");let shade=$(".mobile-shade");if(!shade){shade=document.createElement("div");shade.className="mobile-shade";document.body.append(shade);shade.addEventListener("click",()=>{$("#sidebar").classList.remove("open");shade.classList.remove("open")})}shade.classList.toggle("open",open)});
 $$(".nav-link").forEach(a=>a.addEventListener("click",()=>{$$(".nav-link").forEach(x=>x.classList.remove("active"));a.classList.add("active");$("#sidebar").classList.remove("open");$(".mobile-shade")?.classList.remove("open")}));
 $("#profileFeed").addEventListener("click",e=>{const card=e.target.closest("[data-id]");if(card)openProfile(card.dataset.id)});
 $("#profileFeed").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.matches("[data-id]")){e.preventDefault();openProfile(e.target.dataset.id)}});
 $("#modalClose").addEventListener("click",closeModal);$("#profileModal").addEventListener("click",e=>{if(e.target===$("#profileModal"))closeModal()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
 $("#randomProfile").addEventListener("click",()=>{const limit=state.prepared>0n?state.prepared:300n;const sample=BigInt(Math.floor(Math.random()*1_000_000_000));const n=(sample%limit)+1n;openProfile(n.toString(),false)});
 $("#revealHint").addEventListener("click",()=>{$("#hintText").hidden=!$("#hintText").hidden;discover(0)});
 $("#answerForm").addEventListener("submit",e=>{e.preventDefault();const v=$("#answerInput").value.toLowerCase().replace(/[.,!?]/g," ").replace(/\s+/g," ").trim();if(v==="three measures one interval"||v==="three measures, one interval"){[1,2,3,4].forEach(discover);$("#answerFeedback").textContent="Interpretation accepted. The records remain contradictory, but their measurements now have a shared frame."}else{$("#answerFeedback").textContent="The archive cannot establish that interpretation. Compare what each record measures."}});
 window.addEventListener("scroll",scheduleRender,{passive:true});
 window.addEventListener("resize",()=>{state.renderedStart=-1;renderFeed(true);maybePrepare()});
 // Keep navigation active in view without changing scroll position.
 const sections=$$("main section[id]");const navObserver=new IntersectionObserver(entries=>{entries.forEach(en=>{if(en.isIntersecting){$$(".nav-link").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+en.target.id))}})},{rootMargin:"-25% 0px -65% 0px"});sections.forEach(s=>navObserver.observe(s));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup);else setup();
})();