
// const lag = ['D6','', '', '', 'D6',  '',  '', '', 'G6', '', '', '', 'G6', '', '', '', 'A6', '', '', '', 'G6', '', 'A6', '', 'Bb6', '', '', '', '', '', '', 'G6', '', '', '', 'Bb6', '', '', '', 'A6', '', '', '', 'G6', '', '', '', 'Gb6', '', '', '', '', '', '', 'D6', '', '', '', '', '', '', 'D6', '', '', '', 'D6', '', '', '', 'G6', '', '', '', 'G6', '', '', '', 'A6', '', '', '', 'G6', '', 'A6', '', 'Bb6', '', '', '', '', '', '', 'A6', '', '', '', 'C7', '', '', '', 'Bb6', '', '', '', 'A6', '', '', '', 'G6', '', '', '', 'A6', '', '', '', 'D6', '', '', '', ];
// let tone = 0;
// setInterval(function(){
// 	playNote(lag[tone]);
// 	tone++;
// }, 150);

const lag = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
 '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
  '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
   '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
     '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
      '', '', '', '', '', '', '', '', '', '', '', ''];
let tone = 0; 
setInterval(function(){
	playNote(lag[tone]);
	tone++;
},150)