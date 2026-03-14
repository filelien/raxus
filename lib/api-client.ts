// API client for RAXUS backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${url}`, error);
      throw error;
    }
  }

  // Servers API
  async getServers() {
    return this.request('/servers/');
  }

  async getServer(serverId: string) {
    return this.request(`/servers/${serverId}`);
  }

  async createServer(serverData: any) {
    return this.request('/servers/', {
      method: 'POST',
      body: JSON.stringify(serverData),
    });
  }

  async updateServer(serverId: string, serverData: any) {
    return this.request(`/servers/${serverId}`, {
      method: 'PUT',
      body: JSON.stringify(serverData),
    });
  }

  async deleteServer(serverId: string) {
    return this.request(`/servers/${serverId}`, {
      method: 'DELETE',
    });
  }

  // Metrics API
  async getLatestMetrics(serverId: string) {
    return this.request(`/metrics/latest/${serverId}`);
  }

  async getMetricHistory(serverId: string, hours: number = 24) {
    return this.request(`/metrics/history/${serverId}?hours=${hours}`);
  }

  async getAggregateMetrics() {
    return this.request('/metrics/aggregate');
  }

  // Databases API
  async getDatabases() {
    return this.request('/databases/');
  }

  async getDatabase(dbId: string) {
    return this.request(`/databases/${dbId}`);
  }

  async getDatabaseMetrics(dbId: string) {
    return this.request(`/databases/${dbId}/metrics`);
  }

  async getActiveQueries(dbId: string) {
    return this.request(`/databases/${dbId}/queries`);
  }

  // Network API
  async getNetworkTopology() {
    return this.request('/network/topology');
  }

  async getNetworkTraffic(hours: number = 24) {
    return this.request(`/network/traffic?hours=${hours}`);
  }

  async getNetworkLatency() {
    return this.request('/network/latency');
  }

  async pingHost(host: string) {
    return this.request(`/network/ping/${host}`, {
      method: 'POST',
    });
  }

  // Security API
  async getSecurityEvents() {
    return this.request('/security/events');
  }

  async createSecurityEvent(eventData: any) {
    return this.request('/security/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async resolveSecurityEvent(eventId: string) {
    return this.request(`/security/events/${eventId}/resolve`, {
      method: 'PUT',
    });
  }

  async getFirewallRules() {
    return this.request('/security/firewall/rules');
  }

  async runSecurityScan() {
    return this.request('/security/scan');
  }
}

export const apiClient = new ApiClient();

// Utility function to check if backend is available
export async function isBackendAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api/v1', '')}/health`);
    return response.ok;
  } catch {
    return false;
  }
}