const swap = (posts, a, b) => {
  const data = posts[a];
  posts[a] = posts[b]; // eslint-disable-line no-param-reassign
  posts[b] = data; // eslint-disable-line no-param-reassign
};

const partition = (posts, p, r) => {
  let q = 0;
  let j = 0;

  while (j < r) {
    if (posts[j].createdAt > posts[r].createdAt) {
      swap(posts, q, j);
      q++;
    }
    j++;
  }

  swap(posts, q, r);
  return q;
};

const sortByCreatedAt = (posts, p, r) => {
  if (p >= r) {
    return;
  }
  const q = partition(posts, p, r);
  sortByCreatedAt(posts, p, q - 1);
  sortByCreatedAt(posts, q + 1, r);
};

export default sortByCreatedAt;
