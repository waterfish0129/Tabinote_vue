export interface Model {
  name: string
  enable: boolean
}
export interface SystemConfig {
  baseUrl: string
  models: Model[]
}

const systemCfg: SystemConfig = {
  baseUrl: 'http://localhost:8090',
  models: [
    {
      name: 'login',
      enable: true,
    },
  ],
}

export default systemCfg
