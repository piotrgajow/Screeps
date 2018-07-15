
const MINE_PREFIX = 'mine';
const UPGRADE_SITE_PREFIX = 'upg';

export function isMine(flag: Flag): boolean {
    return flag.name.includes(MINE_PREFIX);
}

export function isUpgradeSite(flag: Flag): boolean {
    return flag.name.includes(UPGRADE_SITE_PREFIX);
}
