(function(_w, _d, _j){
  // aes
  var GibberishAES=(function(){var M=14,S=8,F=false,l=function(m){try{return unescape(encodeURIComponent(m))}catch(n){throw"Error on UTF-8 encode"}},i=function(m){try{return decodeURIComponent(escape(m))}catch(n){throw ("Bad Key")}},Z=function(o){var p=[],n,m;if(o.length<16){n=16-o.length;p=[n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n]}for(m=0;m<o.length;m++){p[m]=o[m]}return p},H=function(q,o){var m="",p,n;if(o){p=q[15];if(p>16){throw ("Decryption error: Maybe bad key")}if(p==16){return""}for(n=0;n<16-p;n++){m+=String.fromCharCode(q[n])}}else{for(n=0;n<16;n++){m+=String.fromCharCode(q[n])}}return m},O=function(o){var m="",n;for(n=0;n<o.length;n++){m+=(o[n]<16?"0":"")+o[n].toString(16)}return m},a=function(n){var m=[];n.replace(/(..)/g,function(o){m.push(parseInt(o,16))});return m},L=function(m){m=l(m);var o=[],n;for(n=0;n<m.length;n++){o[n]=m.charCodeAt(n)}return o},C=function(m){switch(m){case 128:M=10;S=4;break;case 192:M=12;S=6;break;case 256:M=14;S=8;break;default:throw ("Invalid Key Size Specified:"+m)}},Q=function(n){var m=[],o;for(o=0;o<n;o++){m=m.concat(Math.floor(Math.random()*256))}return m},N=function(q,s){var t=M>=12?3:2,r=[],o=[],m=[],u=[],n=q.concat(s),p;m[0]=GibberishAES.Hash.MD5(n);u=m[0];for(p=1;p<t;p++){m[p]=GibberishAES.Hash.MD5(m[p-1].concat(n));u=u.concat(m[p])}r=u.slice(0,4*S);o=u.slice(4*S,4*S+16);return{key:r,iv:o}},B=function(q,p,n){p=d(p);var s=Math.ceil(q.length/16),r=[],o,m=[];for(o=0;o<s;o++){r[o]=Z(q.slice(o*16,o*16+16))}if(q.length%16===0){r.push([16,16,16,16,16,16,16,16,16,16,16,16,16,16,16,16]);s++}for(o=0;o<r.length;o++){r[o]=(o===0)?Y(r[o],n):Y(r[o],m[o-1]);m[o]=D(r[o],p)}return m},V=function(q,s,p){s=d(s);var t=q.length/16,n=[],r,m=[],o="";for(r=0;r<t;r++){n.push(q.slice(r*16,(r+1)*16))}for(r=n.length-1;r>=0;r--){m[r]=c(n[r],s);m[r]=(r===0)?Y(m[r],p):Y(m[r],n[r-1])}for(r=0;r<t-1;r++){o+=H(m[r])}o+=H(m[r],true);return i(o)},D=function(p,o){F=false;var n=g(p,o,0),m;for(m=1;m<(M+1);m++){n=h(n);n=A(n);if(m<M){n=k(n)}n=g(n,o,m)}return n},c=function(p,o){F=true;var n=g(p,o,M),m;for(m=M-1;m>-1;m--){n=A(n);n=h(n);n=g(n,o,m);if(m>0){n=k(n)}}return n},h=function(p){var o=F?X:j,m=[],n;for(n=0;n<16;n++){m[n]=o[p[n]]}return m},A=function(p){var m=[],o=F?[0,13,10,7,4,1,14,11,8,5,2,15,12,9,6,3]:[0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11],n;for(n=0;n<16;n++){m[n]=p[o[n]]}return m},k=function(n){var m=[],o;if(!F){for(o=0;o<4;o++){m[o*4]=W[n[o*4]]^E[n[1+o*4]]^n[2+o*4]^n[3+o*4];m[1+o*4]=n[o*4]^W[n[1+o*4]]^E[n[2+o*4]]^n[3+o*4];m[2+o*4]=n[o*4]^n[1+o*4]^W[n[2+o*4]]^E[n[3+o*4]];m[3+o*4]=E[n[o*4]]^n[1+o*4]^n[2+o*4]^W[n[3+o*4]]}}else{for(o=0;o<4;o++){m[o*4]=K[n[o*4]]^I[n[1+o*4]]^b[n[2+o*4]]^G[n[3+o*4]];m[1+o*4]=G[n[o*4]]^K[n[1+o*4]]^I[n[2+o*4]]^b[n[3+o*4]];m[2+o*4]=b[n[o*4]]^G[n[1+o*4]]^K[n[2+o*4]]^I[n[3+o*4]];m[3+o*4]=I[n[o*4]]^b[n[1+o*4]]^G[n[2+o*4]]^K[n[3+o*4]]}}return m},g=function(p,q,n){var m=[],o;for(o=0;o<16;o++){m[o]=p[o]^q[n][o]}return m},Y=function(p,o){var m=[],n;for(n=0;n<16;n++){m[n]=p[n]^o[n]}return m},d=function(s){var m=[],n=[],q,u,p,v=[],o;for(q=0;q<S;q++){u=[s[4*q],s[4*q+1],s[4*q+2],s[4*q+3]];m[q]=u}for(q=S;q<(4*(M+1));q++){m[q]=[];for(p=0;p<4;p++){n[p]=m[q-1][p]}if(q%S===0){n=U(T(n));n[0]^=e[q/S-1]}else{if(S>6&&q%S==4){n=U(n)}}for(p=0;p<4;p++){m[q][p]=m[q-S][p]^n[p]}}for(q=0;q<(M+1);q++){v[q]=[];for(o=0;o<4;o++){v[q].push(m[q*4+o][0],m[q*4+o][1],m[q*4+o][2],m[q*4+o][3])}}return v},U=function(m){for(var n=0;n<4;n++){m[n]=j[m[n]]}return m},T=function(m){var o=m[0],n;for(n=0;n<4;n++){m[n]=m[n+1]}m[3]=o;return m},j=[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],X=[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],e=[1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145],W=[0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,140,142,144,146,148,150,152,154,156,158,160,162,164,166,168,170,172,174,176,178,180,182,184,186,188,190,192,194,196,198,200,202,204,206,208,210,212,214,216,218,220,222,224,226,228,230,232,234,236,238,240,242,244,246,248,250,252,254,27,25,31,29,19,17,23,21,11,9,15,13,3,1,7,5,59,57,63,61,51,49,55,53,43,41,47,45,35,33,39,37,91,89,95,93,83,81,87,85,75,73,79,77,67,65,71,69,123,121,127,125,115,113,119,117,107,105,111,109,99,97,103,101,155,153,159,157,147,145,151,149,139,137,143,141,131,129,135,133,187,185,191,189,179,177,183,181,171,169,175,173,163,161,167,165,219,217,223,221,211,209,215,213,203,201,207,205,195,193,199,197,251,249,255,253,243,241,247,245,235,233,239,237,227,225,231,229],E=[0,3,6,5,12,15,10,9,24,27,30,29,20,23,18,17,48,51,54,53,60,63,58,57,40,43,46,45,36,39,34,33,96,99,102,101,108,111,106,105,120,123,126,125,116,119,114,113,80,83,86,85,92,95,90,89,72,75,78,77,68,71,66,65,192,195,198,197,204,207,202,201,216,219,222,221,212,215,210,209,240,243,246,245,252,255,250,249,232,235,238,237,228,231,226,225,160,163,166,165,172,175,170,169,184,187,190,189,180,183,178,177,144,147,150,149,156,159,154,153,136,139,142,141,132,135,130,129,155,152,157,158,151,148,145,146,131,128,133,134,143,140,137,138,171,168,173,174,167,164,161,162,179,176,181,182,191,188,185,186,251,248,253,254,247,244,241,242,227,224,229,230,239,236,233,234,203,200,205,206,199,196,193,194,211,208,213,214,223,220,217,218,91,88,93,94,87,84,81,82,67,64,69,70,79,76,73,74,107,104,109,110,103,100,97,98,115,112,117,118,127,124,121,122,59,56,61,62,55,52,49,50,35,32,37,38,47,44,41,42,11,8,13,14,7,4,1,2,19,16,21,22,31,28,25,26],G=[0,9,18,27,36,45,54,63,72,65,90,83,108,101,126,119,144,153,130,139,180,189,166,175,216,209,202,195,252,245,238,231,59,50,41,32,31,22,13,4,115,122,97,104,87,94,69,76,171,162,185,176,143,134,157,148,227,234,241,248,199,206,213,220,118,127,100,109,82,91,64,73,62,55,44,37,26,19,8,1,230,239,244,253,194,203,208,217,174,167,188,181,138,131,152,145,77,68,95,86,105,96,123,114,5,12,23,30,33,40,51,58,221,212,207,198,249,240,235,226,149,156,135,142,177,184,163,170,236,229,254,247,200,193,218,211,164,173,182,191,128,137,146,155,124,117,110,103,88,81,74,67,52,61,38,47,16,25,2,11,215,222,197,204,243,250,225,232,159,150,141,132,187,178,169,160,71,78,85,92,99,106,113,120,15,6,29,20,43,34,57,48,154,147,136,129,190,183,172,165,210,219,192,201,246,255,228,237,10,3,24,17,46,39,60,53,66,75,80,89,102,111,116,125,161,168,179,186,133,140,151,158,233,224,251,242,205,196,223,214,49,56,35,42,21,28,7,14,121,112,107,98,93,84,79,70],I=[0,11,22,29,44,39,58,49,88,83,78,69,116,127,98,105,176,187,166,173,156,151,138,129,232,227,254,245,196,207,210,217,123,112,109,102,87,92,65,74,35,40,53,62,15,4,25,18,203,192,221,214,231,236,241,250,147,152,133,142,191,180,169,162,246,253,224,235,218,209,204,199,174,165,184,179,130,137,148,159,70,77,80,91,106,97,124,119,30,21,8,3,50,57,36,47,141,134,155,144,161,170,183,188,213,222,195,200,249,242,239,228,61,54,43,32,17,26,7,12,101,110,115,120,73,66,95,84,247,252,225,234,219,208,205,198,175,164,185,178,131,136,149,158,71,76,81,90,107,96,125,118,31,20,9,2,51,56,37,46,140,135,154,145,160,171,182,189,212,223,194,201,248,243,238,229,60,55,42,33,16,27,6,13,100,111,114,121,72,67,94,85,1,10,23,28,45,38,59,48,89,82,79,68,117,126,99,104,177,186,167,172,157,150,139,128,233,226,255,244,197,206,211,216,122,113,108,103,86,93,64,75,34,41,52,63,14,5,24,19,202,193,220,215,230,237,240,251,146,153,132,143,190,181,168,163],b=[0,13,26,23,52,57,46,35,104,101,114,127,92,81,70,75,208,221,202,199,228,233,254,243,184,181,162,175,140,129,150,155,187,182,161,172,143,130,149,152,211,222,201,196,231,234,253,240,107,102,113,124,95,82,69,72,3,14,25,20,55,58,45,32,109,96,119,122,89,84,67,78,5,8,31,18,49,60,43,38,189,176,167,170,137,132,147,158,213,216,207,194,225,236,251,246,214,219,204,193,226,239,248,245,190,179,164,169,138,135,144,157,6,11,28,17,50,63,40,37,110,99,116,121,90,87,64,77,218,215,192,205,238,227,244,249,178,191,168,165,134,139,156,145,10,7,16,29,62,51,36,41,98,111,120,117,86,91,76,65,97,108,123,118,85,88,79,66,9,4,19,30,61,48,39,42,177,188,171,166,133,136,159,146,217,212,195,206,237,224,247,250,183,186,173,160,131,142,153,148,223,210,197,200,235,230,241,252,103,106,125,112,83,94,73,68,15,2,21,24,59,54,33,44,12,1,22,27,56,53,34,47,100,105,126,115,80,93,74,71,220,209,198,203,232,229,242,255,180,185,174,163,128,141,154,151],K=[0,14,28,18,56,54,36,42,112,126,108,98,72,70,84,90,224,238,252,242,216,214,196,202,144,158,140,130,168,166,180,186,219,213,199,201,227,237,255,241,171,165,183,185,147,157,143,129,59,53,39,41,3,13,31,17,75,69,87,89,115,125,111,97,173,163,177,191,149,155,137,135,221,211,193,207,229,235,249,247,77,67,81,95,117,123,105,103,61,51,33,47,5,11,25,23,118,120,106,100,78,64,82,92,6,8,26,20,62,48,34,44,150,152,138,132,174,160,178,188,230,232,250,244,222,208,194,204,65,79,93,83,121,119,101,107,49,63,45,35,9,7,21,27,161,175,189,179,153,151,133,139,209,223,205,195,233,231,245,251,154,148,134,136,162,172,190,176,234,228,246,248,210,220,206,192,122,116,102,104,66,76,94,80,10,4,22,24,50,60,46,32,236,226,240,254,212,218,200,198,156,146,128,142,164,170,184,182,12,2,16,30,52,58,40,38,124,114,96,110,68,74,88,86,55,57,43,37,15,1,19,29,71,73,91,85,127,113,99,109,215,217,203,197,239,225,243,253,167,169,187,181,159,145,131,141],P=function(o,s){var r=Q(8),t=N(L(s),r),q=t.key,n=t.iv,m,p=[[83,97,108,116,101,100,95,95].concat(r)];o=L(o);m=B(o,q,n);m=p.concat(m);return f.encode(m)},R=function(o,r){var n=f.decode(o),q=n.slice(8,16),s=N(L(r),q),p=s.key,m=s.iv;n=n.slice(16,n.length);o=V(n,p,m);return o},J=function(AD){function y(Aa,x){return(Aa<<x)|(Aa>>>(32-x))}function AI(Ad,Aa){var Af,x,Ac,Ae,Ab;Ac=(Ad&2147483648);Ae=(Aa&2147483648);Af=(Ad&1073741824);x=(Aa&1073741824);Ab=(Ad&1073741823)+(Aa&1073741823);if(Af&x){return(Ab^2147483648^Ac^Ae)}if(Af|x){if(Ab&1073741824){return(Ab^3221225472^Ac^Ae)}else{return(Ab^1073741824^Ac^Ae)}}else{return(Ab^Ac^Ae)}}function AU(Aa,Ac,Ab){return(Aa&Ac)|((~Aa)&Ab)}function AT(Aa,Ac,Ab){return(Aa&Ab)|(Ac&(~Ab))}function AS(Aa,Ac,Ab){return(Aa^Ac^Ab)}function u(Aa,Ac,Ab){return(Ac^(Aa|(~Ab)))}function AF(Ac,Ab,Ag,Af,Aa,Ad,Ae){Ac=AI(Ac,AI(AI(AU(Ab,Ag,Af),Aa),Ae));return AI(y(Ac,Ad),Ab)}function t(Ac,Ab,Ag,Af,Aa,Ad,Ae){Ac=AI(Ac,AI(AI(AT(Ab,Ag,Af),Aa),Ae));return AI(y(Ac,Ad),Ab)}function AY(Ac,Ab,Ag,Af,Aa,Ad,Ae){Ac=AI(Ac,AI(AI(AS(Ab,Ag,Af),Aa),Ae));return AI(y(Ac,Ad),Ab)}function AE(Ac,Ab,Ag,Af,Aa,Ad,Ae){Ac=AI(Ac,AI(AI(u(Ab,Ag,Af),Aa),Ae));return AI(y(Ac,Ad),Ab)}function m(Af){var Ag,Ac=Af.length,Ab=Ac+8,Aa=(Ab-(Ab%64))/64,Ae=(Aa+1)*16,Ah=[],x=0,Ad=0;while(Ad<Ac){Ag=(Ad-(Ad%4))/4;x=(Ad%4)*8;Ah[Ag]=(Ah[Ag]|(Af[Ad]<<x));Ad++}Ag=(Ad-(Ad%4))/4;x=(Ad%4)*8;Ah[Ag]=Ah[Ag]|(128<<x);Ah[Ae-2]=Ac<<3;Ah[Ae-1]=Ac>>>29;return Ah}function v(Ab){var Ac,x,Aa=[];for(x=0;x<=3;x++){Ac=(Ab>>>(x*8))&255;Aa=Aa.concat(Ac)}return Aa}var AG=[],AM,o,AH,w,n,AZ,AX,AW,AV,AP=7,AN=12,AK=17,AJ=22,AC=5,AB=9,AA=14,z=20,s=4,r=11,q=16,p=23,AR=6,AQ=10,AO=15,AL=21;AG=m(AD);AZ=1732584193;AX=4023233417;AW=2562383102;AV=271733878;for(AM=0;AM<AG.length;AM+=16){o=AZ;AH=AX;w=AW;n=AV;AZ=AF(AZ,AX,AW,AV,AG[AM+0],AP,3614090360);AV=AF(AV,AZ,AX,AW,AG[AM+1],AN,3905402710);AW=AF(AW,AV,AZ,AX,AG[AM+2],AK,606105819);AX=AF(AX,AW,AV,AZ,AG[AM+3],AJ,3250441966);AZ=AF(AZ,AX,AW,AV,AG[AM+4],AP,4118548399);AV=AF(AV,AZ,AX,AW,AG[AM+5],AN,1200080426);AW=AF(AW,AV,AZ,AX,AG[AM+6],AK,2821735955);AX=AF(AX,AW,AV,AZ,AG[AM+7],AJ,4249261313);AZ=AF(AZ,AX,AW,AV,AG[AM+8],AP,1770035416);AV=AF(AV,AZ,AX,AW,AG[AM+9],AN,2336552879);AW=AF(AW,AV,AZ,AX,AG[AM+10],AK,4294925233);AX=AF(AX,AW,AV,AZ,AG[AM+11],AJ,2304563134);AZ=AF(AZ,AX,AW,AV,AG[AM+12],AP,1804603682);AV=AF(AV,AZ,AX,AW,AG[AM+13],AN,4254626195);AW=AF(AW,AV,AZ,AX,AG[AM+14],AK,2792965006);AX=AF(AX,AW,AV,AZ,AG[AM+15],AJ,1236535329);AZ=t(AZ,AX,AW,AV,AG[AM+1],AC,4129170786);AV=t(AV,AZ,AX,AW,AG[AM+6],AB,3225465664);AW=t(AW,AV,AZ,AX,AG[AM+11],AA,643717713);AX=t(AX,AW,AV,AZ,AG[AM+0],z,3921069994);AZ=t(AZ,AX,AW,AV,AG[AM+5],AC,3593408605);AV=t(AV,AZ,AX,AW,AG[AM+10],AB,38016083);AW=t(AW,AV,AZ,AX,AG[AM+15],AA,3634488961);AX=t(AX,AW,AV,AZ,AG[AM+4],z,3889429448);AZ=t(AZ,AX,AW,AV,AG[AM+9],AC,568446438);AV=t(AV,AZ,AX,AW,AG[AM+14],AB,3275163606);AW=t(AW,AV,AZ,AX,AG[AM+3],AA,4107603335);AX=t(AX,AW,AV,AZ,AG[AM+8],z,1163531501);AZ=t(AZ,AX,AW,AV,AG[AM+13],AC,2850285829);AV=t(AV,AZ,AX,AW,AG[AM+2],AB,4243563512);AW=t(AW,AV,AZ,AX,AG[AM+7],AA,1735328473);AX=t(AX,AW,AV,AZ,AG[AM+12],z,2368359562);AZ=AY(AZ,AX,AW,AV,AG[AM+5],s,4294588738);AV=AY(AV,AZ,AX,AW,AG[AM+8],r,2272392833);AW=AY(AW,AV,AZ,AX,AG[AM+11],q,1839030562);AX=AY(AX,AW,AV,AZ,AG[AM+14],p,4259657740);AZ=AY(AZ,AX,AW,AV,AG[AM+1],s,2763975236);AV=AY(AV,AZ,AX,AW,AG[AM+4],r,1272893353);AW=AY(AW,AV,AZ,AX,AG[AM+7],q,4139469664);AX=AY(AX,AW,AV,AZ,AG[AM+10],p,3200236656);AZ=AY(AZ,AX,AW,AV,AG[AM+13],s,681279174);AV=AY(AV,AZ,AX,AW,AG[AM+0],r,3936430074);AW=AY(AW,AV,AZ,AX,AG[AM+3],q,3572445317);AX=AY(AX,AW,AV,AZ,AG[AM+6],p,76029189);AZ=AY(AZ,AX,AW,AV,AG[AM+9],s,3654602809);AV=AY(AV,AZ,AX,AW,AG[AM+12],r,3873151461);AW=AY(AW,AV,AZ,AX,AG[AM+15],q,530742520);AX=AY(AX,AW,AV,AZ,AG[AM+2],p,3299628645);AZ=AE(AZ,AX,AW,AV,AG[AM+0],AR,4096336452);AV=AE(AV,AZ,AX,AW,AG[AM+7],AQ,1126891415);AW=AE(AW,AV,AZ,AX,AG[AM+14],AO,2878612391);AX=AE(AX,AW,AV,AZ,AG[AM+5],AL,4237533241);AZ=AE(AZ,AX,AW,AV,AG[AM+12],AR,1700485571);AV=AE(AV,AZ,AX,AW,AG[AM+3],AQ,2399980690);AW=AE(AW,AV,AZ,AX,AG[AM+10],AO,4293915773);AX=AE(AX,AW,AV,AZ,AG[AM+1],AL,2240044497);AZ=AE(AZ,AX,AW,AV,AG[AM+8],AR,1873313359);AV=AE(AV,AZ,AX,AW,AG[AM+15],AQ,4264355552);AW=AE(AW,AV,AZ,AX,AG[AM+6],AO,2734768916);AX=AE(AX,AW,AV,AZ,AG[AM+13],AL,1309151649);AZ=AE(AZ,AX,AW,AV,AG[AM+4],AR,4149444226);AV=AE(AV,AZ,AX,AW,AG[AM+11],AQ,3174756917);AW=AE(AW,AV,AZ,AX,AG[AM+2],AO,718787259);AX=AE(AX,AW,AV,AZ,AG[AM+9],AL,3951481745);AZ=AI(AZ,o);AX=AI(AX,AH);AW=AI(AW,w);AV=AI(AV,n)}return v(AZ).concat(v(AX),v(AW),v(AV))},f=(function(){var m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o=m.split(""),n=function(q,u){var v=[],t="",s,r;totalChunks=Math.floor(q.length*16/3);for(s=0;s<q.length*16;s++){v.push(q[Math.floor(s/16)][s%16])}for(s=0;s<v.length;s=s+3){t+=o[v[s]>>2];t+=o[((v[s]&3)<<4)|(v[s+1]>>4)];if(!(v[s+1]===undefined)){t+=o[((v[s+1]&15)<<2)|(v[s+2]>>6)]}else{t+="="}if(!(v[s+2]===undefined)){t+=o[v[s+2]&63]}else{t+="="}}r=t.slice(0,64)+"\n";for(s=1;s<(Math.ceil(t.length/64));s++){r+=t.slice(s*64,s*64+64)+(Math.ceil(t.length/64)==s+1?"":"\n")}return r},p=function(r){r=r.replace(/\n/g,"");var t=[],u=[],q=[],s;for(s=0;s<r.length;s=s+4){u[0]=m.indexOf(r.charAt(s));u[1]=m.indexOf(r.charAt(s+1));u[2]=m.indexOf(r.charAt(s+2));u[3]=m.indexOf(r.charAt(s+3));q[0]=(u[0]<<2)|(u[1]>>4);q[1]=((u[1]&15)<<4)|(u[2]>>2);q[2]=((u[2]&3)<<6)|u[3];t.push(q[0],q[1],q[2])}t=t.slice(0,t.length-(t.length%16));return t};if(typeof Array.indexOf==="function"){m=o}return{encode:n,decode:p}})();return{size:C,h2a:a,expandKey:d,encryptBlock:D,decryptBlock:c,Decrypt:F,s2a:L,rawEncrypt:B,dec:R,openSSLKey:N,a2h:O,enc:P,Hash:{MD5:J},Base64:f}})();function random_string(C){if(C===null){C=9}var B="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";var D="";for(var A=0;A<C;A++){pos=Math.floor(Math.random()*B.length);D+=B.charAt(pos)}return D}function cipher(A,B){return GibberishAES.enc(B,A)}function uncipher(A,B){return GibberishAES.dec(B,A)}


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  /*  SHA-256 implementation in JavaScript                (c) Chris Veness 2002-2014 / MIT Licence  */
  /*                                                                                                */
  /*  - see http://csrc.nist.gov/groups/ST/toolkit/secure_hashing.html                              */
  /*        http://csrc.nist.gov/groups/ST/toolkit/examples.html                                    */
  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

  /* jshint node:true *//* global define, escape, unescape */
  'use strict';


  /**
   * SHA-256 hash function reference implementation.
   *
   * @namespace
   */
  var Sha256 = {};


  /**
   * Generates SHA-256 hash of string.
   *
   * @param   {string} msg - String to be hashed
   * @returns {string} Hash of msg as hex character string
   */
  Sha256.hash = function(msg) {
      // convert string to UTF-8, as SHA only deals with byte-streams
      msg = msg.utf8Encode();

      // constants [§4.2.2]
      var K = [
          0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
          0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
          0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
          0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
          0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
          0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
          0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
          0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ];
      // initial hash value [§5.3.1]
      var H = [
          0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19 ];

      // PREPROCESSING

      msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]

      // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
      var l = msg.length/4 + 2; // length (in 32-bit integers) of msg + ‘1’ + appended length
      var N = Math.ceil(l/16);  // number of 16-integer-blocks required to hold 'l' ints
      var M = new Array(N);

      for (var i=0; i<N; i++) {
          M[i] = new Array(16);
          for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
              M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
                  (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
          } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
      }
      // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
      // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
      // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
      M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
      M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;


      // HASH COMPUTATION [§6.1.2]

      var W = new Array(64); var a, b, c, d, e, f, g, h;
      for (var i=0; i<N; i++) {

          // 1 - prepare message schedule 'W'
          for (var t=0;  t<16; t++) W[t] = M[i][t];
          for (var t=16; t<64; t++) W[t] = (Sha256.σ1(W[t-2]) + W[t-7] + Sha256.σ0(W[t-15]) + W[t-16]) & 0xffffffff;

          // 2 - initialise working variables a, b, c, d, e, f, g, h with previous hash value
          a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];

          // 3 - main loop (note 'addition modulo 2^32')
          for (var t=0; t<64; t++) {
              var T1 = h + Sha256.Σ1(e) + Sha256.Ch(e, f, g) + K[t] + W[t];
              var T2 =     Sha256.Σ0(a) + Sha256.Maj(a, b, c);
              h = g;
              g = f;
              f = e;
              e = (d + T1) & 0xffffffff;
              d = c;
              c = b;
              b = a;
              a = (T1 + T2) & 0xffffffff;
          }
          // 4 - compute the new intermediate hash value (note 'addition modulo 2^32')
          H[0] = (H[0]+a) & 0xffffffff;
          H[1] = (H[1]+b) & 0xffffffff;
          H[2] = (H[2]+c) & 0xffffffff;
          H[3] = (H[3]+d) & 0xffffffff;
          H[4] = (H[4]+e) & 0xffffffff;
          H[5] = (H[5]+f) & 0xffffffff;
          H[6] = (H[6]+g) & 0xffffffff;
          H[7] = (H[7]+h) & 0xffffffff;
      }

      return Sha256.toHexStr(H[0]) + Sha256.toHexStr(H[1]) + Sha256.toHexStr(H[2]) + Sha256.toHexStr(H[3]) +
          Sha256.toHexStr(H[4]) + Sha256.toHexStr(H[5]) + Sha256.toHexStr(H[6]) + Sha256.toHexStr(H[7]);
  };


  /**
   * Rotates right (circular right shift) value x by n positions [§3.2.4].
   * @private
   */
  Sha256.ROTR = function(n, x) {
      return (x >>> n) | (x << (32-n));
  };

  /**
   * Logical functions [§4.1.2].
   * @private
   */
  Sha256.Σ0  = function(x) { return Sha256.ROTR(2,  x) ^ Sha256.ROTR(13, x) ^ Sha256.ROTR(22, x); };
  Sha256.Σ1  = function(x) { return Sha256.ROTR(6,  x) ^ Sha256.ROTR(11, x) ^ Sha256.ROTR(25, x); };
  Sha256.σ0  = function(x) { return Sha256.ROTR(7,  x) ^ Sha256.ROTR(18, x) ^ (x>>>3);  };
  Sha256.σ1  = function(x) { return Sha256.ROTR(17, x) ^ Sha256.ROTR(19, x) ^ (x>>>10); };
  Sha256.Ch  = function(x, y, z) { return (x & y) ^ (~x & z); };
  Sha256.Maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); };


  /**
   * Hexadecimal representation of a number.
   * @private
   */
  Sha256.toHexStr = function(n) {
      // note can't use toString(16) as it is implementation-dependant,
      // and in IE returns signed numbers when used on full words
      var s="", v;
      for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
      return s;
  };


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


  /** Extend String object with method to encode multi-byte string to utf8
   *  - monsur.hossa.in/2012/07/20/utf-8-in-javascript.html */
  if (typeof String.prototype.utf8Encode == 'undefined') {
      String.prototype.utf8Encode = function() {
          return unescape( encodeURIComponent( this ) );
      };
  }

  /** Extend String object with method to decode utf8 string to multi-byte */
  if (typeof String.prototype.utf8Decode == 'undefined') {
      String.prototype.utf8Decode = function() {
          try {
              return decodeURIComponent( escape( this ) );
          } catch (e) {
              return this; // invalid UTF-8? return as-is
          }
      };
  }


  /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
  if (typeof module != 'undefined' && module.exports) module.exports = Sha256; // CommonJs export
  if (typeof define == 'function' && define.amd) define([], function() { return Sha256; }); // AMD


  _PRIVTEXT_KEY_LENGHT = 16
  privtext = window.privtext ? window.privtext : {};

  privtext.url_base_url = 'https://privtext.com'
  privtext.url_get_proof = privtext.url_base_url + '/api/proof';
  privtext.url_set_encrypted = privtext.url_base_url + '/api/note';

  privtext.getProof = function(){
    var proof = (function(){
      var prefix, target;
      _j.ajax(privtext.url_get_proof,{
        'url': privtext.url_get_proof,
        'method': 'POST',
        'data':{'action':'get_proof_password', 'ajax':1},
        'async': false, 'cache': false,
        'success': function(response){
          var data = JSON.parse(response)
          prefix = data.prefix;
          target = data.target;
        }
      });
      return {prefix:prefix, target:target}
    })();

    var m = function (prefix, target, counter, randpath){
      if(typeof counter == 'undefined'){
        counter = 0; randpath = Math.random();
      }
      started_counter = counter;
      while(true){
        counter++;
        strToHash = prefix + randpath + counter;
        hash = Sha256.hash(strToHash);
        if(hash <= target){
          return strToHash;
        }else if(counter - started_counter > 10e2){
          return m(prefix, target, counter, randpath)
        }
      }
    }

    return m(proof.prefix, proof.target);
  };

  privtext.encyptNote = function(text, password){
    if(!password){
      password = random_string(_PRIVTEXT_KEY_LENGHT);;
    }
    return {'text': text, 'password':password, 'data': cipher(password, text)};
  };

  privtext.saveNote = function(cipher, proof, timelive, noticemail){
    if(!timelive){ timelive = null; }
    if(!noticemail){ noticemail = null; }
    var note = (function(){
      var noteid, noteurl;
      _j.ajax(privtext.url_set_encrypted,{
        'url': privtext.url_set_encrypted,
        'method': 'POST',
        'data':{'action':'save_note', 'note': cipher, 'proof': proof, 'timelive': timelive, 'noticemail':noticemail, 'ajax':1},
        'async': false, 'cache': false,
        'success': function(response){
          var data = JSON.parse(response)
          noteid = data.id;
          noteurl = data.url;
        }
      });
      return {id:noteid, url:noteurl}
    })();
    return note;
  };

  privtext.buildUrl = function(url, password){
    return privtext.url_base_url + url + '#' + password
  }
  
  _w.PrivtextExt = privtext;

})(window, document, window.$);