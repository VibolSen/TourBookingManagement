// import fs from "fs";
// import path from "path";
// import { createCanvas } from "canvas";
// import crypto from "crypto";
// import { fileURLToPath } from "url";

// // Get the current directory using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Your generateProfileImage function remains the same
// export const generateProfileImage = (name) => {
//   const initials = name
//     .split(" ")
//     .map((word) => word[0].toUpperCase())
//     .join(" ")
//     .slice(0, 2); // Limit to 2 letters

//   const hash = crypto.createHash("md5").update(name).digest("hex");
//   const bgColor = `#${hash.slice(0, 6)}`;
//   const textColor = `#${hash.slice(6, 12)}`;

//   const canvas = createCanvas(200, 200);
//   const ctx = canvas.getContext("2d");

//   // Draw background
//   ctx.fillStyle = bgColor;
//   ctx.fillRect(0, 0, 200, 200);

//   // Draw initials
//   ctx.fillStyle = textColor;
//   ctx.font = "bold 100px Arial";
//   ctx.textAlign = "center";
//   ctx.textBaseline = "middle";
//   ctx.fillText(initials, 100, 100);

//   // Ensure the uploads folder exists
//   const uploadsDir = path.join(__dirname, "../uploads");
//   if (!fs.existsSync(uploadsDir)) {
//     fs.mkdirSync(uploadsDir);
//   }

//   // Save the image to the uploads folder
//   const imagePath = path.join(uploadsDir, `${Date.now()}-${name}.png`);
//   const buffer = canvas.toBuffer("image/png");
//   fs.writeFileSync(imagePath, buffer);

//   return `/uploads/${path.basename(imagePath)}`; // Return the relative path
// };
