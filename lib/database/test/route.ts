import { assertTrue, indenticalStringArrays, matchAndRemove } from '.'
import * as db from '..'

/**
 * The title of functions in this file are self explanatory 
 */

export async function test_getFullPath() {
    //with places
    let a = await db.route.getFullPathFromName("Alps");
    let res = indenticalStringArrays(a, ['Alps']);
    assertTrue(res, "fullpath Alps");
    res = indenticalStringArrays(await db.route.getFullPathFromName("Mont Blanc massif"), ["Alps", "Mont Blanc massif"]);
    assertTrue(res, "fullpath Mont Blanc massif");
    res = indenticalStringArrays(await db.route.getFullPathFromName("Dent du Géant"), ["Alps", "Mont Blanc massif", "Dent du Géant"]);
    assertTrue(res, "fullpath Dent du Géant");

    //with routes
    res = indenticalStringArrays(await db.route.getFullPathFromName("Tour dans le Vercors"), ["Alps", "Mont Blanc massif", "Dent du Géant", "Tour dans le Vercors"]);
    assertTrue(res, "fullpath Alps");

    //trying a name that do not exist
    try {
        await db.route.getFullPathFromName("n'existe pas");
        res = false;
    } catch {
        res = true;
    }
    assertTrue(res, "n'existe pas should fail")

}

export async function test_getAllRoutesPaths() {
    const all = await db.route.getAllRoutesPaths();
    let expected = [
        ['Alps', 'Mont Blanc massif', 'Mont Blanc', 'Tour au mont Blanc'],
        ['Alps', 'Mont Blanc massif', 'Dent du Géant', 'Tour dans le Vercors'],
        ['Massif Central', 'Chaîne des Puys', 'Puy de Dôme', 'Tour au puits de dome'],
        ['Alps', 'Mont Blanc massif', 'Mont Blanc', 'Tour de test avec plein de trucs qui manquent'],
    ]

    try {
        for (let i = 0; i < all.length; i++) {
            let found = false;
            expected = matchAndRemove(all[i], expected);
        }
        assertTrue(expected.length == 0, "getAllRoutesPaths returned all paths")
    } catch {
        assertTrue(false, "getAllLocationsPaths")
    }
}

export async function test_getAllLocationsPaths() {
    const all = await db.route.getAllLocationsPaths();
    let expected = [
        ['Alps'],
        ['Alps', 'Mont Blanc massif'],
        ['Alps', 'Mont Blanc massif', 'Dent du Géant'],
        ['Alps', 'Mont Blanc massif', 'Mont Blanc'],
        ['Alps', 'Vercors'],
        ['Alps', 'Ecrins'],
        ['Massif Central'],
        ['Massif Central', 'Chaîne des Puys'],
        ['Massif Central', 'Chaîne des Puys', 'Puy de Dôme']
    ]

    try {
        for (let i = 0; i < all.length; i++) {
            expected = matchAndRemove(all[i], expected);
        }
        assertTrue(expected.length == 0, "getAllLocationsPaths returned all paths")
    } catch {
        assertTrue(false, "getAllLocationsPaths")
    }
}