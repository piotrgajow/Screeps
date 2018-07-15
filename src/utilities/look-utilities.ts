
export function isStructure<T>(object: LookAtResult<T>): boolean {
    return object.type === LOOK_STRUCTURES;
}
