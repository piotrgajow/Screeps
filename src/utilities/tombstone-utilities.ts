
export function isEmpty(tombstone: Tombstone): boolean {
    return tombstone.store.energy === 0;
}
