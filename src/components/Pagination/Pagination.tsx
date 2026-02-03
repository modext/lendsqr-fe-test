import { PAGE_SIZES } from "../../constants";
import styles from "./Pagination.module.scss";
import iconBack from "../../assets/back.svg";
import iconNext from "../../assets/next.svg";

export type PaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  pageSizes?: readonly number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function Pagination({
  page,
  pageSize,
  total,
  pageSizes = PAGE_SIZES,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize) || 1;

  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        Showing{" "}
        <select
          className={styles.pageSizeSelect}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Items per page"
        >
          {pageSizes.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>{" "}
        out of {total.toLocaleString()}
      </div>
      <div className={styles.right}>
        <button
          type="button"
          className={styles.pageBtnArrow}
          disabled={page <= 1}
          onClick={() => onPageChange(Math.max(1, page - 1))}
          aria-label="Previous page"
        >
          <img src={iconBack} alt="" className={styles.arrowIcon} />
        </button>
        {Array.from(
          { length: Math.min(3, totalPages) },
          (_, i) => i + 1
        ).map((p) => (
          <button
            key={p}
            type="button"
            className={`${styles.pageBtn} ${page === p ? styles.pageBtnActive : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        {totalPages > 3 && (
          <>
            <span className={styles.ellipsis}>...</span>
            <button
              type="button"
              className={`${styles.pageBtn} ${page === totalPages ? styles.pageBtnActive : ""}`}
              onClick={() => onPageChange(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          type="button"
          className={styles.pageBtnArrow}
          disabled={page >= totalPages}
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          aria-label="Next page"
        >
          <img src={iconNext} alt="" className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
}
