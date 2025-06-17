export const getPathWithBasePath = (path: string) => {
  const p = (process.env.BASE_PATH || "") + path;
  return p.replaceAll("//", "/");
};
