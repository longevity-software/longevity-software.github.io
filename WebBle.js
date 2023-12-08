
// Get reference to the buttons
const connectButton = document.getElementById("connectButton");
const connectionStatus = document.getElementById("connectionStatus");
const leftForwardButton = document.getElementById("LeftForwardButton");
const rightForwardButton = document.getElementById("RightForwardButton");
const leftStopButton = document.getElementById("LeftStopButton");
const rightStopButton = document.getElementById("RightStopButton");
const leftBackwardButton = document.getElementById("LeftBackwardButton");
const rightBackwardButton = document.getElementById("RightBackwardButton");

connectButton.addEventListener("click", BLEManager);
leftForwardButton.addEventListener("click", LeftForwardClick);
rightForwardButton.addEventListener("click", RightForwardClick);
leftStopButton.addEventListener("click", LeftStopClick);
rightStopButton.addEventListener("click", RightStopClick);
leftBackwardButton.addEventListener("click", LeftBackwardClick);
rightBackwardButton.addEventListener("click", RightBackwardClick);

var leftState = 0;
var rightState = 0;

async function BLEManager() {
    connectionStatus.textContent = "Connect Button Clicked";

    try {
        const device = await navigator.bluetooth.requestDevice({
            filters: [
                {name: "BLE Robot"}
            ]
        });
    }
    catch(err) {
        connectionStatus.textContent = "Connection cancelled - " + err.message;
    }

    try {
        const connectedDevice = await device.gatt.connect();
    }
    catch(err) {
        connectionStatus.textContent = "CONNECTION FAILED - " + err.message;
    }

    const controlService = await connectedDevice.getPrimaryService(0x3000);
    const controlCharacteristic = await controlService.getCharacteristic(0x3100);
}

async function LeftForwardClick() {
    connectionStatus.textContent = "LeftForwardClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    leftState = 1;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}

async function RightForwardClick() {
    connectionStatus.textContent = "RightForwardClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    rightState = 1;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}

async function LeftStopClick() {
    connectionStatus.textContent = "LeftStopClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    leftState = 0;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}

async function RightStopClick() {
    connectionStatus.textContent = "RightStopClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    rightState = 0;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}

async function LeftBackwardClick() {
    connectionStatus.textContent = "LeftBackwardsClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    leftState = -1;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}

async function RightBackwardClick() {
    connectionStatus.textContent = "RightBackwardsClick";
    if (typeof controlCharacteristic === 'undefined') {
        connectionStatus.textContent = "Control Characteristic not defined.";
        return;
    }

    rightState = -1;

    const buffer = new ArrayBuffer(2);
    buffer[0] = leftState;
    buffer[1] = rightState;

    await controlCharacteristic.writeValueWithResponse(buffer);
}
