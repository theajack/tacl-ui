// import TaclUI from '../src';
import TaclUI from '../npm/index.min.js';
// import TaclUI from '../npm/taclui.min.js';
window.tacl = TaclUI;
TaclUI.drag({
    el: document.getElementById('aa'),
    aside: true,
    onSideChange: (a) => {
        console.log(a);
    }
});