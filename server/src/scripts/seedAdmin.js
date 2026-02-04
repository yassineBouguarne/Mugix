import fs from "fs/promises";
import path from "path";

async function upsertEnv(filePath, key, value) {
  let content = "";
  try {
    content = await fs.readFile(filePath, "utf8");
  } catch (err) {
    // file may not exist; create it
    content = "";
  }

  const lines = content.split(/\r?\n/).filter(() => true);
  const regex = new RegExp(`^${key}=`);
  let found = false;
  const newLines = lines.map((l) => {
    if (regex.test(l)) {
      found = true;
      return `${key}=${value}`;
    }
    return l;
  });

  if (!found) newLines.push(`${key}=${value}`);

  await fs.writeFile(filePath, newLines.join("\n") + "\n", "utf8");
}

async function run() {
  const envPath = path.resolve(process.cwd(), ".env");

  const adminEmail = "yassine@gmai.com";
  const adminPassword = "123456";
  const jwtSecret = "change_this_secret_for_production";

  try {
    await upsertEnv(envPath, "ADMIN_EMAIL", adminEmail);
    await upsertEnv(envPath, "ADMIN_PASSWORD", adminPassword);
    await upsertEnv(envPath, "JWT_SECRET", jwtSecret);

    console.log("✅ Admin seeded into", envPath);
    console.log(`ADMIN_EMAIL=${adminEmail}`);
    console.log(`ADMIN_PASSWORD=${adminPassword}`);
  } catch (err) {
    console.error("Failed to seed admin:", err);
    process.exit(1);
  }
}

run();
