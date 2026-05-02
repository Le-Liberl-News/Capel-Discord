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
    MAP_WIDTH: 10,
    MAP_HEIGHT: 10,
    TILE_SIZE: 40,
    iconPath: './assets/player_icon.png'
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
            console.error("Erreur de lecture du fichier de sauvegarde :", error);
        }
    }
}

loadState();

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function generateMap() {
    let map = Array(state.MAP_HEIGHT).fill().map(() => Array(state.MAP_WIDTH).fill(1));
    let x = Math.floor(state.MAP_WIDTH / 2);
    let y = Math.floor(state.MAP_HEIGHT / 2);
    let floorTiles = 40;
    
    while (floorTiles > 0) {
        if (map[y][x] === 1) {
            map[y][x] = 0;
            floorTiles--;
        }
        const dir = Math.floor(Math.random() * 4);
        if (dir === 0 && y > 1) y--;
        else if (dir === 1 && y < state.MAP_HEIGHT - 2) y++;
        else if (dir === 2 && x > 1) x--;
        else if (dir === 3 && x < state.MAP_WIDTH - 2) x++;
    }
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

// On n'oublie pas d'exporter saveState
module.exports = { state, wait, generateMap, renderMapImage, saveState };