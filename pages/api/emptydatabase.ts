import {utils} from '../../database'

export default async (req, res) => {
    await utils.dropAll();
    res.status(200).json(await utils.dumpDbContents());
}