const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

const STATE_FILE = './map_state.json';

let state = {
    layout: null,
    playerX: 0,
    playerY: 0,
    messageId: null,
    channelId: null,
    isMoving: false,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
    TILE_SIZE: 30,
    iconPath: './rpg/assets/player_icon.png'
};

function saveState() {
    const dataToSave = { ...state, isMoving: false };
    fs.writeFileSync(STATE_FILE, JSON.stringify(dataToSave, null, 2));
}

function loadState() {
    if (fs.existsSync(STATE_FILE)) {
        try {
            const rawData = fs.readFileSync(STATE_FILE);
            const parsedData = JSON.parse(rawData);
            state = { ...state, ...parsedData, isMoving: false };
        } catch (error) {
            console.error(error);
        }
    }
}

loadState();

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateMap() {
    let map = Array(state.MAP_HEIGHT).fill().map(() => Array(state.MAP_WIDTH).fill(1));
    const rooms = [];
    const numRooms = 7;
    const minSize = 3;
    const maxSize = 6;

    for (let i = 0; i < numRooms; i++) {
        let w = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        let h = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        let x = Math.floor(Math.random() * (state.MAP_WIDTH - w - 2)) + 1;
        let y = Math.floor(Math.random() * (state.MAP_HEIGHT - h - 2)) + 1;

        for (let ry = y; ry < y + h; ry++) {
            for (let rx = x; rx < x + w; rx++) {
                map[ry][rx] = 0;
            }
        }

        let cx = Math.floor(x + w / 2);
        let cy = Math.floor(y + h / 2);

        if (rooms.length > 0) {
            let prev = rooms[rooms.length - 1];
            let pcx = prev.x;
            let pcy = prev.y;

            if (Math.random() < 0.5) {
                for (let px = Math.min(pcx, cx); px <= Math.max(pcx, cx); px++) map[pcy][px] = 0;
                for (let py = Math.min(pcy, cy); py <= Math.max(pcy, cy); py++) map[py][cx] = 0;
            } else {
                for (let py = Math.min(pcy, cy); py <= Math.max(pcy, cy); py++) map[py][pcx] = 0;
                for (let px = Math.min(pcx, cx); px <= Math.max(pcx, cx); px++) map[cy][px] = 0;
            }
        }
        rooms.push({ x: cx, y: cy });
    }

    let centerX = Math.floor(state.MAP_WIDTH / 2);
    let centerY = Math.floor(state.MAP_HEIGHT / 2);
    let startRoom = rooms[0];
    
    for (let px = Math.min(centerX, startRoom.x); px <= Math.max(centerX, startRoom.x); px++) map[centerY][px] = 0;
    for (let py = Math.min(centerY, startRoom.y); py <= Math.max(centerY, startRoom.y); py++) map[py][startRoom.x] = 0;

    return map;
}

async function renderMapImage(map, playerX, playerY, iconPath) {
    const canvas = createCanvas(state.MAP_WIDTH * state.TILE_SIZE, state.MAP_HEIGHT * state.TILE_SIZE);
    const ctx = canvas.getContext('2d');

    for (let y = 0; y < state.MAP_HEIGHT; y++) {
        for (let x = 0; x < state.MAP_WIDTH; x++) {
            ctx.fillStyle = map[y][x] === 1 ? '#2C2F33' : '#99AAB5';
            ctx.fillRect(x * state.TILE_SIZE, y * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
            ctx.strokeStyle = '#23272A';
            ctx.strokeRect(x * state.TILE_SIZE, y * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
        }
    }

    try {
        const icon = await loadImage(iconPath);
        ctx.drawImage(icon, playerX * state.TILE_SIZE, playerY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
    } catch (e) {
        ctx.fillStyle = '#ED4245';
        ctx.beginPath();
        ctx.arc(playerX * state.TILE_SIZE + state.TILE_SIZE / 2, playerY * state.TILE_SIZE + state.TILE_SIZE / 2, state.TILE_SIZE / 3, 0, Math.PI * 2);
        ctx.fill();
    }

    return canvas.toBuffer('image/png');
}

module.exports = { state, wait, generateMap, renderMapImage, saveState };