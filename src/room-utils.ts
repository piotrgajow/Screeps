
export class ROOM {

    static findExtensions(room: Room): StructureExtension[] {
        const filter = { filter: { structureType: STRUCTURE_EXTENSION } };
        return room.find(FIND_MY_STRUCTURES, filter).map((structure) => strusture as StructureExtension)
    }

}
