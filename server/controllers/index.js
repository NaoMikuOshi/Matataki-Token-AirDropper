import express from "express";
import path from "path";
import fs from "fs";
import { getDetailOfAirdrop } from "../../src/api/backend";
import { getTokenProfile } from '../../src/api/token';

const router = express.Router();

const actionIndex = async (req, res, next) => {
  console.log('Server::actionIndex req.params:', req.params);
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  const htmlContext = fs.readFileSync(filePath, 'utf8');

  let tokenLogoPath = "/logo192.png";

  try {
    if (req.params && req.params['0'].includes('/claim/')) {
      const cashtag = req.params['0'].replace('/claim/', '');
      console.log('Server::actionIndex req.params includes "/claim/", cashtag:', cashtag);
      const detail = await getDetailOfAirdrop(cashtag);
      console.log('Server::actionIndex:getDetailOfAirdrop detail:', detail)
      const tokenProfile = (await getTokenProfile(detail.token_id)).data;
      console.log('Server::actionIndex:getTokenProfile tokenProfile.token:', tokenProfile.token);
      const tokenLogo = `${process.env.REACT_APP_MTTK_IMG_CDN}${tokenProfile.token.logo}`;
      console.log('Server::actionIndex tokenLogo:', tokenLogo);
      tokenLogoPath = tokenLogo;
    }
  } catch (error) {
    next(error)
  }

  res.send(htmlContext.replace(/%TOKEN_LOGO%/g, tokenLogoPath));
};

router.use('^/$', actionIndex);

router.use(express.static(
  path.resolve(__dirname, '..', '..', 'build'),
  { maxAge: '30d' },
));

router.use('*', actionIndex);

export default router;
