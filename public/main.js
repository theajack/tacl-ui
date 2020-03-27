import TaclUI from '../src';
import TaclUInpm from '../tacl-ui/npm';
import TaclUItnpm from '../npm';
import TaclCdn from '../cdn/taclui.0.0.29.min.js';
window.tacl = TaclUI;
window.taclnpm = TaclUInpm;
window.tacltnpm = TaclUItnpm;
window.taclcdn = TaclCdn;
TaclUI.drag({
    el: document.getElementById('aa'),
    aside: true,
    onSideChange: (a) => {
        console.log(a);
    }
});