/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const nextConfig = {
  // reactStrictMode: false,// @todo: привязать к проду reactStrictMode: false
  // sassOptions: {
  //   includePaths: [path.join(path.dirname(fileURLToPath(import.meta.url)), './src')],
  //   prependData: '@import "~@app/base.scss";',
  // }
};

export default nextConfig;
