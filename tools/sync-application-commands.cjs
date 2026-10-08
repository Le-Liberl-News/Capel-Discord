require("dotenv").config({quiet:true});
const {REST}=require("discord.js");
const {commands}=require("../utils/applicationCommands");
const {syncApplicationCommands}=require("../utils/syncApplicationCommands");
syncApplicationCommands(new REST({version:"10"}).setToken(process.env.DISCORD_TOKEN),commands)
 .then(registered=>console.log("Commandes Discord vérifiées : "+registered.map(c=>c.name).join(", ")))
 .catch(error=>{console.error("Échec de synchronisation Discord : "+(error.code??error.status??"vérification refusée"));process.exitCode=1;});
