import {utils} from '../../../lib/database'

export default async (req, res) => {
    await utils.populateDb();
    res.status(200).json(await utils.dumpDbContents());
}