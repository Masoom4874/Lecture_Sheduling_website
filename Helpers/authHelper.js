import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

//setting for passowrds

const secret = "ideaMagix_Lecture_sheduling".padEnd(32, " ");
function generateIV() {
  return crypto.randomBytes(16);
}

export function encryptPassword(plainPassword) {
  const iv = generateIV();
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
  let encrypted = cipher.update(plainPassword, "utf8", "base64");
  encrypted += cipher.final("base64");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decryptString(encryptedText) {
  const [ivHex, encryptedData] = encryptedText.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    iv
  );
  let decrypted = decipher.update(encryptedData, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
