import {
    getResourceType as storeGetResourceType,
    isEmpty as storeIsEmpty,
    isNotEmpty as storeIsNotEmpty
} from '../utilities/store-utilities';

export function isEmpty(tombstone: Tombstone): boolean {
    return storeIsEmpty(tombstone.store);
}

export function isNotEmpty(tombstone: Tombstone): boolean {
    return storeIsNotEmpty(tombstone.store);
}

export function getResourceType(tombstone: Tombstone): ResourceConstant {
    return storeGetResourceType(tombstone.store);
}
