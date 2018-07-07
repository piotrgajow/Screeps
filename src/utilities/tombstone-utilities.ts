
export function isEmpty(tombstone: Tombstone): boolean {
    return tombstone.store.energy === 0;
}

export function isNotEmpty(tombstone: Tombstone): boolean {
    return tombstone.store.energy > 0;
}
