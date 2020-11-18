import express from "express";
import path from "path";
import changeMetaInfo from "../middleware/changeMetaInfo"

const router = express.Router();

const actionIndex = async (req, res, next) => {
  changeMetaInfo(req, res, next);
};

router.use('^/$', actionIndex);

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

router.use('*', actionIndex);

export default router;
