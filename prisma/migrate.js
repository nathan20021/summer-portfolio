const fs = require("fs");
const {
  prisma,
} = require("/Users/nathanluong/Desktop/Personal/summer-portfolio/db.js");
// const fileContents = fs.readFileSync(
//   "/Users/nathanluong/Desktop/Personal/summer-portfolio/prisma/oldDatabase.txt",
//   "utf-8"
// );

const migrationJob = async () => {
  const basePath =
    "/Users/nathanluong/Desktop/Personal/summer-portfolio/prisma/";
  const tableFile = {
    _BlogPostToTags: "postToTags.txt",
  };

  for (const tableName of Object.keys(tableFile)) {
    const path = tableFile[tableName];
    const fileContents = fs.readFileSync(`${basePath}${path}`, "utf-8");
    const rows = fileContents.split("\n");
    const headers = rows[0].split("|");
    rows.shift();
    const type = rows[0].split("|");
    rows.shift();

    for (const row of rows) {
      const items = row.split("|");
      const data = {};
      for (let i = 0; i < items.length; i++) {
        let item = null;
        switch (type[i]) {
          case "i":
            item = parseInt(items[i]);
            break;
          case "b":
            item = Boolean(items[i]);
            break;
          case "d":
            item = new Date(items[i]);
            break;
          default:
            item = items[i];
        }

        data[headers[i]] = item;
      }
      console.log(data);
      await prisma.blogPostToTags.create({ data: { ...data } });
    }
  }
};

migrationJob().then(() => {
  console.log("DONE");
});
