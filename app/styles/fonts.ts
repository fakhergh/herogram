import { Poppins } from "next/font/google";

export const poppinsFont = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  preload: true,
});
