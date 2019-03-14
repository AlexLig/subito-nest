export async function trim(req: any, res: any, next: any) {
  req.body = Object.entries(req.body).reduce(trimPair, {});
  next();
}
function trimPair(acc: object, [k, v]: [string, any]) {
  return {
    ...acc,
    [k]: typeof v === 'string' ? v.trim() : v,
  };
}
