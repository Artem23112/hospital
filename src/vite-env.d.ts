// / <reference types="vite/client" />

declare module "*.scss" {
  const content: { [key: string]: any };
  export = content;
}
