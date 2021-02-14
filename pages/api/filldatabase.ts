import {utils} from '../../database'

export default (req, res) => {
    utils.dropAll();
    utils.PopulateDb();
    const dbContent = utils.dumpDbContents();
    res.status(200).json(dbContent);
}