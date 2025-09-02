// API services
// Used Vite proxy to handle CORS issues

const API_BASE_URL = "/api/healthkart";

export interface HealthKartProduct {
  id: number;
  spName: string;
  m_img?: {
    m_link: string;
    xs_link: string;
    s_link: string;
    l_link: string;
    o_link: string;
  };
  vrnt_lp: number;
  discount: number;
  rating: number;
  supp_info: string;
  brName: string;
  catName: string;
}

export interface HealthKartResponse {
  results: {
    variants: HealthKartProduct[];
    total_variants: number;
    pageNo: number;
    perPage: number;
  };
  statusCode: number;
}


class ApiService {
  private async makeRequest<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        `Request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getHairProducts(
    params: {
      plt?: number;
      st?: number;
      page?: number;
      perPage?: number;
    } = {}
  ): Promise<HealthKartResponse> {
    const searchParams = new URLSearchParams();

    // default parameters
    searchParams.append("plt", (params.plt || 2).toString());
    searchParams.append("st", (params.st || 42).toString());

    if (params.page) {
      searchParams.append("page", params.page.toString());
    }

    if (params.perPage) {
      searchParams.append("perPage", params.perPage.toString());
    }

    const endpoint = `/api/sale/home_hair/results/42?${searchParams.toString()}`;
    return this.makeRequest<HealthKartResponse>(endpoint);
  }

  async getProductDetails(productId: number): Promise<HealthKartProduct> {
    const endpoint = `/api/product/${productId}`;
    return this.makeRequest<HealthKartProduct>(endpoint);
  }

}

export const apiService = new ApiService();
export { ApiService };
