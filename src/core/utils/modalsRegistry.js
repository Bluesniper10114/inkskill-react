const registry = new Map();

export const register = (id, modal) => registry.set(id, modal);
export const get = (id) => {
  const modal = registry.get(id);

  // eslint-disable-next-line
  if (!modal && id) console.warn(`Modal with ID '${id}' is not registered`);
  if (!modal) {
    return {};
  }

  return modal;
};
