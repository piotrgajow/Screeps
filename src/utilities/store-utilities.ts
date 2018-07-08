
export function isEmpty(store: StoreDefinition): boolean {
    return totalResources(store) === 0;
}

export function isNotEmpty(store: StoreDefinition): boolean {
    return totalResources(store) > 0;
}

export function getResourceType(store: StoreDefinition): ResourceConstant {
    return _.any(_.pairs(store), isResourceNotZero)[0] as ResourceConstant;
}

function totalResources(store: StoreDefinition): number {
    return _.sum(_.values(store));
}

function isResourceNotZero(resource: any[]): boolean {
    return resource[1] > 0;
}
