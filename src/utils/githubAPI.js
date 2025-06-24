const BASE_URL = "https://api.github.com/search/repositories";

export const fetchRepos = async (
  query = "react",
  sort = "stars",
  order = "desc"
) => {
  const res = await fetch(
    `${BASE_URL}?q=${query}&sort=${sort}&order=${order}&per_page=20`
  );
  const data = await res.json();
  return data.items;
};
