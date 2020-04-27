import axios from "axios";
// 2.配置
const axiosInstance = axios.create({
    // 公共的请求地址配置在这里
    baseURL: 'https://gwpre.sina.cn/interface/fymap2020_data.json', 
    // baseURL : 'http://localhost:666', // 家里接口地址
    // 请求超时时间（单位ms）
    timeout: 5000
})

// axios拦截器（暂时不管）

// 3.导出
export default axiosInstance;