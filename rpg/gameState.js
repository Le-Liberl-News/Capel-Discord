const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const STATE_FILE = path.join(__dirname, 'map_state.json');

let state = {
    layout: null,
    playerX: 0,
    playerY: 0,
    messageId: null,
    channelId: null,
    isMoving: false,
    MAP_WIDTH: 20,
    MAP_HEIGHT: 20,
    TILE_SIZE: 40,
    iconPath: path.join(__dirname, 'assets', 'player_icon.png'),
    enemyIconPath: path.join(__dirname, 'assets', 'enemy_icon.png'),
    exitIconPath: path.join(__dirname, 'assets', 'exit_icon.png')
};

function saveState() {
    const dataToSave = {
        layout: state.layout,
        playerX: state.playerX,
        playerY: state.playerY,
        messageId: state.messageId,
        channelId: state.channelId
    };
    fs.writeFileSync(STATE_FILE, JSON.stringify(dataToSave, null, 2));
}

function loadState() {
    if (fs.existsSync(STATE_FILE)) {
        try {
            const rawData = fs.readFileSync(STATE_FILE);
            const parsedData = JSON.parse(rawData);
            
            state.layout = parsedData.layout || state.layout;
            state.playerX = parsedData.playerX || state.playerX;
            state.playerY = parsedData.playerY || state.playerY;
            state.messageId = parsedData.messageId || state.messageId;
            state.channelId = parsedData.channelId || state.channelId;
            state.isMoving = false;
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

    let lastRoom = rooms[rooms.length - 1];
    map[lastRoom.y][lastRoom.x] = 3;

    for (let y = 1; y < state.MAP_HEIGHT - 1; y++) {
        for (let x = 1; x < state.MAP_WIDTH - 1; x++) {
            if (map[y][x] === 0) {
                let isHoriz = map[y-1][x] === 1 && map[y+1][x] === 1 && map[y][x-1] === 0 && map[y][x+1] === 0;
                let isVert = map[y][x-1] === 1 && map[y][x+1] === 1 && map[y-1][x] === 0 && map[y+1][x] === 0;
                
                if ((isHoriz || isVert) && Math.random() < 0.25) {
                    map[y][x] = 2;
                }
            }
        }
    }

    return map;
}

async function renderMapImage(map, playerX, playerY) {
    let minX = state.MAP_WIDTH;
    let maxX = 0;
    let minY = state.MAP_HEIGHT;
    let maxY = 0;

    for (let y = 0; y < state.MAP_HEIGHT; y++) {
        for (let x = 0; x < state.MAP_WIDTH; x++) {
            if (map[y][x] !== 1) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    minX = Math.max(0, minX - 1);
    maxX = Math.min(state.MAP_WIDTH - 1, maxX + 1);
    minY = Math.max(0, minY - 1);
    maxY = Math.min(state.MAP_HEIGHT - 1, maxY + 1);

    const cropW = maxX - minX + 1;
    const cropH = maxY - minY + 1;

    const canvas = createCanvas(cropW * state.TILE_SIZE, cropH * state.TILE_SIZE);
    const ctx = canvas.getContext('2d');

    let playerIcon, enemyIcon, exitIcon;
    try { playerIcon = await loadImage(state.iconPath); } catch (e) {}
    try { enemyIcon = await loadImage(state.enemyIconPath); } catch (e) {}
    try { exitIcon = await loadImage(state.exitIconPath); } catch (e) {}

    for (let y = minY; y <= maxY; y++) {
        for (let x = minX; x <= maxX; x++) {
            const drawX = x - minX;
            const drawY = y - minY;

            if (map[y][x] === 1) {
                ctx.fillStyle = '#2C2F33';
            } else {
                ctx.fillStyle = '#99AAB5';
            }
            
            ctx.fillRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
            ctx.strokeStyle = '#23272A';
            ctx.strokeRect(drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);

            if (map[y][x] === 2) {
                if (enemyIcon) {
                    ctx.drawImage(enemyIcon, drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                } else {
                    ctx.fillStyle = '#8B0000';
                    ctx.fillRect(drawX * state.TILE_SIZE + 5, drawY * state.TILE_SIZE + 5, state.TILE_SIZE - 10, state.TILE_SIZE - 10);
                }
            } else if (map[y][x] === 3) {
                if (exitIcon) {
                    ctx.drawImage(exitIcon, drawX * state.TILE_SIZE, drawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
                } else {
                    ctx.fillStyle = '#FFD700';
                    ctx.fillRect(drawX * state.TILE_SIZE + 5, drawY * state.TILE_SIZE + 5, state.TILE_SIZE - 10, state.TILE_SIZE - 10);
                }
            }
        }
    }

    const pDrawX = playerX - minX;
    const pDrawY = playerY - minY;

    if (playerIcon) {
        ctx.drawImage(playerIcon, pDrawX * state.TILE_SIZE, pDrawY * state.TILE_SIZE, state.TILE_SIZE, state.TILE_SIZE);
    } else {
        ctx.fillStyle = '#ED4245';
        ctx.beginPath();
        ctx.arc(pDrawX * state.TILE_SIZE + state.TILE_SIZE / 2, pDrawY * state.TILE_SIZE + state.TILE_SIZE / 2, state.TILE_SIZE / 3, 0, Math.PI * 2);
        ctx.fill();
    }

    return canvas.toBuffer('image/png');
}

module.exports = { state, wait, generateMap, renderMapImage, saveState };