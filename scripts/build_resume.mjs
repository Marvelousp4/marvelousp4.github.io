// This source regenerates the single-page PDF at ../resume.pdf with Node.js.
// Run: node scripts/build_resume.mjs
import fs from "node:fs";

function buildResumePdf() {
 const W=612,H=792,L=49,R=563;
 let y=749, minY=749;
 const commands=[],links=[];
 const rgb={ink:"0.12 0.16 0.22",muted:"0.35 0.39 0.45",blue:"0.13 0.34 0.57",rule:"0.77 0.81 0.86"};
 function esc(s){return s.replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)");}
 function estimate(s,size,bold=false){let units=0;for(let i=0;i<s.length;i++){let c=s[i];units+=(c===" "?.275:"il.,:;!|'".includes(c)?.245:"mwMW@#%".includes(c)?.81:"ABCDEFGHJKLMNOPQRSTUVWXYZ".includes(c)?.66:"abcdefghjknopqrstuvwxyz".includes(c)?.51:"0123456789".includes(c)?.55:.52);}return units*size*(bold?1.04:1);}
 function textAt(x,Y,s,size=9,bold=false,color="ink"){commands.push(`${rgb[color]} rg BT /F${bold?2:1} ${size.toFixed(2)} Tf 1 0 0 1 ${x.toFixed(2)} ${Y.toFixed(2)} Tm (${esc(s)}) Tj ET`);minY=Math.min(minY,Y);}
 function underline(Y){commands.push(`${rgb.rule} RG .6 w ${L} ${Y} m ${R} ${Y} l S`);}
 function wrap(s,maxW,size=8.85,bold=false){const words=s.split(/\s+/);let out=[],line="";for(const w of words){const next=line?line+" "+w:w;if(line&&estimate(next,size,bold)>maxW){out.push(line);line=w;}else line=next;}if(line)out.push(line);return out;}
 function paragraph(s,indent=0,opt={}){const size=opt.size||8.8,lead=opt.lead||11.35;const ls=wrap(s,R-L-indent,size,opt.bold||false);for(const line of ls){textAt(L+indent,y,line,size,opt.bold||false,opt.color||"ink");y-=lead;}return ls.length;}
 function bul(s){textAt(L+3,y,"-",8.8,true,"blue");paragraph(s,13,{size:8.8,lead:11.3});y-=2.1;}
 function heading(label){y-=9;textAt(L,y,label.toUpperCase(),9.5,true,"blue");commands.push(`${rgb.rule} RG .55 w ${L+estimate(label.toUpperCase(),9.5,true)+14} ${(y+3).toFixed(2)} m ${R} ${(y+3).toFixed(2)} l S`);y-=17.5;}
 function company(name,date,subtitle){textAt(L,y,name,10.15,true);textAt(R-estimate(date,8.5,false),y+0.25,date,8.5,false,"muted");y-=12.1;if(subtitle){textAt(L,y,subtitle,8.25,false,"muted");y-=13.4;}else{y-=3.0;}}
 function namedLine(name,details){textAt(L,y,name,9.1,true);y-=11.6;paragraph(details,0,{size:8.6,lead:10.8});y-=3;}
 function link(x,Y,label,url,size=8.3){textAt(x,Y,label,size,false,"blue");let width=estimate(label,size);links.push({rect:[x,Y-1.5,x+width+2,Y+size+1.5],url});return width;}
 function separator(x,Y){textAt(x,Y,"|",8.2,false,"muted");return 11;}
 textAt(L,y,"Linhao Bai",23.5,true);y-=24;
 textAt(L,y,"Robotics Systems  |  Robot Learning  |  Distributed Robotics  |  AI",9.4,false,"muted");y-=18;
 let x=L;const yy=y;
 x+=link(x,yy,"Superbp4@gmail.com","mailto:Superbp4@gmail.com",8.15)+11;x+=separator(x,yy);
 x+=link(x,yy,"GitHub","https://github.com/Marvelousp4",8.15)+11;x+=separator(x,yy);
 x+=link(x,yy,"Website","https://marvelousp4.github.io/",8.15)+11;x+=separator(x,yy);
 x+=link(x,yy,"LinkedIn","https://www.linkedin.com/in/linhaobai/",8.15)+11;x+=separator(x,yy);
 link(x,yy,"Scholar","https://scholar.google.com/citations?user=MAtZMRIAAAAJ",8.15);
 y-=13;underline(y);y-=4;
 heading("Experience");
 company("Tesla  |  Robotics Integrations Engineer","Sep 2026 - Present","Austin, TX  |  Mobile Robotics / Overmind");
 bul("Work on production AMR, AGV, and ASRS systems, spanning multi-robot fleet orchestration, job/task sequencing, traffic coordination, and robot-to-factory workflows.");
 bul("Analyze system behavior across distributed services, Kubernetes, NATS messaging, telemetry, robot runtime, localization, and PLC / OPC UA interfaces, connecting software state to physical operations.");
 bul("Work with simulation and virtual commissioning to validate robotic tasks, workflow transitions, industrial equipment interfaces, and factory automation scenarios.");
 bul("Design AI-agent-assisted diagnostic workflows connecting incident evidence, logs, system configuration, and code context to make robotics troubleshooting more repeatable.");
 y-=3;
 company("Georgia Tech  |  Graduate Research Assistant, STAR Lab","Oct 2024 - May 2026","Atlanta, GA");
 bul("Researched dexterous robot learning, visuomotor dynamics, policy learning, and sim-to-real transfer; co-authored K-UBM (CoRL 2026) and Video2Sim2Real.");
 bul("Built ROS-based real-time learned-policy execution on a Kinova arm and dexterous hands, including joint command streaming, synchronized control, and state feedback.");
 y-=2;
 company("SEER Robotics  |  Software Engineer / Project Manager","Jun 2022 - Jul 2024","Shanghai, China");
 bul("Developed C++ robot-controller utilities for OTA / backup, time synchronization, health monitoring, telemetry, and hardware / software interfaces.");
 bul("Worked on international AMR systems and a five-robot, 100+ rack warehouse system involving fleet scheduling, reservations, queueing, SLAM / QR correction, and randomized robot tests.");
 heading("Research & Publications");
 namedLine("K-UBM  |  CoRL 2026  |  Equal contribution","Going with the Flow: Koopman Behavioral Models as Pseudo Planners for Visuo-Motor Dexterity.");
 namedLine("Video2Sim2Real  |  Preprint 2026","Full-Stack Autonomous Dexterous Skill Acquisition from a Single Human Video.");
 namedLine("IEEE Signal Processing Letters  |  2026","A 1/R Law for Kurtosis Contrast in Balanced Mixtures.");
 heading("Selected Projects");
 namedLine("Multi-Robot Planning & Scheduling Simulation","Reproduced multi-agent pathfinding and coordination methods in simulation, examining path conflicts, robot interactions, and scheduling behavior.");
 namedLine("SO-101 & MicroDuck  |  Robot Learning Reproductions","Reproduced open-source manipulation and locomotion-learning methods, exploring imitation learning, reinforcement learning, policy training, and evaluation.");
 heading("Education");
 const ga="Georgia Institute of Technology  |  M.S. Computer Science, GPA 4.0 / 4.0  |  2026";
 textAt(L,y,ga,8.8);y-=13;
 textAt(L,y,"Chongqing Jiaotong University  |  B.Eng. Water Resources Engineering  |  2022",8.8);y-=12;
 heading("Skills");
 paragraph("Python, C++, PyTorch, ROS / ROS2, MuJoCo, Linux, Docker, Kubernetes, Git, NATS, OPC UA, SLAM, multi-agent planning, imitation learning, reinforcement learning, Koopman dynamics, sim-to-real.",0,{size:8.35,lead:10.7});
 const stream=commands.join("\n")+"\n";
 const obj=[null,"<< /Type /Catalog /Pages 2 0 R >>","<< /Type /Pages /Kids [3 0 R] /Count 1 >>",null,`<< /Length ${stream.length} >>\nstream\n${stream}endstream`,"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>","<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"];
 const annotations=[];for(const l of links){const id=obj.length;annotations.push(id+" 0 R");obj.push(`<< /Type /Annot /Subtype /Link /Rect [${l.rect.map(z=>z.toFixed(2)).join(" ")}] /Border [0 0 0] /A << /S /URI /URI (${esc(l.url)}) >> >>`);}
 obj[3]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R /Annots [${annotations.join(" ")}] >>`;
 let pdf="%PDF-1.4\n";const offsets=[0];for(let i=1;i<obj.length;i++){offsets.push(pdf.length);pdf+=`${i} 0 obj\n${obj[i]}\nendobj\n`;}
 const xr=pdf.length;pdf+=`xref\n0 ${obj.length}\n0000000000 65535 f \n`;for(let i=1;i<obj.length;i++){pdf+=String(offsets[i]).padStart(10,"0")+" 00000 n \n";}
 pdf+=`trailer\n<< /Size ${obj.length} /Root 1 0 R >>\nstartxref\n${xr}\n%%EOF\n`;
 if(/[^\x00-\x7f]/.test(pdf))throw Error("Non-ASCII byte in PDF source");
 return {pdf,minY,linkCount:links.length,bytes:pdf.length};
}
const {pdf,minY}=buildResumePdf();
if (minY<45) throw new Error("Resume overflows the page");
fs.writeFileSync(new URL("../resume.pdf",import.meta.url),pdf,{encoding:"ascii"});
console.log("Wrote resume.pdf (1 page)");
