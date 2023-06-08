const dotenv = require("dotenv");
dotenv.config();

const handler = async (req, res) => {
  // check key
  const secret = req.headers["authorization"];
  const { model, entry } = req.body;
  if (secret !== `BEARER ${process.env.SECRET_TOKEN}`) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // key is valid
  try {
    switch (model) {
      case "essay":
        await res.revalidate('/');
        await res.revalidate(`/saggi/${entry.slug}`)
        return res.json({ revalidated: true });
      case "book":
        await res.revalidate('/');
        await res.revalidate(`/libri/${entry.slug}`)
        return res.json({ revalidated: true });
      case "article":
        await res.revalidate('/');
        await res.revalidate('/article');
        await res.revalidate(`/article/${entry.slug}`);
        return res.json({ revalidated: true });
      case "blog":
        await res.revalidate('/');
        return res.json({ revalidated: true });
      case "event":
        await res.revalidate('/');
        return res.json({ revalidated: true });
      case "section":
        if (entry.slug.startsWith("biografia-it-")) res.revalidate("/about-it");
        else if (entry.slug.startsWith("biografia-en-")) res.revalidate("/about-en");
        else if (entry.slug.startsWith("biografia-fr-")) res.revalidate("/about-fr");
        else if (entry.slug.startsWith("repertorio-diplomatico-")) res.revalidate("/diplomacy-report");
        else if (entry.slug === "onorificenze") res.revalidate("/honor");
        return res.json({ revalidated: true });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Error revalidating')
  }
};

export default handler;
