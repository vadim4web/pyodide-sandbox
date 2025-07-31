// scripts/update-homepage.js
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgPath = path.join(__dirname, "../package.json");

// Try to extract GitHub username from git remote
function getGitHubUser() {
  try {
    const remoteUrl = execSync("git config --get remote.origin.url", {
      encoding: "utf-8",
    }).trim();

    const match = remoteUrl.match(/github\.com[:/](.+?)\//);
    return match?.[1] || null;
  } catch {
    return null;
  }
}

const fallbackUser = "vadim4web";
const username = process.env.GITHUB_USER || getGitHubUser() || fallbackUser;

try {
  const data = await readFile(pkgPath, "utf-8");
  const pkg = JSON.parse(data);
  const oldHomepage = pkg.homepage;
  pkg.homepage = `https://${username}.github.io/${pkg.name}`;

  if (pkg.homepage !== oldHomepage) {
    await writeFile(pkgPath, JSON.stringify(pkg, null, 2));
    console.log(`✅ Updated homepage to: ${pkg.homepage}`);
  } else {
    console.log(`ℹ️ Homepage already correct: ${pkg.homepage}`);
  }
} catch (err) {
  console.error("❌ Failed to update homepage:", err);
}
