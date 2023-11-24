import{d as V,m as z,r as s,o as a,b as i,w as l,f as _,a as g,t as y,n as D,s as w,u as F,p as L,c as S,e as c,j as k,l as P,F as C,q as j}from"./index-7900ba31.js";import{a as x,u as A,_ as q}from"./VideoPlayer.vue_vue_type_style_index_0_lang-6edb2c57.js";const M=["title"],T=V({__name:"ArchiveCard",props:{archiveItem:{}},setup(u){const t=u,n=z(()=>new Date(t.archiveItem.created).toLocaleString());return(m,d)=>{const h=s("n-space"),p=s("n-card");return a(),i(p,{hoverable:"",style:{cursor:"pointer"}},{default:l(()=>[_(h,{vertical:"","wrap-item":!1},{default:l(()=>[g("p",{class:"archive-card__name",title:t.archiveItem.name},"Файл: "+y(t.archiveItem.name),9,M),g("small",null,"Дата: "+y(n.value),1)]),_:1})]),_:1})}}});const I=D("archive",{state:()=>({fetchStatus:"init",archive:[]}),actions:{async getArchive(){var u;try{const t=await x.get("https://89.232.165.248.sslip.io/api/v1/ml/list");if(t)return this.archive=t.data,this.archive}catch(t){if(this.fetchStatus="error",x.isAxiosError(t))return console.log(t),{status:this.fetchStatus,code:(u=t.response)==null?void 0:u.status}}finally{this.fetchStatus="init"}}}}),J=V({__name:"ArchivePage",setup(u){const{videoId:t,videoPath:n}=w(A()),{checkVideoStatus:m}=A(),{archive:d,fetchStatus:h}=w(I()),{getArchive:p}=I(),f=F(),B=async()=>{const o=await p();(o==null?void 0:o.status)==="error"&&f.error({content:"Не удалось загрузить архив",duration:3e3})},N=async o=>{const e=await m(o,!0);console.log(e,"RES"),(e==null?void 0:e.status)==="error"&&f.warning({content:"Видео еще не обработано",duration:3e3})};return L(()=>{B()}),(o,e)=>{const v=s("n-spin"),$=s("n-gi"),E=s("n-grid"),R=s("n-result"),b=s("n-modal");return a(),S(C,null,[c(h)==="loading"?(a(),i(v,{key:0,size:"large",style:{width:"100%"}})):k("",!0),c(d).length>0?(a(),i(E,{key:1,cols:"2 800:3","x-gap":"16","y-gap":"16"},{default:l(()=>[(a(!0),S(C,null,j(c(d),r=>(a(),i($,{key:r.id},{default:l(()=>[_(T,{archiveItem:r,onClick:U=>N(r.id)},null,8,["archiveItem","onClick"])]),_:2},1024))),128))]),_:1})):k("",!0),_(b,{show:c(n),"onUpdate:show":e[0]||(e[0]=r=>P(n)?n.value=r:null),preset:"card",style:{width:"fit-content","min-width":"50vw"},onClose:e[1]||(e[1]=r=>n.value=null)},{default:l(()=>[c(n)?(a(),i(q,{key:0,path:c(n)},null,8,["path"])):(a(),i(R,{key:1,status:"info",title:"Подождите, видео обрабатывается"},{footer:l(()=>[_(v,{size:"large"})]),_:1}))]),_:1},8,["show"])],64)}}});export{J as default};
