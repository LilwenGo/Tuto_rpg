import Map from './Map.js'
import TileManager from './Tilemanager.js'
import Character from './Character.js'
import Solid from './item/Solid.js'
import Static from './item/Static.js'

export default class Game {
    constructor() {
    }

    async init() {
        this.tileManager = new TileManager()
        await this.tileManager.loadFile("map", "Simple_tileset", 4, 1)
        await this.tileManager.loadFile("map", "Wooden_tileset", 6, 6)
        await this.tileManager.loadFile("map", "Simple_tile", 1, 1)
        await this.tileManager.loadFile("character", "Slime_vert", 2, 4)
        
        this.map = new Map()
        await this.map.loadMap('map-wood')
        this.map.display()

        this.characters = Array()
        this.items = Array()

        let player = new Character("Slimy", "Player", 23, 13, "BAS")
        player.display()

        /* let npc = new Character("Slimo", "Npc", 23, 12, "BAS")
        npc.display() */
        /* //player.animate()

        let path = this.map.grid.getPath(this.map.listSquare[0], this.map.listSquare[24])
        for(let square of path) {
            square.displayPath(this.map.canvas)
            await new Promise(resolve => setTimeout(resolve, 25))
        } */
       
        this.map.onClick = (position) => {
            this.moveOnClick(position, player)
        }
        
        /* this.map.onRightClick = (position) => {
        let npath = this.map.grid.getPath(this.map.getSquare(npc.position), this.map.getSquare(position))
        npc.moveTo(npath)
        } */
        this.characters.push(player)

        let solid = new Solid('Simple_tileset', {index: 2}, 12, 10)
        solid.display()

        let staticItem = new Static('Simple_tileset', {index: 3}, 15, 12, 1.5)
        staticItem.display()

        this.items.push(solid, staticItem)
    }
    
    moveOnClick(position, player) {
        let ppath = this.map.grid.getPath(this.map.getSquare(player.position), this.map.getSquare(position))
        player.moveTo(ppath).then((resolve, reject) => {
            this.map.onClick = (position) => {
                this.moveOnClick(position, player)
            }
        })
        this.map.onClick = () => {
            this.stopMove(player)
        }
    }

    stopMove(player) {
        player.stop = true
        this.map.onClick = (position) => {
            this.moveOnClick(position, player)
        }
    }
}