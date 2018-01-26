
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

}
