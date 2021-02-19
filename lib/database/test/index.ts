import * as db from '..'
import * as route from './route'

main();

/**
 * This function is used only for testing purposes like all the code in test folder
 */
async function main() {
    await db.utils.dropAll();
    await db.utils.populateDb();
    await route.test_getFullPath();
    await route.test_getAllRoutesPaths();
    await route.test_getAllLocationsPaths();
}

/**
 * Helper function, it verifies two string arrays have the same content in the same order
 * For instance :
 *      indenticalStringArrays(["one", "two"], ["one", "two"]): true
 *      indenticalStringArrays(["one", "two"], ["two", "one"]): false
 * @param a 
 * @param b 
 */
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

/**
 * Helper function if b is true it will display OK with the name of the test else ERR with the name of the test
 * @param b 
 * @param msg 
 */
export function assertTrue(b: boolean, msg: string): void {
    if (b) {
        console.log("OK : " + msg);
    } else {
        console.error("ERR : " + msg);
    }
}

/**
 * Helper function that remove a string array from a list of string arrays
 * it is used to test functions like the ones that returns all the position or location paths
 * if found a success message will be printed an the element will be removed, else the all content will be returned.
 * @param path 
 * @param all 
 */
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