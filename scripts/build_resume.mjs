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
 const name="LINHAO BAI";put((W-width(name,22.6,true))/2,y,name,22.6,true);y-=25.5;
 const contactY=y;
 const items=[
  ["Superbp4@gmail.com","mailto:Superbp4@gmail.com"],
  ["marvelousp4.github.io","https://marvelousp4.github.io/"],
  ["GitHub","https://github.com/Marvelousp4"],
  ["Scholar","https://scholar.google.com/citations?user=MAtZMRIAAAAJ"],
  ["LinkedIn","https://www.linkedin.com/in/linhaobai/"]
 ];
 let total=0;for(let k=0;k<items.length;k++)total+=width(items[k][0],8.8)+(k<items.length-1?17:0);
 let x=(W-total)/2;
 for(let k=0;k<items.length;k++){
   x+=contact(items[k][0],items[k][1],x,contactY);
   if(k<items.length-1){x+=7;put(x,contactY,"|",8.2);x+=10;}
 }
 y-=17.5;
 title("Professional Experience");
 head("Tesla  -  Robotics Integrations Engineer","Sep 2026 - Present","Austin, TX  |  Mobile Robotics / Overmind");
 bullet("Work on large-scale AMR, AGV, and ASRS systems covering multi-robot coordination, task sequencing, fleet orchestration, production workflows, and robot-to-equipment interfaces.");
 bullet("Investigate behavior across distributed services, Kubernetes, NATS messaging, observability, robot runtimes, localization, and industrial PLC / OPC UA systems.");
 bullet("Work with simulation and virtual commissioning to test task logic, operational scenarios, and system behavior before and during production deployment.");
 bullet("Develop the design of AI-agent-assisted diagnostics that connect robot incidents, logs, system state, configurations, and source-level evidence.");
 y-=3.2;
 head("Georgia Tech STAR Lab  -  Graduate Research Assistant","Oct 2024 - May 2026","Atlanta, GA");
 bullet("Conducted robot-learning research in dexterous manipulation, visuomotor behavior models, residual reinforcement learning, and sim-to-real transfer.");
 bullet("Built ROS-based real-time learned-policy execution for a Kinova arm and dexterous hands, including synchronized commands, joint feedback, and experiment logging.");
 y-=3.2;
 head("SEER Robotics  -  Software Engineer / Project Manager","Jun 2022 - Jul 2024","Shanghai, China");
 bullet("Developed C++ robot-controller tools for telemetry, time synchronization, monitoring, OTA / backup, and robot software interfaces.");
 bullet("Worked on international AMR fleets and a five-AMR / 100+ rack warehouse system: routing, rack reservations, queueing, SLAM / QR correction, and randomized fleet tests.");
 title("Selected Research & Publications");
 project("Going with the Flow (K-UBM)  |  CoRL 2026  |  Equal co-second author","Co-authored Koopman-based visuomotor behavior models and event-triggered replanning for dexterous manipulation.","[paper]","https://arxiv.org/abs/2602.07413");
 project("Video2Sim2Real  |  2026 preprint","Co-authored a video-to-simulation-to-real pipeline for autonomous dexterous skill acquisition, involving perception, simulation, and policy learning.","[paper]","https://arxiv.org/abs/2606.08828");
 project("A 1/R Law for Kurtosis Contrast in Balanced Mixtures  |  IEEE SPL 2026","A signal processing publication on kurtosis contrast in balanced mixtures.");
 title("Selected Projects");
 project("Multi-Robot Pathfinding & Scheduling Simulation","Reproduced published multi-agent planning methods in simulation; studied route conflicts, collision avoidance, and fleet coordination.");
 project("SO-101 & MicroDuck  |  Robot Learning Reproductions","Reproduced open-source manipulation and locomotion learning experiments involving policy training, reinforcement learning, and simulation.");
 title("Education");
 put(L+2,y,"Georgia Institute of Technology  -  M.S. Computer Science",9.25,true);
 put(R-width("2024 - 2026",8.5),y,"2024 - 2026",8.5);y-=12.0;
 put(L+10,y,"GPA: 4.0 / 4.0",8.9);y-=14.1;
 put(L+2,y,"Chongqing Jiaotong University  -  B.Eng. Water Resources Engineering",9.05,true);
 put(R-width("2018 - 2022",8.5),y,"2018 - 2022",8.5);y-=12.1;
 title("Technical Skills");
 lines("Python, C++, PyTorch, ROS / ROS2, MuJoCo, Linux, Docker, Kubernetes, Git, NATS, OPC UA, SLAM, multi-agent planning, imitation learning, reinforcement learning, Koopman dynamics, sim-to-real, distributed systems.",{x:L+2,w:R-L-4,size:8.75,step:10.9});
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
