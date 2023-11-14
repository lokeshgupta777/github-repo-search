import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import SearchAndSort from "../components/Search/Search";
import Pagination from "../components/Pagination/Pagination";
import Loader from "../components/Loader/Loader";
import Card from "../components/Card/Card";
import styles from "./index.module.scss"

const GitHubRepos = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const initializeData = (name) => {
    if (name === "search")
      return (searchParams.get('q') || "")
    if (name === "page")
      return (searchParams.get('p') || 1)
    if (name === "sort")
      return (searchParams.get('s') || "best-match")
  }

  const [repoData, setRepoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState(initializeData("search"));
  const [sort, setSort] = useState(initializeData("sort"));
  const [page, setPage] = useState(Number(initializeData("page")));
  const [repoCount, setRepoCount] = useState(0);

  const fetchRepos = async (query, page, sort, order) => {

    setLoading(true);
    setError("");

    try {
      const dataRes = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=${PAGE_SIZE}&page=${page}&sort=${sort}&order=${order}`, {
        method: "GET",
        headers: {
          "Accept": "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },

      });
      if (dataRes.status >= 200 & dataRes.status < 300) {
        const data = await dataRes.json();

        const tmpRepoData = data?.items?.map((repo) => {
          return {
            repoName: repo.name,
            fullName: repo.full_name,
            avatar: repo?.owner?.avatar_url ?? "",
            desc: repo.description ?? "",
            lang: repo.language ?? "",
            stars: repo.stargazers_count ?? "",
            url: repo?.html_url ?? "",
            created: repo?.created_at ?? "",
            updated: repo?.updated_at ?? "",
            pushed: repo?.pushed_at ?? "",
          }
        })
        setRepoData(tmpRepoData);
        setRepoCount(data?.total_count ?? 0);
      } else {
        throw new Error(dataRes.statusText)
      }
    } catch (err) {
      setError(err?.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const query = searchParams.get('q') ?? "";
    const sort = searchParams.get('s') ?? "";
    const order = searchParams.get('o') ?? "";
    const page = searchParams.get('p') ?? 1;

    setSearchText(query);
    setPage(Number(page));
    setSort(sort || "best-match");

    query && fetchRepos(query, page, sort, order)
  }, [searchParams])

  const resetSearch = useCallback(() => {
    setRepoCount(0);
    setRepoData([]);
    setSort('best-match');
    setLoading(true);
  })

  return (
    <div className={styles.cont}>
      <h1 className={styles.head}>GitHub Repo Search</h1>
      <SearchAndSort
        searchText={searchText}
        setSearchText={setSearchText}
        sort={sort}
        setSort={setSort}
        setPage={setPage}
        setSearchParams={setSearchParams}
        repoCount={repoCount}
        resetSearch={resetSearch}
      />
      {searchText &&
        <div>

          {loading ? (
            <Loader />
          ) : error ? (
            <p className={styles.error}>{error}</p>
          ) : !repoCount ? (
            <p className={styles.error}>No data Found !!!</p>
          ) : (
            <>
              <div className={styles.reposCont}>
                {repoData.map((data, index) => <Card key={data?.id} data={data} />)}
              </div>
              <Pagination
                page={page}
                setPage={setPage}
                repoCount={repoCount}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </>
          )}
        </div>
      }
    </div>
  )
}

export default GitHubRepos;