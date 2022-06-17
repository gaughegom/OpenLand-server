const { NFTStorage, File } = require("nft.storage");

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJCNTZmOUNmQzNBMDI1OGVCN2IzMDAzOTVlNTlhRDI2ODM0ODQxQkQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0NTE5MzkxNTA2NiwibmFtZSI6InRlc3QwMSJ9.acrpDvIhlZ_IIYb93dKHQOcFhluFi7b04cjQ8pT9Tjk";

const client = new NFTStorage({ token: apiKey });

exports.getIpfs = async (item, img) => {
  const { name, description, properties } = item;

  const content = img.data;

  const metadata = await client.store({
    name,
    description,
    properties,
    image: new File([content], "friend.png", { type: "image/gif" })
  });

  return metadata.url;
};
