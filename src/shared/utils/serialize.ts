export const serialize = <T>(key: string, arr: T[]): any => {
  return arr.reduce((json: any, item: any) => {
    const formatedKey = item[key].toLowerCase();
    json[formatedKey] = item;
    return json;
  }, {});
};
