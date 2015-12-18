## Report

### Vagrant
Vagrant er virtual machine manager sem gerir okkur kleift að búa til uppskriftir að sýndar umhverfum/vélum svo við getum á
auðveldan hátt sett upp slík umhverfi án þess að þurfa að setja upp hvern og einn hlut í hvert sinn.

### VirtualBox
VirtualBox er forrit sem leyfir okkur að setja upp og sjá um sýndarvélar á tölvunum og serverum. Gerir okkur kleift að stýra
hvaða resources vélin hefur aðgang að og hversu kraftmikil hún er.

### Grunt
Grunt er task runner, leyfir okkur að skrifa aðgerðir til að framkvæma á kóðasöfnum og verkefnum. Gerir okkur kleift að
keyra margar aðgerðir í röð og auðvelt að færa þær á milli umhverfa. Einnig, gulp > grunt.

### NPM
NPM er package manager fyrir forritunarmálið NodeJS. Leyfir okkur að sækja og nota pakka skrifaða af samfélaginu.
Leyfir okkur einnig að smíða okkar eigin pakka og bæta þeim á NPM ásamt að útvega útgáfustjórnun fyrir þá pakka.

### NodeJS
NodeJS er forritunarumhverfi fyrir JavaScript forritunarmálið. NodeJS gerir okkur kleift að keyra nota nota javascript kóða
utan browsera. NodeJS byggir á V8 Javascript vélinni sem er notuð í Google Chrome.

### Bower
Bower er annar package manager líkt og NPM en er ætlaður til þess að halda utan um pakka sem eru keyrðir í vöfrum notanda.
NPM getur haldið utan um bæði NodeJS pakka og pakka sem keyra í vöfrum en bower er einungis fyrir pakka sem eru keyrðir
í vöfrum.

### Load Test Results
Load testið keyrði oftast á sirka 4.6 sekúndum samkvæmt mocha. Hinsvegar virtist mocha vera mislengi að keyra prófið upp og því gat ég ekki stillt tímann á 5 sekúndur. Það keyrði yfirleitt í fyrsta sinn á 5 sekúndum en byrjaði að klikka eftir það. Ég gat keyrt prófið 2-3 sinnum ef ég setti timeout í 7 sekúndur og það keyrir fínt á jenkins með timeoutið sett í 7 sekúndur þannig ég hélt mig við það.

Varðandi spurninguna þá keyra prófin í seríu vegna þess að for loopan er ekki asynchronous. Það er hægt að nota async libraryið til þess að keyra prófin asynchronously en við erum ekki að gera það í þessum kúrs og það myndi örugglega fokka eitthvað upp gamehistory að blanda mörgum leikjum saman.
