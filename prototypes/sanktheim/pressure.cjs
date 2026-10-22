function pressure(elapsed,population){const progress=Math.max(0,Math.min(1,elapsed/600000));return {limit:Math.min(64,Math.max(Math.min(3,population),Math.ceil(population*(.25+1.75*progress*progress)))),interval:Math.max(550,5000*(1-.89*progress*progress))};}
module.exports={pressure};
