import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { advance, route, facing } from "../activity/movement.mjs";
const grid = {
  origin: { x: 0, z: 0 },
  step: 1,
  width: 5,
  height: 5,
  cells: Array(25).fill(0),
};
const position = () => ({ x: 0, y: 0, z: 0 });
test("movement covers the same distance at different frame rates", () => {
  for (const frames of [10, 30, 60, 144]) {
    const p = position(),
      points = [{ x: 10, y: 0, z: 0 }];
    for (let i = 0; i < frames; i++) advance(p, points, 1 / frames);
    assert.ok(Math.abs(p.x - 3.5) < 1e-8);
    assert.equal(p.z, 0);
  }
});
test("a frame can finish one waypoint and continue to the next without teleporting", () => {
  const p = position(),
    points = [
      { x: 1, y: 0, z: 0 },
      { x: 1, y: 0, z: 4 },
    ];
  advance(p, points, 1);
  assert.deepEqual(p, { x: 1, y: 0, z: 2.5 });
  assert.equal(points.length, 1);
});
test("movement stops exactly at its destination", () => {
  const p = position(),
    points = [{ x: 0.1, y: 0, z: 0 }];
  advance(p, points, 0.1);
  assert.equal(p.x, 0.1);
  assert.equal(points.length, 0);
});
test("path goes around furniture and never crosses blocked cells", () => {
  const cells = [...grid.cells];
  cells[12] = null;
  const path = route({ ...grid, cells }, { x: 0, z: 2 }, { x: 4, z: 2 });
  assert.ok(path.length);
  assert.ok(path.every((p) => !(p.x === 2 && p.z === 2)));
  assert.deepEqual(path.at(-1), { x: 4, y: 0, z: 2 });
});
test("diagonal movement cannot cut between two walls", () => {
  const g = {
    origin: { x: 0, z: 0 },
    step: 1,
    width: 2,
    height: 2,
    cells: [0, null, null, 0],
  };
  assert.deepEqual(route(g, { x: 0, z: 0 }, { x: 1, z: 1 }), []);
});
test("outside the floor is not a destination", () =>
  assert.deepEqual(route(grid, { x: 0, z: 0 }, { x: 50, z: 50 }), []));
test("Sky atlas directions follow west, northwest, north, northeast, east, southeast, south, southwest", () => {
  const right = { x: 1, z: 0 },
    forward = { x: 0, z: 1 };
  for (const [x, z, index] of [
    [-1, 0, 0],
    [-1, 1, 1],
    [0, 1, 2],
    [1, 1, 3],
    [1, 0, 4],
    [1, -1, 5],
    [0, -1, 6],
    [-1, -1, 7],
  ])
    assert.equal(facing(x, z, right, forward), index);
});
test("real restaurant spawn is on a walkable floor and connected to a destination", () => {
  const g = JSON.parse(
    fs.readFileSync(
      new URL("../activity/assets/sky/navigation.json", import.meta.url),
    ),
  );
  assert.equal(g.spawn.y, 0);
  assert.ok(route(g, g.spawn, { x: 0, z: 1 }).length);
});

test('restaurant upstairs is reached through successive stair heights and can be left again', () => {
 const g=JSON.parse(fs.readFileSync(new URL('../activity/assets/sky/navigation.json',import.meta.url)));
 const destination={x:6.8,z:4.8};
 const path=route(g,g.spawn,destination);
 assert.ok(path.length);
 assert.equal(path.at(-1).y,3.25);
 assert.ok(path.some(p=>p.y===2));
 assert.ok(path.some(p=>p.y===2.75));
 let previous=g.spawn;
 for(const point of path){assert.ok(Math.abs(point.y-previous.y)<=.35);previous=point;}
 assert.ok(route(g,path.at(-1),g.spawn).length);
});
test('height changes smoothly while walking onto a step',()=>{
 const p={x:0,y:0,z:0};
 advance(p,[{x:1,y:.25,z:0}],.1,1);
 assert.equal(p.y,.025);
});
