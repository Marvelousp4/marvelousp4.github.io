// Classic black-and-white, one-page research/engineering resume.
// Rebuild with: node scripts/build_resume.mjs
import fs from "node:fs";

function buildResumePdf(){
 const W=612,H=792,L=42,R=570;
 let y=751,minY=y;
 const cmds=[],urls=[];
 function esc(s){return String(s).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");}
 const letterWidths={
  " ":.25,"i":.28,"l":.28,"I":.33,"j":.3,"f":.34,"r":.33,"t":.33,
  "m":.78,"w":.72,"M":.88,"W":.94,"@":.92,"#":.50,".":.25,",":.25,
  ":":.28,";":.28,"!":.33,"'":.18,"(": .33,")":.33,"[":.33,"]":.33,
  "-":.34,"/":.28,"&":.78,"1":.50,"?":.50
 };
 function width(s,size,bold=false){
  let n=0;for(const ch of String(s)){n+=(letterWidths[ch]!==undefined?letterWidths[ch]:/[A-Z]/.test(ch)?.67:/[0-9]/.test(ch)?.50:.46);}
  return n*size*(bold?1.025:1);
 }
 function put(x,Y,str,size=9,bold=false,italic=false){
  const font=italic?3:(bold?2:1);
  cmds.push(`0 0 0 rg BT /F${font} ${size.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${Y.toFixed(2)} Tm (${esc(str)}) Tj ET`);
  minY=Math.min(minY,Y);
 }
 function wrap(s,maxW,size,bold=false){
  let out=[],line="";
  for(const w of s.split(/\s+/)){const next=line?line+" "+w:w;if(line&&width(next,size,bold)>maxW){out.push(line);line=w;}else{line=next;}}
  if(line)out.push(line);
  return out;
 }
 function lines(s,{x=L,w=R-L,size=9.1,step=11.55,bold=false,italic=false,offset=0}={}){
  const a=wrap(s,w-offset,size,bold);
  for(const v of a){put(x+offset,y,v,size,bold,italic);y-=step;}
  return a.length;
 }
 function rule(Y){cmds.push(`0.16 0.16 0.16 RG 0.55 w ${L} ${Y.toFixed(2)} m ${R} ${Y.toFixed(2)} l S`);}
 function title(t){y-=11;put(L,y,t.toUpperCase(),10.2,true);y-=4;rule(y);y-=17.0;}
 function head(label,date,extra){
  put(L,y,label,10.0,true);
  put(R-width(date,8.7),y,date,8.7);
  y-=12.4;
  if(extra){put(L+1,y,extra,8.65,false,true);y-=14.0;}else y-=1.5;
 }
 function bullet(s){put(L+7,y,"-",9.2);lines(s,{x:L,w:R-L-21,offset:21,size:9.0,step:11.25});y-=5.3;}
 function project(name,text,link,url){
  put(L+2,y,name,9.25,true);
  if(link){const lx=L+10+width(name,9.25,true);put(lx,y,link,8.65,false);urls.push({rect:[lx,y-2,lx+width(link,8.65)+3,y+9],url});}
  y-=12.0;lines(text,{x:L+2,w:R-L-5,size:8.9,step:11.2});y-=3.4;
 }
 function contact(label,url,x,Y){
  put(x,Y,label,8.8);
  urls.push({rect:[x,Y-2,x+width(label,8.8)+3,Y+9],url});
  return width(label,8.8);
 }

 const name="LINHAO BAI";put((W-width(name,22.6,true))/2,y,name,22.6,true);y-=26;
 const subtitle="Robotics Software | Robot Learning | Sim-to-Real | Research Engineering";
 put((W-width(subtitle,9.25))/2,y,subtitle,9.25);y-=17;
 function contactRow(items,Y,sz=8.55){
  let total=0;for(let k=0;k<items.length;k++)total+=width(items[k][0],sz)+(k<items.length-1?15:0);
  let x=(W-total)/2;
  for(let k=0;k<items.length;k++){put(x,Y,items[k][0],sz);urls.push({rect:[x,Y-2,x+width(items[k][0],sz)+2,Y+8],url:items[k][1]});x+=width(items[k][0],sz);if(k<items.length-1){x+=5;put(x,Y,"|",8);x+=10;}}
 }
 contactRow([["(470) 603-0437","tel:+14706030437"],["Superbp4@gmail.com","mailto:Superbp4@gmail.com"],["marvelousp4.github.io","https://marvelousp4.github.io/"]],y);y-=12;
 contactRow([["GitHub","https://github.com/Marvelousp4"],["Scholar","https://scholar.google.com/citations?user=MAtZMRIAAAAJ"],["LinkedIn","https://www.linkedin.com/in/linhaobai/"]],y);y-=10;
 title("Experience");
 head("Tesla - Robotics Integrations Engineer","Sep 2026 - Present","Austin, TX");
 bullet("Integrate production AMR and ASRS software across fleet orchestration, task sequencing, localization, robot runtime / firmware, and PLC / OPC UA interfaces to factory equipment.");
 bullet("Develop and debug multi-robot resource constraints, recovery workflows, and station handoffs; validate physical execution with robot telemetry, Python tooling, and distributed-service logs.");
 y-=1.8;
 head("Georgia Institute of Technology - STAR Lab","Oct 2024 - May 2026","Graduate Research Assistant, Robot Learning  |  Atlanta, GA");
 bullet("Built a ROS learned-policy-to-hardware interface for a Kinova arm and PSYONIC / Allegro dexterous hands, integrating SDKs, joint feedback, nonblocking velocity commands, synchronization, timeouts, and logging.");
 bullet("Modified and evaluated TD-MPC / TD-MPC2 world-model dynamics; compared MLP, linear, and SINDy-regularized variants using prediction error and planning returns to investigate dynamics-planner mismatch.");
 bullet("Extended Diffusion Policy training and evaluation for DexArt: object-flow datasets, custom training workspace, checkpoint loading, and offline action-error evaluation.");
 bullet("Used MuJoCo, NVIDIA Isaac Sim / Isaac Gym for robot-learning baselines and sim-to-real experiments; contributed to Video2Sim2Real perception, residual RL, and real-robot execution.");
 y-=1.8;
 head("SEER Robotics - Software Engineer / Project Manager","Jun 2022 - Jul 2024","Shanghai, China");
 bullet("Developed C++ robot-controller services and integration plugins for OTA / backup, time synchronization, health monitoring, and telemetry; debugged firmware, LiDAR, localization, and robot interfaces.");
 bullet("Delivered AMR solutions to 35+ international clients; led a 5-AMR / 100+ rack warehouse system with SLAM + QR correction, reservations, and randomized stress tests across hundreds of moves.");
 title("Selected Robotics Research");
 project("K-UBM | CoRL 2026 | Equal contribution","Going with the Flow: visual-flow / Koopman latent dynamics for long-horizon dexterous behavior and event-triggered replanning.","[paper]","https://arxiv.org/abs/2602.07413");
 project("Video2Sim2Real | 2026 preprint","Video-to-simulation-to-real dexterous skill acquisition, spanning scene reconstruction, residual RL, and learned-policy execution on physical hardware.","[paper]","https://arxiv.org/abs/2606.08828");
 title("Education");
 put(L+2,y,"Georgia Institute of Technology - M.S. Computer Science, GPA 4.0 / 4.0",9.1,true);
 put(R-width("May 2026",8.4),y,"May 2026",8.4);y-=15.4;
 put(L+2,y,"Chongqing Jiaotong University - B.Eng. Civil Engineering",9.0,true);
 put(R-width("Jun 2022",8.4),y,"Jun 2022",8.4);y-=10.0;
 title("Technical Skills");
 lines("Programming / Systems: Python, C++, Bash, Linux, Git, Docker, Kubernetes, logging / telemetry, debugging",{x:L+2,w:R-L-4,size:8.75,step:10.9});
 lines("Robotics / Hardware: ROS / ROS2, Kinova & hand SDKs, actuator control, sensor feedback, CAN, RS-485, OPC UA, LiDAR, SLAM, calibration",{x:L+2,w:R-L-4,size:8.75,step:10.9});
 lines("Simulation / ML: MuJoCo, NVIDIA Isaac Sim, Isaac Gym, PyTorch, TD-MPC, MPPI, SINDy, Koopman, Diffusion Policy, imitation / reinforcement learning, sim-to-real",{x:L+2,w:R-L-4,size:8.75,step:10.9});
 const stream=cmds.join("\n")+"\n";
 const obj=[null,"<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>",null,`<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
 "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>",
 "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>",
 "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>"];
 const annot=[];for(const l of urls){let id=obj.length;annot.push(id+" 0 R");obj.push(`<< /Type /Annot /Subtype /Link /Rect [${l.rect.map(z=>z.toFixed(2)).join(" ")}] /Border [0 0 0] /A << /S /URI /URI (${esc(l.url)}) >> >>`);}
 obj[3]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R /Annots [${annot.join(" ")}] >>`;
 let pdf="%PDF-1.4\n";const offsets=[0];
 for(let i=1;i<obj.length;i++){offsets.push(pdf.length);pdf+=`${i} 0 obj\n${obj[i]}\nendobj\n`;}
 const xr=pdf.length;pdf+=`xref\n0 ${obj.length}\n0000000000 65535 f \n`;
 for(let i=1;i<obj.length;i++)pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";
 pdf+=`trailer\n<< /Size ${obj.length} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF\n`;
 if(/[^\x00-\x7f]/.test(pdf))throw Error("Non-ascii PDF");
 return {pdf,minY,linkCount:urls.length,bytes:pdf.length};
}
const {pdf,minY}=buildResumePdf();
if(minY<38) throw new Error("Content extends beyond the bottom margin");
fs.writeFileSync(new URL("../resume.pdf",import.meta.url),pdf,{encoding:"ascii"});
console.log("Wrote resume.pdf (one page)");
