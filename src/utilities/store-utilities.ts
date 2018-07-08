
export function isEmpty(store: StoreDefinition): boolean {
    return totalResources(store) === 0;
}

export function isNotEmpty(store: StoreDefinition): boolean {
    return totalResources(store) > 0;
}

export function getResourceType(store: StoreDefinition): ResourceConstant {
    const pairs = _.pairs(store);
    const pair = _.find(pairs, isResourceNotZero);
    return pair ? pair[0] : RESOURCE_ENERGY;
}

function totalResources(store: StoreDefinition): number {
    return _.sum(_.values(store));
}

function isResourceNotZero(resource: any[]): boolean {
    return resource[1] > 0;
}
