import {assertTrue, indenticalStringArrays} from '.'
import * as db from '..'

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

    let res = indenticalStringArrays(all[0], ['Alps', 'Mont Blanc massif', 'Mont Blanc', 'Tour au mont Blanc']);
    assertTrue(res, "getAllRoutes 1 Tour au mont Blanc");

    res = indenticalStringArrays(all[1], ['Alps', 'Mont Blanc massif', 'Dent du Géant', 'Tour dans le Vercors']);
    assertTrue(res, "getAllRoutes 2 Tour au mont Blanc");

    res = indenticalStringArrays(all[2], ['Massif Central', 'Chaîne des Puys', 'Puy de Dôme', 'Tour au puits de dome']);
    assertTrue(res, "getAllRoutes 3 Tour au puits de dome");

    res = indenticalStringArrays(all[3], ['Alps', 'Mont Blanc massif', 'Mont Blanc', 'Tour de test avec plein de trucs qui manquent']);
    assertTrue(res, "getAllRoutes 4 Tour de test avec plein de trucs qui manquent");
}