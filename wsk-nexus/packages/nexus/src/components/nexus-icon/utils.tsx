const iconCache = {};
const requestCache = {};

const fetchIcon = async ({ iconPath, icon }): Promise<string> => {
  if (iconCache[icon]) {
    return iconCache[icon];
  }
  if (!requestCache[icon]) {
    requestCache[icon] = fetch(iconPath)
      .then((response) => response.text())
      .then((contents) => contents)
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }
  const path = await requestCache[icon];
  iconCache[icon] = path;

  return path;
};

export default fetchIcon;
