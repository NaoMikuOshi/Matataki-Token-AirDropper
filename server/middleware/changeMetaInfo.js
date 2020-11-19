import path from "path";
import fs from "fs";
import { getDetailOfAirdrop } from "../../src/api/backend";
import { getTokenProfile } from '../../src/api/token';

export default async function changeMetaInfo(req, res, next) {
  console.log('Middleware::changeMetaInfo req.originalUrl:', req.originalUrl);
  const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
  const htmlContext = fs.readFileSync(filePath, 'utf8');

  const metaTitle = "Matataki Token AirDropper";
  let metaDesc = "A simple app to airdrop your Matataki Token, share to anywhere with the magical link.";
  let tokenLogoPath = "/logo192.png";

  try {
    if (req.originalUrl && req.originalUrl.includes('/claim/')) {
      const cashtag = req.originalUrl.replace('/claim/', '');
      console.log('Middleware::changeMetaInfo req.originalUrl includes "/claim/", cashtag:', cashtag);

      const detail = await getDetailOfAirdrop(cashtag);
      console.log('Middleware::changeMetaInfo:getDetailOfAirdrop detail:', detail);

      const tokenProfile = await getTokenProfile(detail.token_id);
      const tokenInfo = tokenProfile.data;
      console.log('Middleware::changeMetaInfo:getTokenProfile tokenInfo:', tokenInfo);

      const metaDescString = `${tokenInfo.user.nickname || tokenInfo.user.username} is airdropping ${detail.amount / 10000} ${tokenInfo.token.symbol}! ${metaTitle} ${metaDesc.replace('A ', 'is a ')}`
      console.log('Middleware::changeMetaInfo metaDescString:', metaDescString);
      metaDesc = metaDescString;

      const tokenLogo = `${process.env.REACT_APP_MTTK_IMG_CDN}${tokenInfo.token.logo}`;
      console.log('Middleware::changeMetaInfo tokenLogo:', tokenLogo);
      tokenLogoPath = tokenLogo;
    }
  } catch (error) {
    next(error)
  }

  const replacedHtml = htmlContext.replace(/%META_DESC%/g, metaDesc).replace(/%TOKEN_LOGO%/g, tokenLogoPath);

  res.send(replacedHtml);
}
