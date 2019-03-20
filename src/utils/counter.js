const counter = items => {
  let counted = {};

  items.forEach(item => {
    const count = counted[item];
    const newCount = !!count ? count + 1 : 1;
    counted[item] = newCount;
  });

  return counted;
};

export default counter;
