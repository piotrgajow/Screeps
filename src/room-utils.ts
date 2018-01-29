import { MEMORY } from './memory';

function isStorage(structure: Structure): boolean {
    return structure.structureType === STRUCTURE_STORAGE;
}

export class ROOM {

    public static findConstructionSites(room: Room): ConstructionSite[] {
        return room.find(FIND_MY_CONSTRUCTION_SITES);
    }

    public static findStructures(room: Room): Structure[] {
        return room.find(FIND_STRUCTURES);
    }

    public static findExtensions(room: Room): StructureExtension[] {
        return this.findStructures(room)
            .filter((structure) => structure.structureType === STRUCTURE_EXTENSION)
            .map((structure) => structure as StructureExtension);
    }

    public static findStorage(room: Room): StructureStorage {
        const storageId = room.memory[MEMORY.STORAGE];
        if (storageId) {
            return Game.getObjectById(storageId) as StructureStorage;
        } else {
            const storage = room.find(FIND_MY_STRUCTURES, { filter: isStorage })[0] as StructureStorage;
            room.memory[MEMORY.STORAGE] = storage.id;
            return storage;
        }
    }

}
