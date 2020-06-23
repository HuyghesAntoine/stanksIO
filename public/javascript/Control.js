const urlParams = new URLSearchParams(window.location.search);
document.getElementById("Pseudal").value = urlParams.get('pseudo');
document.getElementById("cls1").addEventListener("click", () => cls1());
document.getElementById("cls2").addEventListener("click", () => cls2());
document.getElementById("cls3").addEventListener("click", () => cls3());
document.getElementById("cls4").addEventListener("click", () => cls4());

var myCls = "undefined";
function cls1() {
    document.querySelectorAll(".btnCls").forEach((btn) => {
    btn.classList.remove('btn-success');
    });
    document.getElementById("cls1").classList.add('btn-success');
    document.getElementById("btnPseudo").disabled = false;
    myCls = "cls1";
}

function cls2() {
    document.querySelectorAll(".btnCls").forEach((btn) => {
    btn.classList.remove('btn-success');
    });
    document.getElementById("cls2").classList.add('btn-success');
    document.getElementById("btnPseudo").disabled = false;
    myCls = "cls2";
}

function cls3() {
    document.querySelectorAll(".btnCls").forEach((btn) => {
    btn.classList.remove('btn-success');
    });
    document.getElementById("cls3").classList.add('btn-success');
    document.getElementById("btnPseudo").disabled = false;
    myCls = "cls3";
}

function cls4() {
    document.querySelectorAll(".btnCls").forEach((btn) => {
    btn.classList.remove('btn-success');
    });
    document.getElementById("cls4").classList.add('btn-success');
    document.getElementById("btnPseudo").disabled = false;
    myCls = "cls4";
}

var joyMove = new JoyStick('joyMove', {
    internalFillColor: '#4D221E',
    internalLineWidth: 1,
    internalStrokeColor: '#4D221E',
    externalLineWidth: 1,
    externalStrokeColor: '#000000',
    autoReturnToCenter: true
});
var joyShoot = new JoyStick('joyShoot', {
    internalFillColor: '#4D221E',
    internalLineWidth: 1,
    internalStrokeColor: '#4D221E',
    externalLineWidth: 1,
    externalStrokeColor: '#000000',
    autoReturnToCenter: true
});

function displayte() {
    if (myCls != "undefined") { //vérifie que la classe est bien sélectionné
        var x = document.getElementById("Pseudal").value;
        document.getElementById("pseudal_page").style.display = "none";
        document.getElementById("classPage").style.display = "none";
        document.getElementById("btnDescri").style.display = "none";
        document.getElementById("control_pading").style.display = "block";
        document.getElementById("hide_joy").style.visibility = "visible";
        const socket = new ControlsSocket(myCls);
        const events = new ControlsEvents(socket);
        events.onSubPseudo(event, x);
    }
}