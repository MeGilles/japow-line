import * as db from '../'
import * as route from './route'

main();

async function main() {
    await db.utils.dropAll();
    await db.utils.populateDb();
    await route.test_getFullPath();
    await route.test_getAllRoutesPaths();
    await route.test_getAllLocationsPaths();
}

export function indenticalStringArrays(a: string[], b: string[]): boolean {
    if (a.length != b.length) {
        return false;
    }
    try {
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) {
                return false;
            }
        }
    } catch {
        return false;
    }
    return true;
}

export function assertTrue(b: boolean, msg: string): void {
    if (b) {
        console.log("OK : " + msg);
    } else {
        console.error("ERR : " + msg);
    }
}

export function matchAndRemove(path: string[], all: string[][]) : string[][] {
    let result : string[][] = [];
    let i = 0;
    for (i = 0; i < all.length; i++) {
        const element = all[i];
        if(indenticalStringArrays(path, element)){
            assertTrue(true, "found as expected")
            break;
        } else {
            result.push(element)
        }
    }
    for (let j = i+1; j < all.length; j++) {
        result.push(all[j])
    }
    return result;
}