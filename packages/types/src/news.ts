export interface News {
  id: number;
  slug: string | null;
  title: string;
  content: string;
  excerpt: string | null;
  date: string;
  updatedAt: string;
  thumbnailPath: string | null;
  imagePaths: string[];
  tenantId: string;
  /**
   * HNS ID utakmice kad je novost automatski izvještaj s utakmice. `null` za
   * novosti koje je napisao čovjek. Stranica po njemu zna smije li dohvatiti
   * rezultat i tijek utakmice.
   */
  sourceMatchId: number | null;
}

export interface PaginatedNews {
  content: News[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}
