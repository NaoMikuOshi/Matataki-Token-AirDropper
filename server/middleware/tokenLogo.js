import path from "path";
import fs from "fs";
import { getDetailOfAirdrop } from "../../src/api/backend";
import { getTokenProfile } from '../../src/api/token';

export default async function changeMetaTokenLogo(req, res, next) {
  console.log('Middleware::changeMetaTokenLogo req.originalUrl:', req.originalUrl);
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  const htmlContext = fs.readFileSync(filePath, 'utf8');

  let tokenLogoPath = "/logo192.png";

  try {
    if (req.originalUrl && req.originalUrl.includes('/claim/')) {
      const cashtag = req.originalUrl.replace('/claim/', '');
      console.log('Middleware::changeMetaTokenLogo req.originalUrl includes "/claim/", cashtag:', cashtag);
      const detail = await getDetailOfAirdrop(cashtag);
      console.log('Middleware::changeMetaTokenLogo:getDetailOfAirdrop detail:', detail)
      const tokenProfile = (await getTokenProfile(detail.token_id)).data;
      console.log('Middleware::changeMetaTokenLogo:getTokenProfile tokenProfile.token:', tokenProfile.token);
      const tokenLogo = `${process.env.REACT_APP_MTTK_IMG_CDN}${tokenProfile.token.logo}`;
      console.log('Middleware::changeMetaTokenLogo tokenLogo:', tokenLogo);
      tokenLogoPath = tokenLogo;
    }
  } catch (error) {
    next(error)
  }

  res.send(htmlContext.replace(/%TOKEN_LOGO%/g, tokenLogoPath));
}
